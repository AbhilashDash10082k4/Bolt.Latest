import { CheckCircle, Loader2 } from "lucide-react";

const getStepIcon = (stepIndex: number, currentStep: number) => {
  if (stepIndex < currentStep) {
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  } else if (stepIndex === currentStep) {
    return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
  } else {
    return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
  }
};

const getStepText = (stepIndex: number, label: string, currentStep: number) => {
  const isActive = stepIndex === currentStep;
  const isComplete = stepIndex < currentStep;

  return (
    <span
      className={`text-sm font-medium ${
        isComplete
          ? "text-green-600"
          : isActive
          ? "text-blue-600"
          : "text-gray-500"
      }`}
    >
      {label}
    </span>
  );
};
interface PropType {
    currentStep: number
}
export const LoadingSteps = ({currentStep} : PropType) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-3">
        {getStepIcon(1, currentStep)}
        {getStepText(1, "Transforming template data", currentStep)}
      </div>
      <div className="flex items-center gap-3">
        {getStepIcon(2, currentStep)}
        {getStepText(2, "Mounting files", currentStep)}
      </div>
      <div className="flex items-center gap-3">
        {getStepIcon(3, currentStep)}
        {getStepText(3, "Installing dependencies", currentStep)}
      </div>
      <div className="flex items-center gap-3">
        {getStepIcon(4, currentStep)}
        {getStepText(4, "Starting development server", currentStep)}
      </div>
    </div>
  );
};
