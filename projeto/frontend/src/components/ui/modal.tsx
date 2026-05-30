"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { stopScrolling, startScrolling } from "@/lib/lenis-singleton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
}: ModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pause Lenis (disables snap handler) when modal opens
  useEffect(() => {
    if (isOpen) {
      stopScrolling();
    } else {
      startScrolling();
    }
    return () => { startScrolling(); };
  }, [isOpen]);

  // Register a CAPTURE-phase listener on window so we intercept wheel events
  // before Lenis (which listens at window in bubble phase) can see them.
  // When the wheel event originates inside the modal scroll container, we
  // stop propagation, prevent default, and manually apply the delta — so
  // the modal scrolls and the page stays put.
  useEffect(() => {
    if (!isOpen) return;

    const onWindowWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;

      // Only intercept events whose target is inside the modal scroll div
      if (!el.contains(e.target as Node)) return;

      // Stop the event from reaching Lenis (bubble phase at window)
      e.stopPropagation();
      e.stopImmediatePropagation();

      const canScrollDown = el.scrollTop < el.scrollHeight - el.clientHeight;
      const canScrollUp = el.scrollTop > 0;

      if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };

    // capture: true puts us before any bubble-phase listener on window
    window.addEventListener("wheel", onWindowWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWindowWheel, { capture: true });
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className={`w-[95vw] sm:max-w-4xl bg-[#0F0F0F] border-white/10 p-0 overflow-hidden max-h-[92vh] !flex flex-col rounded-none md:rounded-sm z-[150] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(0,0,0,0.8)] ${className}`}
      >
        {showCloseButton && (
          <DialogClose className="absolute top-4 right-4 md:top-8 md:right-8 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[var(--lt-orange)]/50 transition-all z-20">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </DialogClose>
        )}
        <div ref={scrollRef} className="relative overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
