param(
  [string]$ExportsDir = "$PSScriptRoot\exports",
  [string]$OutputPath = "$PSScriptRoot\style-ai-app-icon-size-preview.png"
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$canvasW = 1320
$canvasH = 640
$bitmap = New-Object System.Drawing.Bitmap $canvasW, $canvasH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.Clear([System.Drawing.Color]::FromArgb(250, 250, 247))

$titleFont = New-Object System.Drawing.Font "Segoe UI", 28, ([System.Drawing.FontStyle]::Bold)
$labelFont = New-Object System.Drawing.Font "Segoe UI", 16, ([System.Drawing.FontStyle]::Regular)
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(23, 23, 23))
$mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(92, 92, 92))

$graphics.DrawString("Style AI app icon size preview", $titleFont, $brush, 48, 34)
$graphics.DrawString("Color", $labelFont, $mutedBrush, 52, 130)
$graphics.DrawString("Monochrome", $labelFont, $mutedBrush, 52, 390)

$sizes = @(1024, 180, 120, 60, 40, 29, 24)
$display = @{
  1024 = 172
  180 = 132
  120 = 104
  60 = 72
  40 = 56
  29 = 44
  24 = 38
}

function New-RoundedRectPath {
  param(
    [single]$X,
    [single]$Y,
    [single]$W,
    [single]$H,
    [single]$R
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $R * 2
  $path.AddArc($X, $Y, $d, $d, 180, 90)
  $path.AddArc($X + $W - $d, $Y, $d, $d, 270, 90)
  $path.AddArc($X + $W - $d, $Y + $H - $d, $d, $d, 0, 90)
  $path.AddArc($X, $Y + $H - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-MaskedIcon {
  param(
    [System.Drawing.Image]$Image,
    [int]$X,
    [int]$Y,
    [int]$Size
  )

  $state = $graphics.Save()
  $radius = [single]($Size * 0.22)
  $clip = New-RoundedRectPath -X $X -Y $Y -W $Size -H $Size -R $radius
  try {
    $graphics.SetClip($clip)
    $graphics.DrawImage($Image, $X, $Y, $Size, $Size)
  } finally {
    $graphics.Restore($state)
    $clip.Dispose()
  }
}

function Draw-Row {
  param(
    [string]$Prefix,
    [int]$Y
  )
  $x = 54
  foreach ($size in $sizes) {
    $file = Join-Path $ExportsDir "$Prefix-$size.png"
    $img = [System.Drawing.Image]::FromFile($file)
    try {
      $drawSize = [int]$display[$size]
      if ($drawSize -gt $size) {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
      } else {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      }
      Draw-MaskedIcon -Image $img -X $x -Y $Y -Size $drawSize
      $graphics.DrawString("${size}px", $labelFont, $mutedBrush, $x, $Y + $drawSize + 12)
      $x += $drawSize + 56
    } finally {
      $img.Dispose()
    }
  }
}

Draw-Row -Prefix "style-ai-app-icon" -Y 165
Draw-Row -Prefix "style-ai-app-icon-mono" -Y 425

$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$titleFont.Dispose()
$labelFont.Dispose()
$brush.Dispose()
$mutedBrush.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Wrote preview sheet to $OutputPath"
