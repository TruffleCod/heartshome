$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $projectRoot 'dist-h5'
$releaseDir = Join-Path $projectRoot 'release'
$packageDir = Join-Path $releaseDir 'heart-home-h5'
$zipPath = Join-Path $releaseDir 'heart-home-h5.zip'

Push-Location $projectRoot
try {
  & npm.cmd run build:h5
  if ($LASTEXITCODE -ne 0) {
    throw "H5 build failed with exit code $LASTEXITCODE."
  }
} finally {
  Pop-Location
}

if (-not (Test-Path (Join-Path $distDir 'index.html'))) {
  throw 'H5 build did not produce index.html.'
}

$serverOnlyFiles = @('_headers', '_redirects', 'robots.txt', 'sitemap.xml')
foreach ($name in $serverOnlyFiles) {
  $target = Join-Path $distDir $name
  if (Test-Path $target) {
    Remove-Item -LiteralPath $target -Force
  }
}

$indexPath = Join-Path $distDir 'index.html'
$indexHtml = Get-Content -LiteralPath $indexPath -Raw -Encoding UTF8
$indexHtml = [regex]::Replace($indexHtml, '(?m)^\s*<meta name="baidu-site-verification"[^>]*>\s*', '')
$indexHtml = [regex]::Replace($indexHtml, '(?m)^\s*<link rel="canonical"[^>]*>\s*', '')
$indexHtml = [regex]::Replace($indexHtml, '(?m)^\s*<meta property="og:url"[^>]*>\s*', '')
$indexHtml = [regex]::Replace($indexHtml, '(?s)\s*<script type="application/ld\+json">.*?</script>', '')
[System.IO.File]::WriteAllText($indexPath, $indexHtml, [System.Text.UTF8Encoding]::new($false))

if ($indexHtml -match '(?:src|href)="/(?!/)') {
  throw 'index.html contains a root-absolute asset URL that is unsafe for an uploaded H5 package.'
}

$packageBytes = (Get-ChildItem -LiteralPath $distDir -Recurse -File | Measure-Object -Property Length -Sum).Sum
$limitBytes = 300MB
if ($packageBytes -gt $limitBytes) {
  throw "H5 package is larger than 300 MB ($packageBytes bytes)."
}

if (-not (Test-Path $releaseDir)) {
  New-Item -ItemType Directory -Path $releaseDir | Out-Null
}
if (Test-Path $packageDir) {
  Remove-Item -LiteralPath $packageDir -Recurse -Force
}
if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

New-Item -ItemType Directory -Path $packageDir | Out-Null
Copy-Item -Path (Join-Path $distDir '*') -Destination $packageDir -Recurse -Force
Compress-Archive -LiteralPath $packageDir -DestinationPath $zipPath -CompressionLevel Optimal

$zipBytes = (Get-Item -LiteralPath $zipPath).Length
Write-Host "H5 package created: $zipPath"
Write-Host ("Uncompressed: {0:N2} MB; ZIP: {1:N2} MB" -f ($packageBytes / 1MB), ($zipBytes / 1MB))
