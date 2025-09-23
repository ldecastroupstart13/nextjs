# Rodando Localmente

## 1. Baixar arquivos
- Clique nos 3 pontos no canto superior direito do v0
- Selecione "Download ZIP"
- Extraia os arquivos

## 2. Instalar dependências
\`\`\`bash
npm install
\`\`\`

## 3. Rodar em desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

## 4. Acessar
- Abra http://localhost:3000
- Para testar sem auth, acesse diretamente /dashboard

## 5. Configurar depois (para produção)
1. Criar projeto no Google Cloud Console
2. Configurar OAuth 2.0
3. Criar Service Account para Google Sheets
4. Substituir valores no .env.local

## 6. Deploy no Google Cloud Run
\`\`\`bash
# Quando estiver pronto
gcloud run deploy gladney-dashboard --source .
