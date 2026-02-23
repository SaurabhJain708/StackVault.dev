# StackVault.dev

<div align="center">

**Your Portfolio, Reimagined.**

A modern, interactive portfolio builder platform that transforms static resumes into dynamic web experiences.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.8-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748)](https://www.prisma.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.5.5-black)](https://turbo.build/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

StackVault.dev is a comprehensive portfolio builder platform that enables professionals to create stunning, interactive web portfolios without writing code. The platform offers:

- **Template-Based Design**: Choose from a curated collection of modern, responsive templates
- **AI-Powered Content Generation**: Leverage Google Gemini AI to generate descriptions and content
- **Custom Domain Support**: Use your own domain for a professional presence
- **Comprehensive Profile Management**: Showcase skills, projects, experience, education, certifications, and more
- **Social Integration**: Link your social media profiles
- **Public Portfolio Pages**: Share your portfolio with a unique subdomain or custom domain

---

## ✨ Features

### Core Features

- 🔐 **Authentication**: Google OAuth integration via NextAuth.js
- 🎨 **Multiple Templates**: Free, Premium, and Coming Soon templates
- 🤖 **AI Content Generation**: Generate descriptions using Google Gemini AI (with token-based usage)
- 📁 **File Uploads**: Upload images and resumes via Cloudinary
- 🌐 **Custom Domains**: Configure your own domain for your portfolio
- 📊 **Dashboard**: Intuitive dashboard for managing all portfolio content
- 🔗 **Social Links**: Add links to your social media profiles
- ⭐ **Recommendations**: Receive and display recommendations from peers
- 📱 **Responsive Design**: Fully responsive across all devices
- 🎭 **Animations**: Smooth animations powered by Framer Motion

### Portfolio Sections

- **User Profile**: Name, bio, avatar, location, availability status
- **Skills**: Technical and soft skills with descriptions
- **Projects**: Showcase projects with images, descriptions, and links
- **Experience**: Work history with company details and achievements
- **Education**: Academic background with institutions and degrees
- **Certifications**: Professional certifications with credential links
- **Social Links**: Links to GitHub, LinkedIn, Twitter, and more
- **Recommendations**: Peer recommendations and testimonials

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15.4.8** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.9** - Animation library
- **React Hook Form 7.62.0** - Form management
- **Zustand 5.0.7** - State management
- **TanStack Query 5.84.1** - Data fetching and caching
- **NextAuth.js 4.24.11** - Authentication

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 6.12.0** - ORM and database toolkit
- **PostgreSQL** - Relational database
- **Google Gemini AI** - AI content generation
- **Cloudinary** - Image and file storage

### Development Tools
- **Turborepo 2.5.5** - Monorepo build system
- **pnpm 10.11.1** - Package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - End-to-end testing
- **Docker** - Containerization

---

## 🏗 Architecture

StackVault.dev is built as a **monorepo** using Turborepo, organized into the following structure:

```
StackVault.dev/
├── apps/
│   └── web/              # Next.js web application
├── packages/
│   ├── db/               # Prisma database package
│   ├── types/            # Shared TypeScript types
│   ├── ui/               # Shared UI components
│   ├── eslint-config/    # ESLint configurations
│   └── typescript-config/# TypeScript configurations
├── e2e/                  # End-to-end tests
└── turbo.json            # Turborepo configuration
```

### Monorepo Benefits

- **Code Sharing**: Shared types, UI components, and configurations
- **Type Safety**: Consistent types across packages
- **Build Optimization**: Turborepo caches and parallelizes builds
- **Dependency Management**: Centralized dependency management with pnpm workspaces

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** 10.11.1 (or install via `npm install -g pnpm@10.11.1`)
- **PostgreSQL** database
- **Google OAuth** credentials
- **Cloudinary** account (for file uploads)
- **Google Gemini API** key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaurabhJain708/StackVault.dev
   cd StackVault.dev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm turbo db:generate
   
   # Run migrations
   pnpm turbo db:migrate
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

---

## 📁 Project Structure

### Apps

#### `apps/web`
The main Next.js application containing:
- **Pages**: Landing page, dashboard, portfolio views, templates
- **API Routes**: Authentication, CRUD operations for portfolio data
- **Components**: Dashboard forms, template components, UI elements
- **Lib**: Query hooks, authentication, AI integration, utilities

### Packages

#### `packages/db`
Prisma database package with:
- **Schema**: Database models (User, Project, Experience, Education, Cert, Skill, etc.)
- **Client**: Prisma client instance
- **Migrations**: Database migration files

#### `packages/types`
Shared TypeScript types for:
- User profiles
- Portfolio items (Projects, Experience, Education, Certifications)
- Skills and social links
- Domain and template types

#### `packages/ui`
Shared UI components:
- Button
- Card
- Code

#### `packages/eslint-config`
ESLint configurations for:
- Base rules
- Next.js specific rules
- React internal rules

#### `packages/typescript-config`
TypeScript configurations for:
- Base settings
- Next.js projects
- React libraries

### E2E Tests

#### `e2e`
Playwright end-to-end tests covering:
- API endpoints (User, Project, Experience, Education, Cert, Skill, SocialLink)
- User workflows
- Authentication flows

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stackvault"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Gemini AI
GOOGLE_GEN_AI_API_KEY="your-gemini-api-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### Getting API Keys

1. **Google OAuth**: [Google Cloud Console](https://console.cloud.google.com/)
2. **Google Gemini**: [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Cloudinary**: [Cloudinary Dashboard](https://cloudinary.com/console)

---

## 💻 Development

### Available Scripts

#### Root Level
```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps and packages
pnpm lint         # Lint all packages
pnpm format       # Format code with Prettier
pnpm check-types  # Type check all packages
pnpm test:e2e     # Run end-to-end tests
```

#### Web App
```bash
cd apps/web
pnpm dev          # Start Next.js dev server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Lint the web app
```

#### Database Package
```bash
cd packages/db
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run database migrations
pnpm db:deploy    # Deploy migrations to production
```

### Development Workflow

1. **Start the development server**
   ```bash
   pnpm dev
   ```

2. **Make changes** to any package or app

3. **Type checking** runs automatically in watch mode

4. **Hot reload** is enabled for Next.js

### Building for Production

```bash
# Build all packages and apps
pnpm build

# Build specific package
pnpm turbo build --filter=web

# Build with cache
pnpm turbo build --filter=web --force
```

---

## 🧪 Testing

### End-to-End Tests

The project uses Playwright for E2E testing:

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests in UI mode
cd e2e
pnpm playwright test --ui

# Run specific test file
pnpm playwright test tests/api/user.test.ts
```

### Test Coverage

E2E tests cover:
- ✅ User authentication and profile management
- ✅ CRUD operations for all portfolio sections
- ✅ API endpoint validation
- ✅ Data validation and error handling

---

## 🚢 Deployment

### Docker Deployment

The project includes a Dockerfile for containerized deployment:

```bash
# Build Docker image
docker build -t stackvault .

# Run container
docker run -p 3000:3000 --env-file .env stackvault
```

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Set build command**: `pnpm turbo build --filter=web`
4. **Set output directory**: `apps/web/.next`
5. **Deploy**

### Database Migrations

For production deployments:

```bash
# Deploy migrations
pnpm turbo db:deploy
```

---

## 📚 API Documentation

### Authentication

All private API routes require authentication via NextAuth.js session.

### Public Endpoints

#### `GET /api/public`
Get public user data by domain or username.

#### `GET /api/template`
Get all available templates.

#### `GET /api/templatebyid/:id`
Get template by ID.

### Private Endpoints

All private endpoints require authentication and are prefixed with `/api/private/`.

#### User
- `GET /api/private/user` - Get current user
- `PATCH /api/private/user` - Update user profile

#### Skills
- `GET /api/private/skill` - Get user skills
- `POST /api/private/skill` - Create skill
- `DELETE /api/private/skill` - Delete skill

#### Projects
- `GET /api/private/project` - Get user projects
- `POST /api/private/project` - Create project
- `PATCH /api/private/project` - Update project
- `DELETE /api/private/project` - Delete project

#### Experience
- `GET /api/private/experience` - Get user experiences
- `POST /api/private/experience` - Create experience
- `PATCH /api/private/experience` - Update experience
- `DELETE /api/private/experience` - Delete experience

#### Education
- `GET /api/private/education` - Get user education
- `POST /api/private/education` - Create education entry
- `PATCH /api/private/education` - Update education entry
- `DELETE /api/private/education` - Delete education entry

#### Certifications
- `GET /api/private/cert` - Get user certifications
- `POST /api/private/cert` - Create certification
- `PATCH /api/private/cert` - Update certification
- `DELETE /api/private/cert` - Delete certification

#### Social Links
- `GET /api/private/socialLink` - Get user social links
- `POST /api/private/socialLink` - Create social link
- `DELETE /api/private/socialLink` - Delete social link

#### Custom Domain
- `POST /api/private/customDomain` - Configure custom domain

#### File Upload
- `POST /api/private/fileUpload` - Upload files to Cloudinary

#### Template
- `PATCH /api/private/updateTemplate` - Update user's selected template

---

## 🗄 Database Schema

### Core Models

- **User**: User profiles with authentication and preferences
- **Skill**: Technical and soft skills
- **Project**: Portfolio projects with skills
- **Experience**: Work experience with skills
- **Education**: Academic background with skills
- **Cert**: Professional certifications with skills
- **SocialLink**: Social media profile links
- **Recommendation**: Peer recommendations
- **Template**: Portfolio templates (Free, Premium, ComingSoon)
- **TokenUsage**: AI token usage tracking

### Relationships

- Users have many Skills, Projects, Experiences, Educations, Certs, SocialLinks
- Skills are related to Projects, Experiences, Educations, and Certs (many-to-many)
- Users can give and receive Recommendations
- Users can select a Template for their portfolio

---

## 🎨 Templates

StackVault.dev includes multiple portfolio templates:

- **Atlas**: Modern, minimalist design
- **Canvas**: Creative, artistic layout
- **Horizon**: Professional, corporate style
- **Pulse**: Dynamic, interactive experience

Templates are categorized as:
- **Free**: Available to all users
- **Premium**: Requires subscription or special access
- **ComingSoon**: Upcoming templates

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Run tests** (`pnpm test:e2e`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features

---

## 📝 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Turborepo](https://turbo.build/) - High-performance build system
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

## 📧 Contact

For questions, support, or inquiries, please contact the development team.

---

<div align="center">

**Built with ❤️ by the StackVault.dev team**

[Website](https://stackvault.dev) • [Documentation](#) • [Support](#)

</div>
