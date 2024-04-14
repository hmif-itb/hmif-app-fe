# HMIF App Frontend

## How to run

1. Install PNPM

```bash
npm install -g pnpm
```

2. Install dependencies

```bash
pnpm install
```

3. Copy `.env.example` to `.env` and fill the required environment variables

4. Run the app

```bash
pnpm dev
```

## To update backend API services

Run the following command:

```bash
pnpm api-staging
```

It will update the backend API services to the staging environment in `src/api/generated` folder.