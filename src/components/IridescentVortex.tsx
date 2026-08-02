"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMotionValue, type MotionValue } from "framer-motion";

type IridescentVortexProps = {
  /** Raw scroll progress 0..1 (maps to theatre sequence position 2 -> 8.9) */
  progress?: MotionValue<number>;
  /** Receives the lerped sequence position every frame (for UI scrubbing) */
  seqOut?: MotionValue<number>;
};

/**
 * Faithful port of the topology.vc hero + scroll journey.
 *
 * Everything below — shaders, keyframe tracks, easing handles, fluid-sim
 * parameters — is extracted 1:1 from their production bundle and the
 * theatre.js state embedded in it.
 */

/* ------------------------------------------------------------------ */
/* Theatre.js keyframe evaluation                                      */
/* ------------------------------------------------------------------ */

type Keyframe = { p: number; v: number; h: [number, number, number, number]; hold?: boolean };

function cubicBezierEase(x1: number, y1: number, x2: number, y2: number, x: number) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  // Newton-Raphson on the bezier x(t)
  let t = x;
  for (let i = 0; i < 8; i++) {
    const mt = 1 - t;
    const bx = 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t;
    const dx = 3 * mt * mt * x1 + 6 * mt * t * (x2 - x1) + 3 * t * t * (1 - x2);
    if (Math.abs(dx) < 1e-6) break;
    t -= (bx - x) / dx;
    t = Math.min(1, Math.max(0, t));
  }
  const mt = 1 - t;
  return 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t;
}

function evalTrack(track: Keyframe[], pos: number): number {
  if (pos <= track[0].p) return track[0].v;
  const last = track[track.length - 1];
  if (pos >= last.p) return last.v;
  for (let i = 0; i < track.length - 1; i++) {
    const a = track[i];
    const b = track[i + 1];
    if (pos >= a.p && pos < b.p) {
      if (a.hold) return a.v;
      const x = (pos - a.p) / (b.p - a.p);
      const y = cubicBezierEase(a.h[2], a.h[3], b.h[0], b.h[1], x);
      return a.v + (b.v - a.v) * y;
    }
  }
  return last.v;
}

/* Camera 1 tracks (sheet "Home") */
const TRK_POS_X: Keyframe[] = [
  { p: 0.5, v: -0.6651944391263724, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: -0.6851944391263725, h: [0.355, 1, 0.25, 0.46] },
  { p: 6.733, v: -0.2682782858766424, h: [0.45, 0.94, 0.55, 0.085] },
  { p: 10, v: -0.19519443912637213, h: [0.68, 0.53, 0.5, 0], hold: true },
  { p: 11, v: 0.08000000000000024, h: [0.5, 1, 0.5, 0] },
];
const TRK_POS_Y: Keyframe[] = [
  { p: 0.5, v: -1.0778227928698623, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: -1.3878227928698625, h: [0.355, 1, 0.25, 0.46] },
  { p: 6.733, v: -0.8282906254692868, h: [0.45, 0.94, 0.55, 0.085] },
  { p: 10, v: -0.6878227928698621, h: [0.68, 0.53, 0.5, 0], hold: true },
  { p: 11, v: -2.520823849544274, h: [0.5, 1, 0.5, 0] },
];
const TRK_POS_Z: Keyframe[] = [
  { p: 0.5, v: 1.402139400477, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: 1.1821394004769998, h: [0.355, 1, 0.455, 0.03] },
  { p: 10, v: 0.4121394004769985, h: [0.515, 0.955, 0.5, 0], hold: true },
  { p: 11, v: 2.309584775881091, h: [0.5, 1, 0.5, 0] },
];
const TRK_ROT_X: Keyframe[] = [
  { p: 0.5, v: 0.6224127526207843, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: 0.6984127526207844, h: [0.355, 1, 0.25, 0.46] },
  { p: 6.733, v: 0.2829933231416995, h: [0.45, 0.94, 0.55, 0.085] },
  { p: 10, v: 0.2829933231416995, h: [0.5, 1, 0.5, 0], hold: true },
  { p: 11, v: 0.6399999999999999, h: [0.5, 1, 0.5, 0] },
];
const TRK_ROT_Y: Keyframe[] = [
  { p: 0.5, v: -0.3428377872214537, h: [0.5, 1, 0.5, 0] },
  { p: 2, v: -0.26783778722145374, h: [0.355, 1, 0.455, 0.03] },
  { p: 6.733, v: -0.13983778722145382, h: [0.515, 0.955, 0.5, 0] },
  { p: 10, v: -0.13983778722145382, h: [0.5, 1, 0.5, 0], hold: true },
  { p: 11, v: 0, h: [0.5, 1, 0.5, 0] },
];
const TRK_ROT_Z: Keyframe[] = [
  { p: 0.5, v: -0.4479991664732804, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: -0.36199916647328034, h: [0.355, 1, 0.455, 0.03] },
  { p: 6.733, v: -0.2969991664732803, h: [0.515, 0.955, 0.5, 0] },
  { p: 10, v: -0.2969991664732803, h: [0.5, 1, 0.5, 0], hold: true },
  { p: 11, v: 0, h: [0.5, 1, 0.5, 0] },
];
const TRK_FOV: Keyframe[] = [
  { p: 0, v: 70.71428571428565, h: [0.5, 1, 0.5, 0], hold: true },
  { p: 2, v: 70.71428571428565, h: [0.5, 1, 0.5, 0] },
  { p: 5.667, v: 124.08039343833629, h: [0.5, 1, 0.5, 0] },
  { p: 11, v: 35.71428571428555, h: [0.5, 1, 0.5, 0] },
];

