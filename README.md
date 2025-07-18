# Redliner

An app for redlining legal documents.

Demo hosted on Render:

- UI: https://redliner.onrender.com
- API: https://redliner-api.onrender.com/redline

May take a minute to spin up.

## Requirements

- Docker
- Docker Compose
- OpenAI API key

## Setup

1. ```bash
   cp .env.example .env
   ```
2. Paste your OpenAI API key in `.env`.

## Run

### Demo mode

```bash
docker-compose up --build
```

- UI: http://localhost:3000
- API: http://localhost:5000/redline

### Development mode

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Features hot reload for both Python back end and React front end.

## To do

- Automated tests
- Comprehensive error handling and logging
- Accessibility improvements for UI
- Add Docker config for production version running on nginx
- HTTPS/SSL support
- More robust handling of OpenAI response stream
- Rate limiting and abuse protection for API
- Switch to SCSS
- Use more robust delimiters around text sent to OpenAI
- Improve sanitisation and rendering of HTML returned by API
- Animations
- Favicon
