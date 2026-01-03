<div align="center">

# 📄 ResumeHub

### Professional CV Builder — 100% Client-Side

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Create beautiful, ATS-friendly resumes in minutes. No signup. No tracking. Your data never leaves your browser.**

[🚀 **Live Demo**](https://resumehub.vercel.app) • [📖 Documentation](#features) • [🐛 Report Bug](https://github.com/keltoummalouki/ResumeHub/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔒 **100% Private** | All data stored locally in your browser. Zero server communication. |
| 🎨 **Theme Support** | Light, Dark, and System themes out of the box |
| 📄 **High-Quality PDF** | Export print-ready PDFs at 4x resolution with metadata |
| 🖼️ **PNG Export** | High-resolution image export for social sharing |
| 💾 **JSON Backup** | Export/import your CV data for backup or transfer |
| ⚡ **Instant Start** | No account required. Start editing immediately. |
| 📱 **Responsive** | Perfect on desktop, tablet, and mobile |
| 🖨️ **Print Optimized** | CSS print styles for direct browser printing |

---

## 🛠️ Tech Stack

This project demonstrates modern frontend development best practices:

```
Frontend Framework    →  React 18 + TypeScript
Build Tool           →  Vite 5 (SWC)
Styling              →  Tailwind CSS + CSS Variables
UI Components        →  shadcn/ui + Radix Primitives
State Management     →  Zustand + localStorage persistence
PDF Generation       →  jsPDF + html2canvas
Form Validation      →  React Hook Form + Zod
Routing              →  React Router v6
Notifications        →  Sonner
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/keltoummalouki/ResumeHub.git

# Navigate to project
cd ResumeHub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (ThemeToggle, ExportMenu)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── ui/              # shadcn/ui primitives
│   └── [CV Components]  # CVHeader, Experience, Education, etc.
├── pages/
│   ├── LandingPage.tsx  # Marketing landing page
│   ├── EditorPage.tsx   # Main CV editor
│   └── NotFound.tsx     # 404 page
├── store/
│   └── cvStore.ts       # Zustand state management
├── types/
│   └── cv.ts            # TypeScript interfaces
├── data/
│   └── defaultCV.ts     # Default CV template
└── hooks/               # Custom React hooks
```

---

## 🎯 Key Technical Decisions

### Why Zustand over Redux/Context?
- Minimal boilerplate with full TypeScript support
- Built-in `persist` middleware for localStorage
- No providers needed, direct hook access
- ~1KB bundle size

### Why html2canvas + jsPDF?
- Client-side PDF generation (no server needed)
- Preserves exact visual layout
- High-resolution output (4x scale)
- Cross-browser compatibility

### Why No Backend?
- **Privacy**: User data never leaves the browser
- **Cost**: Free deployment on Vercel/Netlify
- **Speed**: No API latency, instant operations
- **Simplicity**: No infrastructure to maintain

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 📦 **Bundle Size**: ~180KB gzipped
- 🚀 **First Contentful Paint**: < 1s
- 💾 **Zero Network Requests** for data operations

---

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/keltoummalouki/ResumeHub)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/keltoummalouki/ResumeHub)

### Manual Build

```bash
npm run build
# Output in dist/ folder
```

---

## 🗺️ Roadmap

- [x] Core CV editor with live preview
- [x] PDF/PNG/JSON export
- [x] Theme toggle (Light/Dark/System)
- [x] localStorage persistence
- [ ] Multiple CV templates
- [ ] Inline editing (click to edit)
- [ ] Drag & drop section reordering
- [ ] Internationalization (FR/EN/AR)
- [ ] URL-based sharing (compressed)
- [ ] AI-powered content suggestions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Keltoum Malouki**

- Portfolio: [keltoummalouki.com](https://www.keltoummalouki.com/)
- GitHub: [@keltoummalouki](https://github.com/keltoummalouki)
- LinkedIn: [keltoummalouki](https://linkedin.com/in/keltoummalouki)

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ in Morocco

</div>