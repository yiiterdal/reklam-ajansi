"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** raggededge.com defaults */
  distance?: number;
  strength?: number;
};

type MediaEl = HTMLImageElement | HTMLVideoElement;

type Plane = {
  el: MediaEl;
  tex: WebGLTexture;
  ready: boolean;
  opacity: number;
  target: number;
  off?: HTMLCanvasElement;
  frameSkip?: number;
};

function isVideo(el: MediaEl): el is HTMLVideoElement {
  return el.tagName === "VIDEO";
}

function mediaSize(el: MediaEl) {
  if (isVideo(el)) {
    return { w: el.videoWidth, h: el.videoHeight, ok: el.readyState >= 2 && el.videoWidth > 0 };
  }
  return { w: el.naturalWidth, h: el.naturalHeight, ok: el.complete && el.naturalWidth > 0 };
}

/**
 * raggededge.com ExperienceController + CurveEffect (desktop).
 * Fixed full-viewport WebGL: DOM media marked [data-ragged-media]
 * (img or video) are drawn as quads, then a fullscreen CurveEffect pass bends UVs:
 *   uv.x += (uv.x*2-1) * (strength*-0.05) * pow(1-uv.y, distance)
 */
export default function RaggedCurveRoot({
  children,
  className = "",
  distance = 34,
  strength = 1,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    // Mobile: Ragged Edge disables the WebGL experience
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const ext = gl.getExtension("OES_texture_float");
    void ext;

    // --- scene pass: draw textured quads into FBO ---
    const sceneVS = compile(
      gl,
      gl.VERTEX_SHADER,
      `attribute vec2 aPos;
       uniform vec4 uRect;
       varying vec2 vUv;
       void main(){
         vUv = aPos;
         vec2 c = vec2(uRect.x, uRect.y) + aPos * vec2(uRect.z, uRect.w);
         gl_Position = vec4(c, 0.0, 1.0);
       }`,
    );
    const sceneFS = compile(
      gl,
      gl.FRAGMENT_SHADER,
      `precision mediump float;
       varying vec2 vUv;
       uniform sampler2D uTex;
       uniform float uOpacity;
       void main(){
         vec4 c = texture2D(uTex, vUv);
         gl_FragColor = vec4(c.rgb, c.a * uOpacity);
       }`,
    );

    // --- curve pass: fullscreen CurveEffect (exact Ragged GLSL) ---
    const curveVS = compile(
      gl,
      gl.VERTEX_SHADER,
      `attribute vec2 aPos; varying vec2 vUv;
       void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.,1.); }`,
    );
    const curveFS = compile(
      gl,
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       uniform sampler2D uScene;
       uniform float uDistance;
       uniform float uStrength;
       void main(){
         vec2 uv = vUv;
         float str = uStrength * -0.05;
         uv.x += (uv.x * 2.0 - 1.0) * str * pow(max(1.0 - uv.y, 0.0), uDistance);
         if (uv.x < 0.0 || uv.x > 1.0) { gl_FragColor = vec4(0.0); return; }
         gl_FragColor = texture2D(uScene, uv);
       }`,
    );

    if (!sceneVS || !sceneFS || !curveVS || !curveFS) return;

    const sceneProg = link(gl, sceneVS, sceneFS);
    const curveProg = link(gl, curveVS, curveFS);
    if (!sceneProg || !curveProg) return;

    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW,
    );
    const full = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, full);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    // FBO
    let fbo = gl.createFramebuffer()!;
    let fboTex = gl.createTexture()!;
    const setupFbo = (w: number, h: number) => {
      gl.bindTexture(gl.TEXTURE_2D, fboTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fboTex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    const planes: Plane[] = [];
    let raf = 0;
    let cancelled = false;
    let frame = 0;
    let videoDpr = false;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, videoDpr ? 1.25 : 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      setupFbo(w, h);
    };

    const upload = (plane: Plane) => {
      const el = plane.el;
      const size = mediaSize(el);
      if (!size.ok) return;
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, isVideo(el) ? 1.1 : 2);
      const tw = Math.max(2, Math.floor(rect.width * dpr));
      const th = Math.max(2, Math.floor(rect.height * dpr));
      const off = plane.off ?? document.createElement("canvas");
      plane.off = off;
      if (off.width !== tw || off.height !== th) {
        off.width = tw;
        off.height = th;
      }
      const ctx = off.getContext("2d")!;
      // object-cover
      const ir = size.w / size.h;
      const cr = tw / th;
      let dw: number, dh: number, dx: number, dy: number;
      if (ir > cr) {
        dh = th;
        dw = th * ir;
        dx = (tw - dw) / 2;
        dy = 0;
      } else {
        dw = tw;
        dh = tw / ir;
        dx = 0;
        dy = (th - dh) / 2;
      }
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, tw, th);
      ctx.drawImage(el, dx, dy, dw, dh);

      gl.bindTexture(gl.TEXTURE_2D, plane.tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
      plane.ready = true;
      el.style.opacity = "0";
      el.style.visibility = "hidden";
    };

    const medias = Array.from(root.querySelectorAll<HTMLElement>("[data-ragged-media]"));
    const loaders: Array<() => void> = [];
    medias.forEach((host) => {
      const el: MediaEl | null =
        host.tagName === "IMG" || host.tagName === "VIDEO"
          ? (host as MediaEl)
          : host.querySelector("video") || host.querySelector("img");
      if (!el) return;
      if (isVideo(el)) videoDpr = true;
      const tex = gl.createTexture()!;
      const plane: Plane = { el, tex, ready: false, opacity: 0, target: 0, frameSkip: 0 };
      planes.push(plane);
      const onReady = () => upload(plane);
      if (isVideo(el)) {
        el.addEventListener("loadeddata", onReady);
        loaders.push(() => el.removeEventListener("loadeddata", onReady));
      } else {
        el.addEventListener("load", onReady);
        loaders.push(() => el.removeEventListener("load", onReady));
      }
      onReady();
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const media: MediaEl | null =
            e.target.tagName === "IMG" || e.target.tagName === "VIDEO"
              ? (e.target as MediaEl)
              : e.target.querySelector("video") || e.target.querySelector("img");
          const plane = planes.find((p) => p.el === media);
          if (plane) plane.target = e.isIntersecting ? 1 : 0;
        }
      },
      { rootMargin: "25% 0px", threshold: 0 },
    );
    medias.forEach((m) => io.observe(m));

    const aScenePos = gl.getAttribLocation(sceneProg, "aPos");
    const uRect = gl.getUniformLocation(sceneProg, "uRect");
    const uTex = gl.getUniformLocation(sceneProg, "uTex");
    const uOpacity = gl.getUniformLocation(sceneProg, "uOpacity");

    const aCurvePos = gl.getAttribLocation(curveProg, "aPos");
    const uScene = gl.getUniformLocation(curveProg, "uScene");
    const uDistance = gl.getUniformLocation(curveProg, "uDistance");
    const uStrength = gl.getUniformLocation(curveProg, "uStrength");

    const loop = () => {
      if (cancelled) return;
      raf = requestAnimationFrame(loop);
      frame++;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const anyVisible = planes.some((p) => p.target > 0.01 || p.opacity > 0.01);
      if (!anyVisible) {
        // Still clear so stale frames don't linger, but skip work
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      // Pass 1 → FBO
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(sceneProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(aScenePos);
      gl.vertexAttribPointer(aScenePos, 2, gl.FLOAT, false, 0, 0);

      for (const p of planes) {
        // Video: upload every 2nd frame to cut GPU/CPU cost
        if (isVideo(p.el) && p.target > 0 && frame % 2 === 0) upload(p);
        if (!p.ready) continue;
        p.opacity += (p.target - p.opacity) * 0.14;
        if (p.opacity < 0.008 && p.target === 0) continue;
        const r = p.el.getBoundingClientRect();
        if (r.bottom < -40 || r.top > vh + 40) continue;
        const x = (r.left / vw) * 2 - 1;
        const y = 1 - (r.bottom / vh) * 2;
        const w = (r.width / vw) * 2;
        const h = (r.height / vh) * 2;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, p.tex);
        gl.uniform1i(uTex, 0);
        gl.uniform4f(uRect, x, y, w, h);
        gl.uniform1f(uOpacity, p.opacity);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      // Pass 2 → screen with CurveEffect
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(curveProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, full);
      gl.enableVertexAttribArray(aCurvePos);
      gl.vertexAttribPointer(aCurvePos, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboTex);
      gl.uniform1i(uScene, 0);
      gl.uniform1f(uDistance, distance);
      gl.uniform1f(uStrength, strength);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    resize();
    window.addEventListener("resize", resize);
    // Re-upload textures after layout settles / next/image hydrates
    const boot = window.setTimeout(() => {
      planes.forEach((p) => {
        p.ready = false;
        upload(p);
      });
    }, 400);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(boot);
      window.removeEventListener("resize", resize);
      io.disconnect();
      loaders.forEach((fn) => fn());
      planes.forEach((p) => {
        p.el.style.opacity = "";
        p.el.style.visibility = "";
        gl.deleteTexture(p.tex);
      });
      gl.deleteFramebuffer(fbo);
      gl.deleteTexture(fboTex);
      gl.deleteProgram(sceneProg);
      gl.deleteProgram(curveProg);
      gl.deleteShader(sceneVS);
      gl.deleteShader(sceneFS);
      gl.deleteShader(curveVS);
      gl.deleteShader(curveFS);
      gl.deleteBuffer(quad);
      gl.deleteBuffer(full);
    };
  }, [distance, strength]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[5] hidden h-[100dvh] w-screen md:block"
        aria-hidden
      />
    </div>
  );
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}
