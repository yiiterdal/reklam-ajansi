# Builds full-screen page-transition backdrops with Real-ESRGAN (x4) from the original,
# un-upscaled sources. Output: public/images/transitions/<name>.jpg at 2880x1800.
param(
  [int]$Width = 2880,
  [int]$Height = 1800
)

$ErrorActionPreference = "Stop"
$root = Get-Location
$ffmpeg = (Get-Command ffmpeg).Source
$esrgan = Join-Path $env:LOCALAPPDATA "realesrgan/realesrgan-ncnn-vulkan.exe"
if (-not (Test-Path $esrgan)) { throw "Real-ESRGAN not found at $esrgan" }

$work = Join-Path $root ".tmp-transitions"
$out = Join-Path $root "public/images/transitions"
New-Item -ItemType Directory -Force $work, $out | Out-Null

# name, source (original, pre-upscale), vertical crop position 0..1, optional pre-trim filter
$items = @(
  @("home", ".tmp-image-originals/about-extras/shot-glass-rings.jpg", 0.5, $null),
  @("about", ".tmp-image-originals/about-extras/shot-neon-portal.jpg", 0.3, $null),
  @("contact", ".tmp-image-originals/about-extras/shot-face-track.jpg", 0.3, $null),
  @("services-studio", ".tmp-image-originals/about-extras/shot-services-studio.jpg", 0.5, $null),
  @("work", ".tmp-video-originals/work-tatra-v0-6.jpg", 0.5, $null),
  @("brands", ".tmp-video-originals/work-tatra-v0.jpg", 0.55, $null),
  @("visuals", ".tmp-image-originals/studio/funky-disco.png", 0.2, $null)
)

$ratio = $Width / $Height
foreach ($it in $items) {
  $name, $src, $pos, $trim = $it
  $srcPath = Join-Path $root $src
  if (-not (Test-Path $srcPath)) { throw "Missing source $src" }

  $crop = Join-Path $work "$name-crop.png"
  $up = Join-Path $work "$name-x4.png"
  $dest = Join-Path $out "$name.jpg"

  # Largest screen-ratio crop; $pos picks the vertical offset for tall sources.
  $cw = "trunc(min(iw\,ih*$ratio)/2)*2"
  $ch = "trunc(min(ih\,iw/$ratio)/2)*2"
  $vf = "crop=${cw}:${ch}:(iw-${cw})/2:(ih-${ch})*$pos"
  if ($trim) { $vf = "$trim,$vf" }
  & $ffmpeg -v error -y -i $srcPath -vf $vf $crop
  if ($LASTEXITCODE -ne 0) { throw "crop failed: $name" }

  # Real-ESRGAN logs progress to stderr; run through cmd so that isn't treated as an error.
  cmd /c "`"$esrgan`" -i `"$crop`" -o `"$up`" -n realesrgan-x4plus >nul 2>&1"
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $up)) { throw "esrgan failed: $name" }

  & $ffmpeg -v error -y -i $up -vf "scale=${Width}:${Height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${Width}:${Height},format=yuvj444p" -q:v 3 $dest
  if ($LASTEXITCODE -ne 0) { throw "encode failed: $name" }

  "done  $name  $([int]((Get-Item $dest).Length / 1KB))KB"
}
