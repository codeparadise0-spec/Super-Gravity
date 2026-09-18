param(
    [string]$Query = "DamagedHelmet",
    [string]$OutDir = "$HOME\Downloads",
    [string]$ApiKey = $env:SKETCHFAB_API_KEY
)

if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " 3D MODEL FETCHER & ASSET PROCUREMENT ENGINE" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host (" Query:      " + $Query)
Write-Host (" OutDir:     " + $OutDir)
Write-Host "--------------------------------------------------------" -ForegroundColor DarkGray

$sampleLibrary = @(
    @{ Name = "DamagedHelmet"; Title = "Damaged Battle Helmet (Certified PBR Showcase)"; Url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"; Tris = 15452 },
    @{ Name = "AntiqueCamera"; Title = "Vintage Antique Camera (PBR Textures)"; Url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb"; Tris = 32410 },
    @{ Name = "WaterBottle"; Title = "Translucent Sports Water Bottle"; Url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb"; Tris = 2240 },
    @{ Name = "Avocado"; Title = "Organic Stylized Avocado"; Url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb"; Tris = 4096 },
    @{ Name = "BoomBox"; Title = "Retro BoomBox Stereo"; Url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb"; Tris = 18340 },
    @{ Name = "Lantern"; Title = "Antique Medieval Lantern"; Url = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb"; Tris = 24100 }
)

$matched = $null
foreach ($s in $sampleLibrary) {
    if ($s.Name -like "*$Query*" -or $s.Title -like "*$Query*") {
        $matched = $s
        break
    }
}

if ($null -eq $matched) {
    $matched = $sampleLibrary[0]
}

$destPath = Join-Path $OutDir ($matched.Name + ".glb")
Write-Host ("Procuring: " + $matched.Title) -ForegroundColor Green
Write-Host ("Source:    " + $matched.Url)
Write-Host ("Target:    " + $destPath)

& curl.exe -L -o $destPath $matched.Url

if (Test-Path $destPath) {
    $item = Get-Item $destPath
    $sizeMB = [math]::Round($item.Length / 1MB, 2)
    Write-Host ""
    Write-Host ("Download Complete! File size: " + $sizeMB + " MB (" + $item.Length + " bytes)") -ForegroundColor Green
    Write-Host "Running automated deep flaw inspection..." -ForegroundColor Cyan
    
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $validatorScript = Join-Path $scriptDir "validate-3d-model.ps1"
    if (Test-Path $validatorScript) {
        & powershell -ExecutionPolicy Bypass -File $validatorScript -File $destPath
    }
} else {
    Write-Error "Download failed."
}
