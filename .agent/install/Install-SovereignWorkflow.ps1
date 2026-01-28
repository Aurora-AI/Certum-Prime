<# 
.SYNOPSIS
    Instala o Sovereign Workflow em qualquer projeto Next.js/React
    
.DESCRIPTION
    Este script clona e configura o Sovereign Workflow completo incluindo:
    - Agentes AI para automação
    - Biblioteca de efeitos Aurora
    - Skills e documentação
    - Workflows de certificação S-Tier
    
.PARAMETER ProjectPath
    Caminho do projeto onde instalar (padrão: diretório atual)
    
.PARAMETER IncludeLibrary
    Inclui a biblioteca completa de 3200+ arquivos (padrão: false)
    
.PARAMETER Branch
    Branch do repositório (padrão: main)

.EXAMPLE
    .\Install-SovereignWorkflow.ps1
    
.EXAMPLE
    .\Install-SovereignWorkflow.ps1 -ProjectPath "C:\MeuProjeto" -IncludeLibrary
    
.EXAMPLE
    irm https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/main/install.ps1 | iex
#>

param(
    [string]$ProjectPath = (Get-Location),
    [switch]$IncludeLibrary = $false,
    [string]$Branch = "main",
    [switch]$Force = $false
)

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURAÇÃO
# ═══════════════════════════════════════════════════════════════════════════════

$RepoUrl = "https://github.com/Aurora-AI/sovereign-workflow.git"
$TempDir = Join-Path $env:TEMP "sovereign-workflow-$(Get-Random)"
$AgentDir = Join-Path $ProjectPath ".agent"

# ═══════════════════════════════════════════════════════════════════════════════
# FUNÇÕES
# ═══════════════════════════════════════════════════════════════════════════════

function Write-Banner {
    $banner = @"

    ╔═══════════════════════════════════════════════════════════════════════════╗
    ║                                                                           ║
    ║   ███████╗ ██████╗ ██╗   ██╗███████╗██████╗ ███████╗██╗ ██████╗ ███╗   ██╗║
    ║   ██╔════╝██╔═══██╗██║   ██║██╔════╝██╔══██╗██╔════╝██║██╔════╝ ████╗  ██║║
    ║   ███████╗██║   ██║██║   ██║█████╗  ██████╔╝█████╗  ██║██║  ███╗██╔██╗ ██║║
    ║   ╚════██║██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══╝  ██║██║   ██║██║╚██╗██║║
    ║   ███████║╚██████╔╝ ╚████╔╝ ███████╗██║  ██║███████╗██║╚██████╔╝██║ ╚████║║
    ║   ╚══════╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝║
    ║                                                                           ║
    ║                    W O R K F L O W   I N S T A L L E R                    ║
    ║                           Aurora AI © 2026                                ║
    ║                                                                           ║
    ╚═══════════════════════════════════════════════════════════════════════════╝

"@
    Write-Host $banner -ForegroundColor Cyan
}

function Write-Step {
    param([string]$Message, [string]$Status = "INFO")
    
    $color = switch ($Status) {
        "INFO"    { "Cyan" }
        "SUCCESS" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR"   { "Red" }
        default   { "White" }
    }
    
    $icon = switch ($Status) {
        "INFO"    { "○" }
        "SUCCESS" { "✓" }
        "WARNING" { "⚠" }
        "ERROR"   { "✗" }
        default   { "•" }
    }
    
    Write-Host "  [$icon] " -ForegroundColor $color -NoNewline
    Write-Host $Message
}

function Test-GitInstalled {
    try {
        $null = git --version
        return $true
    } catch {
        return $false
    }
}

function Test-ProjectValid {
    param([string]$Path)
    
    # Verifica se é um projeto válido (tem package.json ou é diretório vazio)
    $packageJson = Join-Path $Path "package.json"
    
    if (Test-Path $packageJson) {
        return $true
    }
    
    # Permite instalação em diretório vazio também
    if ((Get-ChildItem $Path -Force | Measure-Object).Count -eq 0) {
        return $true
    }
    
    # Permite se já tem .agent (atualização)
    if (Test-Path (Join-Path $Path ".agent")) {
        return $true
    }
    
    return $false
}

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

Write-Banner

Write-Host "`n  Configuração:" -ForegroundColor Yellow
Write-Host "  • Projeto: $ProjectPath"
Write-Host "  • Biblioteca completa: $IncludeLibrary"
Write-Host "  • Branch: $Branch"
Write-Host ""

# Verificações
Write-Step "Verificando pré-requisitos..."

if (-not (Test-GitInstalled)) {
    Write-Step "Git não encontrado. Instale o Git primeiro." "ERROR"
    exit 1
}
Write-Step "Git encontrado" "SUCCESS"

if (-not (Test-Path $ProjectPath)) {
    Write-Step "Criando diretório do projeto..."
    New-Item -ItemType Directory -Path $ProjectPath -Force | Out-Null
}

