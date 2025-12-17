# Bharatham Admin Panel

A modern, responsive admin panel built with React and Vite for the Bharatham platform.

## Features

- 🔐 **Authentication System**
  - Login page with email and password
  - Forgot password functionality
  - Password reset with token validation
  - Secure password visibility toggle

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all devices
  - Consistent color scheme (#124591)
  - Accessible form inputs with icons

- ⚡ **Performance**
  - Built with Vite for fast development and builds
  - Optimized React components
  - No unnecessary animations for better performance

## Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Icons:** Lucide React
- **UI Components:** Radix UI
- **Utilities:** 
  - clsx & tailwind-merge for className management
  - class-variance-authority for component variants

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bharatham-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
bharatham-admin/
├── public/
│   └── login/
│       └── Illustration.png
├── src/
│   ├── auth/
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── components/
│   │   ├── Login.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       └── input.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Authentication Pages

### Login (`/src/components/Login.jsx`)
- Email and password authentication
- Remember me functionality
- Forgot password link
- Form validation

### Forgot Password (`/src/auth/ForgotPassword.jsx`)
- Email input for password reset request
- Success confirmation message
- Back to login navigation

### Reset Password (`/src/auth/ResetPassword.jsx`)
- New password and confirm password fields
- Token-based password reset
- Password strength validation
- Success confirmation

## Development

### Code Style

- Follow ESLint rules configured in the project
- Use functional components with hooks
- Maintain consistent naming conventions
- Keep components modular and reusable

### Styling Guidelines

- Primary brand color: `#124591`
- Use inline styles for component-specific styling
- Follow the existing design patterns
- Ensure responsive design for mobile devices

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to be deployed to any static hosting service.

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
