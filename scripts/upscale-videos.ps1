param(
  [int]$Target = 1920,
  [double]$MaxFactor = 3
)

$ErrorActionPreference = "Stop"
$ffmpeg = (Get-Command ffmpeg).Source
$ffprobe = Join-Path (Split-Path $ffmpeg) "ffprobe.exe"
$root = Get-Location
$backup = Join-Path $root ".tmp-video-originals"
New-Item -ItemType Directory -Force -Path $backup | Out-Null

$videos = @(
  "works/work-v0-1", "works/work-720x900", "works/work-1080-sq", "works/work-540x540", "works/work-v0-6",
  "works/work-1280x720", "works/work-1082x720", "works/work-v0-4", "works/work-v0-5", "works/work-v0-3",
  "works/work-0", "works/work-tatra-v0-6", "works/work-720x954", "works/work-1036x1108", "works/work-1080-2",
  "works/work-480x640", "works/work-480x678", "works/work-540x960", "works/work-v0-2", "works/work-v0",
  "works/work-tatra-v0", "works/work-tatra-v0-2", "works/work-v0-8", "works/work-1148x720", "works/work-v0-7",
  "works/work-1080-sq-2", "works/work-v0-9", "works/work-tatra-v0-1", "works/work-1080-1", "design-open"
)

function Even([double]$v) { $i = [int][Math]::Round($v); if ($i % 2) { $i++ }; return $i }

foreach ($name in $videos) {
  $path = Join-Path $root "public/videos/$name.mp4"
  $base = Split-Path $name -Leaf
  $orig = Join-Path $backup "$base.mp4"
  if (-not (Test-Path $orig)) { Copy-Item $path $orig }

  $dims = (& $ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $orig).Trim().Split(",")
  $w = [int]$dims[0]; $h = [int]$dims[1]
  $factor = [Math]::Min($MaxFactor, $Target / [Math]::Max($w, $h))
  if ($factor -le 1.01) {
    "skip  $base ${w}x${h}"
    continue
  }
  $nw = Even ($w * $factor); $nh = Even ($h * $factor)
  $tmp = Join-Path $backup "$base.up.mp4"

  & $ffmpeg -v error -y -i $orig -an `
    -vf "scale=${nw}:${nh}:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=5:5:0.35:3:3:0.0,format=yuv420p" `
    -c:v libx264 -preset slow -crf 19 -maxrate 7M -bufsize 14M -profile:v high -pix_fmt yuv420p -movflags +faststart $tmp
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed on $base" }
  Move-Item -Force $tmp $path

  $poster = Join-Path $root "public/images/works-posters/$base.jpg"
  if (Test-Path $poster) {
    $origPoster = Join-Path $backup "$base.jpg"
    if (-not (Test-Path $origPoster)) { Copy-Item $poster $origPoster }
    & $ffmpeg -v error -y -i $origPoster `
      -vf "scale=${nw}:${nh}:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=5:5:0.45:3:3:0.0" `
      -q:v 2 $poster
  }

  $kb = [int]((Get-Item $path).Length / 1KB)
  "done  $base ${w}x${h} -> ${nw}x${nh}  ${kb}KB"
}
