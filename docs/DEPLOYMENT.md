# 🚀 Deploy Automático - Google Cloud Run

Este documento descreve como configurar o deploy automático do Certum Prime para Google Cloud Run usando GitHub Actions.

## 📋 Visão Geral

O workflow de deploy automático foi configurado no arquivo `.github/workflows/deploy-cloud-run.yml` e será executado automaticamente sempre que houver um push para a branch `main`.

## ⚙️ Configuração Necessária

Para que o workflow funcione, você precisa configurar **2 secrets** no repositório GitHub:

### 1. Acesse as Configurações de Secrets

Acesse: **https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions**

### 2. Adicione os Secrets

#### Secret 1: `GCP_PROJECT_ID`

| Campo | Valor |
|-------|-------|
| **Nome** | `GCP_PROJECT_ID` |
| **Descrição** | ID do projeto no Google Cloud Platform |
| **Exemplo** | `aurora-prime-450022` |

**Como obter:**
```bash
# Listar projetos disponíveis
gcloud projects list

# Ou verificar o projeto atual
gcloud config get-value project
```

#### Secret 2: `GCP_SA_KEY`

| Campo | Valor |
|-------|-------|
| **Nome** | `GCP_SA_KEY` |
| **Descrição** | JSON da Service Account com permissões de Cloud Run |
| **Formato** | JSON completo (incluindo as chaves `{}`) |

**Como obter:**

1. **Criar Service Account:**
```bash
# Criar a service account
gcloud iam service-accounts create github-actions-deploy \
  --display-name="GitHub Actions Deploy" \
  --description="Service account para deploy via GitHub Actions"
```

2. **Conceder Permissões Necessárias:**
```bash
# Obter o PROJECT_ID
PROJECT_ID=$(gcloud config get-value project)

# Permissão para Cloud Run
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Permissão para Service Account User (necessário para Cloud Run)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Permissão para Artifact Registry (para push de imagens Docker)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

# Permissão para Storage (para logs e artefatos)
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/storage.admin"
```

3. **Criar e Baixar a Chave JSON:**
```bash
# Criar a chave
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com

# Exibir o conteúdo (copie TODO o conteúdo para o secret)
cat key.json

# IMPORTANTE: Após copiar, delete o arquivo localmente por segurança
rm key.json
```

O conteúdo do arquivo JSON será algo como:
```json
{
  "type": "service_account",
  "project_id": "aurora-prime-450022",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "github-actions-deploy@aurora-prime-450022.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Copie TODO o conteúdo JSON** e adicione como o valor do secret `GCP_SA_KEY`.

### 3. Adicionar Secrets no GitHub

1. Vá para: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Para cada secret:
   - Digite o **Nome** exatamente como indicado (`GCP_PROJECT_ID` ou `GCP_SA_KEY`)
   - Cole o **Valor**
   - Clique em **"Add secret"**

## 🔧 Configuração do Workflow

O workflow está configurado para:

- **Trigger:** Push para branch `main` ou execução manual
- **Região:** `southamerica-east1` (São Paulo)
- **Nome do Serviço:** `certum-prime`
- **Porta:** `8080`
- **Recursos:** 512Mi RAM, 1 CPU
- **Escala:** 0-10 instâncias
- **Acesso:** Público (sem autenticação)

### Modificar Configurações

Para alterar as configurações, edite o arquivo `.github/workflows/deploy-cloud-run.yml`:

```yaml
env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: southamerica-east1        # Altere a região aqui
  SERVICE_NAME: certum-prime         # Altere o nome do serviço aqui
  IMAGE_NAME: certum-prime           # Altere o nome da imagem aqui
```

Para alterar recursos do Cloud Run, modifique o step "Deploy to Cloud Run":

```yaml
- name: Deploy to Cloud Run
  run: |
    gcloud run deploy ${{ env.SERVICE_NAME }} \
      --image=${{ env.IMAGE_URI }} \
      --region=${{ env.REGION }} \
      --platform=managed \
      --allow-unauthenticated \      # Remove para tornar privado
      --port=8080 \                  # Altere a porta se necessário
      --memory=512Mi \               # Altere a memória
      --cpu=1 \                      # Altere o CPU
      --min-instances=0 \            # Altere instâncias mínimas
      --max-instances=10             # Altere instâncias máximas
```

## 📦 Pré-requisitos no Google Cloud

Antes do primeiro deploy, certifique-se de que:

1. **Projeto GCP existe e está ativo**
2. **APIs estão habilitadas:**
```bash
# Habilitar Cloud Run API
gcloud services enable run.googleapis.com

# Habilitar Artifact Registry API
gcloud services enable artifactregistry.googleapis.com

# Habilitar Cloud Build API (para builds de container)
gcloud services enable cloudbuild.googleapis.com
```

## 🚀 Como Funciona o Deploy

1. **Trigger:** Push para `main` ou execução manual via GitHub Actions
2. **Checkout:** Código é baixado do repositório
3. **Autenticação:** Usa `GCP_SA_KEY` para autenticar no GCP
4. **Docker:** Configura autenticação para Artifact Registry
5. **Artifact Registry:** Cria repositório se não existir
6. **Build & Push:** Cria imagem Docker e envia para Artifact Registry
7. **Deploy:** Faz deploy da imagem no Cloud Run
8. **URL:** Exibe a URL pública do serviço

## 🔍 Verificar Deploy

### Via GitHub Actions

1. Vá para: https://github.com/Aurora-AI/Certum-Prime/actions
2. Veja o workflow "Deploy to Cloud Run"
3. Clique no último run para ver logs detalhados

### Via gcloud CLI

```bash
# Listar serviços
gcloud run services list --region=southamerica-east1

# Descrever serviço
gcloud run services describe certum-prime --region=southamerica-east1

# Ver URL do serviço
gcloud run services describe certum-prime \
  --region=southamerica-east1 \
  --format='value(status.url)'
```

## 🐛 Troubleshooting

### Erro: "Permission Denied"

Verifique se a Service Account tem todas as permissões necessárias (execute novamente os comandos da seção "Conceder Permissões").

### Erro: "API not enabled"

Habilite as APIs necessárias:
```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

### Erro: "Invalid credentials"

Verifique se o JSON da service account foi copiado completamente, incluindo as chaves `{` e `}`.

### Erro: "Image not found"

O workflow cria automaticamente o Artifact Registry. Se o erro persistir, crie manualmente:
```bash
gcloud artifacts repositories create certum-prime \
  --repository-format=docker \
  --location=southamerica-east1 \
  --description="Certum Prime Docker images"
```

## 🔒 Segurança

- ✅ **Secrets nunca são expostos** nos logs do GitHub Actions
- ✅ **Service Account** tem permissões mínimas necessárias
- ✅ **Chaves JSON** não devem ser commitadas no repositório
- ✅ **Rotação de chaves** recomendada a cada 90 dias

## 📊 Custos Estimados

Cloud Run usa pricing baseado em uso:

- **Requests:** Gratuito até 2 milhões/mês
- **CPU/Memory:** Cobrança por segundo de uso
- **Escala para zero:** Sem custos quando não há tráfego

Mais informações: https://cloud.google.com/run/pricing

## 🎯 Próximos Passos

Após configurar os secrets:

1. ✅ Faça um push para `main` ou execute o workflow manualmente
2. ✅ Acompanhe o deploy em: https://github.com/Aurora-AI/Certum-Prime/actions
3. ✅ Acesse a URL do Cloud Run quando o deploy completar
4. ✅ Configure domínio customizado no Cloud Run (opcional)

## 📚 Recursos

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/best-practices-service-accounts)