/* Layers Hero uniform tracks */
const TRK_CYCLE_OFFSET: Keyframe[] = [
  { p: 0.5, v: 0, h: [0.355, 1, 0.5, 0] },
  { p: 2.167, v: 0, h: [0.5, 1, 0.455, 0.03] },
  { p: 6.733, v: 0.3810000000000088, h: [0.556, 0.779, 0.5, 0] },
];
const TRK_HEIGHT: Keyframe[] = [
  { p: 0.5, v: 0.26599999999999985, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: 0.42600000000000005, h: [0.355, 1, 0.5, 0] },
  { p: 6.333, v: 0.42600000000000005, h: [0.5, 1, 0.5, 0] },
  { p: 10, v: 0.6470000000000002, h: [0.5, 1, 0.5, 0] },
];
const TRK_SHADOW_STRENGTH: Keyframe[] = [
  { p: 0.5, v: 0.5279999999999998, h: [0.5, 1, 0.645, 0.045] },
  { p: 2, v: 0.7870000000000004, h: [0.355, 1, 0.5, 0] },
];
const TRK_LIGHT_STRENGTH: Keyframe[] = [
  { p: 3.367, v: 0.4369999999999995, h: [0.5, 1, 0.5, 0] },
  { p: 5.667, v: 0, h: [0.5, 1, 0.5, 0] },
];
const TRK_SHADOW_OFFSET: Keyframe[] = [
  { p: 3.367, v: 0.0075, h: [0.5, 1, 0.5, 0] },
  { p: 5.667, v: 0, h: [0.5, 1, 0.5, 0] },
];
const TRK_HN_STRENGTH: Keyframe[] = [
  { p: 2.7, v: 0.024000000000000014, h: [0.5, 1, 0.5, 0] },
  { p: 6.333, v: 0.05279999999999979, h: [0.5, 1, 0.5, 0] },
];
const TRK_HN_SCALE: Keyframe[] = [
  { p: 2.7, v: 0.15999999999999998, h: [0.5, 1, 0.5, 0] },
  { p: 6.333, v: 0.21900000000000003, h: [0.5, 1, 0.5, 0] },
];

/* Post FX tracks */
const TRK_POST_NOISE: Keyframe[] = [
  { p: 2, v: 0.1, h: [0.5, 1, 0.5, 0] },
  { p: 7.733, v: 0.054, h: [0.5, 1, 0.5, 0] },
  { p: 8.867, v: 0, h: [0.5, 1, 0.5, 0], hold: true },
  { p: 11, v: 0.054, h: [0.5, 1, 0.5, 0] },
];
const TRK_BEND: Keyframe[] = [
  { p: 3.933, v: -0.15199999999999927, h: [0.5, 1, 0.5, 0] },
  { p: 6.733, v: -0.5419999999999996, h: [0.5, 1, 0.5, 0] },
  { p: 8.867, v: -0.5419999999999996, h: [0.5, 1, 0.5, 0], hold: true },
  { p: 11, v: -0.24999999999999933, h: [0.5, 1, 0.5, 0] },
];
const TRK_MOUSE_ANGLE_X: Keyframe[] = [
  { p: 2, v: 0.03189999999999997, h: [0.5, 1, 0.5, 0] },
  { p: 7, v: 0.024, h: [0.5, 1, 0.5, 0] },
  { p: 8.567, v: 0, h: [0.5, 1, 0.5, 0] },
  { p: 10, v: 0, h: [0.5, 1, 0.5, 0] },
  { p: 11, v: 0.01, h: [0.5, 1, 0.5, 0] },
];
const TRK_MOUSE_ANGLE_Y: Keyframe[] = [
  { p: 2, v: 0.033, h: [0.5, 1, 0.5, 0] },
  { p: 7, v: 0.024, h: [0.5, 1, 0.5, 0] },
  { p: 8.567, v: 0, h: [0.5, 1, 0.5, 0] },
  { p: 10, v: 0, h: [0.5, 1, 0.5, 0] },
  { p: 11, v: 0.01, h: [0.5, 1, 0.5, 0] },
];

/* Scroll mapping: sequence pos = hero(2) + (length(13) - 4.1 - 2) * progress */
export const SEQ_HERO = 2;
export const SEQ_SPAN = 13 - 4.1 - 2; // 6.9
/** Wall-clock seconds for intro to cover sequence 0 → SEQ_HERO (topology.vc uses 3) */
export const INTRO_DURATION = 3;
const MOUSE_ROLL_AMOUNT = 0.1;
const POINTER_LERP_1 = 0.032;
const POINTER_LERP_2 = 0.025;
const CAMERA_Z_OFFSET = 1.196000000000019;

