import React, { useState } from 'react';
import InputField from './components/InputField';
import DataTable, { type Column } from './components/DataTable';

// Sample data for DataTable demo
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  joinDate: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2025-09-02',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2025-09-01',
    joinDate: '2023-03-22'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2025-08-28',
    joinDate: '2023-06-10'
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2025-09-03',
    joinDate: '2023-02-14'
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2025-09-02',
    joinDate: '2022-11-05'
  }
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    search: '',
  });

  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const simulateTableLoading = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 2000);
  };

  const handleUserSelection = (users: User[]) => {
    setSelectedUsers(users);
  };

  // Define table columns
  const userColumns: Column<User>[] = [
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
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'Admin' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : value === 'Editor'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value: 'active' | 'inactive') => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {value === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      dataIndex: 'lastLogin',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      dataIndex: 'joinDate',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
              darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <div className={`w-8 h-8 rounded-lg ${
                darkMode ? 'bg-blue-500' : 'bg-blue-600'
              }`}></div>
            </div>
            <h1 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              InputField Component Demo
            </h1>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A comprehensive, flexible input component with multiple variants, sizes, and states
            </p>
            <div className="flex justify-center items-center gap-4">
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Light Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`
                  relative 
                  inline-flex 
                  h-7 
                  w-12 
                  items-center 
                  rounded-full 
                  transition-all 
                  duration-300
                  shadow-lg
                  ${darkMode ? 'bg-blue-600 shadow-blue-500/25' : 'bg-gray-300 shadow-gray-400/25'}
                `}
              >
                <span
                  className={`
                    inline-block 
                    h-5 
                    w-5 
                    transform 
                    rounded-full 
                    bg-white 
                    transition-transform 
                    duration-300
                    shadow-sm
                    ${darkMode ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dark Mode
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Basic Examples */}
            <div className={`
              p-8 
              rounded-2xl 
              border 
              transition-all 
              duration-300 
              hover:shadow-xl 
              ${darkMode 
                ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
                : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
              }
            `}>
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 rounded-full mr-4 ${
                  darkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></div>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Basic Examples
                </h2>
              </div>
              
              <div className="space-y-6">
                <InputField
                  label="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  helperText="This is a basic input field"
                  darkMode={darkMode}
                />

                <InputField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  invalid={formData.email.length > 0 && !formData.email.includes('@')}
                  errorMessage={formData.email.length > 0 && !formData.email.includes('@') ? 'Please enter a valid email' : undefined}
                  darkMode={darkMode}
                />

                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  showPasswordToggle
                  helperText="Password should be at least 8 characters"
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Variants */}
            <div className={`
              p-8 
              rounded-2xl 
              border 
              transition-all 
              duration-300 
              hover:shadow-xl 
              ${darkMode 
                ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
                : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
              }
            `}>
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 rounded-full mr-4 ${
                  darkMode ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Variants
                </h2>
              </div>
              
              <div className="space-y-6">
                <InputField
                  label="Outlined (Default)"
                  placeholder="Outlined variant"
                  variant="outlined"
                  darkMode={darkMode}
                />

                <InputField
                  label="Filled"
                  placeholder="Filled variant"
                  variant="filled"
                  darkMode={darkMode}
                />

                <InputField
                  label="Ghost"
                  placeholder="Ghost variant"
                  variant="ghost"
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Sizes */}
            <div className={`
              p-8 
              rounded-2xl 
              border 
              transition-all 
              duration-300 
              hover:shadow-xl 
              ${darkMode 
                ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
                : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
              }
            `}>
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 rounded-full mr-4 ${
                  darkMode ? 'bg-purple-400' : 'bg-purple-500'
                }`}></div>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Sizes
                </h2>
              </div>
              
              <div className="space-y-6">
                <InputField
                  label="Small"
                  placeholder="Small size"
                  size="sm"
                  darkMode={darkMode}
                />

                <InputField
                  label="Medium (Default)"
                  placeholder="Medium size"
                  size="md"
                  darkMode={darkMode}
                />

                <InputField
                  label="Large"
                  placeholder="Large size"
                  size="lg"
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* States and Features */}
            <div className={`
              p-8 
              rounded-2xl 
              border 
              transition-all 
              duration-300 
              hover:shadow-xl 
              ${darkMode 
                ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
                : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
              }
            `}>
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 rounded-full mr-4 ${
                  darkMode ? 'bg-orange-400' : 'bg-orange-500'
                }`}></div>
                <h2 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  States & Features
                </h2>
              </div>
              
              <div className="space-y-6">
                <InputField
                  label="Search with Clear Button"
                  placeholder="Type to search..."
                  value={formData.search}
                  onChange={handleInputChange('search')}
                  showClearButton
                  darkMode={darkMode}
                />

                <InputField
                  label="Disabled"
                  placeholder="This field is disabled"
                  disabled
                  darkMode={darkMode}
                />

                <InputField
                  label="Loading State"
                  placeholder="Loading..."
                  loading={loading}
                  darkMode={darkMode}
                />

                <button
                  onClick={simulateLoading}
                  className={`
                    px-6 
                    py-3 
                    rounded-lg 
                    font-medium
                    transition-all 
                    duration-200
                    transform
                    hover:scale-105
                    active:scale-95
                    shadow-lg
                    ${darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25'
                    }
                  `}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Simulate Loading'}
                </button>

                <InputField
                  label="Error State"
                  placeholder="This field has an error"
                  invalid
                  errorMessage="This field is required"
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>

          {/* Form Example */}
          <div className={`
            p-8 
            rounded-2xl 
            border 
            transition-all 
            duration-300 
            hover:shadow-xl 
            ${darkMode 
              ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
            }
          `}>
            <div className="flex items-center mb-6">
              <div className={`w-2 h-8 rounded-full mr-4 ${
                darkMode ? 'bg-pink-400' : 'bg-pink-500'
              }`}></div>
              <h2 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Complete Form Example
              </h2>
            </div>
            
            <form className="grid lg:grid-cols-2 gap-6">
              <InputField
                label="Full Name *"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange('name')}
                showClearButton
                invalid={formData.name.length > 0 && formData.name.length < 2}
                errorMessage={formData.name.length > 0 && formData.name.length < 2 ? 'Name must be at least 2 characters' : undefined}
                darkMode={darkMode}
              />

              <InputField
                label="Email Address *"
                type="email"
                placeholder="Enter your Email id"
                value={formData.email}
                onChange={handleInputChange('email')}
                showClearButton
                invalid={formData.email.length > 0 && !formData.email.includes('@')}
                errorMessage={formData.email.length > 0 && !formData.email.includes('@') ? 'Please enter a valid email' : undefined}
                darkMode={darkMode}
              />

              <InputField
                label="Password *"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                showPasswordToggle
                invalid={formData.password.length > 0 && formData.password.length < 8}
                errorMessage={formData.password.length > 0 && formData.password.length < 8 ? 'Password must be at least 8 characters' : undefined}
                darkMode={darkMode}
              />

              <InputField
                label="Confirm Password *"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                showPasswordToggle
                invalid={formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword}
                errorMessage={formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword ? 'Passwords do not match' : undefined}
                darkMode={darkMode}
              />
            </form>
          </div>

          {/* Component 2: DataTable */}
          <div className={`
            p-8 
            rounded-2xl 
            border 
            transition-all 
            duration-300 
            hover:shadow-xl 
            ${darkMode 
              ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
            }
          `}>
            <div className="flex items-center mb-6">
              <div className={`w-2 h-8 rounded-full mr-4 ${
                darkMode ? 'bg-green-400' : 'bg-green-500'
              }`}></div>
              <h2 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                📊 Component 2: DataTable
              </h2>
            </div>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Advanced data table with sorting, selection, loading states, and custom rendering
            </p>

            {/* Table Controls */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={simulateTableLoading}
                  className={`
                    px-6 
                    py-3 
                    rounded-lg 
                    font-medium 
                    transition-all 
                    duration-200 
                    shadow-lg 
                    ${darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-gray-500/25' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900 shadow-gray-500/25'
                    }
                  `}
                  disabled={tableLoading}
                >
                  {tableLoading ? 'Loading...' : 'Simulate Loading'}
                </button>
              </div>
              
              {selectedUsers.length > 0 && (
                <div className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedUsers.length} user(s) selected
                </div>
              )}
            </div>

            {/* DataTable Component */}
            <DataTable
              data={sampleUsers}
              columns={userColumns}
              loading={tableLoading}
              selectable={true}
              onRowSelect={handleUserSelection}
              darkMode={darkMode}
              emptyMessage="No users found"
              rowKey="id"
            />
          </div>

          {/* Empty State Demo */}
          <div className={`
            p-8 
            rounded-2xl 
            border 
            transition-all 
            duration-300 
            hover:shadow-xl 
            ${darkMode 
              ? 'bg-gray-800/80 border-gray-700/50 shadow-2xl backdrop-blur-sm' 
              : 'bg-white/80 border-gray-200/50 shadow-lg backdrop-blur-sm'
            }
          `}>
            <div className="flex items-center mb-6">
              <div className={`w-2 h-8 rounded-full mr-4 ${
                darkMode ? 'bg-orange-400' : 'bg-orange-500'
              }`}></div>
              <h3 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Empty State Demo
              </h3>
            </div>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              DataTable with no data to show empty state
            </p>

            <DataTable
              data={[]}
              columns={userColumns}
              loading={false}
              selectable={true}
              darkMode={darkMode}
              emptyMessage="No users have been added yet. Start by adding your first user."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
