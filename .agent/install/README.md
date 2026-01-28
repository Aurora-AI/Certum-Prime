# 🚀 Sovereign Workflow - Sistema de Instalação

## Métodos de Instalação

### 1. One-Liner (Recomendado)

Instale em qualquer projeto com um único comando no PowerShell:

```powershell
# Instalação básica (agentes + skills + workflows)
irm https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/main/install.ps1 | iex

# Com biblioteca completa (3200+ arquivos)
$env:INCLUDE_LIBRARY = "true"; irm https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/main/install.ps1 | iex
```

### 2. Download e Execução Local

```powershell
# Baixar o instalador
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/main/Install-SovereignWorkflow.ps1" -OutFile "Install-SovereignWorkflow.ps1"

# Executar
.\Install-SovereignWorkflow.ps1 -ProjectPath "C:\MeuProjeto"

# Com opções
.\Install-SovereignWorkflow.ps1 -ProjectPath "C:\MeuProjeto" -IncludeLibrary -Force
```

### 3. Git Clone Manual

```powershell
# Clone o repositório
git clone https://github.com/Aurora-AI/sovereign-workflow.git

# Copie a pasta .agent para seu projeto
Copy-Item -Path "sovereign-workflow\.agent" -Destination "C:\MeuProjeto" -Recurse
```

### 4. Git Submodule (Para versionamento)

```powershell
# Adicione como submodule
cd "C:\MeuProjeto"
git submodule add https://github.com/Aurora-AI/sovereign-workflow.git .sovereign

# Crie symlink para .agent
New-Item -ItemType SymbolicLink -Path ".agent" -Target ".sovereign\.agent"
```

---

## Parâmetros do Instalador

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `-ProjectPath` | String | Diretório atual | Caminho do projeto destino |
| `-IncludeLibrary` | Switch | false | Inclui biblioteca completa (3200+ arquivos) |
| `-Branch` | String | main | Branch do repositório |
| `-Force` | Switch | false | Sobrescreve sem confirmação |

---

## Estrutura Instalada

```
seu-projeto/
└── .agent/
    ├── agents/                    # 8 Agentes Especializados
    │   ├── sovereign-workflow-director.md
    │   ├── neurofront-architect.md
    │   ├── motion-designer-lead.md
    │   ├── elysian-architect.md
    │   ├── senior-art-director.md
    │   ├── copywriter-certum-elite.md
    │   ├── saas-conductor.md
    │   └── site-construction-documenter.md
    │
    ├── workflows/                 # Pipelines de Automação
    │   ├── AUTONOMOUS-PIPELINE.md
    │   ├── sovereign-awwwards-director.md
    │   ├── aurora-gold-pipeline.md
    │   └── ...
    │
    ├── skills/                    # 28 Skills Técnicas
    │   ├── gsap-animation-master/
    │   ├── threejs-senior-engineer/
    │   ├── stitch_mcp/
    │   ├── github/
    │   ├── vercel/
    │   └── ...
    │
    ├── biblioteca/               # (Opcional) 3200+ Arquivos
    │   ├── Claude/
    │   │   └── Biblioteca de efeitos/
    │   ├── Documentação de bibliotecas/
    │   └── ...
    │
    ├── knowledge/                # Base de Conhecimento
    ├── snippets/                 # Code Snippets
    ├── rules.md                  # Regras Globais
    ├── CATALOG.md               # Catálogo de Recursos
    └── config.local.yaml        # Configuração Local
```

---

## Configuração Pós-Instalação

### 1. Configurar MCPs

Edite `.agent/config.local.yaml`:

```yaml
mcps:
  stitch:
    enabled: true
    token: "seu-token-google-cloud"
  
  github:
    enabled: true
    # Usa credenciais do git local
  
  vercel:
    enabled: true
    token: "seu-token-vercel"
```

### 2. Configurar MCP Servers no VS Code

No VS Code com Copilot Agent, adicione os MCP servers:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "powershell",
      "args": ["-File", "scripts/mcp/start_stitch.ps1"]
    }
  }
}
```

### 3. Verificar Instalação

```powershell
# Liste os agentes instalados
Get-ChildItem ".agent\agents" -Name

# Liste os workflows
Get-ChildItem ".agent\workflows" -Name

# Verifique as skills
Get-ChildItem ".agent\skills" -Directory -Name
```

---

## Uso Rápido

Após instalação, no VS Code com Copilot Agent:

```
# Iniciar auditoria do projeto
@sovereign-workflow-director FULL-AUDIT

# Verificar gates de qualidade
@sovereign-workflow-director CHECK-GATE GATE_2_PRIMITIVOS

# Iniciar pipeline autônomo
@sovereign-workflow-director START-AUTONOMOUS-PIPELINE --briefing="briefing.yaml"
```

---

## Atualização

Para atualizar uma instalação existente:

```powershell
# Re-executar o instalador com -Force
.\Install-SovereignWorkflow.ps1 -Force

# Ou via one-liner
$env:FORCE = "true"; irm https://raw.githubusercontent.com/Aurora-AI/sovereign-workflow/main/install.ps1 | iex
```

---

## Desinstalação

```powershell
# Remover a pasta .agent
Remove-Item ".agent" -Recurse -Force

# Se usou submodule
git submodule deinit .sovereign
git rm .sovereign
Remove-Item ".agent"
```

---

## Requisitos

- **Git** instalado e configurado
- **PowerShell** 5.1+ ou PowerShell Core 7+
- **VS Code** com extensão GitHub Copilot Agent
- **Node.js** 18+ (para projetos Next.js)

---

## Troubleshooting

### Erro: "Execution Policy"

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro: "Git não encontrado"

Instale o Git: https://git-scm.com/download/win

### Erro: "Permissão negada"

Execute o PowerShell como Administrador ou use:
```powershell
.\Install-SovereignWorkflow.ps1 -Force
```

---

## Links

- **Repositório:** https://github.com/Aurora-AI/sovereign-workflow
- **Documentação:** https://github.com/Aurora-AI/sovereign-workflow/wiki
- **Issues:** https://github.com/Aurora-AI/sovereign-workflow/issues

---

**Aurora AI © 2026 | Sovereign Workflow v3.0**