/* ------------------------------------------------------------------ */
/* Shaders (verbatim from their bundle)                                */
/* ------------------------------------------------------------------ */

const NOISE_FRAG = /* glsl */ `
varying vec2 vUv;
uniform float uSeed;
uniform float uTime;
uniform float uScale;
uniform float uTimeScale;
uniform float uNoiseOffset;
uniform vec2 uNoiseTranslation;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
void main(){
  vec2 uv=(vUv+uNoiseTranslation)*uScale;
  float n=.5+.5*snoise(vec3(uv.x,uv.y,uSeed+uTime*uTimeScale));
  float n2=.5+.5*snoise(vec3(2.*uv.x,2.*uv.y,1.+uSeed+uTime*uTimeScale));
  n=mix(n,n2,.5)+uNoiseOffset;
  gl_FragColor=vec4(n);
}
`;

const LAYERS_VERT = /* glsl */ `
attribute float aLayerOffset;
varying vec2 vUv;
varying float vLayerOffset;
varying vec3 vWorldPosition;
uniform float uTime;
uniform float uCycleOffset;
uniform float uCycleSpeed;
void main(){
  vUv=uv;
  vLayerOffset=aLayerOffset;
  vec4 transformedPosition=vec4(position,1.0);
  #ifdef USE_INSTANCING
  transformedPosition=instanceMatrix*transformedPosition;
  #endif
  transformedPosition.z+=mod(uTime*uCycleSpeed+aLayerOffset+uCycleOffset,1.);
  vLayerOffset=mod(uTime*uCycleSpeed+aLayerOffset+uCycleOffset,1.);
  vWorldPosition=transformedPosition.xyz;
  vec4 mvPosition=modelViewMatrix*transformedPosition;
  gl_Position=projectionMatrix*mvPosition;
}
`;

const LAYERS_FRAG = /* glsl */ `
float map(float value,float min1,float max1,float min2,float max2){return min2+(value-min1)*(max2-min2)/(max1-min1);}
varying vec2 vUv;
varying float vLayerOffset;
varying vec3 vWorldPosition;
uniform sampler2D tHeightNoise;
uniform sampler2D tNoise;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform float uColorStep1;
uniform float uColorStep2;
uniform float uColorStep3;
uniform float uColorStep4;
uniform float uColorStep5;
uniform vec2 uColorHeightRange;
uniform vec3 uShadowColor;
uniform float uShadowStrength;
uniform vec2 uShadowRange;
uniform float uShadowOffset;
uniform vec3 uLightColor;
uniform vec2 uLightRange;
uniform float uLightOffset;
uniform float uLightStrength;
uniform float uLightShininess;
uniform float uDepthOffset;
uniform float uHeight;
uniform float uHeightNoiseSpeed;
uniform float uHeightNoiseStrength;
uniform float uHeightNoiseScale;
uniform vec2 uResolution;
uniform vec2 uLightPos;
uniform bool uIsFooter;
uniform float uTime;
uniform sampler2D tFluid;
uniform bool uFluidEnabled;
uniform bool uFluidEdgeEnabled;
uniform float uFluidStrength;
float aastep(float value,float threshold){float w=fwidth(value);return smoothstep(threshold-w,threshold+w,value);}
float sampleNoise(vec2 uv,float layer){
  float n=texture2D(tHeightNoise,uv).r;
  n-=layer;
  float fluid=0.;
  #ifdef USE_FLUID
  if(uFluidEdgeEnabled){vec2 fluidColor=texture2D(tFluid,gl_FragCoord.xy/uResolution).rg;fluid=fluidColor.r+fluidColor.g;fluid*=0.004;}
  #endif
  n+=fluid;
  return n;
}
void main(){
  float layerOffset;
  if(uIsFooter){layerOffset=vLayerOffset*abs(uDepthOffset*((vLayerOffset+0.3)*2.-1.))*0.25;}
  else{layerOffset=vLayerOffset*uDepthOffset;}
  vec3 noise=texture2D(tNoise,vUv*uHeightNoiseScale+uTime*uHeightNoiseSpeed).rgb;
  vec2 heightNoiseOffset=noise.rg*uHeightNoiseStrength;
  if(vLayerOffset<0.94){
    float layerAbove=sampleNoise(vUv+heightNoiseOffset,layerOffset+0.05);
    layerAbove=aastep(layerAbove,uHeight+0.1);
    if(layerAbove>.01){discard;}
  }
  float shapeNoise=sampleNoise(vUv+heightNoiseOffset,layerOffset);
  float n=aastep(shapeNoise,uHeight);
  if(uIsFooter&&vLayerOffset<0.06)n=1.;
  if(n<0.001){discard;}
  float fluid=0.;
  #ifdef USE_FLUID
  if(uFluidEnabled){vec2 fluidColor=texture2D(tFluid,gl_FragCoord.xy/uResolution).rg;fluid=fluidColor.r+fluidColor.g;fluid*=uFluidStrength;}
  #endif
  vec3 lightPos=vec3(uLightPos,100.);
  vec3 dir=-lightPos;
  vec2 uvc=(vUv+heightNoiseOffset)-uShadowOffset*normalize(dir.xy);
  float shadow=texture2D(tHeightNoise,uvc).r;
  shadow-=layerOffset;
  shadow+=fluid*0.1;
  shadow=smoothstep(uHeight+uShadowRange.x,uHeight+uShadowRange.y,shadow);
  shadow*=uShadowStrength;
  if(vLayerOffset>0.94)shadow=0.;
  float dist=map(vWorldPosition.z,uColorHeightRange.x,uColorHeightRange.y,0.,1.);
  dist+=fluid*2.;
  vec3 c=mix(uColor1,uColor2,smoothstep(uColorStep1,uColorStep2,dist));
  c=mix(c,uColor3,smoothstep(uColorStep2,uColorStep3,dist));
  c=mix(c,uColor4,smoothstep(uColorStep3,uColorStep4,dist));
  c=mix(c,uColor5,smoothstep(uColorStep4,uColorStep5,dist*0.2));
  c+=abs(fluid)*5.;
  c+=c*(smoothstep(uHeight+0.002,uHeight,shapeNoise))*0.05;
  lightPos=vec3(-uLightPos,100.);
  dir=-lightPos;
  uvc=(vUv+heightNoiseOffset)-uLightOffset*normalize(dir.xy);
  float highlight=texture2D(tHeightNoise,uvc).r;
  highlight-=layerOffset;
  highlight=smoothstep(uHeight+uLightRange.x,uHeight+uLightRange.y,highlight);
  if(vLayerOffset>0.94)highlight=0.;
  c+=uLightColor*pow(highlight,uLightShininess)*uLightStrength;
  c=mix(c,uShadowColor,shadow);
  gl_FragColor=vec4(c,n);
}
`;

