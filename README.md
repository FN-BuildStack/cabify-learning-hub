# Cabify Training Hub Frontend

An automated, highly interactive frontend application designed to optimize and streamline the training, onboarding, and evaluation pipeline for Cabify personnel. This project modernizes and automates a legacy manual training framework into a seamless, self-paced digital learning experience.

Built using **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, the platform implements an interactive dashboard, roleplay simulation engines, automated assessment matrices, and structured visual modules adhering to Cabify's brand guidelines.

---

## Key Features & Architecture

* **Automated Training Engine:** Replaces static or fragmented legacy workflows with a state-driven instructional architecture that guides users through continuous learning modules.
* **Interactive Simulation Sandbox:** Features custom-built simulation screens (`Step1Simulation.tsx`, `Screen4Simulation.tsx`) that mimic real-world operational scenarios, allowing personnel to practice procedural compliance in a risk-free sandbox.
* **Automated Assessment Framework:** Integrates synchronous quiz modules (`Screen6Quiz.tsx`) with immediate validation, offering interactive scoring, structured feedback loops, and metrics calculation.
* **Modular Dashboard UI:** Incorporates a robust navigation interface (`NavigationBar.tsx`, `Dashboard.tsx`, `ModuleView.tsx`) paired with granular progress indicators (`ProgressBar.tsx`) to track user advancement dynamically across training phases.
* **Enterprise-Grade UI Components:** Utilizes a highly accessible, decoupled primitive system powered by **Shadcn UI** and Radix UI (accessible via `src/app/components/ui/`), providing highly responsive tables, dialogs, accordions, and alerts.

---

## Technology Stack

* **Runtime & Build Toolchain:** Node.js, Vite (Lightning-fast HMR and optimized production bundling)
* **Language Frontend:** TypeScript (Strict typing for structural integrity and reliable component props)
* **Component Architecture:** React 18 (Functional components with hooks for local state management)
* **Styling Engine:** Tailwind CSS + PostCSS (Utility-first styling with structured design token configurations)
* **Component Library:** Shadcn UI Primitives (Radix UI + Tailwind styling for fully accessible interfaces)

---

## Directory Structure

```text
Cabify_Auto_Project/
├── .github/workflows/       # CI/CD deployment pipelines (e.g., Azure App Service)
├── public/                  # Static assets (Vector logos, training PDFs, and instructional media)
│   ├── document_1.pdf       # Core training manuals
│   ├── video_1.mp4          # Interactive scenario multimedia assets
│   └── logo.svg             # Cabify brand asset
├── src/
│   ├── app/
│   │   ├── components/      # Functional application layout and module screens
│   │   │   ├── ui/          # Atomic UI primitives (buttons, dialogs, charts, inputs)
│   │   │   ├── figma/       # Design system fallback and high-fidelity integrations
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ModuleView.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Screen1Welcome.tsx
│   │   │   ├── Screen4Simulation.tsx
│   │   │   └── Screen6Quiz.tsx
│   │   └── App.tsx          # Application entry point & core layout routing
│   ├── main.tsx             # DOM injection layer
│   └── styles/              # Design tokens, tailwind specifications, and typography
├── package.json             # Node package manifest and script runners
├── tailwind.config.js       # Design token configurations and custom animations
└── vite.config.ts           # Bundler environment configurations

```

---

## Getting Started

### Prerequisites

Ensure you have the following software baselines installed locally:

* **Node.js:** v18.x or higher (LTS recommended)
* **npm:** v9.x or higher

### Installation

1. Clone the repository to your local directory:
```bash
git clone [https://github.com/FN-BuildStack/cabify-automation-challenge.git](https://github.com/FN-BuildStack/cabify-automation-challenge.git)
cd cabify-automation-challenge

```


2. Install the required Node dependencies using the package manager:
```bash
npm install

```



### Development Environment

To initiate the local development server with Hot Module Replacement (HMR) and active component state tracking:

```bash
npm run dev

```

Open your browser and navigate to `http://localhost:5173` (or the specific port outputted by Vite) to interact with the application.

### Compilation & Production Deployment

To compile the application into statically optimized assets (`HTML5`, `CSS3`, compiled `JavaScript`) inside the `/dist` directory for production deployment:

```bash
npm run build

```

To preview the production build locally before pushing to hosting environments:

```bash
npm run preview

```

---

## Signal and Component Lifecycles

1. **Onboarding:** The user is greeted by `Screen1Welcome.tsx`, initializing user contextual metadata.
2. **Module Progression:** `Dashboard.tsx` fetches the designated training index. As components complete execution, updates are dispatched to `ProgressBar.tsx` to reflect active milestones.
3. **Simulation Loop:** `Screen4Simulation.tsx` dynamically structures conditional steps (`Step1Simulation.tsx`), evaluating interactive responses from the user against predefined compliance patterns.
4. **Evaluation & Output:** `Screen6Quiz.tsx` scores performance metrics, which are automatically logged and routed to `Screen5Feedback.tsx` to generate an individual training evaluation report.

---

## License

This project is distributed under the standard guidelines detailed within the LICENSE architecture. All intellectual property, media assets, logos, and operational workflows remain proprietary to their respective authors and stakeholders.
