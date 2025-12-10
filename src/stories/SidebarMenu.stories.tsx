import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, { MenuItem } from '@/components/SidebarMenu/SidebarMenu';
import {
  Home,
  Settings,
  User,
  Bell,
  Mail,
  FileText,
  Folder,
  Image,
  Music,
  Video,
} from 'lucide-react';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

// Simple menu items (no nesting)
const simpleItems: MenuItem[] = [
  { id: '1', label: 'Home', icon: <Home size={20} /> },
  { id: '2', label: 'Profile', icon: <User size={20} /> },
  { id: '3', label: 'Settings', icon: <Settings size={20} /> },
  { id: '4', label: 'Notifications', icon: <Bell size={20} /> },
  { id: '5', label: 'Messages', icon: <Mail size={20} /> },
];

// One-level nested items
const oneLevelItems: MenuItem[] = [
  { id: '1', label: 'Home', icon: <Home size={20} /> },
  {
    id: '2',
    label: 'Documents',
    icon: <Folder size={20} />,
    children: [
      { id: '2-1', label: 'Personal', icon: <FileText size={20} /> },
      { id: '2-2', label: 'Work', icon: <FileText size={20} /> },
      { id: '2-3', label: 'Shared', icon: <FileText size={20} /> },
    ],
  },
  {
    id: '3',
    label: 'Media',
    icon: <Image size={20} />,
    children: [
      { id: '3-1', label: 'Photos', icon: <Image size={20} /> },
      { id: '3-2', label: 'Videos', icon: <Video size={20} /> },
      { id: '3-3', label: 'Music', icon: <Music size={20} /> },
    ],
  },
  { id: '4', label: 'Settings', icon: <Settings size={20} /> },
];

// Two-level nested items
const twoLevelItems: MenuItem[] = [
  { id: '1', label: 'Dashboard', icon: <Home size={20} /> },
  {
    id: '2',
    label: 'Content',
    icon: <Folder size={20} />,
    children: [
      {
        id: '2-1',
        label: 'Documents',
        icon: <FileText size={20} />,
        children: [
          { id: '2-1-1', label: 'Reports' },
          { id: '2-1-2', label: 'Presentations' },
          { id: '2-1-3', label: 'Spreadsheets' },
        ],
      },
      {
        id: '2-2',
        label: 'Media Files',
        icon: <Image size={20} />,
        children: [
          { id: '2-2-1', label: 'Images' },
          { id: '2-2-2', label: 'Videos' },
          { id: '2-2-3', label: 'Audio' },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Settings',
    icon: <Settings size={20} />,
    children: [
      { id: '3-1', label: 'Account', icon: <User size={20} /> },
      { id: '3-2', label: 'Notifications', icon: <Bell size={20} /> },
      { id: '3-3', label: 'Privacy' },
    ],
  },
];

// Interactive wrapper
const SidebarDemo = ({ items, title }: { items: MenuItem[]; title?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Open Sidebar Menu
      </button>

      <SidebarMenu isOpen={isOpen} onClose={() => setIsOpen(false)} items={items} title={title} />
    </div>
  );
};

export const SimpleMenu: Story = {
  render: () => <SidebarDemo items={simpleItems} title="Navigation" />,
};

export const OneLevelNested: Story = {
  render: () => <SidebarDemo items={oneLevelItems} title="File Manager" />,
};

export const TwoLevelNested: Story = {
  render: () => <SidebarDemo items={twoLevelItems} title="Complex Menu" />,
};

export const OpenByDefault: Story = {
  render: () => {
    const [isOpen] = useState(true);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <SidebarMenu isOpen={isOpen} onClose={() => {}} items={oneLevelItems} title="Always Open" />
      </div>
    );
  },
};

export const CustomTitle: Story = {
  render: () => <SidebarDemo items={simpleItems} title="🎨 My Custom Menu" />,
};

export const LongMenuList: Story = {
  render: () => {
    const longItems: MenuItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i}`,
      label: `Menu Item ${i + 1}`,
      icon: i % 2 === 0 ? <FileText size={20} /> : <Folder size={20} />,
      ...(i % 3 === 0 && {
        children: Array.from({ length: 5 }, (_, j) => ({
          id: `item-${i}-${j}`,
          label: `Sub Item ${j + 1}`,
        })),
      }),
    }));

    return <SidebarDemo items={longItems} title="Long Scrollable Menu" />;
  },
};

export const WithClickHandlers: Story = {
  render: () => {
    const [lastClicked, setLastClicked] = useState<string>('None');
    const [isOpen, setIsOpen] = useState(false);

    const itemsWithHandlers: MenuItem[] = [
      {
        id: '1',
        label: 'Home',
        icon: <Home size={20} />,
        onClick: () => setLastClicked('Home'),
      },
      {
        id: '2',
        label: 'Profile',
        icon: <User size={20} />,
        onClick: () => setLastClicked('Profile'),
      },
      {
        id: '3',
        label: 'Settings',
        icon: <Settings size={20} />,
        children: [
          {
            id: '3-1',
            label: 'Account',
            onClick: () => setLastClicked('Account'),
          },
          {
            id: '3-2',
            label: 'Privacy',
            onClick: () => setLastClicked('Privacy'),
          },
        ],
      },
    ];

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <p className="text-sm text-gray-600">
            Last clicked: <strong>{lastClicked}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Open Menu with Click Handlers
        </button>

        <SidebarMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={itemsWithHandlers}
          title="Interactive Menu"
        />
      </div>
    );
  },
};
