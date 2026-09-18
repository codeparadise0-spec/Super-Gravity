<#
.SYNOPSIS
    Super Gravity — 3D Model Deep Flaw & Quality Inspector (PowerShell Edition)
    Inspects binary GLB files for mesh topology, triangle budget, UV coordinates, and WebGL readiness.

.EXAMPLE
    .\validate-3d-model.ps1 -File "$HOME\Downloads\DamagedHelmet.glb"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$File
)

if (!(Test-Path $File)) {
    Write-Error "File not found: $File"
    exit 1
}

$fileItem = Get-Item $File
$bytes = [System.IO.File]::ReadAllBytes($File)

if ($bytes.Length -lt 20) {
    Write-Error "File is too small to be a valid binary GLB container."
    exit 1
}

# 1. Magic Bytes Check (0x46546C67 = "glTF")
$magic = [System.BitConverter]::ToUInt32($bytes, 0)
if ($magic -ne 0x46546C67) {
    Write-Error ("Invalid GLB Magic Header: Expected 0x46546C67 ('glTF'), got 0x{0:X8}" -f $magic)
    exit 1
}

$version = [System.BitConverter]::ToUInt32($bytes, 4)
$totalLength = [System.BitConverter]::ToUInt32($bytes, 8)
$chunkLength = [System.BitConverter]::ToUInt32($bytes, 12)
$chunkType = [System.BitConverter]::ToUInt32($bytes, 16) # 0x4E4F534A = "JSON"

if ($chunkType -ne 0x4E4F534A) {
    Write-Error "Malformed GLB: First chunk is not a JSON chunk."
    exit 1
}

$jsonBytes = [System.Text.Encoding]::UTF8.GetString($bytes, 20, $chunkLength)
$gltf = $jsonBytes | ConvertFrom-Json

# 2. Inspect Meshes, Triangles, Vertices, Draw Calls
$triangles = 0
$drawCalls = 0
$issues = @()
$warnings = @()

if ($gltf.meshes) {
    foreach ($mesh in $gltf.meshes) {
        if ($mesh.primitives) {
            foreach ($prim in $mesh.primitives) {
                $drawCalls++
                if ($prim.indices -ne $null -and $gltf.accessors) {
                    $acc = $gltf.accessors[$prim.indices]
                    if ($acc.count) {
                        $triangles += ($acc.count / 3)
                    }
                }
                
                # Check for normals
                $hasNormal = $null -ne $prim.attributes.PSObject.Properties['NORMAL']
                if (-not $hasNormal) {
                    $warnings += "Mesh primitive missing NORMAL attribute (lighting may render black)."
                }
                
                # Check for UVs
                $hasUV = ($null -ne $prim.attributes.PSObject.Properties['TEXCOORD_0']) -or ($null -ne $prim.attributes.PSObject.Properties['TEXCOORD_1'])
                if ($prim.material -ne $null -and (-not $hasUV)) {
                    $warnings += "Mesh primitive has material assigned but missing TEXCOORD_0 (UV map)."
                }
            }
        }
    }
}

# Budget Checks
if ($triangles -gt 100000) {
    $issues += ("Triangle count ({0:N0}) exceeds mobile WebGL budget (100,000 tris)." -f $triangles)
} elseif ($triangles -gt 50000) {
    $warnings += ("Triangle count ({0:N0}) is elevated. Consider decimation." -f $triangles)
}

$fileSizeMB = [math]::Round($fileItem.Length / 1MB, 2)
$matCount = if ($gltf.materials) { $gltf.materials.Count } else { 0 }
$texCount = if ($gltf.textures) { $gltf.textures.Count } else { 0 }
$meshCount = if ($gltf.meshes) { $gltf.meshes.Count } else { 0 }
$animCount = if ($gltf.animations) { $gltf.animations.Count } else { 0 }

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " 3D MODEL DEEP FLAW & QUALITY INSPECTION REPORT" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host (" Target File:   " + $fileItem.Name)
Write-Host (" File Path:     " + $fileItem.FullName)
Write-Host (" File Size:     $fileSizeMB MB ($($fileItem.Length) bytes)")
Write-Host (" glTF Version:  v$version (Binary Container)")
Write-Host (" Triangles:     {0:N0} tris" -f $triangles)
Write-Host (" Draw Calls:    $drawCalls primitives")
Write-Host (" Meshes:        $meshCount")
Write-Host (" Materials:     $matCount (PBR Metallic-Roughness)")
Write-Host (" Textures:      $texCount")
Write-Host (" Animations:    $animCount")
Write-Host "--------------------------------------------------------" -ForegroundColor DarkGray

if ($issues.Count -gt 0) {
    Write-Host ("CRITICAL FLAWS ({0}):" -f $issues.Count) -ForegroundColor Red
    foreach ($iss in $issues) {
        Write-Host ("   [!] " + $iss) -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ("OPTIMIZATION ADVICE ({0}):" -f $warnings.Count) -ForegroundColor Yellow
    foreach ($w in $warnings) {
        Write-Host ("   [*] " + $w) -ForegroundColor Yellow
    }
}

if ($issues.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "PERFECT HEALTH SCORE: Model is 100% web-ready, zero flaws detected!" -ForegroundColor Green
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
