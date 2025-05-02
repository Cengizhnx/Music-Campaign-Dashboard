# 🎵 Music Campaign Admin Dashboard

A modern and responsive admin panel for managing music marketing campaigns. Built with Next.js 13 App Router, Supabase, tRPC, and Tailwind CSS.

---

## ✨ Features

- ✅ User authentication via Supabase (email + password)
- ✅ Dashboard listing all campaigns in a table view
- ✅ Campaign creation with image upload
- ✅ Campaign editing with image update
- ✅ Campaign deletion with confirmation
- ✅ Sidebar navigation and topbar user menu
- ✅ Avatar + email dropdown with logout
- ✅ Fully responsive UI for all screen sizes

---

## ⚙️ Technologies

- [Next.js 13 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase (Auth + Storage + PostgreSQL)](https://supabase.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [tRPC](https://trpc.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Installation

```bash
git clone https://github.com/Cengizhnx/Music-Campaign-Dashboard
cd music-campaign-dashboard
npm install
```

---

## 🧪 Environment Variables

Create a `.env.local` file with the following values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

---

## 📦 Scripts

```bash
npm run dev              # Start development server
npx drizzle-kit push     # Push schema to database
```

---

## 🌐 Live Demo

🔗 https://music-campaign-dashboard.vercel.app

> You can easily deploy this project on [vercel.com](https://vercel.com/).

---

## 📝 License

MIT