import type { ReactElement } from "react";

export function SideBarItems({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="group px-4 py-2.5 sm:py-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 sm:gap-3 text-slate-700 group-hover:text-purple-600 transition-colors min-w-0">
        <div className="text-slate-500 group-hover:text-purple-600 transition-colors flex-shrink-0">
          {icon}
        </div>
        <span className="font-medium text-xs sm:text-sm truncate">{text}</span>
      </div>
    </div>
  );
}
