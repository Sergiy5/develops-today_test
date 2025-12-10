'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Toast from '@/components/Toast';
import SidebarMenu, { MenuItem } from '@/components/SidebarMenu';
import { Home as HomeIcon, Settings, User, Bell, FileText, Folder, Mail } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: '1', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: '2', label: 'Profile', icon: <User size={20} /> },
    {
      id: '3',
      label: 'Documents',
      icon: <Folder size={20} />,
      children: [
        { id: '3-1', label: 'Personal', icon: <FileText size={20} /> },
        { id: '3-2', label: 'Work', icon: <FileText size={20} /> },
        { id: '3-3', label: 'Shared', icon: <FileText size={20} /> },
      ],
    },
    { id: '4', label: 'Settings', icon: <Settings size={20} /> },
    { id: '5', label: 'Messages', icon: <Mail size={20} /> },
    { id: '6', label: 'Notifications', icon: <Bell size={20} /> },
  ];

  const handleShowToast = (type: typeof toastType) => {
    setToastType(type);
    setShowToast(true);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="mb-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
            Component Library Demo
          </h1>
          <p className="mb-8 text-gray-600">Interactive demonstration of all components</p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Input Components Section */}
            <div className="space-y-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Input Components</h2>

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                clearable
                fullWidth
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              <Input label="Search" placeholder="Type to search..." clearable fullWidth />

              <Input label="Disabled Input" value="Cannot edit this" disabled fullWidth />

              <Input
                label="With Error"
                type="email"
                value="invalid-email"
                error="Please enter a valid email address"
                fullWidth
              />
            </div>

            {/* Toast & Sidebar Section */}
            <div className="space-y-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Toast Notifications</h2>

              <div className="space-y-3">
                <button
                  onClick={() => handleShowToast('success')}
                  className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Show Success Toast
                </button>

                <button
                  onClick={() => handleShowToast('error')}
                  className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Show Error Toast
                </button>

                <button
                  onClick={() => handleShowToast('warning')}
                  className="w-full rounded-lg bg-yellow-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-yellow-700"
                >
                  Show Warning Toast
                </button>

                <button
                  onClick={() => handleShowToast('info')}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Show Info Toast
                </button>
              </div>

              <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-800">Sidebar Menu</h2>

              <button
                onClick={() => setSidebarOpen(true)}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Open Sidebar Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={
            toastType === 'success'
              ? 'Operation completed successfully!'
              : toastType === 'error'
                ? 'An error occurred. Please try again.'
                : toastType === 'warning'
                  ? 'Warning: Please review your input.'
                  : 'Here is some information for you.'
          }
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Sidebar */}
      <SidebarMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={menuItems}
        title="Navigation"
      />
    </main>
  );
}
