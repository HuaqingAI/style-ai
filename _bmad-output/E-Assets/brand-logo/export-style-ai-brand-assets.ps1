param(
  [string]$OutputDir = "$PSScriptRoot\exports",
  [string]$ProductionAssetDir = $null
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

function Get-PathDataByFill {
  param(
    [string]$Fill
  )

  $svgPath = Join-Path $PSScriptRoot "style-ai-reversible-s-app-icon.svg"
  $svg = Get-Content -Raw -Encoding UTF8 $svgPath
  $fillPattern = [regex]::Escape($Fill)
  $matches = [regex]::Matches($svg, '<path\s+d="([^"]+)"\s+fill="' + $fillPattern + '"')

  if ($matches.Count -eq 0) {
    throw "Could not find paths with fill '$Fill' in $svgPath"
  }

  return @($matches | ForEach-Object { $_.Groups[1].Value })
}

function Read-PathNumber {
  param(
    [string[]]$Tokens,
    [ref]$Index
  )

  if ($Index.Value -ge $Tokens.Count -or $Tokens[$Index.Value] -match '^[A-Za-z]$') {
    throw "Expected a number while parsing SVG path, found '$($Tokens[$Index.Value])'."
  }

  $value = [single]::Parse($Tokens[$Index.Value], [System.Globalization.CultureInfo]::InvariantCulture)
  $Index.Value += 1
  return $value
}

function Add-SvgPathData {
  param(
    [System.Drawing.Drawing2D.GraphicsPath]$Path,
    [string]$Data
  )

  $tokens = @([regex]::Matches($Data, '[A-Za-z]|[-+]?(?:\d*\.)?\d+(?:[eE][-+]?\d+)?') | ForEach-Object { $_.Value })
  $i = 0
  $current = [System.Drawing.PointF]::new(0, 0)
  $start = [System.Drawing.PointF]::new(0, 0)
  $figureOpen = $false

  while ($i -lt $tokens.Count) {
    $command = $tokens[$i]
    $i += 1

    switch ($command) {
      "M" {
        if ($figureOpen) {
          $Path.CloseFigure()
        }

        $indexRef = [ref]$i
        $x = Read-PathNumber -Tokens $tokens -Index $indexRef
        $y = Read-PathNumber -Tokens $tokens -Index $indexRef
        $i = $indexRef.Value

        $Path.StartFigure()
        $current = [System.Drawing.PointF]::new($x, $y)
        $start = $current
        $figureOpen = $true
      }

      "C" {
        while ($i -lt $tokens.Count -and $tokens[$i] -notmatch '^[A-Za-z]$') {
          $indexRef = [ref]$i
          $x1 = Read-PathNumber -Tokens $tokens -Index $indexRef
          $y1 = Read-PathNumber -Tokens $tokens -Index $indexRef
          $x2 = Read-PathNumber -Tokens $tokens -Index $indexRef
          $y2 = Read-PathNumber -Tokens $tokens -Index $indexRef
          $x = Read-PathNumber -Tokens $tokens -Index $indexRef
          $y = Read-PathNumber -Tokens $tokens -Index $indexRef
          $i = $indexRef.Value

          $Path.AddBezier($current.X, $current.Y, $x1, $y1, $x2, $y2, $x, $y)
          $current = [System.Drawing.PointF]::new($x, $y)
        }
      }

      "Z" {
        if ($figureOpen) {
          $Path.CloseFigure()
          $current = $start
          $figureOpen = $false
        }
      }

      default {
        throw "Unsupported SVG path command '$command'."
      }
    }
  }

  if ($figureOpen) {
    $Path.CloseFigure()
  }
}

function New-IconBitmap {
  param(
    [int]$Size,
    [string]$Path,
    [string[]]$GlyphPathData,
    [string]$SparkPathData,
    [single]$ContentScale = 1.0,
    [switch]$TransparentBackground,
    [switch]$Mono
  )

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  if ($TransparentBackground) {
    $graphics.Clear([System.Drawing.Color]::Transparent)
  } else {
    $graphics.Clear([System.Drawing.Color]::FromArgb(17, 17, 17))
  }

  $scale = ($Size / 1024.0) * $ContentScale
  $offset = ($Size - (1024 * $scale)) / 2.0
  $matrix = [System.Drawing.Drawing2D.Matrix]::new([single]$scale, 0, 0, [single]$scale, [single]$offset, [single]$offset)
  $graphics.Transform = $matrix

  $white = [System.Drawing.Color]::FromArgb(250, 250, 247)
  $brushWhite = New-Object System.Drawing.SolidBrush $white

  $glyphPaths = @()
  foreach ($pathData in $GlyphPathData) {
    $glyph = New-Object System.Drawing.Drawing2D.GraphicsPath
    $glyph.FillMode = [System.Drawing.Drawing2D.FillMode]::Winding
    Add-SvgPathData -Path $glyph -Data $pathData
    $graphics.FillPath($brushWhite, $glyph)
    $glyphPaths += $glyph
  }

  $spark = New-Object System.Drawing.Drawing2D.GraphicsPath
  $spark.FillMode = [System.Drawing.Drawing2D.FillMode]::Winding
  Add-SvgPathData -Path $spark -Data $SparkPathData
  if ($Mono) {
    $graphics.FillPath($brushWhite, $spark)
  } else {
    $sparkRect = New-Object System.Drawing.RectangleF 420, 346, 154, 240
    $sparkBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $sparkRect, ([System.Drawing.Color]::FromArgb(169, 135, 255)), ([System.Drawing.Color]::FromArgb(139, 92, 255)), 45
    $blend = New-Object System.Drawing.Drawing2D.ColorBlend 3
    $blend.Positions = @(0.0, 0.52, 1.0)
    $blend.Colors = @(
      [System.Drawing.Color]::FromArgb(169, 135, 255),
      [System.Drawing.Color]::FromArgb(103, 55, 255),
      [System.Drawing.Color]::FromArgb(139, 92, 255)
    )
    $sparkBrush.InterpolationColors = $blend
    $graphics.FillPath($sparkBrush, $spark)
    $sparkBrush.Dispose()
  }

  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $spark.Dispose()
  foreach ($glyph in $glyphPaths) {
    $glyph.Dispose()
  }
  $brushWhite.Dispose()
  $matrix.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

$glyphPathData = Get-PathDataByFill -Fill "#FAFAF7"
$sparkPaths = @(Get-PathDataByFill -Fill "url(#sparkGradient)")
$sparkPathData = $sparkPaths[0]
$sizes = @(1024, 180, 120, 60, 40, 29, 24)
foreach ($size in $sizes) {
  New-IconBitmap -Size $size -Path (Join-Path $OutputDir "style-ai-app-icon-$size.png") -GlyphPathData $glyphPathData -SparkPathData $sparkPathData
  New-IconBitmap -Size $size -Path (Join-Path $OutputDir "style-ai-app-icon-mono-$size.png") -GlyphPathData $glyphPathData -SparkPathData $sparkPathData -Mono
}

Write-Output "Exported Style AI brand assets to $OutputDir"

if ($ProductionAssetDir) {
  New-Item -ItemType Directory -Force -Path $ProductionAssetDir | Out-Null

  New-IconBitmap -Size 1024 -Path (Join-Path $ProductionAssetDir "icon.png") -GlyphPathData $glyphPathData -SparkPathData $sparkPathData
  New-IconBitmap -Size 1024 -Path (Join-Path $ProductionAssetDir "adaptive-icon.png") -GlyphPathData $glyphPathData -SparkPathData $sparkPathData -TransparentBackground -ContentScale 0.78
  New-IconBitmap -Size 1024 -Path (Join-Path $ProductionAssetDir "splash-icon.png") -GlyphPathData $glyphPathData -SparkPathData $sparkPathData -TransparentBackground -ContentScale 0.58
  New-IconBitmap -Size 48 -Path (Join-Path $ProductionAssetDir "favicon.png") -GlyphPathData $glyphPathData -SparkPathData $sparkPathData

  Write-Output "Exported Expo production assets to $ProductionAssetDir"
}
