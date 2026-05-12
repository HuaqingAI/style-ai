param(
  [string]$ExportsDir = "$PSScriptRoot\exports",
  [string]$OutputPath = "$PSScriptRoot\style-ai-brand-context-preview.png"
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$canvasW = 1600
$canvasH = 1060
$bitmap = New-Object System.Drawing.Bitmap $canvasW, $canvasH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.Clear([System.Drawing.Color]::FromArgb(247, 247, 244))

$fontTitle = New-Object System.Drawing.Font "Segoe UI", 28, ([System.Drawing.FontStyle]::Bold)
$fontSection = New-Object System.Drawing.Font "Segoe UI", 16, ([System.Drawing.FontStyle]::Bold)
$fontBody = New-Object System.Drawing.Font "Segoe UI", 14, ([System.Drawing.FontStyle]::Regular)
$fontSmall = New-Object System.Drawing.Font "Segoe UI", 11, ([System.Drawing.FontStyle]::Regular)
$fontTiny = New-Object System.Drawing.Font "Segoe UI", 9, ([System.Drawing.FontStyle]::Regular)
$fontWordmark = New-Object System.Drawing.Font "Segoe UI", 30, ([System.Drawing.FontStyle]::Bold)
$fontWordmarkSmall = New-Object System.Drawing.Font "Segoe UI", 17, ([System.Drawing.FontStyle]::Bold)

$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(23, 23, 23))
$muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(92, 92, 92))
$soft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 252))
$panel = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(252, 252, 249))
$linePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(226, 226, 220)), 1
$subtlePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(235, 235, 229)), 1

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

function Fill-RoundedRect {
  param(
    [System.Drawing.Brush]$Brush,
    [single]$X,
    [single]$Y,
    [single]$W,
    [single]$H,
    [single]$R,
    [System.Drawing.Pen]$Pen = $null
  )

  $path = New-RoundedRectPath -X $X -Y $Y -W $W -H $H -R $R
  try {
    $graphics.FillPath($Brush, $path)
    if ($null -ne $Pen) {
      $graphics.DrawPath($Pen, $path)
    }
  } finally {
    $path.Dispose()
  }
}

function Draw-MaskedImage {
  param(
    [System.Drawing.Image]$Image,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [int]$Radius,
    [single]$Opacity = 1.0
  )

  $state = $graphics.Save()
  $clip = New-RoundedRectPath -X $X -Y $Y -W $W -H $H -R $Radius
  try {
    $graphics.SetClip($clip)

    if ($Opacity -lt 1.0) {
      $matrix = New-Object System.Drawing.Imaging.ColorMatrix
      $matrix.Matrix33 = $Opacity
      $attributes = New-Object System.Drawing.Imaging.ImageAttributes
      $attributes.SetColorMatrix($matrix, [System.Drawing.Imaging.ColorMatrixFlag]::Default, [System.Drawing.Imaging.ColorAdjustType]::Bitmap)
      $dest = New-Object System.Drawing.Rectangle $X, $Y, $W, $H
      $graphics.DrawImage($Image, $dest, 0, 0, $Image.Width, $Image.Height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
      $attributes.Dispose()
    } else {
      $graphics.DrawImage($Image, $X, $Y, $W, $H)
    }
  } finally {
    $graphics.Restore($state)
    $clip.Dispose()
  }
}

function Draw-Icon {
  param(
    [int]$X,
    [int]$Y,
    [int]$Size,
    [switch]$Mono,
    [single]$Opacity = 1.0
  )

  $suffix = if ($Mono) { "mono-" } else { "" }
  $file = Join-Path $ExportsDir "style-ai-app-icon-$suffix`1024.png"
  $img = [System.Drawing.Image]::FromFile($file)
  try {
    Draw-MaskedImage -Image $img -X $X -Y $Y -W $Size -H $Size -Radius ([int]($Size * 0.22)) -Opacity $Opacity
  } finally {
    $img.Dispose()
  }
}

function Draw-StatusDots {
  param(
    [int]$X,
    [int]$Y
  )

  $dot = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 80, 80))
  try {
    $graphics.FillEllipse($dot, $X, $Y, 5, 5)
    $graphics.FillEllipse($dot, $X + 9, $Y, 5, 5)
    $graphics.FillEllipse($dot, $X + 18, $Y, 5, 5)
  } finally {
    $dot.Dispose()
  }
}

function Draw-PhoneFrame {
  param(
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [string]$Title
  )

  $shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(18, 0, 0, 0))
  try {
    Fill-RoundedRect -Brush $shadow -X ($X + 8) -Y ($Y + 10) -W $W -H $H -R 34
  } finally {
    $shadow.Dispose()
  }

  Fill-RoundedRect -Brush $soft -X $X -Y $Y -W $W -H $H -R 34 -Pen $linePen
  $graphics.DrawString($Title, $fontSection, $ink, $X, $Y - 30)
}

function Draw-HomeIcon {
  param(
    [int]$X,
    [int]$Y,
    [int]$Size,
    [string]$Label
  )

  $tile = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(236, 236, 232))
  try {
    Fill-RoundedRect -Brush $tile -X $X -Y $Y -W $Size -H $Size -R ([int]($Size * 0.22))
  } finally {
    $tile.Dispose()
  }
  $graphics.DrawString($Label, $fontTiny, $muted, $X - 2, $Y + $Size + 8)
}

$graphics.DrawString("Style AI brand context preview", $fontTitle, $ink, 48, 34)
$graphics.DrawString("Current Reversible S / Future Spark candidate in likely product placements", $fontBody, $muted, 50, 76)

