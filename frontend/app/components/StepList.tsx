import React from "react";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { Step } from "../lib/types";
import PromptBox from "./PromptBox";

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className="flex flex-col col-span-2 relative px-10">
      <h2 className="text-xl font-bold mb-6 text-zinc-300">Build Steps</h2>
      <div className="w-full overflow-y-scroll no-scrollbar">
        <div className="flex-1 ">
          <div className="space-y-3 h-[calc(100vh-450px)]">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-1 rounded-lg cursor-pointer transition-colors ${
                  currentStep === step.id
                    ? "bg-gray-800 border border-gray-700"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => onStepClick(step.id)}
              >
                <div className="flex items-center gap-2">
                  {step.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : step.status === "in-progress" ? (
                    <Clock className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600" />
                  )}
                  <h3 className="font-medium text-gray-100">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex absolute bottom-0 left-0">
        <PromptBox />
      </div>
    </div>
  );
}

/*{steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-400/50"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-200">{step.title}</span>
              </div>
            ))} */
