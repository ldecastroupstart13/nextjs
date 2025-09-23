# Gladney Dashboard - Next.js Application

Modern dashboard for Gladney Center expectant mother analytics with Google OAuth authentication and Google Sheets integration.

## 🚀 Features

- **Google OAuth Authentication** - Secure login with domain and email restrictions
- **Google Sheets Integration** - Automatic logging of user actions
- **Responsive Design** - Works on desktop and mobile devices
- **Multiple Dashboard Views** - Expectant Mother, Business Performance, Traffic Monitor
- **Session Management** - 30-minute session timeout for security
- **Modern UI** - Built with Next.js 14, Tailwind CSS, and Radix UI

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Google Cloud Project with OAuth credentials

### Setup

1. **Clone and install dependencies:**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

2. **Environment Variables:**
   Copy `.env.local` and update with your credentials:
   \`\`\`bash
   cp .env.local .env.local
   \`\`\`

   Required variables:
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)
   - `NEXTAUTH_SECRET` - Random secret for JWT signing
   - `GOOGLE_CLIENT_ID` - Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
   - `GOOGLE_APPLICATION_CREDENTIALS_JSON` - Service account JSON (base64 encoded)

3. **Run development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Google Cloud Run Deployment

### Method 1: Direct from Git Repository

1. **Push code to GitHub/GitLab**

2. **Deploy to Cloud Run:**
   \`\`\`bash
   gcloud run deploy gladney-dashboard \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   \`\`\`

3. **Set environment variables in Cloud Run Console:**
   - Go to Google Cloud Console → Cloud Run → gladney-dashboard
   - Click "Edit & Deploy New Revision"
   - Add environment variables under "Variables & Secrets"

### Method 2: Using Cloud Build (Recommended)

1. **Create cloudbuild.yaml:**
   \`\`\`yaml
   steps:
     - name: 'gcr.io/cloud-builders/docker'
       args: ['build', '-t', 'gcr.io/$PROJECT_ID/gladney-dashboard', '.']
     - name: 'gcr.io/cloud-builders/docker'
       args: ['push', 'gcr.io/$PROJECT_ID/gladney-dashboard']
     - name: 'gcr.io/cloud-builders/gcloud'
       args: [
         'run', 'deploy', 'gladney-dashboard',
         '--image', 'gcr.io/$PROJECT_ID/gladney-dashboard',
         '--region', 'us-central1',
         '--platform', 'managed',
         '--allow-unauthenticated'
       ]
   \`\`\`

2. **Deploy:**
   \`\`\`bash
   gcloud builds submit --config cloudbuild.yaml
   \`\`\`

### Environment Variables for Production

Set these in Google Cloud Run Console:

\`\`\`bash
NEXTAUTH_URL=https://your-app-url.run.app
NEXTAUTH_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
GOOGLE_APPLICATION_CREDENTIALS_JSON=base64-encoded-service-account-json
\`\`\`

## 🔐 Google OAuth Setup

1. **Go to Google Cloud Console → APIs & Services → Credentials**

2. **Create OAuth 2.0 Client ID:**
   - Application type: Web application
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-app.run.app/api/auth/callback/google` (production)

3. **Enable required APIs:**
   - Google+ API
   - Google Sheets API (for logging)

## 📊 Google Sheets Integration

The app logs user actions to Google Sheets for analytics.

1. **Create a Google Service Account**
2. **Download the JSON key file**
3. **Base64 encode the JSON and set as `GOOGLE_APPLICATION_CREDENTIALS_JSON`**
4. **Share your Google Sheet with the service account email**

## 🔒 Access Control

Access is restricted to:
- Emails ending with `@upstart13.com`
- Specific allowed emails (configured in `lib/auth.ts`)

To modify access control, edit the `ALLOWED_EMAILS` and `ALLOWED_DOMAIN` constants in:
- `lib/auth.ts`
- `middleware.ts`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth.js API routes
│   ├── api/track-action/           # Action tracking API
│   ├── auth/signin/                # Custom sign-in page
│   ├── dashboard/                  # Main dashboard page
│   └── unauthorized/               # Access denied page
├── components/
│   ├── providers.tsx               # React Context providers
│   └── ui/                         # Reusable UI components
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   └── google-sheets.ts            # Google Sheets integration
├── middleware.ts                   # Route protection
└── Dockerfile                      # Container configuration
\`\`\`

## 🐳 Docker

The app includes a Dockerfile optimized for Google Cloud Run:

\`\`\`bash
# Build image
docker build -t gladney-dashboard .

# Run locally
docker run -p 8080:8080 gladney-dashboard
\`\`\`

## 🔧 Troubleshooting

### Common Issues

1. **"React Context is unavailable in Server Components"**
   - Fixed by using the `Providers` component in `app/layout.tsx`

2. **OAuth redirect mismatch**
   - Ensure redirect URIs in Google Console match your app URLs

3. **Session timeout issues**
   - Sessions expire after 30 minutes for security
   - Users will be redirected to sign in again

4. **Google Sheets permission errors**
   - Ensure service account has access to the target sheet
   - Check that the JSON credentials are properly base64 encoded

### Logs

View logs in Google Cloud Run Console or use:
\`\`\`bash
gcloud logs tail --service=gladney-dashboard
\`\`\`

## 📝 License

Private project for Gladney Center.
