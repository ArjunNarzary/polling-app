# Quick Polling App

A simple polling app built with **Next.js (App Router), PostgreSQL, Prisma, and Zod**.

## Features

- Create a poll with a question and multiple options.
- Vote on a poll.
- View poll results in real-time (auto-refresh every 5 seconds).
- No authentication required.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Zod
- **Backend**: Next.js API routes, Prisma
- **Database**: PostgreSQL
- **Deployment**: Vercel / Render

## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:ArjunNarzary/polling-app.git
   cd polling-app
   ```

2. rename .env.example to .env and add DATABASE_URL

3. Run the follwoing command

   ```sh
   npm install
   npx prisma init
   npm run dev
   ```
