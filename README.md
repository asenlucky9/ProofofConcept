# Assignment Deadline Tracker

A modern, responsive web application built with React and TypeScript to help students track their assignment deadlines. The application features a clean, intuitive interface with real-time updates and notifications.

## 🚀 Features

- 📝 Create, read, update, and delete assignments
- 📅 Due date tracking with calendar integration
- 🏷️ Priority and status management
- 📊 Progress visualization
- 🔔 Reminder system
- 🎨 Modern, responsive UI with dark mode support
- 🔍 Search and filter capabilities
- 📱 Mobile-friendly design

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible components
- **Radix UI** - Unstyled, accessible components
- **React Router** - Client-side routing
- **clsx & tailwind-merge** - Conditional class management

### UI Components
- **@radix-ui/react-dialog** - Modal dialogs
- **@radix-ui/react-dropdown-menu** - Dropdown menus
- **@radix-ui/react-label** - Accessible labels
- **@radix-ui/react-select** - Select components
- **@radix-ui/react-slot** - Component composition
- **@radix-ui/react-toast** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/asenlucky9/ProofofConcept.git
cd assignment-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:5174](http://localhost:5174)

## 🏗️ Project Structure

```
assignment-tracker/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # UI components
│   │   └── ...         # Feature components
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── postcss.config.cjs  # PostCSS configuration
```

## 🎨 UI Components

The application uses a combination of custom components and Shadcn UI components:

- **Button** - Custom button component with variants
- **Toast** - Notification system
- **Form** - Accessible form components
- **Dialog** - Modal dialogs
- **Select** - Dropdown selectors
- **Label** - Form labels

## 🔧 Development

- **Linting**: `npm run lint`
- **Building**: `npm run build`
- **Preview**: `npm run preview`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🚀 Deployment

The application can be easily deployed to Netlify:

1. Create a Netlify account at [https://app.netlify.com/signup](https://app.netlify.com/signup)
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

The application is configured with a `netlify.toml` file for automatic deployment. 