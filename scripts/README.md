# Gladney Center Flask Backend

Este é o backend Flask para o dashboard de analytics do Gladney Center.

## Configuração Local

1. **Instalar dependências:**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. **Configurar variáveis de ambiente:**
   - Copie `.env.example` para `.env`
   - Configure as variáveis necessárias

3. **Executar localmente:**
   \`\`\`bash
   python app.py
   \`\`\`

## Deploy no Google Cloud Run

1. **Build da imagem:**
   \`\`\`bash
   gcloud builds submit --tag gcr.io/[PROJECT-ID]/gladney-dashboard
   \`\`\`

2. **Deploy:**
   \`\`\`bash
   gcloud run deploy gladney-dashboard \
     --image gcr.io/[PROJECT-ID]/gladney-dashboard \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   \`\`\`

3. **Configurar variáveis de ambiente no Cloud Run:**
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - SECRET_KEY
   - GOOGLE_APPLICATION_CREDENTIALS_JSON

## Funcionalidades

- ✅ Autenticação OAuth Google
- ✅ Controle de acesso por domínio (@upstart13.com)
- ✅ Dashboards com iframes do Looker Studio
- ✅ Sistema de logging em Google Sheets
- ✅ Sessões com timeout de 30 minutos
- ✅ Pronto para produção com gunicorn
