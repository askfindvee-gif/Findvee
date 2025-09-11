
import { useState } from 'react';
import ProgressBar from '../../../components/base/ProgressBar';
import Step1Basic from './Step1Basic';
import Step2LocationContact from './Step2LocationContact';
import Step3AboutProof from './Step3AboutProof';
import Step4PreviewSubmit from './Step4PreviewSubmit';

interface VendorData {
  businessName: string;
  categories: string[];
  location: string;
  phone: string;
  description: string;
  proofFile: File | null;
}

interface VendorOnboardingProps {
  onSubmit: (data: VendorData) => void;
}

export default function VendorOnboarding({ onSubmit }: VendorOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<VendorData>({
    businessName: '',
    categories: [],
    location: '',
    phone: '',
    description: '',
    proofFile: null
  });

  const stepLabels = ['Basic Info', 'Location', 'About & Proof', 'Review'];
  const totalSteps = 4;

  const updateData = (newData: Partial<VendorData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Basic
            data={data}
            updateData={updateData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2LocationContact
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <Step3AboutProof
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <Step4PreviewSubmit
            data={data}
            onSubmit={handleSubmit}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />
      
      {renderStep()}
    </div>
  );
}
