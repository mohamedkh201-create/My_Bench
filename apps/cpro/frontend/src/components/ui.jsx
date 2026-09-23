import React from "react";
import { X, Loader2 } from "lucide-react";

export function Spinner({ className = "" }) {
  return <Loader2 className={`animate-spin ${className}`} />;
}

export function LoadingScreen({ message = "جاري التحميل..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Spinner className="w-8 h-8 text-[#1E4038]" />
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
}

export function Modal({ open, onClose, title, maxWidth = "max-w-md", footer, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl w-full ${maxWidth} shadow-xl max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
