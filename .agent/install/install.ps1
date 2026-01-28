# One-liner installer for Sovereign Workflow
# Usage: irm https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

# Configuração via variáveis de ambiente
$ProjectPath = if ($env:PROJECT_PATH) { $env:PROJECT_PATH } else { Get-Location }
$IncludeLibrary = $env:INCLUDE_LIBRARY -eq "true"
$Force = $env:FORCE -eq "true"
$Branch = if ($env:BRANCH) { $env:BRANCH } else { "main" }

# Download e execução do instalador completo
$installerUrl = "https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/$Branch/.agent/install/Install-SovereignWorkflow.ps1"
$tempInstaller = Join-Path $env:TEMP "Install-SovereignWorkflow-$(Get-Random).ps1"

try {
    Write-Host "`n  Baixando Sovereign Workflow Installer..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $installerUrl -OutFile $tempInstaller -UseBasicParsing
    
    # Construir argumentos
    $args = @("-ProjectPath", $ProjectPath)
    if ($IncludeLibrary) { $args += "-IncludeLibrary" }
    if ($Force) { $args += "-Force" }
    $args += @("-Branch", $Branch)
    
    # Executar
    & $tempInstaller @args
    
} finally {
    # Limpar
    if (Test-Path $tempInstaller) {
        Remove-Item $tempInstaller -Force -ErrorAction SilentlyContinue
    }
}
