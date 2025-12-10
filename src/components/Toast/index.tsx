import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  closable = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    let hideTimer: NodeJS.Timeout | null = null;
    if (duration > 0) {
      hideTimer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  const config = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const { icon: Icon, bg, border, text, iconColor } = config[type];

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 ${bg} ${border} ${text} max-w-md min-w-[300px] rounded-lg border-l-4 p-4 shadow-lg transition-all duration-300 ease-in-out ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon className={`${iconColor} mt-0.5 shrink-0`} size={20} />
        <p className="flex-1 text-sm leading-relaxed font-medium">{message}</p>
        {closable && (
          <button
            onClick={handleClose}
            className={`${iconColor} shrink-0 transition-opacity hover:opacity-70`}
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;

// ToastContainer for multiple toasts
export interface ToastData extends ToastProps {
  id: string;
}

export const ToastContainer: React.FC<{ toasts: ToastData[] }> = ({ toasts }) => {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

// // src/components/Toast/Toast.tsx
// import React, { useEffect, useState } from 'react';
// import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// export interface ToastProps {
//   message: string;
//   type?: 'success' | 'error' | 'warning' | 'info';
//   duration?: number;
//   onClose?: () => void;
//   closable?: boolean;
// }

// const Toast: React.FC<ToastProps> = ({
//   message,
//   type = 'info',
//   duration = 3000,
//   onClose,
//   closable = true,
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     // Trigger entry animation
//     const showTimer = setTimeout(() => setIsVisible(true), 10);

//     // Auto-dismiss
//     if (duration > 0) {
//       const hideTimer = setTimeout(() => {
//         handleClose();
//       }, duration);

//       return () => {
//         clearTimeout(showTimer);
//         clearTimeout(hideTimer);
//       };
//     }

//     return () => clearTimeout(showTimer);
//   }, [duration]);

//   const handleClose = () => {
//     setIsExiting(true);
//     setTimeout(() => {
//       setIsVisible(false);
//       onClose?.();
//     }, 300);
//   };

//   const config = {
//     success: {
//       icon: CheckCircle,
//       bgColor: 'bg-green-50',
//       borderColor: 'border-green-500',
//       textColor: 'text-green-800',
//       iconColor: 'text-green-500',
//     },
//     error: {
//       icon: AlertCircle,
//       bgColor: 'bg-red-50',
//       borderColor: 'border-red-500',
//       textColor: 'text-red-800',
//       iconColor: 'text-red-500',
//     },
//     warning: {
//       icon: AlertTriangle,
//       bgColor: 'bg-yellow-50',
//       borderColor: 'border-yellow-500',
//       textColor: 'text-yellow-800',
//       iconColor: 'text-yellow-500',
//     },
//     info: {
//       icon: Info,
//       bgColor: 'bg-blue-50',
//       borderColor: 'border-blue-500',
//       textColor: 'text-blue-800',
//       iconColor: 'text-blue-500',
//     },
//   };

//   const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

//   return (
//     <div
//       className={`fixed right-4 bottom-4 z-50 ${bgColor} ${borderColor} ${textColor} max-w-md min-w-[300px] rounded-lg border-l-4 p-4 shadow-lg transition-all duration-300 ease-in-out ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} `}
//       role="alert"
//     >
//       <div className="flex items-start gap-3">
//         <Icon className={`${iconColor} mt-0.5 shrink-0`} size={20} />

//         <p className="flex-1 text-sm leading-relaxed font-medium">{message}</p>

//         {closable && (
//           <button
//             onClick={handleClose}
//             className={`${iconColor} shrink-0 transition-opacity hover:opacity-70`}
//             aria-label="Close notification"
//           >
//             <X size={18} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Toast;

// // ToastContainer for managing multiple toasts
// export interface ToastData extends ToastProps {
//   id: string;
// }

// export const ToastContainer: React.FC<{ toasts: ToastData[] }> = ({ toasts }) => {
//   return (
//     <div className="fixed right-4 bottom-4 z-50 space-y-2">
//       {toasts.map((toast, index) => (
//         <div key={toast.id} style={{ marginBottom: index > 0 ? '8px' : '0' }}>
//           <Toast {...toast} />
//         </div>
//       ))}
//     </div>
//   );
// };