const QUAD_VERT = /* glsl */ `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;

/* Their FinalComposite + MotionBlur grade passes, fused into a single
   full-screen pass (mathematically identical, saves one full-res render). */
const POST_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float uNoiseStrength;
uniform float uMaxDistort;
uniform float uBendAmount;
uniform float uExposure;
uniform float uShadowLift;
uniform float uBottomFadeStrength;
uniform float uBottomFadeStart;
const int iterations=5;
float blendSoftLight(float base,float blend){return(blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));}
vec3 blendSoftLight(vec3 base,vec3 blend){return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));}
vec3 blendSoftLight(vec3 base,vec3 blend,float opacity){return(blendSoftLight(base,blend)*opacity+base*(1.0-opacity));}
vec2 barrelDistortion(vec2 coord,float amt){vec2 cc=coord-0.5;float dist=dot(cc,cc);return coord+cc*dist*amt;}
float sat(float t){return clamp(t,0.0,1.0);}
float linterp(float t){return sat(1.0-abs(2.0*t-1.0));}
float remap(float t,float a,float b){return sat((t-a)/(b-a));}
vec4 spectrum_offset(float t){vec4 ret;float lo=step(t,0.5);float hi=1.0-lo;float w=linterp(remap(t,1.0/6.0,5.0/6.0));ret=vec4(lo,1.0,hi,1.)*vec4(1.0-w,w,1.0-w,1.);return pow(ret,vec4(1.0/2.2));}
float random(vec2 p){vec3 p3=fract(vec3(p.xyx)*443.8975);p3+=dot(p3,p3.yzx+19.19);return fract((p3.x+p3.y)*p3.z);}
vec3 lin2srgb(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1.0/2.4))-0.055,step(vec3(0.0031308),c));}
void main(){
  vec4 sumcol=vec4(0.0);
  vec4 sumw=vec4(0.0);
  float reci_num_iter_f=1.0/float(iterations);
  for(int i=0;i<iterations;i++){
    float t=float(i)*reci_num_iter_f;
    vec4 w=spectrum_offset(t);
    sumw+=w;
    sumcol+=w*texture2D(tDiffuse,barrelDistortion(vUv,uBendAmount*uMaxDistort*t));
  }
  gl_FragColor=vec4(sumcol/sumw);
  float noise=random(vUv)-0.5;
  gl_FragColor.rgb=blendSoftLight(gl_FragColor.rgb,vec3(noise),uNoiseStrength);
  gl_FragColor.rgb*=uExposure;
  gl_FragColor.rgb=mix(vec3(uShadowLift),vec3(1.0),gl_FragColor.rgb);
  float bottomFade=smoothstep(0.0,uBottomFadeStart,vUv.y);
  gl_FragColor.rgb*=mix(1.0-uBottomFadeStrength,1.0,bottomFade);
  gl_FragColor.rgb=lin2srgb(clamp(gl_FragColor.rgb,0.0,1.0));
}
`;