if (-not (Test-ProjectValid $ProjectPath)) {
    Write-Step "O diretório não parece ser um projeto válido" "WARNING"
    if (-not $Force) {
        $confirm = Read-Host "  Deseja continuar mesmo assim? (s/N)"
        if ($confirm -ne "s" -and $confirm -ne "S") {
            Write-Step "Instalação cancelada" "ERROR"
            exit 1
        }
    }
}

# Verificar se já existe .agent
if ((Test-Path $AgentDir) -and -not $Force) {
    Write-Step "Pasta .agent já existe" "WARNING"
    $confirm = Read-Host "  Deseja sobrescrever? (s/N)"
    if ($confirm -ne "s" -and $confirm -ne "S") {
        Write-Step "Instalação cancelada" "ERROR"
        exit 1
    }
    Remove-Item $AgentDir -Recurse -Force
}

# Clonar repositório
Write-Step "Clonando Sovereign Workflow..."

try {
    if ($IncludeLibrary) {
        # Clone completo
        git clone --branch $Branch --depth 1 $RepoUrl $TempDir 2>&1 | Out-Null
    } else {
        # Clone sparse (sem biblioteca grande)
        git clone --branch $Branch --depth 1 --filter=blob:none --sparse $RepoUrl $TempDir 2>&1 | Out-Null
        Push-Location $TempDir
        git sparse-checkout set ".agent/agents" ".agent/workflows" ".agent/skills" ".agent/knowledge" ".agent/snippets" ".agent/rules.md" ".agent/CATALOG.md" 2>&1 | Out-Null
        Pop-Location
    }
    Write-Step "Repositório clonado" "SUCCESS"
} catch {
    Write-Step "Erro ao clonar repositório: $_" "ERROR"
    exit 1
}

# Copiar arquivos
Write-Step "Copiando arquivos para o projeto..."

try {
    $sourceAgent = Join-Path $TempDir ".agent"
    
    if (Test-Path $sourceAgent) {
        Copy-Item -Path $sourceAgent -Destination $ProjectPath -Recurse -Force
        Write-Step "Arquivos copiados" "SUCCESS"
    } else {
        Write-Step "Pasta .agent não encontrada no repositório" "ERROR"
        exit 1
    }
} catch {
    Write-Step "Erro ao copiar arquivos: $_" "ERROR"
    exit 1
}

# Limpar temp
Write-Step "Limpando arquivos temporários..."
Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue
Write-Step "Limpeza concluída" "SUCCESS"

# Criar arquivo de configuração local
Write-Step "Criando configuração local..."

$configPath = Join-Path $AgentDir "config.local.yaml"
$configContent = @"
# Sovereign Workflow - Configuração Local
# Gerado em: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

project:
  name: "$(Split-Path $ProjectPath -Leaf)"
  path: "$ProjectPath"
  installed: $(Get-Date -Format "yyyy-MM-dd")

settings:
  auto_qa: true
  auto_deploy: false
  library_included: $($IncludeLibrary.ToString().ToLower())

mcps:
  stitch:
    enabled: false
    # Configure seu token do Google Cloud aqui
    # token: "seu-token"
  
  github:
    enabled: true
    # Configuração automática via git credentials
  
  vercel:
    enabled: false
    # Configure seu token Vercel aqui
    # token: "seu-token"
"@

$configContent | Out-File -FilePath $configPath -Encoding UTF8
Write-Step "Configuração criada" "SUCCESS"

# Resumo
Write-Host "`n" 
Write-Host "  ╔═══════════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "  ║                    INSTALAÇÃO CONCLUÍDA COM SUCESSO                   ║" -ForegroundColor Green
Write-Host "  ╚═══════════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "  Estrutura instalada:" -ForegroundColor Yellow

$structure = @"
  
  $ProjectPath
  └── .agent/
      ├── agents/           # 8 agentes especializados
      ├── workflows/        # Pipelines de automação
      ├── skills/           # 28 skills técnicas
      ├── knowledge/        # Base de conhecimento
      ├── snippets/         # Code snippets
      ├── rules.md          # Regras globais
      ├── CATALOG.md        # Catálogo de recursos
      └── config.local.yaml # Sua configuração

"@
Write-Host $structure -ForegroundColor Cyan

Write-Host "  Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Configure os MCPs em .agent/config.local.yaml"
Write-Host "  2. Abra o projeto no VS Code com Copilot Agent"
Write-Host "  3. Use: @sovereign-workflow-director para iniciar"
Write-Host ""

if (-not $IncludeLibrary) {
    Write-Host "  💡 Dica: Para instalar a biblioteca completa (3200+ arquivos):" -ForegroundColor Magenta
    Write-Host "     .\Install-SovereignWorkflow.ps1 -IncludeLibrary" -ForegroundColor Magenta
    Write-Host ""
}

Write-Host "  Documentação: https://github.com/Aurora-AI/sovereign-workflow" -ForegroundColor Gray
Write-Host "  Suporte: Aurora AI © 2026" -ForegroundColor Gray
Write-Host ""
