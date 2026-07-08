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
  ---
### Entry 5: Initialize Mock Book Database
* **Prompt Written:**  
  *"Create a file named `src/data/books.js` containing an array of 8 dark fantasy book objects... [Full details from your prompt]"*
* **Purpose:**  
  To create a local data source for the BookVault library grid.
* **Output Received:**  
  A structured JavaScript array with 8 objects, each containing fantasy lore, genres, and Unsplash image links.
* **Changes Made After Review:**  
  Created `src/data/books.js`, exported the data, and verified the structure is ready for the `BookGrid` component.
  ---
### Entry 6: Interactive Book Grid & Genre Filtering
* **Prompt Written:**  
  *"Create a React component `src/components/BookGrid.js` using Tailwind CSS and Lucide React. Import book data, include a top filter bar with category pills, and render responsive cards showing cover image, title, author, rating, and sub-genre tag. Style with dark glassmorphism and red glowing borders on hover."*
* **Purpose:**  
  To build the core library interface where users can browse and filter the mock database.
* **Output Received:**  
  A functional React component using `useState` to filter the mapped array of books based on genre selection.
* **Changes Made After Review:**  
  Integrated `<BookGrid />` into `App.js` directly below the Hero section and adjusted z-index for layering.
  ---
### Entry 7: Lore Reader Modal
* **Prompt Written:**  
  *"Create a React component `src/components/LoreModal.js` using Framer Motion for entrance animations. It must accept a `book` prop and an `onClose` callback, displaying the full book details over a blurred backdrop."*
* **Purpose:**  
  To allow users to read the detailed lore of a specific book without leaving the library page.
* **Output Received:**  
  A modal component utilizing Framer Motion's `AnimatePresence` for smooth mounting/unmounting.
* **Changes Made After Review:**  
  Updated `BookGrid.js` to manage `selectedBook` state and render the `<LoreModal>` conditionally upon clicking the 'Read Lore' button.