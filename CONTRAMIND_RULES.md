# CONTRAMIND POC - MASTER RULES

## 1. TECH STACK
- **Frontend:** React (Vite)
- **Backend:** Vercel Serverless Functions (when needed)
- **Database:** Supabase (Free Tier)
- **Styling:** Tailwind CSS
- **Font:** "Cairo" (Google Fonts) for Arabic, "Inter" for English
- **Routing:** Wouter (lightweight React router)

## 2. FOLDER STRUCTURE (STRICT)
```
/root
  /src
    /lib                <-- Supabase client & Helpers
    /components         <-- Reusable UI parts
    /pages              <-- Page components (Login, Chat)
    main.jsx            <-- React entry point
    App.jsx             <-- Routes
    index.css           <-- Global CSS & Tailwind
  /public               <-- Static assets
  index.html            <-- HTML entry (with Google Fonts)
  package.json          <-- Dependencies
  tailwind.config.js    <-- Tailwind + Font config
  postcss.config.js     <-- PostCSS config
  vite.config.js        <-- Vite config
  vercel.json           <-- Vercel deployment config
  CONTRAMIND_RULES.md   <-- THIS FILE (Source of Truth)
```

## 3. CRITICAL REQUIREMENTS
- **BILINGUAL:** Interface must auto-detect Arabic and switch to RTL (Right-to-Left)
- **SAFETY:** Input limit 5,000 chars. "Not Legal Advice" banner always visible
- **BRANDING:** Use clean legal blue/white colors
- **NO BLOAT:** Only essential dependencies (React, Vite, Tailwind, Wouter, Supabase)
- **LEGAL DISCLAIMERS:** Must be visible in both Arabic and English

## 4. DESIGN PRINCIPLES
- **Colors:** Professional legal blue (#1E40AF) and white (#FFFFFF)
- **Typography:** Cairo for Arabic (professional legal look), Inter for English
- **Layout:** Clean, minimal, focused on chat interface
- **Mobile-First:** Responsive design, works on all devices

## 5. DEPENDENCIES (MINIMAL)
**Production:**
- react
- react-dom
- wouter (routing)
- @supabase/supabase-js

**Development:**
- vite
- @vitejs/plugin-react
- tailwindcss
- postcss
- autoprefixer

## 6. DEVELOPMENT WORKFLOW
1. Always check this file before starting any task
2. Follow folder structure strictly
3. Keep dependencies minimal
4. Test bilingual support (Arabic/English) for every feature
5. Verify mobile responsiveness

## 7. SECURITY RULES
- API keys NEVER exposed in client code
- Input validation: 5,000 character limit
- Rate limiting: 50 messages per session
- Sanitize all user inputs

## 8. CODE STANDARDS
- Use JSX (not TypeScript) for simplicity
- Component names: PascalCase
- File names: PascalCase for components, camelCase for utilities
- CSS: Tailwind utilities preferred, minimal custom CSS
- Comments: Explain WHY, not WHAT

## 9. TESTING CHECKLIST
Before marking any feature complete:
- [ ] Works in Arabic (RTL layout)
- [ ] Works in English (LTR layout)
- [ ] Mobile responsive
- [ ] Legal disclaimers visible
- [ ] Input validation working
- [ ] Error handling implemented

## 10. DEPLOYMENT
- **Platform:** Vercel
- **Domain:** poc.contramind.ai (to be configured)
- **Environment Variables:** Managed via Vercel dashboard

## 11. PHASE-BASED DEVELOPMENT
- **Phase 1:** Foundation (folder structure, soft login) ← CURRENT
- **Phase 2:** Chat UI (bilingual support, legal features)
- **Phase 3:** AI Integration (Gemini API, Supabase logging)
- **Phase 4:** Testing & Polish

---

**Last Updated:** November 24, 2025
**Current Phase:** Phase 1 - Foundation (Clean Rebuild)
