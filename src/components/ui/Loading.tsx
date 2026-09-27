interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

/**
 * Loading spinner component with optional message.
 */
export function Loading({ size = "md", message }: LoadingProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-gray-300 border-t-primary-600`}
      />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}
