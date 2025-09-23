# ================================
# Etapa 1: Build
# ================================
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos de dependência
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm e dependências
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar o restante do projeto
COPY . .

# Rodar build (gera saída standalone por causa do next.config.mjs)
RUN pnpm build

# ================================
# Etapa 2: Runtime
# ================================
FROM node:18-alpine AS runner
WORKDIR /app

# Definir ambiente de produção
ENV NODE_ENV=production

# Copiar apenas arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cloud Run usa a porta 8080
ENV PORT=8080
EXPOSE 8080

# Comando de inicialização
CMD ["node", "server.js"]
