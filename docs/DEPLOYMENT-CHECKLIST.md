# ✅ Checklist de Deploy - Cloud Run

Use este checklist para garantir que tudo está configurado corretamente antes do primeiro deploy.

---

## 📋 Pré-requisitos

### Google Cloud Platform

- [ ] **Projeto GCP criado**
  ```bash
  gcloud projects list
  ```

- [ ] **Billing habilitado no projeto**
  - Acesse: https://console.cloud.google.com/billing

- [ ] **gcloud CLI instalado e autenticado**
  ```bash
  gcloud auth login
  gcloud config set project YOUR_PROJECT_ID
  ```

### APIs Habilitadas

- [ ] **Cloud Run API**
  ```bash
  gcloud services enable run.googleapis.com
  ```

- [ ] **Artifact Registry API**
  ```bash
  gcloud services enable artifactregistry.googleapis.com
  ```

- [ ] **Cloud Build API**
  ```bash
  gcloud services enable cloudbuild.googleapis.com
  ```

---

## 🔑 Service Account

- [ ] **Service Account criada**
  ```bash
  gcloud iam service-accounts create github-actions-deploy \
    --display-name="GitHub Actions Deploy"
  ```

- [ ] **Permissões concedidas**
  - [ ] `roles/run.admin` - Cloud Run Admin
  - [ ] `roles/iam.serviceAccountUser` - Service Account User
  - [ ] `roles/artifactregistry.admin` - Artifact Registry Admin
  - [ ] `roles/storage.admin` - Storage Admin

  ```bash
  PROJECT_ID=$(gcloud config get-value project)
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/run.admin"
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"
  
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/storage.admin"
  ```

- [ ] **Chave JSON criada**
  ```bash
  gcloud iam service-accounts keys create key.json \
    --iam-account=github-actions-deploy@${PROJECT_ID}.iam.gserviceaccount.com
  ```

---

## 🔐 GitHub Secrets

- [ ] **Secret `GCP_PROJECT_ID` adicionado**
  - Vá para: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions
  - Name: `GCP_PROJECT_ID`
  - Value: Seu Project ID (ex: `aurora-prime-450022`)

- [ ] **Secret `GCP_SA_KEY` adicionado**
  - Vá para: https://github.com/Aurora-AI/Certum-Prime/settings/secrets/actions
  - Name: `GCP_SA_KEY`
  - Value: Conteúdo completo do `key.json`

- [ ] **Chave JSON deletada localmente** (por segurança)
  ```bash
  rm key.json
  ```

---

## 📦 Repositório

- [ ] **Workflow file existe**
  - Arquivo: `.github/workflows/deploy-cloud-run.yml`
  - Verificar:
  ```bash
  cat .github/workflows/deploy-cloud-run.yml
  ```

- [ ] **Dockerfile existe e está correto**
  - Arquivo: `Dockerfile`
  - Porta configurada: `8080`
  - Verificar:
  ```bash
  cat Dockerfile | grep EXPOSE
  # Deve mostrar: EXPOSE 8080
  ```

- [ ] **nginx.conf configurado corretamente**
  - Arquivo: `nginx.conf`
  - Porta de listen: `8080`
  - Verificar:
  ```bash
  cat nginx.conf | grep listen
  # Deve mostrar: listen 8080;
  ```

---

## 🧪 Testes Locais (Opcional)

### Build Local da Imagem Docker

- [ ] **Build da imagem funciona**
  ```bash
  docker build -t certum-prime-test .
  ```

- [ ] **Container roda localmente**
  ```bash
  docker run -p 8080:8080 certum-prime-test
  # Acesse: http://localhost:8080
  ```

- [ ] **Aplicação carrega corretamente**
  - Abrir: http://localhost:8080
  - Verificar se a página carrega sem erros

### Limpeza

- [ ] **Parar e remover container de teste**
  ```bash
  docker stop $(docker ps -q --filter ancestor=certum-prime-test)
  docker rmi certum-prime-test
  ```

---

## 🚀 Primeiro Deploy

### Via GitHub Actions

- [ ] **Push para main ou trigger manual**
  
  Opção 1 - Push para main:
  ```bash
  git push origin main
  ```
  
  Opção 2 - Trigger manual:
  - Acesse: https://github.com/Aurora-AI/Certum-Prime/actions
  - Clique em "Deploy to Cloud Run"
  - Clique em "Run workflow"
  - Clique em "Run workflow" novamente

- [ ] **Acompanhar execução**
  - Acesse: https://github.com/Aurora-AI/Certum-Prime/actions
  - Clique no workflow em execução
  - Verificar logs de cada step

- [ ] **Deploy completado com sucesso**
  - Status: ✅ Green check
  - Procurar por: "🚀 Deployed to: https://..."
  - Anotar a URL do serviço

---

## ✅ Validação Pós-Deploy

### Cloud Run Console

- [ ] **Serviço aparece no console**
  - Acesse: https://console.cloud.google.com/run
  - Verificar serviço `certum-prime`
  - Região: `southamerica-east1`

- [ ] **Status do serviço está "Healthy"**

- [ ] **URL do serviço funciona**
  - Clicar na URL no console
  - Ou executar:
  ```bash
  gcloud run services describe certum-prime \
    --region=southamerica-east1 \
    --format='value(status.url)'
  ```

### Verificação da Aplicação

- [ ] **Aplicação carrega corretamente**
  - Abrir a URL do Cloud Run
  - Verificar se a página carrega

- [ ] **Sem erros no console do browser**
  - Abrir DevTools (F12)
  - Verificar tab Console
  - Verificar tab Network

- [ ] **Assets estáticos carregam**
  - CSS aplicado corretamente
  - Imagens carregam
  - JavaScript executa

---

## 📊 Monitoramento

- [ ] **Logs disponíveis**
  ```bash
  gcloud run services logs read certum-prime \
    --region=southamerica-east1 \
    --limit=50
  ```

- [ ] **Métricas aparecem no console**
  - Acesse: https://console.cloud.google.com/run
  - Clique em `certum-prime`
  - Tab "METRICS"

---

## 🔄 Deploys Subsequentes

Para deploys futuros:

- [ ] Fazer alterações no código
- [ ] Commit e push para `main`
- [ ] Workflow roda automaticamente
- [ ] Verificar nova versão no Cloud Run

---

## 🐛 Troubleshooting

Se algo der errado, consulte:

- [Documentação Completa](DEPLOYMENT.md#-troubleshooting)
- [Logs do GitHub Actions](https://github.com/Aurora-AI/Certum-Prime/actions)
- [Logs do Cloud Run](https://console.cloud.google.com/logs)

---

## 📞 Suporte

- Issues: https://github.com/Aurora-AI/Certum-Prime/issues
- Documentação: [DEPLOYMENT.md](DEPLOYMENT.md)
- Quick Start: [QUICKSTART-SECRETS.md](QUICKSTART-SECRETS.md)

---

**Status**: ⬜ Não iniciado | 🔄 Em progresso | ✅ Completo

**Última atualização**: {{ data }}
