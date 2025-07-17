# Redliner

An app for redlining legal documents.

## Requirements

- Docker
- Docker Compose

## Setup

1. ```bash
   cp .env.example .env
   ```
2. Paste your OpenAI API key in `.env`.

## Run (in development mode)

1. ```bash
   docker-compose up --build
   ```

## Development mode

Hot reload enabled for both Python back end and React front end.

- UI: http://localhost:3000
- API: http://localhost:5000/redline

## To do

- Automated tests
- Comprehensive error handling and logging
- Accessibility improvements for UI
- Add config for production version
- HTTPS/SSL support
- More robust handling of OpenAI response stream
- Rate limiting and abuse protection for API
- Responsive CSS
- Use more robust delimiters around text sent to OpenAI
- Improve sanitisation and rendering of HTML returned by API
- Favicon