/* Fluid sim shaders (their Yte/Kte/Zte/$te, verbatim) */
const FLUID_VELOCITY_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tTexture;
uniform vec2 uTexelSize;
uniform vec2 uForce;
uniform vec2 uMouse;
uniform vec2 uPrevMouse;
uniform vec2 uMouseVelocity;
uniform float uMouseRadius;
uniform float uPressure;
float sdLine(vec2 p,vec2 a,vec2 b){float velocity=clamp(length(uMouseVelocity),0.5,1.5);vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return length(pa-ba*h)/velocity;}
void main(){
  vec4 color=texture2D(tTexture,vUv-texture2D(tTexture,vUv).xy*uTexelSize);
  float dir=smoothstep(1.-uMouseRadius,1.,1.0-min(sdLine(vUv,uPrevMouse,uMouse),1.0));
  vec4 minColor=vec4(-1.);
  vec4 maxColor=vec4(1.);
  color=clamp((color+vec4(uForce*dir,0.0,1.0))*uPressure,minColor,maxColor);
  gl_FragColor=color;
}
`;

const FLUID_DIVERGENCE_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
uniform float uViscosity;
void main(){
  float x0=texture2D(uVelocity,vUv-vec2(uTexelSize.x,0.0)).x;
  float x1=texture2D(uVelocity,vUv+vec2(uTexelSize.x,0.0)).x;
  float y0=texture2D(uVelocity,vUv-vec2(0.0,uTexelSize.y)).y;
  float y1=texture2D(uVelocity,vUv+vec2(0.0,uTexelSize.y)).y;
  float divergence=(x1-x0+y1-y0)*uViscosity;
  gl_FragColor=vec4(divergence);
}
`;

const FLUID_PRESSURE_FRAG = /* glsl */ `
uniform sampler2D tTexture;
uniform sampler2D uDivergence;
uniform float uAlpha;
uniform float uBeta;
uniform vec2 uTexelSize;
varying vec2 vUv;
void main(){
  float x0=texture2D(tTexture,vUv-vec2(uTexelSize.x,0.0)).r;
  float x1=texture2D(tTexture,vUv+vec2(uTexelSize.x,0.0)).r;
  float y0=texture2D(tTexture,vUv-vec2(0.0,uTexelSize.y)).r;
  float y1=texture2D(tTexture,vUv+vec2(0.0,uTexelSize.y)).r;
  float b=texture2D(uDivergence,vUv).r;
  float relaxed=(x0+x1+y0+y1+uAlpha*b)*uBeta;
  gl_FragColor=vec4(relaxed);
}
`;

const FLUID_SUBTRACT_FRAG = /* glsl */ `
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
varying vec2 vUv;
void main(){
  float x0=texture2D(uPressure,vUv-vec2(uTexelSize.x,0)).r;
  float x1=texture2D(uPressure,vUv+vec2(uTexelSize.x,0)).r;
  float y0=texture2D(uPressure,vUv-vec2(0,uTexelSize.y)).r;
  float y1=texture2D(uPressure,vUv+vec2(0,uTexelSize.y)).r;
  vec2 v=texture2D(uVelocity,vUv).xy;
  gl_FragColor=vec4((v-vec2(x1-x0,y1-y0)*0.5),1.0,1.0);
}
`;

/* Fluid params — based on theatre "Fluid Sim" production values, with the
   splat slightly widened/strengthened for a juicier, more readable ripple. */
const FLUID_FORCE = 5.2; // site: 4.23
const FLUID_ITERATIONS = 1;
const FLUID_MOUSE_RADIUS = 0.088; // site: 0.07
const FLUID_PRESSURE = 0.9324000000000007;
const FLUID_VISCOSITY = 0.9603174603174605;
const FLUID_SIZE = 128;
/* Skip the 5 sim passes when the field has fully decayed (mouse idle) */
const FLUID_IDLE_MS = 1200;

/* Simple ping-pong sim buffer (their `bp` class, trimmed to what's used) */
class PingPongSim {
  material: THREE.ShaderMaterial;
  private rtA: THREE.WebGLRenderTarget;
  private rtB: THREE.WebGLRenderTarget | null;
  private read: THREE.WebGLRenderTarget | null;
  private write: THREE.WebGLRenderTarget;
  texture: THREE.Texture;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private pingPong: boolean;

