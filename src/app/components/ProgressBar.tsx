interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-[#F9F9F9] h-2">
      <div
        className="h-full bg-[#7145D6] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
