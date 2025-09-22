"use client";
import { useState, ReactNode, Dispatch, SetStateAction } from "react";

// Type definitions
interface Stage {
  title: string;
  icon: ReactNode;
  setActive: Dispatch<SetStateAction<number>>;
  roleIndex: number;
}

interface TwoStageToggleProps {
  stages: [Stage, Stage];
}

export default function TwoStageToggle({ stages }: TwoStageToggleProps) {
  // const [active, setActive] = useState<number>(0);

  return (
    <div className="flex bg-white w-full h-5">
      {stages.map((stage, index) => (
        <button
          key={index}
          type="button"
          onClick={() => stage.setActive(index)}
          className={`flex items-center justify-center gap-1 w-1/2 transition-all duration-300 cursor-pointer py-5
            ${
              stage.roleIndex === index
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
