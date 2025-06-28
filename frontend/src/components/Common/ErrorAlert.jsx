import { FiAlertCircle } from "react-icons/fi";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="container mx-auto">
      <div
        className="my-4 flex items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <FiAlertCircle size={24} />
        <span className="font-semibold">Error:</span>
        <span>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-4 rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
