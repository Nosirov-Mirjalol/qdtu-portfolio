import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { AlertCircle } from "lucide-react";

type ConfirmPopoverProps = {
  onConfirm: () => void;
  children: ReactNode;
  message?: string;
  description?: string;
};

export function ConfirmPopover({
  children,
  onConfirm,
  message = "O'chirishni tasdiqlaysizmi?",
  description = "Bu amalni ortga qaytarib bo'lmaydi.",
}: ConfirmPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[320px] p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="h-6 w-6 text-orange-500" />
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-[15px] text-zinc-900 dark:text-zinc-100 leading-tight">
              {message}
            </h4>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[13px] transition-colors"
            onClick={() => setOpen(false)}
          >
            Bekor qilish
          </Button>
          <Button
            size="sm"
            className="h-9 px-5 bg-orange-600 hover:bg-orange-500 text-white font-medium text-[13px] border-none transition-all active:scale-95"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Tasdiqlash
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}