# Redliner

An app for redlining legal documents.

## Requirements

- Docker
- Docker Compose

## Setup

1. ```bash
   cp api/.env.example api/.env
   ```
2. Paste your OpenAI API key in `api/.env`.

## Run (in development mode)

1. ```bash
   docker-compose up --build
   ```

## Development mode

Hot reload enabled for both Python back end and React front end.

- UI: http://localhost:3000
- API: http://localhost:5000

## To do

- Comprehensive error handling
- Responsive CSS
- Favicon
- Production version
