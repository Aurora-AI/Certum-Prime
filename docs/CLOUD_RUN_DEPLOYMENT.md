# 🚀 Google Cloud Run Deployment Guide

Este documento fornece instruções completas para configurar o deploy automático do Certum Prime no Google Cloud Run usando GitHub Actions.

## 📋 Visão Geral

O projeto está configurado com um workflow automático de CI/CD que realiza deploy para o Google Cloud Run sempre que houver push na branch `main` ou através de trigger manual.

### Workflow Configurado
- **Arquivo**: `.github/workflows/deploy-cloud-run.yml`
- **Triggers**: 
  - Push para branch `main`
  - Execução manual via `workflow_dispatch`
- **Região**: South America East 1 (São Paulo)
- **Service Name**: `certum-prime`

## 🔑 Configuração de Secrets

Para que o workflow funcione, você precisa adicionar 2 secrets no repositório GitHub:

### 1. Acessar Configuração de Secrets

Acesse: **https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions**

Ou navegue manualmente:
1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Secrets and variables** → **Actions**
4. Clique em **New repository secret**

### 2. Adicionar Secret: GCP_PROJECT_ID

- **Nome**: `GCP_PROJECT_ID`
- **Valor**: ID do seu projeto no Google Cloud Platform
- **Exemplo**: `aurora-prime-450022`

Para encontrar o ID do projeto:
```bash
gcloud projects list
```

### 3. Adicionar Secret: GCP_SA_KEY

- **Nome**: `GCP_SA_KEY`
- **Valor**: JSON completo da Service Account com permissões necessárias

#### Como criar a Service Account:

1. **Acesse o Console do GCP**:
   ```
   https://console.cloud.google.com/iam-admin/serviceaccounts
   ```

2. **Crie uma nova Service Account**:
   - Nome: `github-actions-deployer`
   - ID: `github-actions-deployer`

3. **Adicione as seguintes permissões (Roles)**:
   - `Cloud Run Admin` - Para gerenciar serviços Cloud Run
   - `Service Account User` - Para usar a service account
   - `Storage Admin` - Para fazer push de imagens Docker
   - `Artifact Registry Administrator` - Para gerenciar repositórios de artefatos

4. **Crie e baixe a chave JSON**:
   - Clique na Service Account criada
   - Vá para a aba **Keys**
   - Clique em **Add Key** → **Create new key**
   - Escolha **JSON**
   - Salve o arquivo

5. **Copie o conteúdo do arquivo JSON**:
   ```bash
   cat ~/Downloads/seu-projeto-xxxxx.json
   ```

6. **Cole o JSON completo no secret** `GCP_SA_KEY`

## 🛠️ Pré-requisitos no Google Cloud

### 1. Habilitar APIs Necessárias

Execute no Cloud Shell ou localmente (com gcloud configurado):

```bash
# Definir projeto
gcloud config set project SEU_PROJECT_ID

# Habilitar APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Criar Artifact Registry (Opcional - Criado Automaticamente)

O workflow cria automaticamente o repositório se não existir, mas você pode criá-lo manualmente:

```bash
gcloud artifacts repositories create certum-prime \
  --repository-format=docker \
  --location=southamerica-east1 \
  --description="Certum Prime Docker images"
```

## 🚀 Como Funciona o Workflow

### Passos Executados

1. **Checkout do código**: Baixa o código do repositório
2. **Autenticação no GCP**: Usa a service account para autenticar
3. **Configuração do Cloud SDK**: Prepara ferramentas do GCP
4. **Configuração do Docker**: Configura autenticação para Artifact Registry
5. **Criação do Artifact Registry**: Cria o repositório se não existir
6. **Build da imagem Docker**: Constrói a imagem usando o Dockerfile
7. **Push da imagem**: Envia imagem para Artifact Registry
8. **Deploy no Cloud Run**: Implanta a aplicação
9. **Obtenção da URL**: Retorna URL pública do serviço

### Configurações do Serviço Cloud Run

O workflow configura automaticamente:
- **Porta**: 8080 (compatível com nginx no container)
- **Memória**: 512Mi
- **CPU**: 1 vCPU
- **Min Instances**: 0 (scale to zero)
- **Max Instances**: 10
- **Acesso**: Público (`--allow-unauthenticated`)

## 🔄 Executar Deploy

### Deploy Automático

O deploy acontece automaticamente quando você faz push para a branch `main`:

```bash
git push origin main
```

### Deploy Manual

1. Acesse o repositório no GitHub
2. Vá para **Actions**
3. Clique no workflow **Deploy to Cloud Run**
4. Clique em **Run workflow**
5. Selecione a branch e clique em **Run workflow**

## 📊 Monitoramento

### Ver Logs do Workflow

1. Acesse: https://github.com/Aurora-AI/Certum-Prime/actions
2. Clique no workflow executado
3. Veja os logs detalhados de cada step

### Ver Logs do Cloud Run

```bash
# Ver logs em tempo real
gcloud run services logs tail certum-prime --region=southamerica-east1

