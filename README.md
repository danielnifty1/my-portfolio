# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a minimalist, Jony Ive-inspired design with dark mode support.

## ✨ Features

- **Modern Design**: Clean, minimalist design inspired by Jony Ive's aesthetic principles
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes
- **TypeScript**: Full type safety with strict mode enabled
- **Performance**: Built with Next.js 14 App Router for optimal performance
- **SEO Optimized**: Proper metadata and semantic HTML structure

## 🚀 Sections

### Home
- Hero section with name, tagline, and call-to-action buttons
- Smooth scroll navigation
- Download resume functionality

### About
- Professional introduction and bio
- Profile image placeholder
- Key achievements and experience highlights

### Skills
- Technical and soft skills showcase
- Proficiency levels with visual indicators
- Categorized skill organization

### Languages
- Programming languages and tools
- Proficiency percentages with progress bars
- Category-based organization (Frontend, Backend, Database, Tools)

### Projects Done
- Completed project showcase
- Tech stack display
- GitHub and demo links
- Project categories and descriptions

### Projects To Do
- Project roadmap with priority levels
- Planned tech stacks
- Future learning goals

### Contact
- Contact form with validation
- Social media links
- Professional information
- Form submission handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Components**: Custom UI components with class-variance-authority

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main page with all sections
├── components/
│   ├── sections/            # Section components
│   │   ├── hero.tsx         # Hero section
│   │   ├── about.tsx        # About section
│   │   ├── skills.tsx       # Skills section
│   │   ├── languages.tsx    # Languages section
│   │   ├── projects-done.tsx # Completed projects
│   │   ├── projects-todo.tsx # Project roadmap
│   │   └── contact.tsx      # Contact form
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx       # Button component
│   │   └── badge.tsx        # Badge component
│   ├── navbar.tsx           # Navigation component
│   ├── footer.tsx           # Footer component
│   └── theme-provider.tsx   # Theme context provider
├── data/                    # Data files
│   ├── skills.ts            # Skills data
│   ├── languages.ts         # Languages data
│   └── projects.ts          # Projects data
└── lib/
    └── utils.ts             # Utility functions
```

## 🎨 Design System

### Colors
- **Primary**: Slate color palette for text and backgrounds
- **Accent**: Blue color palette for highlights and CTAs
- **Semantic**: Red, yellow, green for status indicators

### Typography
- **Font Family**: Inter (sans-serif) for body text
- **Monospace**: JetBrains Mono for code elements
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Subtle shadows with hover effects
- **Buttons**: Multiple variants with consistent styling
- **Forms**: Clean inputs with validation states
- **Badges**: Color-coded status indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cursor-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization

### Personal Information
Update the following files with your information:
- `src/data/skills.ts` - Your skills and expertise
- `src/data/languages.ts` - Programming languages and proficiency
- `src/data/projects.ts` - Your projects (completed and planned)
- `src/components/sections/hero.tsx` - Name, tagline, and bio
- `src/components/sections/about.tsx` - About section content
- `src/components/footer.tsx` - Social media links

### Styling
- Modify `tailwind.config.js` for color scheme changes
- Update `src/app/globals.css` for custom CSS
- Adjust component classes for layout modifications

### Images
- Replace profile image placeholders with actual images
- Add project screenshots to the `public/projects/` directory
- Update image paths in the data files

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any environment-specific configurations:

```env
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

### SEO
Update metadata in `src/app/layout.tsx`:
- Site title and description
- Open Graph tags
- Twitter card information
- Author information

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

- Automatic system preference detection
- Manual toggle in the navigation
- Smooth transitions between themes
- Consistent color schemes for both modes

## 🚀 Performance Features

- Next.js 14 App Router
- Optimized images and fonts
- CSS-in-JS with Tailwind
- Lazy loading for sections
- Smooth scroll animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
