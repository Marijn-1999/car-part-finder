# ClassicParts Finder

A focused web application that helps users discover classic car parts through an AI-driven chat interface. Built with React and TypeScript, enhanced by prompt engineering to deliver precise, context-aware search results from multiple platforms like Marktplaats and eBay. The app features a responsive UI with detailed part views and seller information, designed for classic car enthusiasts and restorers.

---

## Features

- AI-powered chat search tuned for classic auto parts using prompt engineering  
- Detailed modal views for parts including images, specs, seller ratings, and descriptions  
- Interactive UI with wishlist, external platform linking, and contact seller options  
- Defensive coding to handle incomplete or missing data gracefully  
- Responsive layout with clean, component-based architecture  

---

## Used Technologies

- **Frontend:** React, TypeScript, Tailwind CSS  
- **Icons:** Lucide React  
- **AI Integration:** Prompt engineering for relevance and precision  
- **Architecture:** Modular, component-based with strict typing  

---

## Installation

### Requirements

- Node.js version 18 or newer  
- Either `npm` or `pnpm` package manager  

### Steps

1. Clone this repository and navigate to the project directory  
2. Run `npm install` (or `pnpm install`) to install dependencies  
3. Start the development server with `npm run dev`  
4. Open your browser and go to `http://localhost:3000` to use the app  

---

## Usage

Use the chat interface to search for classic car parts by describing what you need. The AI will respond with relevant part options, complete with images and detailed specs.

You can:

- Click on a part to open the detail modal  
- View multiple images and detailed specifications  
- See seller info including ratings and membership duration  
- Contact the seller or add the part to your wishlist  
- Open the listing directly on the original platform  

---

## Project Structure Overview

components/ → Reusable UI elements such as PartDetailsModal, buttons, badges
pages/ → Main views including the chat and search interface
utils/ → Helper functions, including prompt construction for AI queries
types/ → TypeScript interfaces for strict typing of parts and seller data

yaml
Copy
Edit

Styling is managed using **Tailwind CSS** for fast, responsive UI development. Icons are provided by **Lucide React**.

---

## Contributing

If you’d like to contribute to this project:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Make your changes with clear and descriptive commits  
4. Push your branch  
5. Open a pull request for review  

Please follow the existing code style and include meaningful commit messages.

---

## Troubleshooting / FAQ

### The part images or details don’t load

Check that the part object passed to the modal is fully populated. The app uses optional chaining to avoid crashes, but incomplete data may affect display.

### The AI responses are too vague or generic

Refine the prompt engineering in `utils/prompt.ts` to better constrain the AI’s context and improve relevance.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Changelog

### Version 1.0.0

- Initial release with AI-driven classic parts search  
- Detailed part modal with images, specs, and seller info  
- Prompt engineering to improve AI answer relevance  
- Responsive, accessible UI built with React and Tailwind CSS  
- Wishlist and contact seller interaction placeholders  

---

## Educational Context

This project was created as a learning initiative focused on:

- Iterative development with prompt-based AI tuning  
- Building resilient, user-friendly UI components in React  
- Applying TypeScript for maintainability and reliability  
- Documenting development processes and user guidance
