# AGBKlar.de - AI-Powered AGB Analysis

A Next.js application that uses AI to analyze and summarize German terms & conditions (AGB) documents.

## Features

- 📄 **PDF Upload**: Upload PDF documents for analysis
- 🤖 **AI Analysis**: Uses OpenAI GPT to generate clear summaries
- 🇩🇪 **German Language**: Optimized for German legal documents
- 📧 **Email Signup**: Formspree integration for user registration
- ⚡ **Real-time Processing**: Fast document analysis and summarization

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

### `/api/upload`
- **Method**: POST
- **Purpose**: Upload and parse PDF files
- **Body**: FormData with file
- **Response**: Extracted text content and metadata

### `/api/analyze`
- **Method**: POST
- **Purpose**: Analyze document text with AI
- **Body**: JSON with textContent and documentType
- **Response**: AI-generated summary

### `/api/health`
- **Method**: GET
- **Purpose**: Health check endpoint
- **Response**: Service status

## Usage

1. **Upload PDF**: Select a PDF file containing AGB/terms & conditions
2. **Analysis**: Click "AGB Analysieren" to process the document
3. **Review**: Read the AI-generated summary in German
4. **Signup**: Join the waitlist for updates

## File Requirements

- **Format**: PDF only
- **Size**: Maximum 10MB
- **Content**: Should contain readable text (not scanned images)

## Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Heroku

Make sure to set the `OPENAI_API_KEY` environment variable in your deployment platform.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **AI**: OpenAI GPT-3.5-turbo
- **PDF Processing**: pdf-parse
- **Styling**: Tailwind CSS
- **Forms**: Formspree

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
