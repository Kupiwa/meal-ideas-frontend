# 🍳 Make a Meal - Frontend

**Transform your ingredients into delicious meals with AI**

Make a Meal is an intelligent recipe suggestion application that helps you discover what you can cook with the ingredients you have in your kitchen. Simply input your available ingredients, and let AI suggest creative meal ideas with detailed recipes and cooking instructions.

![Make a Meal Demo](./public/screenshot.png)

🔗 **Live Demo**: [https://meal-ideas-frontend.vercel.app](https://meal-ideas-frontend.vercel.app)

🔗 **Backend Repository**: [https://github.com/Kupiwa/meal-ideas](https://github.com/Kupiwa/meal-ideas)

## ✨ Features

- 🤖 **AI-Powered Suggestions**: Get 3 personalized meal suggestions based on your available ingredients
- 📝 **Detailed Recipes**: Step-by-step cooking instructions with ingredient quantities
- 🔄 **Smart Substitutions**: Ask for ingredient alternatives if you're missing something
- 💬 **Interactive Follow-ups**: Simplify recipes or get cooking tips on the fly
- 📱 **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation support
- 🎨 **Beautiful UI**: Modern, clean interface with smooth animations
- 📖 **Markdown Rendering**: Recipes displayed with beautiful formatting

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Markdown** - Beautiful markdown rendering with custom components
- **Remark GFM** - GitHub Flavored Markdown support

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Kupiwa/meal-ideas-frontend.git
cd meal-ideas-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, use:
```env
VITE_API_URL=https://meal-ideas.onrender.com/api
```

## 🎮 Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
meal-ideas-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with branding
│   │   ├── IngredientInput.jsx # Ingredient input and management
│   │   ├── MealSuggestions.jsx # Meal cards grid display
│   │   ├── RecipeDetail.jsx    # Detailed recipe view with markdown
│   │   └── LoadingSpinner.jsx  # Reusable loading component
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles and Tailwind
├── public/
│   └── screenshot.png          # App screenshot for README
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env                        # Environment variables (not in git)
```

## 🎨 Component Architecture

### Modular Design
The application follows a component-based architecture with clear separation of concerns:

**Header**
- Displays app branding and tagline
- Responsive layout for mobile and desktop

**IngredientInput**
- Manages ingredient list state
- Handles user input with validation
- Displays added ingredients with remove functionality
- Triggers meal suggestion API call

**MealSuggestions**
- Displays meal cards in a grid layout
- Shows meal metadata (prep time, servings, ingredients)
- Handles click events to fetch detailed recipes
- Accessible keyboard navigation

**RecipeDetail**
- Renders markdown-formatted recipes beautifully
- Custom markdown components for headings, lists, and text
- Interactive follow-up question buttons
- Loading states during API calls

**LoadingSpinner**
- Reusable loading indicator
- Configurable size variants
- ARIA labels for accessibility

## 🌐 API Integration

The frontend communicates with the backend API hosted on Render:

- `POST /api/get-suggestions` - Get meal suggestions
- `POST /api/get-recipe` - Get detailed recipe
- `POST /api/ask-followup` - Ask follow-up questions

All API calls include:
- Error handling with user-friendly messages
- Loading states to prevent duplicate requests
- Conversation history for contextual responses

## 🚀 Deployment (Vercel)

This project is deployed on Vercel. To deploy your own:

### Automatic Deployment (Recommended)

1. Fork this repository
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your forked repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   - `VITE_API_URL` = `https://meal-ideas.onrender.com/api`
7. Click "Deploy"

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## 🎯 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://meal-ideas.onrender.com/api` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and component structure
- Ensure components are accessible (ARIA labels, keyboard navigation)
- Test on multiple screen sizes
- Write meaningful commit messages
- Update documentation as needed

## 🐛 Known Issues

- Long ingredient names may wrap awkwardly on very small screens
- Recipe markdown parsing could be enhanced for edge cases

## 🗺️ Roadmap

- [ ] Add user authentication
- [ ] Save favorite recipes
- [ ] Recipe history tracking
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Recipe sharing functionality
- [ ] Print recipe feature
- [ ] Offline support with PWA

## 🔗 Related Links

- **Backend Repository**: [meal-ideas](https://github.com/Kupiwa/meal-ideas)
- **Live Demo**: [meal-ideas-frontend.vercel.app](https://meal-ideas-frontend.vercel.app)

## 👏 Acknowledgments

- [React](https://react.dev/) for the UI framework
- [Vite](https://vitejs.dev/) for lightning-fast development
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [React Markdown](https://remarkjs.github.io/react-markdown/) for markdown rendering

---

**Made with ❤️ by [Kupiwa](https://github.com/Kupiwa)**

If you found this project helpful, please consider giving it a ⭐!
