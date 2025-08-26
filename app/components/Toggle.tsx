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
    <div className="flex bg-white w-full h-5">
      {stages.map((stage, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleToggle(index)}
          aria-pressed={active === index}
          aria-label={`Toggle to ${stage.title}`}
          className={`flex items-center justify-center gap-1 w-1/2 transition-all duration-300 cursor-pointer py-5
            ${
              active === index
                ? // ? "bg-[#E8EEED] text-accent"
                  "text-accent border-b border-accent"
                : "text-gray/70 border-transparent"
            }`}
        >
          {stage.icon}
          <span className="font-light text-[10px]">{stage.title}</span>
        </button>
      ))}
    </div>
  );
}
