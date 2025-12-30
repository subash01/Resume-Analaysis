import { X } from 'lucide-react';
import { useEffect } from 'react';

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function RightDrawer({ isOpen, onClose, children, title }: RightDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 z-40 ${
          isOpen ? 'bg-opacity-60 backdrop-blur-sm' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-all duration-500 ease-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
            <button
              onClick={onClose}
              className="ml-auto p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
