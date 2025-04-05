"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsScanning(true);

    try {
      // First, show a toast to indicate scanning has started
      toast.info("Analyzing receipt...");

      // Call the server action to scan the receipt
      const result = await scanReceipt(file);

      // If we get here, the scan was successful
      if (result) {
        // Format the amount for display
        const formattedAmount = result.amount.toFixed(2);

        // Update the form with the scanned data
        onScanComplete(result);

        // Show success message with the extracted amount
        toast.success(`Receipt scanned: ${result.merchantName || 'Receipt'} - $${formattedAmount}`);
      } else {
        // Handle case where result is empty but no error was thrown
        toast.warning("Could not extract information from this image. Please enter details manually.");
      }
    } catch (error) {
      // If there's an error, show a fallback message and use default values
      console.error("Receipt scanning error:", error);
      toast.error("Could not scan receipt: " + (error.message || "Unknown error"));

      // Provide fallback data so the user can still proceed
      const fallbackData = {
        amount: 0,
        date: new Date(),
        description: "Receipt scan failed - please enter details manually",
        category: "other-expense",
        merchantName: "Unknown"
      };

      // Still update the form with fallback data
      onScanComplete(fallbackData);
    } finally {
      // Always make sure to reset the scanning state
      setIsScanning(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={isScanning}
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with AI</span>
          </>
        )}
      </Button>
    </div>
  );
}
