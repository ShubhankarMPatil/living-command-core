# Living Command Core

**Living Command Core** is a modern, interactive web application built with React and TypeScript, focused on clean UI composition, scalable frontend architecture, and fast development workflows. The project showcases practical usage of contemporary frontend tooling with an emphasis on maintainability, developer experience, and design consistency.

## Live Demo

https://living-command-core.vercel.app/

---

## Tech Stack

* **Vite** – fast build tooling and development server
* **React** – component-based UI development
* **TypeScript** – type safety and improved maintainability
* **Tailwind CSS** – utility-first styling
* **shadcn/ui** – accessible, reusable UI components

This stack prioritizes performance, composability, and long-term scalability over framework novelty.

---

## Project Structure

```
living-command-core/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and shared logic
│   └── main.tsx        # Application entry point
├── public/
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

The structure is intentionally opinionated but familiar, making it easy for new contributors to onboard quickly.

---

## Getting Started

### Prerequisites

* Node.js (recommended via nvm)
* npm or compatible package manager

### Installation

```sh
git clone https://github.com/ShubhankarMPatil/living-command-core.git
cd living-command-core
npm install
```

### Development Server

```sh
npm run dev
```

The app will be available locally with hot module replacement enabled.

### Production Build

```sh
npm run build
npm run preview
```

---

## Design & Engineering Notes

* **Component-first architecture** to reduce coupling and encourage reuse
* **Type-driven development** using TypeScript instead of runtime checks
* **Utility-first styling** to avoid bloated CSS abstractions
* **Accessible UI primitives** via shadcn/ui rather than custom reinvented components

This project favors explicitness and clarity over abstraction-heavy patterns that tend to slow iteration.

---

## Potential Extensions

* State management layer (Zustand or Redux Toolkit) if complexity increases
* Backend/API integration
* Authentication and role-based access
* Testing setup (Vitest + Testing Library)
* CI pipeline for linting and builds

These were intentionally excluded to keep the core focused and readable.

---

## Author

**Shubhankar M Patil**
GitHub: [https://github.com/ShubhankarMPatil](https://github.com/ShubhankarMPatil)

---

## License

MIT License
