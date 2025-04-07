"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

export function DatabaseStatus() {
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkDatabase() {
      try {
        const response = await fetch("/api/debug");
        const data = await response.json();
        
        if (data.databaseConnection === "Connected successfully") {
          setStatus("connected");
        } else {
          setStatus("error");
          setError(data.databaseConnection);
        }
      } catch (error) {
        setStatus("error");
        setError("Could not check database status");
      }
    }

    checkDatabase();
  }, []);

  if (status === "checking" || status === "connected") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg z-50 max-w-md mx-auto">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium">Database Connection Issue</h3>
          <p className="text-sm mt-1">
            There was a problem connecting to the database. Some features may not work properly.
          </p>
          {error && (
            <p className="text-xs mt-2 bg-black/10 p-2 rounded">
              Error: {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
