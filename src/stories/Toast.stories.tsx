import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToastContainer, ToastData } from '@/components/Toast/Toast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

const ToastDemo = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: ToastData['type'], message?: string, isCloseble: boolean = false, duration: number= 3000) => {
    const id = Date.now().toString();

    setToasts([
      {
        id,
        type,
        message: message || `This is a ${type} toast`,
        duration: duration,
        closable: isCloseble,
      },
    ]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addToast('success')}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Success
        </button>
        <button
          onClick={() => addToast('error')}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Error
        </button>
        <button
          onClick={() => addToast('warning')}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Warning
        </button>
        <button
          onClick={() => addToast('info')}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Info
        </button>
        <button
          onClick={() => addToast('info', 'Manual close toast', true)}
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Closable
        </button>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};