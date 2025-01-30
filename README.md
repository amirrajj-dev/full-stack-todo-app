# 📋 Full Stack Todo List App

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-57ABF8?style=for-the-badge&logo=zod&logoColor=white)](https://github.com/colinhacks/zod)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-36445A?style=for-the-badge&logo=zustand&logoColor=white)](https://github.com/pmndrs/zustand)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neon](https://img.shields.io/badge/Neon-00BFFF?style=for-the-badge&logo=neon&logoColor=white)](https://neon.tech/)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Environment Variables](#environment-variables)
- [🚀 Setup Instructions](#-setup-instructions)
- [Usage](#usage)

## Overview

Welcome to the Full Stack Todo List App! This is a modern web application designed to help you manage your todos efficiently with support for user authentication, prioritization, and status tracking. The app features both light and dark modes and a responsive design for seamless use on all devices.

## Features

- ✅ **User Authentication**: Sign up, Sign in, and Log out.
- 📝 **Todo Management**: Create, update, and delete todos.
- 🎯 **Priority and Status**: Set priority and status for each todo.
- 🌙 **Dark Mode**: Switch between light and dark themes.
- 📱 **Responsive Design**: Works well on all screen sizes.

## Technologies

### Frontend

- [Next.js](https://nextjs.org/): A React framework for building fast and user-friendly web applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly styling your application.
- [ShadCN UI](https://shadcn.dev/): A UI toolkit for building high-quality React components.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast, and scalable state-management solution using hooks.
- [React Hook Form](https://react-hook-form.com/): Performant, flexible, and extensible forms with easy-to-use validation.
- [Zod](https://github.com/colinhacks/zod): A TypeScript-first schema declaration and validation library.
- [React Icons](https://react-icons.github.io/react-icons/): A library of popular icons for React applications.

### Backend

- [Prisma](https://www.prisma.io/): A next-generation ORM for Node.js and TypeScript.
- [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database system.
- [Neon](https://neon.tech/): Serverless Postgres, an innovative cloud-native relational database for web scale.

## Environment Variables

Create a `.env` file in the root directory and add your database URL and secret key:

```env
SECRET_KEY=your_secret_key_here
DATABASE_URL="your_neon_database_url_here"
```

## 🚀 Setup Instructions

1. **Clone the repository:**
```sh
git clone https://github.com/amirrajj-dev/full-stack-todo-app.git
cd full-stack-todo-list-app
```

2. **Install dependencies:**
```sh
npm install
```

3. **Setup the database:**
```sh
npx prisma migrate dev
```

4. **Start the development server:**
```sh
npm run dev
```

## Usage

1- **Build the application:**
```sh
npm run build 
```

2- **Start the application:**
```sh
npm run start
```

and That's it now go to the http://localhost:3000 and see the project :) 

## The End🐟💙

Hop You Like It My Firend😉💙