# Phone home screen
Draw-PhoneFrame -X 54 -Y 150 -W 300 -H 610 -Title "Phone home screen"
$homeBg = New-Object System.Drawing.Drawing2D.LinearGradientBrush ([System.Drawing.Rectangle]::new(54, 150, 300, 610)), ([System.Drawing.Color]::FromArgb(240, 239, 235)), ([System.Drawing.Color]::FromArgb(219, 222, 216)), 65
try {
  Fill-RoundedRect -Brush $homeBg -X 55 -Y 151 -W 298 -H 608 -R 32
} finally {
  $homeBg.Dispose()
}
$graphics.DrawString("9:41", $fontSmall, $ink, 78, 178)
Draw-StatusDots -X 303 -Y 184
Draw-Icon -X 92 -Y 236 -Size 74
$graphics.DrawString("Style AI", $fontTiny, $ink, 98, 318)
Draw-HomeIcon -X 194 -Y 236 -Size 74 -Label "Notes"
Draw-HomeIcon -X 92 -Y 360 -Size 74 -Label "Photos"
Draw-HomeIcon -X 194 -Y 360 -Size 74 -Label "Maps"
Draw-HomeIcon -X 92 -Y 484 -Size 74 -Label "Mail"
Draw-HomeIcon -X 194 -Y 484 -Size 74 -Label "Music"

# Launch screen
Draw-PhoneFrame -X 408 -Y 150 -W 300 -H 610 -Title "Launch screen"
Fill-RoundedRect -Brush $panel -X 409 -Y 151 -W 298 -H 608 -R 32
Draw-Icon -X 518 -Y 326 -Size 80
$graphics.DrawString("Style AI", $fontWordmarkSmall, $ink, 519, 430)
$graphics.DrawString("Preview your next look", $fontSmall, $muted, 486, 462)

# Login screen
Draw-PhoneFrame -X 762 -Y 150 -W 300 -H 610 -Title "Login / onboarding"
Fill-RoundedRect -Brush $panel -X 763 -Y 151 -W 298 -H 608 -R 32
Draw-Icon -X 862 -Y 218 -Size 58
$graphics.DrawString("Style AI", $fontWordmarkSmall, $ink, 842, 295)
$graphics.DrawString("Preview style changes", $fontSmall, $muted, 836, 332)
$graphics.DrawString("on your own photo.", $fontSmall, $muted, 848, 354)
$buttonBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(23, 23, 23))
try {
  Fill-RoundedRect -Brush $buttonBrush -X 804 -Y 618 -W 216 -H 48 -R 16
} finally {
  $buttonBrush.Dispose()
}
$buttonText = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(250, 250, 247))
try {
  $graphics.DrawString("Continue", $fontBody, $buttonText, 878, 630)
} finally {
  $buttonText.Dispose()
}

# Home top bar
$graphics.DrawString("Home header", $fontSection, $ink, 1120, 120)
Fill-RoundedRect -Brush $soft -X 1120 -Y 150 -W 410 -H 128 -R 20 -Pen $linePen
Draw-Icon -X 1146 -Y 183 -Size 54
$graphics.DrawString("Style AI", $fontWordmarkSmall, $ink, 1214, 188)
$graphics.DrawString("8 credits", $fontSmall, $muted, 1216, 220)
Fill-RoundedRect -Brush $panel -X 1426 -Y 186 -W 72 -H 36 -R 12 -Pen $subtlePen
$graphics.DrawString("Pro", $fontSmall, $ink, 1449, 194)

# Result page watermark
$graphics.DrawString("Result page watermark", $fontSection, $ink, 1120, 330)
Fill-RoundedRect -Brush $soft -X 1120 -Y 360 -W 410 -H 300 -R 22 -Pen $linePen
$photoBg = New-Object System.Drawing.Drawing2D.LinearGradientBrush ([System.Drawing.Rectangle]::new(1140, 382, 370, 238)), ([System.Drawing.Color]::FromArgb(222, 224, 218)), ([System.Drawing.Color]::FromArgb(189, 196, 191)), 35
try {
  Fill-RoundedRect -Brush $photoBg -X 1140 -Y 382 -W 370 -H 238 -R 18
} finally {
  $photoBg.Dispose()
}
Draw-Icon -X 1162 -Y 404 -Size 42 -Opacity 0.82
$graphics.DrawString("Style AI", $fontSmall, $ink, 1214, 414)
Draw-Icon -X 1388 -Y 500 -Size 86 -Mono -Opacity 0.16

# Small-size decision strip
$graphics.DrawString("Small placement checks", $fontSection, $ink, 54, 835)
Fill-RoundedRect -Brush $soft -X 54 -Y 866 -W 1476 -H 126 -R 20 -Pen $linePen
Draw-Icon -X 94 -Y 900 -Size 64
$graphics.DrawString("64px tab / launcher", $fontSmall, $muted, 174, 920)
Draw-Icon -X 354 -Y 910 -Size 44
$graphics.DrawString("44px header", $fontSmall, $muted, 414, 920)
Draw-Icon -X 598 -Y 918 -Size 29
$graphics.DrawString("29px system list", $fontSmall, $muted, 644, 920)
Draw-Icon -X 830 -Y 921 -Size 24
$graphics.DrawString("24px favicon-ish", $fontSmall, $muted, 870, 920)
Draw-Icon -X 1094 -Y 900 -Size 64 -Mono
$graphics.DrawString("Mono fallback", $fontSmall, $muted, 1174, 920)

$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$fontTitle.Dispose()
$fontSection.Dispose()
$fontBody.Dispose()
$fontSmall.Dispose()
$fontTiny.Dispose()
$fontWordmark.Dispose()
$fontWordmarkSmall.Dispose()
$ink.Dispose()
$muted.Dispose()
$soft.Dispose()
$panel.Dispose()
$linePen.Dispose()
$subtlePen.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Wrote context preview to $OutputPath"
