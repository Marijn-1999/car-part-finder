ClassicParts Finder
A focused web application that helps users discover classic car parts through an AI-driven chat interface. Built with React and TypeScript, enhanced by prompt engineering to deliver precise, context-aware search results from multiple platforms like Marktplaats and eBay. The app features a responsive UI with detailed part views and seller information, designed for classic car enthusiasts and restorers.

Features
AI-powered chat search tuned for classic auto parts using prompt engineering

Detailed modal views for parts including images, specs, seller ratings, and descriptions

Interactive UI with wishlist, external platform linking, and contact seller options

Defensive coding to handle incomplete or missing data gracefully

Responsive layout with clean, component-based architecture

Used Technologies
Application Technologies





Development and Build Tools




Installation
Requirements:
Node.js version 18 or newer

npm or pnpm package manager

Steps:
Clone this repository and navigate to the project directory

Run npm install (or pnpm install) to install dependencies

Start the development server with npm run dev

Open http://localhost:3000 in your browser to use the app

Usage
Use the chat interface to search for classic car parts by describing what you need. The AI will respond with relevant part options, complete with images and detailed specs.

Click on a part to open the detail modal, where you can:

View multiple images and detailed specifications

See seller info with ratings and membership duration

Contact the seller or add the part to your wishlist

Open the part listing directly on the original platform

Project Structure Overview
components/ – Reusable UI parts such as PartDetailsModal, buttons, and badges

pages/ – Main views including the chat and search interface

utils/ – Helper functions, including prompt construction for AI queries

types/ – TypeScript interfaces for strict typing of parts and seller data

Styling is primarily handled with Tailwind CSS for rapid, responsive UI development, while icons come from the Lucide React library.

Contributing
Contributions are welcome! To contribute:

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Make your changes with clear and descriptive commits

Push your branch and open a pull request for review

Please follow the existing code style and include meaningful commit messages.

Troubleshooting / FAQ
The part images or details don’t load
Check that the part object passed to the modal is fully populated; the app uses optional chaining to avoid crashes when data is missing but incomplete data may affect display.

The AI responses are too vague or generic
This can often be improved by refining the prompt engineering in the utils/prompt.ts file to better constrain the AI’s context.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Changelog
Version 1.0.0
Initial release with AI-driven classic parts search

Detailed part modal with images, specs, and seller info

Prompt engineering to improve AI answer relevance

Responsive, accessible UI built with React and Tailwind CSS

Wishlist and contact seller interaction placeholders

Educational Context
Created as part of a learning project to explore integrating AI with modern web development, focusing on:

Iterative development with prompt-based AI tuning

Building resilient, user-friendly UI components in React

Applying TypeScript for maintainability and reliability

Documenting development processes and user guidance
