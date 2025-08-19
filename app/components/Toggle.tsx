"use client";
import { useState, ReactNode } from "react";

// Type definitions
interface Stage {
  title: string;
  icon: ReactNode;
}

interface TwoStageToggleProps {
  stages: [Stage, Stage];
  onToggle?: (stage: Stage) => void;
}

export default function TwoStageToggle({
  stages,
  onToggle,
}: TwoStageToggleProps) {
  const [active, setActive] = useState<number>(0);

  const handleToggle = (index: number) => {
    setActive(index);
    if (onToggle) onToggle(stages[index]);
  };

  return (
    <div className="flex bg-gray-100 rounded-2xl p-1">
      {stages.map((stage, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleToggle(index)}
          aria-pressed={active === index}
          aria-label={`Toggle to ${stage.title}`}
          className={`flex items-center gap-1 rounded-xl px-4 py-2 transition-all duration-200 
            ${
              active === index
                ? "bg-[#E8EEED] text-accent"
                : "bg-transparent text-gray-500"
            }`}
        >
          {stage.icon}
          <span className="font-light text-[10px]">{stage.title}</span>
        </button>
      ))}
    </div>
  );
}
