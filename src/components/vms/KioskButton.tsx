import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KioskButtonProps {
  icon: LucideIcon;
  label: string;
  colorClass?: string;
  onClick?: () => void;
  className?: string;
}

export function KioskButton({ icon: Icon, label, colorClass, onClick, className }: KioskButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "kiosk-button w-full border-2 border-transparent bg-white active:bg-slate-50",
        colorClass,
        className
      )}
    >
      <Icon className="w-8 h-8" />
      <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
