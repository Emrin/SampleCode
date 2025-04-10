# Sample code and architecture

# Run
```npm
npm run dev:docker:bump
```
Click -> http://127.0.0.1 <-

### Develop Locally
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
- [ ] Game: Show pictures of animals and ask users to guess characteristics such as extinction date, size, weight
  - Users get a score based on how close their guesses were
  - Animals from 30000BCE to present
  - Maybe also add civilizations (other characteristics: time period, active for, area)
  - Historic figures? E.g. Caesar, Temugin/Genghis Khan, Alexander the Great, Miyamoto Musashi
  - Historic figures is probably more interesting... hmmm
- [ ] Populate DB with data
- [ ] Rate-Limiting with Redis
- [ ] Image uploads
- [ ] Pagination
- [ ] Tests
- [ ] Background Tasks
- [ ] Make pretty
- [ ] Track metrics
