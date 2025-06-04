# Task List: EMS Prompt Generator MVP

## Relevant Files

- `app/page.tsx` - Main application page with two-column layout
- `app/layout.tsx` - Root layout with TailwindCSS setup
- `app/globals.css` - TailwindCSS v4 configuration with South African theme colors
- `components/ui/` - Reusable UI components directory (Button, Dropdown, etc.)
- `components/forms/` - Form-specific components directory (InputPanel, etc.)
- `components/InputPanel.tsx` - Left column component with all form controls
- `components/PromptPreview.tsx` - Right column component with generated prompt display
- `components/QualityScore.tsx` - Quality scoring display component
- `lib/data/caps-curriculum.json` - CAPS curriculum dataset for grades 7-9, term 1
- `lib/utils/prompt-generator.ts` - Core prompt generation logic
- `lib/utils/quality-scorer.ts` - Quality scoring utility functions
- `lib/utils/constants.ts` - Application constants and configuration values
- `pages/api/quality-score.ts` - API endpoint for OpenAI quality scoring
- `types/index.ts` - TypeScript type definitions for the entire application
- `postcss.config.js` - PostCSS configuration with TailwindCSS v4
- `next.config.js` - Next.js configuration with app directory support
- `.env.example` - Environment variables template with OpenAI API key configuration
- `package.json` - Project dependencies and scripts

### Notes

- This is a client-side focused application with minimal backend requirements
- OpenAI API integration is only used for quality scoring, not prompt generation
- No authentication or database storage required for MVP
- Using TailwindCSS v4 with built-in autoprefixer support
- Complete project folder structure established with TypeScript types and constants

## Tasks

- [x] 1.0 Project Setup and Configuration
  - [x] 1.1 Initialize Next.js 14 project with TypeScript and App Router
  - [x] 1.2 Install and configure TailwindCSS with PostCSS and Autoprefixer
  - [x] 1.3 Install required dependencies (axios, @headlessui/react, @heroicons/react, framer-motion, zustand)
  - [x] 1.4 Create and configure `next.config.js` with app directory support
  - [x] 1.5 Set up environment variables file (.env.local) for OpenAI API key
  - [x] 1.6 Configure TailwindCSS with South African flag colors (sa-green, sa-blue, sa-gold, etc.)
  - [x] 1.7 Create basic project folder structure (components, lib, types, pages/api)

- [x] 2.0 Create CAPS Curriculum Dataset
  - [x] 2.1 Create `lib/data/caps-curriculum.json` file with proper JSON structure
  - [x] 2.2 Add Grade 7 Term 1 topics: "The Economy", "Needs and Wants", "Circular Flow", "Markets"
  - [x] 2.3 Add Grade 8 Term 1 topics: "Production", "Forms of Ownership", "Labour", "Markets"
  - [x] 2.4 Add Grade 9 Term 1 topics: "Economic Systems", "Business Planning", "Financial Literacy", "Entrepreneurship"
  - [x] 2.5 Include learning objectives, concepts, and duration for each topic
  - [x] 2.6 Create curriculum data loading utility function in `lib/utils/curriculum.ts`

- [x] 3.0 Build Core User Interface Components
  - [x] 3.1 Create `app/layout.tsx` with basic HTML structure and TailwindCSS imports
  - [x] 3.2 Create `app/page.tsx` with two-column layout (40% left, 60% right)
  - [x] 3.3 Build `components/ui/Dropdown.tsx` reusable component with proper TypeScript types
  - [x] 3.4 Build `components/ui/Button.tsx` with different variants (primary, secondary, copy)
  - [x] 3.5 Create `components/InputPanel.tsx` with all required form controls (grade, topic, learning object type, etc.)
  - [x] 3.6 Create `components/PromptPreview.tsx` with text area for prompt display
  - [x] 3.7 Add proper TypeScript interfaces in `types/index.ts` for all form data and curriculum structure

- [x] 4.0 Implement Prompt Generation Engine
  - [x] 4.1 Create `lib/utils/prompt-generator.ts` with base template structure
  - [x] 4.2 Implement dynamic placeholder replacement function (replace [Grade], [Topic], etc.)
  - [x] 4.3 Create different prompt templates for each learning object type (Lesson Plan, Quiz, Worksheet, etc.)
  - [x] 4.4 Add logic to auto-generate learning objectives based on selected grade and topic
  - [x] 4.5 Implement scaffolding level descriptions (High Support, Moderate Guidance, Independent Application)
  - [x] 4.6 Add Bloom's taxonomy level integration with appropriate pedagogical guidance
  - [x] 4.7 Include South African context insertion in all generated prompts

- [x] 5.0 Add Quality Scoring System
  - [x] 5.1 Create `pages/api/quality-score.ts` API endpoint for OpenAI integration
  - [x] 5.2 Set up OpenAI API client with proper error handling and rate limiting
  - [x] 5.3 Implement 5-point scoring system (CAPS alignment: 2pts, Bloom's: 1pt, Scaffolding: 1pt, SA context: 1pt)
  - [x] 5.4 Create `lib/utils/quality-scorer.ts` with scoring logic and feedback generation
  - [x] 5.5 Build `components/QualityScore.tsx` with color-coded score display (Red: 1-2, Yellow: 3, Green: 4-5)
  - [x] 5.6 Add CAPS compliance indicator (✓ or ✗) and improvement suggestions
  - [x] 5.7 Implement loading states and error handling for API calls

- [x] 6.0 Implement Copy-to-Clipboard and User Interactions
  - [x] 6.1 Add copy-to-clipboard functionality using navigator.clipboard API
  - [x] 6.2 Implement visual feedback for copy action (button changes to "Copied!" for 2 seconds)
  - [x] 6.3 Add real-time prompt updates when any form field changes
  - [x] 6.4 Implement form validation with helpful error messages for required fields
  - [x] 6.5 Add loading states for quality scoring (max 3 seconds with spinner)
  - [x] 6.6 Handle graceful fallback when OpenAI API is unavailable
  - [x] 6.7 Add keyboard navigation support for accessibility

- [ ] 7.0 Styling, Responsiveness, and Final Polish
  - [x] 7.1 Apply professional education-focused color scheme with SA flag accent colors
  - [x] 7.2 Implement fully responsive design for mobile, tablet, and desktop
  - [x] 7.3 Add proper typography with clear, readable fonts (Inter font family)
  - [x] 7.4 Implement proper spacing and layout with generous whitespace
  - [x] 7.5 Add intuitive icons for copy, quality score, and dropdown controls
  - [x] 7.6 Ensure proper contrast ratios for accessibility compliance
  - [x] 7.7 Add hover states, focus states, and smooth transitions
  - [x] 7.8 Implement error boundary component for graceful error handling
  - [x] 7.9 Final testing across different browsers and devices
  - [x] 7.10 Performance optimization and code cleanup 