  constructor(
    private renderer: THREE.WebGLRenderer,
    fragmentShader: string,
    uniforms: Record<string, THREE.IUniform>,
    pingPong = true,
  ) {
    const makeRT = () =>
      new THREE.WebGLRenderTarget(FLUID_SIZE, FLUID_SIZE, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping,
        generateMipmaps: false,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
        depthBuffer: false,
        stencilBuffer: false,
      });
    this.pingPong = pingPong;
    this.rtA = makeRT();
    this.rtB = pingPong ? makeRT() : null;
    this.write = this.rtA;
    this.read = this.rtB;
    this.material = new THREE.ShaderMaterial({
      vertexShader: QUAD_VERT,
      fragmentShader,
      uniforms: {
        tTexture: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / FLUID_SIZE, 1 / FLUID_SIZE) },
        ...uniforms,
      },
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.camera.position.z = 1;
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material));
    this.texture = this.write.texture;
    this.render();
  }

  private render() {
    const prev = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(this.write);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(prev);
    if (this.pingPong) this.swap();
    else this.texture = this.write.texture;
  }

  private swap() {
    const w = this.write;
    this.write = this.read as THREE.WebGLRenderTarget;
    this.read = w;
    this.texture = (this.read as THREE.WebGLRenderTarget).texture;
  }

  update(setTexture = true) {
    if (setTexture) {
      this.material.uniforms.tTexture.value = this.pingPong
        ? (this.read as THREE.WebGLRenderTarget).texture
        : this.write.texture;
    }
    this.render();
  }

  dispose() {
    this.rtA.dispose();
    this.rtB?.dispose();
    this.material.dispose();
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function IridescentVortex({ progress, seqOut }: IridescentVortexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idle = useMotionValue(0);
  const progressSource = progress ?? idle;
  const progressRef = useRef(progressSource.get());
  const seqOutRef = useRef(seqOut);
  seqOutRef.current = seqOut;

  useEffect(() => {
    const unsub = progressSource.on("change", (v) => {
      progressRef.current = v;
    });
    return unsub;
  }, [progressSource]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // scene renders into an MSAA target; canvas AA is wasted work
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setClearColor(0x151515, 1);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const finePointer = matchMedia("(pointer:fine)").matches;

    // ---- 1. Noise heightmap (uTimeScale 0 in production -> render once)
    const noiseTarget = new THREE.WebGLRenderTarget(256, 256, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    });
    const fsScene = new THREE.Scene();
    const fsCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const noiseMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VERT,
      fragmentShader: NOISE_FRAG,
      uniforms: {
        uSeed: { value: 1230 },
        uTime: { value: 0 },
        uScale: { value: 0.7269999999999989 },
        uTimeScale: { value: 0 },
        uNoiseOffset: { value: 0.244 },
        uNoiseTranslation: { value: new THREE.Vector2(-0.19, -0.12) },
      },
    });
    const fsQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), noiseMat);
    fsScene.add(fsQuad);
    renderer.setRenderTarget(noiseTarget);
    renderer.render(fsScene, fsCamera);
    renderer.setRenderTarget(null);

    // ---- 2. Fluid simulation (their velocity/divergence/pressure chain)
    const velocitySim = new PingPongSim(renderer, FLUID_VELOCITY_FRAG, {
      uMouse: { value: new THREE.Vector2(-1, -1) },
      uPrevMouse: { value: new THREE.Vector2(-1, -1) },
      uMouseVelocity: { value: new THREE.Vector2() },
      uForce: { value: new THREE.Vector2() },
      uMouseRadius: { value: FLUID_MOUSE_RADIUS },
      uPressure: { value: FLUID_PRESSURE },
    });
    const divergenceSim = new PingPongSim(
      renderer,
      FLUID_DIVERGENCE_FRAG,
      {
        uVelocity: { value: velocitySim.texture },
        uViscosity: { value: FLUID_VISCOSITY },
      },
      false,
    );
    const pressureSim = new PingPongSim(renderer, FLUID_PRESSURE_FRAG, {
      uDivergence: { value: divergenceSim.texture },
      uAlpha: { value: -1 },
      uBeta: { value: 0.25 },
    });
    const subtractSim = new PingPongSim(renderer, FLUID_SUBTRACT_FRAG, {
      uPressure: { value: pressureSim.texture },
      uVelocity: { value: velocitySim.texture },
    });
    const prevMouse = new THREE.Vector2(-1, -1);
    const mouse01 = new THREE.Vector2(-1, -1);

    // ---- 3. Layer stack
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70.71428571428565, 1, 0.1, 50);

    const gradientNoise = new THREE.TextureLoader().load("/webgl/gradient-noise.jpg", (t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
    });

    const layersMat = new THREE.ShaderMaterial({
      vertexShader: LAYERS_VERT,
      fragmentShader: LAYERS_FRAG,
      transparent: true,
      defines: { USE_FLUID: true },
      uniforms: {
        tHeightNoise: { value: noiseTarget.texture },
        tNoise: { value: gradientNoise },
        tFluid: { value: velocitySim.texture },
        uFluidEnabled: { value: true },
        uFluidEdgeEnabled: { value: finePointer },
        uFluidStrength: { value: 0.07 }, // site: 0.057 — slightly stronger shimmer
        uColor1: { value: new THREE.Color(0.564712, 0.564712, 0.564712) },
        uColor2: { value: new THREE.Color(0.564712, 0.564712, 0.564712) },
        uColor3: { value: new THREE.Color(0.564712, 0.564712, 0.564712) },
        uColor4: { value: new THREE.Color(0.564712, 0.564712, 0.564712) },
        uColor5: { value: new THREE.Color(0.564712, 0.564712, 0.564712) },
        uColorStep1: { value: 0.19200000000000023 },
        uColorStep2: { value: 0.3730000000000001 },
        uColorStep3: { value: 0.6194000000000005 },
        uColorStep4: { value: 0.8163999999999974 },
        uColorStep5: { value: 1 },
        uColorHeightRange: { value: new THREE.Vector2(0, 1) },
        uShadowColor: { value: new THREE.Color(0, 0, 0) },
        uShadowStrength: { value: 0.787 },
        uShadowRange: { value: new THREE.Vector2(0.00634920634920633, 0.014285714285714525) },
        uShadowOffset: { value: 0.0075 },
        uLightColor: { value: new THREE.Color(0.672443, 0.62396, 0.571125) },
        uLightRange: { value: new THREE.Vector2(0.04603174603174605, 0.10634920634920617) },
        uLightOffset: { value: 0.06800000000000005 },
        uLightStrength: { value: 0.4369999999999995 },
        uLightShininess: { value: 1.04 },
        uDepthOffset: { value: 0.17499999999999982 },
        uHeight: { value: 0.266 },
        uHeightNoiseSpeed: { value: 0.00111 },
        uHeightNoiseStrength: { value: 0.024000000000000014 },
        uHeightNoiseScale: { value: 0.15999999999999998 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uLightPos: { value: new THREE.Vector2(-0.37, 0.10700000000000004) },
        uIsFooter: { value: false },
        uTime: { value: 0 },
        uCycleOffset: { value: 0 },
        uCycleSpeed: { value: 0 },
      },
    });

    const LAYER_COUNT = 20;
    const layers = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), layersMat, LAYER_COUNT);
    const dummy = new THREE.Object3D();
    const offsets = new Float32Array(LAYER_COUNT);
    for (let i = 0; i < LAYER_COUNT; i++) {
      dummy.scale.setScalar(5);
      dummy.updateMatrix();
      layers.setMatrixAt(i, dummy.matrix);
      offsets[i] = (i + 1) / LAYER_COUNT;
    }
    layers.geometry.setAttribute("aLayerOffset", new THREE.InstancedBufferAttribute(offsets, 1));
    scene.add(layers);

    // ---- 4. Post FX chain
    const makeTarget = (samples = 0) =>
      new THREE.WebGLRenderTarget(1, 1, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
        depthBuffer: true,
        stencilBuffer: false,
        samples,
      });
    const rtScene = makeTarget(4);

    const postMat = new THREE.ShaderMaterial({
      vertexShader: QUAD_VERT,
      fragmentShader: POST_FRAG,
      uniforms: {
        tDiffuse: { value: rtScene.texture },
        uNoiseStrength: { value: 0.1 },
        uMaxDistort: { value: 2.016000000000001 },
        uBendAmount: { value: -0.15199999999999927 },
        uExposure: { value: 1.6 },
        uShadowLift: { value: 0.3 },
        uBottomFadeStrength: { value: 0.6 },
        uBottomFadeStart: { value: 0.45 },
      },
    });

    // ---- Pointer
    const pointer = new THREE.Vector2(0, 0); // NDC-ish for camera pivot
    const smooth1 = new THREE.Vector2(0, 0);
    const smooth2 = new THREE.Vector2(0, 0);
    const euler = new THREE.Euler();
    const quat = new THREE.Quaternion();

    let lastMoveAt = -Infinity;
    const onMove = (e: MouseEvent) => {
      pointer.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
      mouse01.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
      lastMoveAt = performance.now();
    };
    if (finePointer) addEventListener("mousemove", onMove, { passive: true });

    // ---- Resize + adaptive resolution
    let w = 1;
    let h = 1;
    let dprScale = 1; // adaptive multiplier on top of device pixel ratio
    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.75) * dprScale;
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      rtScene.setSize(Math.floor(w * dpr), Math.floor(h * dpr));
      layersMat.uniforms.uResolution.value.set(Math.floor(w * dpr), Math.floor(h * dpr));
      camera.aspect = w / h;
      postMat.uniforms.uBottomFadeStart.value = w / h < 1 ? 0.65 : 0.45;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Skip work entirely while the canvas is scrolled out of view
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    // Debug: pin the sequence via ?seq=N
    let forcedSeq: number | null = null;
    const seqParam = new URLSearchParams(location.search).get("seq");
    if (seqParam !== null && seqParam !== "" && !Number.isNaN(parseFloat(seqParam))) {
      forcedSeq = parseFloat(seqParam);
    }

    // ---- Render loop
    let frameId = 0;
    let cancelled = false;
    let lerpedProgress = 0;
    let lastFrame = 0;
    let slowFrames = 0;
    const start0 = performance.now();

    const loop = (now: number) => {
      if (cancelled) return;
      frameId = requestAnimationFrame(loop);
      if (!visible) {
        lastFrame = 0;
        return;
      }

      // Adaptive quality: sustained slow frames -> render at lower resolution
      if (lastFrame) {
        const dt = now - lastFrame;
        if (dt > 26) {
          if (++slowFrames > 30 && dprScale > 0.55) {
            dprScale -= 0.15;
            slowFrames = 0;
            resize();
          }
        } else if (slowFrames > 0) {
          slowFrames--;
        }
      }
      lastFrame = now;

      const t = (now - start0) / 1000;

      // Their scroll smoothing: lerpedProgress -> targetProgress at 0.075
      lerpedProgress += (progressRef.current - lerpedProgress) * 0.075;

      // Intro: topology.vc plays sequence 0 → hero(2) over 3s (ease:none),
      // then unlocks scroll. Scroll then drives 2 → 8.9.
      const introPos = Math.min(SEQ_HERO, (t / INTRO_DURATION) * SEQ_HERO);
      const scrollPos = SEQ_HERO + SEQ_SPAN * lerpedProgress;
      const seq = forcedSeq !== null ? forcedSeq : Math.max(introPos, scrollPos);
      seqOutRef.current?.set(seq);

      // Camera from keyframe tracks
      camera.position.set(evalTrack(TRK_POS_X, seq), evalTrack(TRK_POS_Y, seq), evalTrack(TRK_POS_Z, seq));
      camera.rotation.set(evalTrack(TRK_ROT_X, seq), evalTrack(TRK_ROT_Y, seq), evalTrack(TRK_ROT_Z, seq));
      const fov = evalTrack(TRK_FOV, seq);
      if (fov !== camera.fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      // Layer uniforms from tracks
      const u = layersMat.uniforms;
      u.uTime.value = t;
      u.uCycleOffset.value = evalTrack(TRK_CYCLE_OFFSET, seq);
      u.uHeight.value = evalTrack(TRK_HEIGHT, seq);
      u.uShadowStrength.value = evalTrack(TRK_SHADOW_STRENGTH, seq);
      u.uLightStrength.value = evalTrack(TRK_LIGHT_STRENGTH, seq);
      u.uShadowOffset.value = evalTrack(TRK_SHADOW_OFFSET, seq);
      u.uHeightNoiseStrength.value = evalTrack(TRK_HN_STRENGTH, seq);
      u.uHeightNoiseScale.value = evalTrack(TRK_HN_SCALE, seq);

      // Post FX from tracks + scroll-linked bottom fade
      postMat.uniforms.uNoiseStrength.value = evalTrack(TRK_POST_NOISE, seq);
      postMat.uniforms.uBendAmount.value = evalTrack(TRK_BEND, seq);
      postMat.uniforms.uBottomFadeStrength.value =
        0.6 * (1 - Math.min(1, Math.max(0, lerpedProgress / 0.15)));

      // Fluid sim step (their onRaf, verbatim order). Skipped once the
      // velocity field has fully decayed after the mouse goes idle.
      if (finePointer && mouse01.x >= 0 && now - lastMoveAt < FLUID_IDLE_MS) {
        const vu = velocitySim.material.uniforms;
        (vu.uPrevMouse.value as THREE.Vector2).copy(prevMouse);
        if (prevMouse.x === -1 && prevMouse.y === -1) prevMouse.copy(mouse01);
        (vu.uMouse.value as THREE.Vector2).copy(mouse01);
        (vu.uForce.value as THREE.Vector2).set(
          (mouse01.x - prevMouse.x) * FLUID_FORCE,
          (mouse01.y - prevMouse.y) * FLUID_FORCE,
        );
        prevMouse.copy(mouse01);
        (vu.uMouseVelocity.value as THREE.Vector2).set(
          ((vu.uMouse.value as THREE.Vector2).x - (vu.uPrevMouse.value as THREE.Vector2).x) / 16,
          ((vu.uMouse.value as THREE.Vector2).y - (vu.uPrevMouse.value as THREE.Vector2).y) / 16,
        );
        velocitySim.update();
        divergenceSim.material.uniforms.uVelocity.value = velocitySim.texture;
        divergenceSim.update();
        pressureSim.material.uniforms.uDivergence.value = divergenceSim.texture;
        for (let i = 0; i < FLUID_ITERATIONS; i++) pressureSim.update();
        subtractSim.material.uniforms.uPressure.value = pressureSim.texture;
        subtractSim.material.uniforms.uVelocity.value = velocitySim.texture;
        subtractSim.update();
        velocitySim.material.uniforms.tTexture.value = subtractSim.texture;
        velocitySim.update(false);
        u.tFluid.value = velocitySim.texture;
      }

      // Camera pivot mouse movement (angles are keyframed on the sequence)
      if (finePointer) {
        const angleX = evalTrack(TRK_MOUSE_ANGLE_X, seq);
        const angleY = evalTrack(TRK_MOUSE_ANGLE_Y, seq);
        smooth1.lerp(pointer, POINTER_LERP_1);
        smooth2.lerp(pointer, POINTER_LERP_2);
        camera.translateZ(-CAMERA_Z_OFFSET);
        euler.set(smooth1.y * angleY, -smooth1.x * angleX, 0);
        quat.setFromEuler(euler);
        camera.quaternion.multiply(quat);
        euler.set(0, 0, (smooth1.x - smooth2.x) * -MOUSE_ROLL_AMOUNT);
        quat.setFromEuler(euler);
        camera.quaternion.multiply(quat);
        camera.translateZ(CAMERA_Z_OFFSET);
        camera.updateMatrixWorld();
      }

      renderer.setRenderTarget(rtScene);
      renderer.render(scene, camera);

      fsQuad.material = postMat;
      renderer.setRenderTarget(null);
      renderer.render(fsScene, fsCamera);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      removeEventListener("mousemove", onMove);
      noiseTarget.dispose();
      rtScene.dispose();
      velocitySim.dispose();
      divergenceSim.dispose();
      pressureSim.dispose();
      subtractSim.dispose();
      layers.geometry.dispose();
      layersMat.dispose();
      noiseMat.dispose();
      postMat.dispose();
      gradientNoise.dispose();
      fsQuad.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden />;
}