# Ver logs recentes
gcloud run services logs read certum-prime --region=southamerica-east1 --limit=50
```

### Obter URL do Serviço

```bash
gcloud run services describe certum-prime \
  --region=southamerica-east1 \
  --format='value(status.url)'
```

## 🐛 Troubleshooting

### Erro: "Permission denied"

**Problema**: Service account não tem permissões necessárias

**Solução**: Verifique se a service account tem todas as roles listadas acima

### Erro: "API not enabled"

**Problema**: APIs do Google Cloud não estão habilitadas

**Solução**: Execute os comandos de habilitação de APIs listados acima

### Erro: "Failed to push image"

**Problema**: Artifact Registry não existe ou não tem permissões

**Solução**: 
1. Verifique se o Artifact Registry foi criado
2. Verifique permissões da service account

### Build falha

**Problema**: Erro durante build do Docker

**Solução**: 
1. Teste o build localmente:
   ```bash
   docker build -t certum-prime .
   ```
2. Verifique se todas as dependências estão no `package.json`
3. Verifique o `Dockerfile`

## 📝 Customização

### Alterar Região

Edite `.github/workflows/deploy-cloud-run.yml`:

```yaml
env:
  REGION: us-central1  # Altere para a região desejada
```

### Alterar Recursos do Container

Edite a seção de deploy no workflow:

```yaml
- name: Deploy to Cloud Run
  run: |
    gcloud run deploy ${{ env.SERVICE_NAME }} \
      --memory=1Gi \        # Aumentar memória
      --cpu=2 \             # Aumentar CPU
      --max-instances=20    # Aumentar instâncias máximas
```

### Adicionar Variáveis de Ambiente

```yaml
- name: Deploy to Cloud Run
  run: |
    gcloud run deploy ${{ env.SERVICE_NAME }} \
      --set-env-vars="NODE_ENV=production,API_URL=https://api.exemplo.com"
```

## 🔒 Segurança

### Boas Práticas

1. **Nunca commite a chave JSON da service account no código**
2. **Use secrets do GitHub para informações sensíveis**
3. **Limite permissões da service account ao mínimo necessário**
4. **Rotacione chaves periodicamente**
5. **Monitore logs de acesso**

### Revogar Service Account

Se a chave for comprometida:

```bash
# Listar chaves
gcloud iam service-accounts keys list \
  --iam-account=github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com

# Deletar chave comprometida
gcloud iam service-accounts keys delete KEY_ID \
  --iam-account=github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com

# Criar nova chave
gcloud iam service-accounts keys create nova-chave.json \
  --iam-account=github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com
```

## 📚 Recursos Adicionais

- [Documentação Cloud Run](https://cloud.google.com/run/docs)
- [GitHub Actions para GCP](https://github.com/google-github-actions)
- [Artifact Registry](https://cloud.google.com/artifact-registry/docs)
- [Service Accounts](https://cloud.google.com/iam/docs/service-accounts)

## ✅ Checklist de Configuração

- [ ] Projeto GCP criado
- [ ] APIs habilitadas (Cloud Run, Artifact Registry, Container Registry)
- [ ] Service Account criada com permissões corretas
- [ ] Chave JSON da Service Account gerada
- [ ] Secret `GCP_PROJECT_ID` adicionado no GitHub
- [ ] Secret `GCP_SA_KEY` adicionado no GitHub
- [ ] Workflow testado manualmente
- [ ] Deploy automático funcionando
- [ ] URL do serviço acessível

---

## 📞 Suporte

Para problemas ou dúvidas:
- **Issues**: https://github.com/Aurora-AI/Certum-Prime/issues
- **Documentação**: https://github.com/Aurora-AI/Certum-Prime/blob/main/docs/

---

**Aurora AI © 2026** | Deploy Automático para Google Cloud Run
