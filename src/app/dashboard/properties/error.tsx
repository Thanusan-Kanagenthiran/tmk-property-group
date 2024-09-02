"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div style={{ color: 'red', marginBottom: '1rem' }}>
        <h2>Error Details:</h2>
        <p>{error.message}</p>
        {/* Optionally show more detailed error information */}
        {error.digest && <p>Error Digest: {error.digest}</p>}
      </div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  );
}
