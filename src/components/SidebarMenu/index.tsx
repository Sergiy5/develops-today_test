import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
}

const SidebarMenuItem: React.FC<{
  item: MenuItem;
  depth?: number;
  onItemClick?: (item: MenuItem) => void;
}> = ({ item, depth = 0, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(true);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsExpanded]);

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      item.onClick?.();
      onItemClick?.(item);
    }
  };

  const paddingLeft = depth * 16 + 16;

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-gray-100 ${depth > 0 ? 'text-sm' : 'text-base'}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {item.icon && <span className="shrink-0 text-gray-500">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {hasChildren && (
          <span className="shrink-0 text-gray-400">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </span>
        )}
      </button>

      {/* Framer Motion Accordion */}
      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {item.children?.map((child) => (
                <SidebarMenuItem
                  key={child.id}
                  item={child}
                  depth={depth + 1}
                  onItemClick={onItemClick}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose, items, title = 'Menu' }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle mount/unmount & body scroll
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-gray-50 p-4">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 transition-colors hover:bg-gray-200"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <SidebarMenuItem key={item.id} item={item} onItemClick={() => {}} />
              ))}
            </div>

            <div className="border-t bg-gray-50 p-4 text-center text-sm text-gray-500">
              Press ESC or click outside to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
