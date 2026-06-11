"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
}

/** Submit button wired to the parent <form>'s pending state. */
export function SubmitButton({
  children,
  className,
  pendingLabel = "Enviando…",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className={cn("w-full", className)}
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
