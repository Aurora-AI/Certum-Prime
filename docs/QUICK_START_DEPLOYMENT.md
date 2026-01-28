# ⚡ Quick Start - Deploy para Cloud Run

**Tempo estimado: 10 minutos**

## 🎯 Objetivo

Configurar deploy automático do Certum Prime para Google Cloud Run em 3 passos simples.

---

## 📝 Pré-requisitos

- [ ] Conta no Google Cloud Platform
- [ ] Acesso de administrador ao repositório GitHub
- [ ] Projeto GCP criado (ou criar um novo)

---

## 🚀 Passos Rápidos

### 1️⃣ Configurar Google Cloud (5 min)

```bash
# 1. Definir projeto
gcloud config set project SEU_PROJECT_ID

# 2. Habilitar APIs necessárias
gcloud services enable run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com

# 3. Criar Service Account
gcloud iam service-accounts create github-actions-deployer \
  --display-name="GitHub Actions Deployer"

# 4. Adicionar permissões
gcloud projects add-iam-policy-binding SEU_PROJECT_ID \
  --member="serviceAccount:github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding SEU_PROJECT_ID \
  --member="serviceAccount:github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding SEU_PROJECT_ID \
  --member="serviceAccount:github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding SEU_PROJECT_ID \
  --member="serviceAccount:github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# 5. Criar e baixar chave JSON
gcloud iam service-accounts keys create ~/github-deployer-key.json \
  --iam-account=github-actions-deployer@SEU_PROJECT_ID.iam.gserviceaccount.com

# 6. Ver conteúdo da chave (copie todo o JSON)
cat ~/github-deployer-key.json
```

### 2️⃣ Configurar Secrets no GitHub (2 min)

1. **Acesse**: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions

2. **Clique em "New repository secret"**

3. **Adicione o primeiro secret:**
   - Nome: `GCP_PROJECT_ID`
   - Valor: `SEU_PROJECT_ID` (exemplo: `aurora-prime-450022`)
   - Clique em "Add secret"

4. **Adicione o segundo secret:**
   - Nome: `GCP_SA_KEY`
   - Valor: Cole todo o conteúdo JSON do arquivo `github-deployer-key.json`
   - Clique em "Add secret"

### 3️⃣ Testar Deploy (3 min)

#### Opção A: Deploy Automático
```bash
# Fazer qualquer commit e push para main
git add .
git commit -m "test: trigger deploy"
git push origin main
```

#### Opção B: Deploy Manual
1. Acesse: https://github.com/Aurora-AI/Certum-Prime/actions
2. Clique em "Deploy to Cloud Run"
3. Clique em "Run workflow"
4. Selecione branch "main"
5. Clique em "Run workflow" (verde)

---

## ✅ Verificação

### Acompanhar Deploy

1. Vá para: https://github.com/Aurora-AI/Certum-Prime/actions
2. Clique no workflow em execução
3. Acompanhe os logs em tempo real

### Obter URL do Serviço

Após deploy bem-sucedido, a URL aparece nos logs do workflow, ou execute:

```bash
gcloud run services describe certum-prime \
  --region=southamerica-east1 \
  --format='value(status.url)'
```

**Exemplo de URL**: `https://certum-prime-xxxx-sa.a.run.app`

---

## 🎉 Pronto!

Agora toda vez que você fizer push para `main`, o site será automaticamente deployado para Cloud Run.

---

## 🐛 Problemas Comuns

### ❌ Erro: "Permission denied"

**Solução**: Verifique se adicionou todas as 4 roles à service account (run.admin, iam.serviceAccountUser, artifactregistry.admin, storage.admin)

### ❌ Erro: "API not enabled"

**Solução**: Execute novamente os comandos `gcloud services enable`

### ❌ Build falha

**Solução**: Teste o build localmente:
```bash
npm install
npm run build
docker build -t test .
```

---

## 📚 Próximos Passos

- **Configurar domínio customizado**: [Guia Completo](CLOUD_RUN_DEPLOYMENT.md)
- **Adicionar variáveis de ambiente**: [Guia Completo](CLOUD_RUN_DEPLOYMENT.md#customização)
- **Aumentar recursos**: [Guia Completo](CLOUD_RUN_DEPLOYMENT.md#customização)
- **Configurar CI/CD avançado**: [Guia Completo](CLOUD_RUN_DEPLOYMENT.md)

---

## 🔗 Links Úteis

- [Documentação Completa](CLOUD_RUN_DEPLOYMENT.md)
- [Cloud Run Console](https://console.cloud.google.com/run)
- [GitHub Actions](https://github.com/Aurora-AI/Certum-Prime/actions)
- [Artifact Registry](https://console.cloud.google.com/artifacts)

---

**⚡ Deploy configurado em 10 minutos! ⚡**
