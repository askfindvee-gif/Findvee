
import { useEffect, useReducer } from 'react';
import ProgressBar from '../../../components/base/ProgressBar';
import Step1Basic from './Step1Basic';
import Step2LocationContact from './Step2LocationContact';
import Step3AboutProof from './Step3AboutProof';
import Step4PreviewSubmit from './Step4PreviewSubmit';
import { VendorPayloadSchema, type VendorPayload } from '../schemas';
import { createVendor } from '../../../api/vendors';

interface VendorOnboardingProps {
  onSubmit: (data: VendorData) => void;
}

type State = VendorPayload & { step: number };
type Action =
  | { type: 'update'; payload: Partial<VendorPayload> }
  | { type: 'setStep'; step: number }
  | { type: 'rehydrate'; payload: VendorPayload };

const STORAGE_KEY = 'findvee_vendor_onboarding';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update': {
      const next = { ...state, ...action.payload } as State;
      return next;
    }
    case 'setStep':
      return { ...state, step: action.step };
    case 'rehydrate':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default function VendorOnboarding() {
  const [state, dispatch] = useReducer(reducer, {
    businessName: '',
    categories: [],
    location: { lat: undefined, lng: undefined, address: '', city: '' },
    phone: '',
    description: '',
    proofFile: undefined,
    step: 1,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const valid = VendorPayloadSchema.safeParse(parsed);
        if (valid.success) {
          dispatch({ type: 'rehydrate', payload: valid.data });
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const { step, ...payload } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [state]);

  const stepLabels = ['Basic Info', 'Location', 'About & Proof', 'Review'];
  const totalSteps = 4;

  const updateData = (newData: Partial<VendorPayload>) => {
    dispatch({ type: 'update', payload: newData });
  };

  const nextStep = () => {
    if (state.step < totalSteps) {
      dispatch({ type: 'setStep', step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      dispatch({ type: 'setStep', step: state.step - 1 });
    }
  };

  const handleSubmit = async () => {
    const parsed = VendorPayloadSchema.safeParse(state);
    if (!parsed.success) {
      alert('Please fix the errors before submitting.');
      return;
    }
    const payload = parsed.data;
    await createVendor(payload);
    localStorage.removeItem(STORAGE_KEY);
    alert('Thank you! Your business listing has been submitted for review.');
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <Step1Basic
            data={state}
            updateData={updateData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2LocationContact
            data={state}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <Step3AboutProof
            data={state}
            updateData={updateData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <Step4PreviewSubmit
            data={state}
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
        currentStep={state.step}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />
      
      {renderStep()}
    </div>
  );
}
