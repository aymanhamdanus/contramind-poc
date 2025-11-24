# CONTRAMIND POC - MASTER RULES
**Version:** 1.6 (Finalized Strategy)

## 1. TECH STACK (STRICT)
- **Frontend:** React 19 (Vite)
- **Backend:** Node.js (Express via Vercel Serverless)
- **Database:** Supabase (Free Tier) - *Do NOT use SQLite*
- **AI Model:** Google Gemini 3 Pro (via Google AI Studio)
- **Routing:** Wouter
- **Styling:** Tailwind CSS 4
- **Hosting:** Vercel

## 2. BRANDING & DESIGN (NON-NEGOTIABLE)
- **Primary Color:** Deep Navy `#0F172A` (Headers, Buttons, Borders)
- **Secondary Color:** Sky Blue `#38BDF8` (Accents, Active States)
- **Background:** White `#FFFFFF` with Slate 50 `#F8FAFC` surfaces
- **Typography:**
  - **Headings/Logo:** "Space Grotesk" (Google Fonts)
  - **English Body:** "Inter" (Google Fonts)
  - **Arabic Body:** "Cairo" (Google Fonts)
- **Logo Assets:**
  - File: `/public/contramind-horizontal-transparent.svg`
  - **Constraint:** Always apply `h-12 md:h-16 w-auto` to prevent sizing bugs.

## 3. CRITICAL FEATURES
- **BILINGUAL NATIVE:**
  - Auto-detect Arabic input.
  - Apply `dir="rtl"` and `font-arabic` classes automatically.
  - Error messages must be bilingual.
- **LEGAL SAFETY:**
  - **Disclaimer:** Fixed top banner "POC Version - Not Legal Advice".
  - **Input Limits:** Max 5,000 characters per message.
  - **Consent:** "Quality Monitoring" notice on login.
- **PERSISTENCE:**
  - Save chat to `localStorage` (browser) AND Supabase (database).
  - "Copy to Clipboard" button for export.

## 4. FOLDER STRUCTURE

```
/root
  /src
    /components         <-- Reusable UI (Button, Input, ChatBubble)
    /lib                <-- Supabase client & Utils
    /pages              <-- Login.jsx, Chat.jsx
    App.jsx             <-- Wouter Routes
    index.css           <-- Tailwind Directives
  /public               <-- contramind-horizontal-transparent.svg
  CONTRAMIND_RULES.md   <-- THIS FILE
```

## 5. DEVELOPMENT RULES
1. **No Bloat:** Do not install tRPC, Drizzle, or extra UI libraries.
2. **Mobile First:** All UI must work on iPhone/Android (Responsive).
3. **Security:** Never expose API keys on the client. Use Vercel Environment Variables.
4. **Error Handling:** Never show raw code errors. Show user-friendly messages in the correct language.

## 6. PHASE STATUS
- **Phase 1:** Foundation & Login (COMPLETE)
- **Phase 2:** Chat UI & Bilingual Logic (NEXT)
- **Phase 3:** AI Integration (Gemini 3 Pro)
