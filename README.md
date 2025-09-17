# MassMail Pro

Professional bulk email sending application built with Next.js, featuring real-time progress tracking and daily sending limits.

## Features
- 🚀 **Bulk Email Sending**: Send up to 500 emails per day
- 📊 **Real-time Progress**: Live terminal-style feedback during sending
- 🔒 **Daily Limits**: Built-in rate limiting to prevent abuse
- 📱 **Responsive Design**: Professional dark theme interface
- 📄 **CSV Support**: Import email lists from CSV files
- ⚡ **Configurable Delays**: Safety delays between sends (3s/5s/7s)
- 🔐 **Gmail Integration**: Secure authentication with App Passwords

## Getting Started

### Prerequisites
- Node.js 18+ 
- Gmail account with App Password enabled

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > App passwords
3. Generate a new App password for "Mail"
4. Use this 16-character password in the application

## Usage
1. **Add Email List**: Either paste emails manually or upload a CSV file
2. **Configure Settings**: Set subject, delay, and email body content
3. **Gmail Credentials**: Enter your Gmail and App password
4. **Send**: Click "Start Sending" to begin with real-time progress tracking

## Tech Stack
- Next.js 14, React, Tailwind CSS
- Nodemailer, Server-Sent Events
- localStorage for daily limits

## License
MIT License - Ready for commercial use
4. Preencha lista, assunto, corpo, Gmail e senha de app, defina delay e inicie.

## Observações
- Evite HTML pesado.
- Não abuse: respeite diretrizes anti-spam e consentimento dos destinatários.
- Rate limit reinicia a cada dia (baseado no dia do servidor).

## Melhorias Futuras
- Persistir progresso e filas (Redis / DB)
- Autenticação e multi-usuário
- Templates salvos e variáveis dinâmicas
