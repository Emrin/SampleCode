# Play The Guessing Game: A Demo Full-Stack Platform
This is a full-stack demo application,
it allows users to create an account and play a Guessing Game.

It is built with TypeScript, React, Next.js, a Postgres db, Prisma ORM,
a redis cache, a Nginx reverse proxy, Docker, and Docker-Compose.

See the specific sections below for a complete list of Features,
Tech Tools, and running instructions.

# Run
### Run in Docker
```npm
npm run dev:docker:bump
```
Click -> http://127.0.0.1 <-

### Run in OS
```npm
# Install
npm i
# Synchronize DB if not done yet:
npx prisma migrate dev
# Refresh Typing (migrate dev does this already)
npx prisma generate
# Run
npm run dev
```
Click -> http://127.0.0.1:3000 <-

## Tech
- Docker-Compose (Deployment)
- TypeScript (Language)
- ReactJS (Framework)
- NextJS (Meta Framework)
- Postgresql (DB)
- Prisma (ORM)
- Redis (Cache)
- Iron-Session (Encrypted Stateless Authentication)
- Zod (API validation)
- Tailwind (UI)
- Nginx (Reverse Proxy)

# Features
- One-Line Deployment with Docker Compose
- I18n
- Stateless Encrypted Sessions
- Redis Cache
- Postgres Database
- Works without JS enabled for maximum security (+ demonstrates a deeper understanding of the underlying frameworks)
- CSRF protection through request headers check + exclusive POST requests
- Basic Secure Authentication
- API Routes
- Form Validation with Zod
- TailwindCSS UI
- ESLint + Prettier
- CommitLint
- Husky commit scripts
- CSSNano (for style optimization)
- Health Checks

# Potential improvements on this demo
- [x] Game: Show pictures of animals and ask users to guess characteristics such as extinction date, size, weight
  - Users get a score based on how close their guesses were
  - Animals from 30000BCE to present
- [x] Populate DB with data
- [ ] Rate-Limiting with Redis
- [ ] Image uploads
- [ ] Pagination
- [ ] Tests
- [ ] Background Tasks
- [ ] Make pretty
- [ ] Track metrics
