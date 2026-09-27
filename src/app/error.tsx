"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
