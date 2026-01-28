# 📦 Cloud Run Deployment - Setup Summary

## ✅ O Que Foi Configurado

Este PR adiciona deploy automático para Google Cloud Run ao projeto Certum Prime.

### Arquivos Adicionados/Modificados

#### 1. GitHub Actions Workflow
- **Arquivo**: `.github/workflows/deploy-cloud-run.yml`
- **Status**: ✅ Já existe e está validado
- **Função**: Deploy automático para Cloud Run

**Características:**
- ✅ Trigger automático em push para `main`
- ✅ Trigger manual via workflow_dispatch
- ✅ Usa multi-stage Docker build
- ✅ Deploy para região South America East 1 (São Paulo)
- ✅ Configurado para porta 8080
- ✅ Scale to zero (min instances: 0)
- ✅ Auto-scaling até 10 instâncias

#### 2. Dockerfile
- **Arquivo**: `Dockerfile`
- **Status**: ✅ Já existe e está validado
- **Função**: Build da aplicação em container

**Características:**
- ✅ Multi-stage build (otimizado)
- ✅ Stage 1: Build com Node.js 22-alpine
- ✅ Stage 2: Produção com Nginx Alpine
- ✅ Porta 8080 (padrão Cloud Run)
- ✅ Assets otimizados

#### 3. Nginx Configuration
- **Arquivo**: `nginx.conf`
- **Status**: ✅ Já existe e está validado
- **Função**: Servidor web em produção

**Características:**
- ✅ Porta 8080
- ✅ Gzip compression habilitado
- ✅ Cache de assets estáticos (1 ano)
- ✅ SPA fallback (todas rotas → index.html)
- ✅ Security headers configurados

#### 4. Documentação
- **Novo**: `docs/CLOUD_RUN_DEPLOYMENT.md` - Guia completo (8.4 KB)
- **Novo**: `docs/QUICK_START_DEPLOYMENT.md` - Quick start (4.4 KB)
- **Modificado**: `README.md` - Seção de deployment adicionada

#### 5. Cloud Ignore
- **Arquivo**: `.gcloudignore`
- **Status**: ✅ Já existe
- **Função**: Ignora arquivos desnecessários no deploy

---

## 🔑 Secrets Necessários

Para que o workflow funcione, adicione estes secrets no GitHub:

### Configuração dos Secrets

**URL**: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `GCP_PROJECT_ID` | ID do projeto GCP | `aurora-prime-450022` |
| `GCP_SA_KEY` | JSON da Service Account | `{ "type": "service_account", ... }` |

---

## 📋 Checklist de Configuração

### Google Cloud Platform
- [ ] Projeto GCP criado
- [ ] APIs habilitadas:
  - [ ] Cloud Run API
  - [ ] Artifact Registry API  
  - [ ] Cloud Build API
  - [ ] Container Registry API
- [ ] Service Account criada com permissões:
  - [ ] Cloud Run Admin
  - [ ] Service Account User
  - [ ] Artifact Registry Administrator
  - [ ] Storage Admin
- [ ] Chave JSON gerada

### GitHub
- [ ] Secret `GCP_PROJECT_ID` adicionado
- [ ] Secret `GCP_SA_KEY` adicionado (JSON completo)

### Testes
- [ ] Workflow executado manualmente
- [ ] Deploy bem-sucedido
- [ ] Aplicação acessível na URL do Cloud Run

---

## 🚀 Como Usar

### Opção 1: Deploy Automático
Faça push para a branch `main`:
```bash
git push origin main
```

### Opção 2: Deploy Manual
1. Vá para: https://github.com/Aurora-AI/Certum-Prime/actions
2. Clique em "Deploy to Cloud Run"
3. Clique em "Run workflow"

---

## 📊 Fluxo de Deploy

```
┌─────────────────────────────────────────────────────────┐
│                  GitHub Actions Workflow                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Checkout código                                     │
│  2. Autenticar no GCP (usando GCP_SA_KEY)              │
│  3. Configurar Cloud SDK                                │
│  4. Configurar Docker para Artifact Registry            │
│  5. Criar Artifact Registry (se não existir)            │
│  6. Build da imagem Docker                              │
│     ├─ Stage 1: npm install + npm run build             │
│     └─ Stage 2: nginx + assets otimizados               │
│  7. Push da imagem para Artifact Registry               │
│  8. Deploy no Cloud Run                                 │
│     ├─ Região: southamerica-east1                       │
│     ├─ Serviço: certum-prime                           │
│     ├─ Porta: 8080                                      │
│     ├─ Memória: 512Mi                                   │
│     ├─ CPU: 1                                           │
│     └─ Scale: 0-10 instâncias                           │
│  9. Obter URL do serviço                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Validações Realizadas

### ✅ Workflow YAML
- Sintaxe YAML válida
- Secrets referenciados corretamente
- 8 steps configurados
- Triggers configurados (push + manual)

### ✅ Dockerfile
- Multi-stage build correto
- Node.js 22-alpine para build
- Nginx alpine para produção
- Porta 8080 exposta
- Configuração nginx copiada

### ✅ Nginx Config
- Porta 8080 configurada
- Gzip habilitado
- Cache de assets configurado
- SPA fallback implementado
- Security headers adicionados

---

## 📖 Documentação

Para instruções detalhadas, consulte:

- **[Guia Completo](CLOUD_RUN_DEPLOYMENT.md)** - Documentação completa com troubleshooting
- **[Quick Start](QUICK_START_DEPLOYMENT.md)** - Setup em 10 minutos
- **[README Principal](../README.md)** - Visão geral do projeto

---

## 🎯 Próximos Passos

Após adicionar os secrets:

1. ✅ Testar deploy manual via Actions
2. ✅ Verificar URL do serviço
3. ✅ Testar aplicação em produção
4. ⚙️ Configurar domínio customizado (opcional)
5. ⚙️ Configurar monitoramento (opcional)
6. ⚙️ Configurar alertas (opcional)

---

## 💡 Dicas

- O workflow cria o Artifact Registry automaticamente se não existir
- Deploy para `main` é automático, outras branches precisam de trigger manual
- Logs podem ser visualizados no GitHub Actions e no Cloud Console
- Cloud Run faz scale to zero (custo zero quando sem uso)
- Primeira requisição após idle pode ter cold start (~2-3 segundos)

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Permission denied | Verificar roles da service account |
| API not enabled | Executar `gcloud services enable` |
| Build falha | Testar `npm run build` localmente |
| Push falha | Verificar permissões no Artifact Registry |
| Deploy falha | Verificar logs no GitHub Actions |

---

## 📞 Suporte

- **Guia Completo**: [CLOUD_RUN_DEPLOYMENT.md](CLOUD_RUN_DEPLOYMENT.md)
- **Issues**: https://github.com/Aurora-AI/Certum-Prime/issues
- **Actions**: https://github.com/Aurora-AI/Certum-Prime/actions

---

**✅ Setup completo e validado! Basta adicionar os secrets para começar.**

**Aurora AI © 2026** | Automated Cloud Run Deployment
