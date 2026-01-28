# ⚡ Configuração Rápida - Secrets GitHub

## 🎯 O que você precisa fazer

Para ativar o deploy automático no Google Cloud Run, adicione 2 secrets no GitHub:

### 📍 Link Direto
👉 **https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions**

---

## 🔑 Secret 1: GCP_PROJECT_ID

1. Vá para: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Preencha:
   - **Name:** `GCP_PROJECT_ID`
   - **Secret:** `seu-project-id` (exemplo: `aurora-prime-450022`)
4. Clique em **"Add secret"**

**Como obter o Project ID:**
```bash
gcloud config get-value project
```

---

## 🔑 Secret 2: GCP_SA_KEY

### Passo 1: Criar Service Account

```bash
# Obter o PROJECT_ID
PROJECT_ID=$(gcloud config get-value project)

# Criar a service account
gcloud iam service-accounts create github-actions-deploy \
  --display-name="GitHub Actions Deploy"
```

### Passo 2: Conceder Permissões

```bash
# Cloud Run Admin
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Service Account User
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Artifact Registry Admin
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

# Storage Admin
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/storage.admin"
```

### Passo 3: Criar Chave JSON

```bash
# Criar e baixar a chave
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com

# Ver o conteúdo
cat key.json
```

### Passo 4: Adicionar no GitHub

1. **Copie TODO o conteúdo** do arquivo `key.json`
2. Vá para: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions
3. Clique em **"New repository secret"**
4. Preencha:
   - **Name:** `GCP_SA_KEY`
   - **Secret:** Cole o JSON completo (incluindo `{` e `}`)
5. Clique em **"Add secret"**

### Passo 5: Deletar Chave Local

```bash
# Por segurança, delete o arquivo local
rm key.json
```

---

## ✅ Habilitar APIs no GCP

```bash
# APIs necessárias
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

---

## 🚀 Testar Deploy

Após adicionar os secrets:

1. Faça um push para `main`:
```bash
git push origin main
```

2. Ou execute manualmente:
   - Vá para: https://github.com/Aurora-AI/Certum-Prime/actions
   - Clique em "Deploy to Cloud Run"
   - Clique em "Run workflow"

3. Acompanhe o progresso:
   - https://github.com/Aurora-AI/Certum-Prime/actions

---

## 📖 Documentação Completa

Para mais detalhes, consulte: [docs/DEPLOYMENT.md](DEPLOYMENT.md)

---

## ⏱️ Tempo Estimado

- Criar Service Account: ~2 minutos
- Adicionar Secrets no GitHub: ~1 minuto
- **Total: ~3 minutos**

---

## 🆘 Precisa de Ajuda?

- [Documentação Completa](DEPLOYMENT.md)
- [GitHub Actions](https://github.com/Aurora-AI/Certum-Prime/actions)
- [Issues](https://github.com/Aurora-AI/Certum-Prime/issues)
