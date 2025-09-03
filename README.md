# React Component Library

A modern React TypeScript component library featuring flexible InputField and DataTable components with comprehensive styling, validation, and interactive features.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd React
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

## 📁 Project Structure

```
React/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── InputField.tsx  # Component 1: Flexible input field
│   │   └── DataTable.tsx   # Component 2: Advanced data table
│   ├── App.tsx            # Main demo application
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles (Tailwind CSS)
├── .github/
│   └── copilot-instructions.md
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md             # This file
```

## 🎯 Components

### Component 1: InputField

A flexible, accessible input component with multiple variants, sizes, and interactive features.

#### Features
- ✅ Text input with label, placeholder, helper text, error message
- ✅ States: disabled, invalid, loading
- ✅ Variants: filled, outlined, ghost
- ✅ Sizes: small (sm), medium (md), large (lg)
- ✅ Optional: clear button, password toggle
- ✅ Light & dark theme support
- ✅ TypeScript with proper typing
- ✅ Responsive design & accessibility (ARIA labels)

#### Props Interface
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  darkMode?: boolean;
}
```

#### Usage Example
```tsx
import InputField from './components/InputField';

function App() {
  const [email, setEmail] = useState('');

  return (
    <InputField
      label="Email Address"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      variant="outlined"
      size="md"
      showClearButton
      helperText="We'll never share your email"
    />
  );
}
```

### Component 2: DataTable

An advanced data table component with sorting, selection, and custom rendering capabilities.

#### Features
- ✅ Display tabular data with custom rendering
- ✅ Column sorting (ascending/descending/none)
- ✅ Row selection (single/multiple)
- ✅ Loading state with skeleton animation
- ✅ Empty state with custom message
- ✅ TypeScript generics for type safety
- ✅ Responsive design & accessibility
- ✅ Light & dark theme support

#### Props Interface
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  darkMode?: boolean;
  emptyMessage?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
```

#### Usage Example
```tsx
import DataTable, { type Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
        {value}
      </span>
    ),
  },
];

function App() {
  const [users] = useState<User[]>([...]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      onRowSelect={setSelectedUsers}
      rowKey="id"
    />
  );
}
```

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **PostCSS** - CSS processing

## 🎨 Styling & Theming

The components support both light and dark themes using Tailwind CSS classes. The theme can be toggled using the `darkMode` prop on each component.

### Color Palette
- **Primary**: Blue variants for focus states and primary actions
- **Success**: Green variants for positive states
- **Error**: Red variants for error states and validation
- **Warning**: Orange/Yellow variants for warning states
- **Neutral**: Gray variants for borders, backgrounds, and text

### Component Variants

#### InputField Variants
- **Outlined** (default): Clear border with white/dark background
- **Filled**: Subtle background with border
- **Ghost**: Transparent background with border on focus

#### Size Options
- **Small (sm)**: Compact size for dense layouts
- **Medium (md)**: Default size for most use cases
- **Large (lg)**: Prominent size for important inputs

## 🚦 Development Approach

### Design Principles
1. **Accessibility First**: All components include proper ARIA labels and keyboard navigation
2. **Type Safety**: Comprehensive TypeScript interfaces and generics
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Consistent API**: Similar prop patterns across components
5. **Performance**: Optimized rendering with React best practices

### Component Architecture
- **Controlled Components**: Full control over component state
- **Flexible Rendering**: Custom render functions for advanced use cases
- **Theme Support**: Consistent dark/light mode implementation
- **Error Handling**: Graceful error states and validation feedback

### Code Quality
- **TypeScript**: Strict type checking enabled
- **Clean Code**: Descriptive naming and well-structured components
- **Reusability**: Components designed for multiple use cases
- **Maintainability**: Clear separation of concerns

## 📱 Responsive Design

Both components are fully responsive and work seamlessly across:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Semantic HTML**: Proper use of semantic elements

## 🧪 Testing

Run the build command to verify components compile correctly:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v3 with custom configuration. See `tailwind.config.js` for customization options.

### TypeScript
Strict TypeScript configuration with comprehensive type checking. See `tsconfig.json` for compiler options.

### Vite
Modern build tool configuration optimized for React development. See `vite.config.ts` for build settings.

## 🚀 Production Deployment

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist/` directory
3. Deploy the `dist/` directory to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you have any questions or need help with the components, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
```

## Usage

### Basic Example

```tsx
import InputField from './components/InputField';

function MyForm() {
  const [email, setEmail] = useState('');

  return (
    <InputField
      label="Email"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      helperText="We'll never share your email"
    />
  );
}
```

### Advanced Example with Validation

```tsx
import InputField from './components/InputField';

function PasswordForm() {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setShowError(value.length > 0 && value.length < 8);
  };

  return (
    <InputField
      label="Password"
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={handlePasswordChange}
      showPasswordToggle
      invalid={showError}
      errorMessage={showError ? 'Password must be at least 8 characters' : undefined}
      darkMode={false}
    />
  );
}
```

## Props Interface

```tsx
interface InputFieldProps {
  // Basic props
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  
  // State props
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  
  // Style props
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
  
  // Input type and features
  type?: 'text' | 'password' | 'email' | 'number';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}
```

## Demo

The project includes a comprehensive demo application showcasing all features:

- Basic examples with different input types
- All three variants (outlined, filled, ghost)
- All three sizes (small, medium, large)
- All states (disabled, loading, error)
- Special features (clear button, password toggle)
- Complete form example with validation
- Light/dark theme toggle

Visit http://localhost:5173/ to see the demo in action!
