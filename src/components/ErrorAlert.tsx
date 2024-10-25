import { XCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1.5 hover:bg-red-100"
          >
            <span className="sr-only">Dismiss</span>
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}