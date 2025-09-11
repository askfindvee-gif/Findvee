
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressBar({ 
  currentStep, 
  totalSteps, 
  stepLabels = [] 
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200">
          <div 
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-neutral-900 transition-all duration-300"
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 
                  ${isCompleted 
                    ? 'bg-neutral-900 border-neutral-900 text-white' 
                    : isCurrent 
                      ? 'bg-white border-neutral-900 text-neutral-900' 
                      : 'bg-white border-neutral-300 text-neutral-500'
                  }
                `}>
                  {isCompleted ? (
                    <i className="ri-check-line text-sm"></i>
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepLabels[index] && (
                  <span className={`mt-2 text-xs ${isCurrent ? 'text-neutral-900 font-medium' : 'text-neutral-500'}`}>
                    {stepLabels[index]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
