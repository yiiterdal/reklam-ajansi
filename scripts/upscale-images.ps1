param(
  [int]$Target = 1920,
  [int]$MinLong = 1600,
  [double]$MaxFactor = 2.5
)

$ErrorActionPreference = "Stop"
$ffmpeg = (Get-Command ffmpeg).Source
$ffprobe = Join-Path (Split-Path $ffmpeg) "ffprobe.exe"
$root = Get-Location
$backup = Join-Path $root ".tmp-image-originals"

function Even([double]$v) { $i = [int][Math]::Round($v); if ($i % 2) { $i++ }; return $i }

$folders = @("studio", "works", "about-extras", "brands", ".")
foreach ($folder in $folders) {
  $dest = Join-Path $backup $(if ($folder -eq ".") { "_root" } else { $folder })
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  $files = Get-ChildItem (Join-Path $root "public/images/$folder") -File | Where-Object { $_.Extension -match '^\.(png|jpe?g|webp)$' }
  if ($folder -eq ".") {
    $used = Select-String -Path (Join-Path $root "src/lib/visuals.ts") -Pattern '"/images/([^"/]+)"' -AllMatches |
      ForEach-Object { $_.Matches } | ForEach-Object { $_.Groups[1].Value }
    $files = $files | Where-Object { $used -contains $_.Name }
  }
  $files | ForEach-Object {
    $file = $_
    $orig = Join-Path $dest $file.Name
    if (-not (Test-Path $orig)) { Copy-Item $file.FullName $orig }

    $info = (& $ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,pix_fmt -of csv=p=0 $orig).Trim().Split(",")
    $codec = $info[0]; $w = [int]$info[1]; $h = [int]$info[2]
    if ($codec -eq "png" -and $info[3] -notmatch "a") { $codec = "png-opaque" }
    $long = [Math]::Max($w, $h)
    if ($long -ge $MinLong) { "skip  $folder/$($file.Name) ${w}x${h}"; return }

    $factor = [Math]::Min($MaxFactor, $Target / $long)
    $nw = Even ($w * $factor); $nh = Even ($h * $factor)
    $scale = "scale=${nw}:${nh}:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=5:5:0.4:3:3:0.0"
    $tmp = Join-Path $dest ("up-" + $file.BaseName + ($(if ($codec -eq "png") { ".png" } else { ".jpg" })))

    if ($codec -eq "png") {
      # Keep true PNGs lossless (they may carry transparency).
      & $ffmpeg -v error -y -i $orig -vf $scale -compression_level 9 $tmp
    } else {
      & $ffmpeg -v error -y -i $orig -vf "$scale,format=yuvj444p" -q:v 1 $tmp
    }
    if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed on $($file.Name)" }
    Move-Item -Force $tmp $file.FullName
    "done  $folder/$($file.Name) ${w}x${h} -> ${nw}x${nh}  $([int]((Get-Item $file.FullName).Length/1KB))KB"
  }
}
