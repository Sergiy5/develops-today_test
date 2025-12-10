# React Component Library - Test Assessment

A modern, reusable UI component library built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Storybook**.

## 📦 Components

This library includes three fully-featured components:

### 1. 🔤 Input Component

A versatile input field with multiple types and features.

**Features:**
- Multiple input types (text, password, email, number, tel)
- Password visibility toggle with eye icon
- Clearable button for quick text removal
- Three sizes: small, medium, large
- Error state with validation message
- Disabled state
- Full-width option
- Label support

**Props:**
```typescript
interface InputProps {
  label?: string;
  error?: string;
  clearable?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  // ... all standard input props
}
```

### 2. 🔔 Toast Component

Notification component with smooth animations and auto-dismiss.

**Features:**
- Four types: success, error, warning, info
- Auto-dismiss with configurable duration
- Smooth slide-in/slide-out animations
- Manual close button (optional)
- Positioned at bottom-right
- Icon indicators for each type

**Props:**
```typescript
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}
```

### 3. 📚 Sidebar Menu Component

Sliding navigation menu with nested submenus.

**Features:**
- Slides in from the right
- Smooth backdrop overlay
- Nested menu items (2 levels deep)
- Expandable/collapsible submenus
- Click outside to close
- Custom icons support
- Scrollable content area

**Props:**
```typescript
interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd component-library
```

2. Install dependencies:
```bash
npm install
```

3. Run Storybook:
```bash
npm run storybook
```

Storybook will open at `http://localhost:6006`

4. Run Next.js development server (optional):
```bash
npm run dev
```

Next.js will run at `http://localhost:3000`

## 📖 Storybook

All components are documented in Storybook with multiple examples and interactive controls.

### Available Stories

**Input Component:**
- Default
- With Label
- Password (with toggle)
- Clearable
- With Error
- Disabled
- Different Sizes
- Number Input
- Full Width

**Toast Component:**
- Success
- Error
- Warning
- Info
- Long Duration
- Short Duration
- Not Dismissible
- Multiple Toasts

**Sidebar Menu:**
- Simple Menu
- One-Level Nested
- Two-Level Nested
- Long Scrollable Menu
- With Click Handlers

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Input/
│   │   └── Input.tsx
│   ├── Toast/
│   │   └── Toast.tsx
│   └── SidebarMenu/
│       └── SidebarMenu.tsx
├── stories/
│   ├── Input.stories.tsx
│   ├── Toast.stories.tsx
│   └── SidebarMenu.stories.tsx
└── app/
    └── page.tsx
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Storybook 7** - Component documentation
- **Lucide React** - Icon library
- **ESLint & Prettier** - Code quality

## 📸 Component Screenshots

### Input Component

**Password Input with Toggle:**
![Password Input](./screenshots/input-password.png)

**Clearable Input:**
![Clearable Input](./screenshots/input-clearable.png)

**Input with Error:**
![Input Error](./screenshots/input-error.png)

### Toast Component

**Success Toast:**
![Success Toast](./screenshots/toast-success.png)

**Error Toast:**
![Error Toast](./screenshots/toast-error.png)

**Warning Toast:**
![Warning Toast](./screenshots/toast-warning.png)

### Sidebar Menu

**Closed State:**
![Sidebar Closed](./screenshots/sidebar-closed.png)

**Open with Nested Menu:**
![Sidebar Open](./screenshots/sidebar-nested.png)

**Expanded Submenu:**
![Sidebar Expanded](./screenshots/sidebar-expanded.png)

### Storybook Interface

**Component Gallery:**
![Storybook](./screenshots/storybook-overview.png)

## 🎨 Customization

All components use Tailwind CSS classes and can be easily customized:

```typescript
// Custom styling example
<Input 
  className="custom-class" 
  // ... other props
/>
```

## 🧪 Usage Examples

### Input Component
```typescript
import Input from '@/components/Input/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  clearable
  onChange={(e) => console.log(e.target.value)}
/>
```

### Toast Component
```typescript
import Toast from '@/components/Toast/Toast';

<Toast
  message="Successfully saved!"
  type="success"
  duration={3000}
  onClose={() => console.log('Closed')}
/>
```

### Sidebar Menu
```typescript
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu';
import { Home, Settings } from 'lucide-react';

const items = [
  { id: '1', label: 'Home', icon: <Home /> },
  { id: '2', label: 'Settings', icon: <Settings /> }
];

<SidebarMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  items={items}
  title="Navigation"
/>
```

## ✅ Features Implemented

- ✅ TypeScript for type safety
- ✅ Storybook with multiple stories per component
- ✅ Responsive design
- ✅ Smooth animations and transitions
- ✅ Accessibility considerations
- ✅ Clean, modular code structure
- ✅ ESLint + Prettier configuration
- ✅ Interactive Storybook controls
- ✅ Comprehensive documentation

## 🚀 Build & Deploy

### Build Storybook
```bash
npm run build-storybook
```

Output will be in `storybook-static/` directory.

### Build Next.js
```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this component library in your projects!

## 👨‍💻 Author

Your Name - [Your GitHub Profile]

---

**Note:** Remember to add actual screenshots to the `screenshots/` directory and update the paths in this README!