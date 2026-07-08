# 🤖 BookVault — AI Prompt Engineering Log

This log documents the AI collaboration process, prompt strategies, outputs received, and refinements applied during the development of **BookVault**.

---

### Entry 1: Dark Fantasy Hero Assets & Layout Setup
* **Prompt Written:**  
  *"A hooded figure before a towering library of glowing crimson tomes, dark fantasy witch on tower, armored warrior walking to library, sorceress reading glowing tome."*
* **Purpose:**  
  Generate layered character and background assets to create an atmospheric landing page for a dark fantasy book platform.
* **Output Received:**  
  High-resolution image renders for the background and character elements (`witch.png`, `warrior.png`, `sorceress.png`).
* **Refinement Made:**  
  Saved image assets into `client/src/assets/` and integrated them into `Hero.js` as absolute position elements.

---

### Entry 2: Seamless CSS Masking & Background Blending
* **Prompt Written:**  
  *"How to blend rectangular images into a black background seamlessly in React using CSS masks?"*
* **Purpose:**  
  Eliminate harsh, rectangular borders around character renders on top of the hero background image.
* **Output Received:**  
  CSS snippets demonstrating `radial-gradient` and `linear-gradient` `maskImage` properties.
* **Refinement Made:**  
  Applied custom inline styles (`maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)'`) to character components so they smoothly fade into the background sky and ground.

---

### Entry 3: Interactive Navbar Micro-Animations & Crest Modal
* **Prompt Written:**  
  *"Can you add Framer Motion code to make the logo gently pulse or spin when hovered, and make it expand into a large preview modal when clicked?"*
* **Purpose:**  
  Enhance user engagement and UI polish by making the brand emblem interactive.
* **Output Received:**  
  Framer Motion code snippets using `motion.img` with `whileHover` rotation/scale props and an `AnimatePresence` modal overlay.
* **Refinement Made:**  
  Updated `Navbar.js` with spring physics transitions and a full-screen backdrop modal with a large pulsing crest view upon clicking the logo.

---

### Entry 4: Professional Documentation & Roadmap Structuring
* **Prompt Written:**  
  *"Convert my project setup into a professional README.md with problem statement, target users, technology stack, and phase-wise roadmap."*
* **Purpose:**  
  Structure repository documentation to meet academic/recruiter standards.
* **Output Received:**  
  Formatted Markdown template covering project overview, target audience, folder structure, and development phases.
* **Refinement Made:**  
  Pushed updated `README.md` to GitHub main branch to showcase structured planning.