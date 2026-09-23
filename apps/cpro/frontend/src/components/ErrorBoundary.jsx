import React from "react";
import { AlertTriangle } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-8 text-center bg-gray-50">
          <div className="w-16 h-16 bg-red-100 text-red-600 flex items-center justify-center rounded-full mb-2">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">حدث خطأ غير متوقع</h2>
          <p className="text-sm text-gray-600 max-w-md">
            {this.state.error?.message || "حدثت مشكلة أثناء عرض هذه الصفحة. يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#1E4038] text-white font-semibold rounded-lg hover:bg-[#16332B] transition"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
