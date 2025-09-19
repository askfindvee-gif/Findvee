import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { getLanguage } from '@/react-app/lib/i18n';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  disabled?: boolean;
}

export default function VoiceSearch({ onResult, disabled = false }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      // Set language based on current app language
      const currentLang = getLanguage();
      const localeMap = {
        en: 'en-IN',
        hi: 'hi-IN', 
        kn: 'kn-IN'
      };
      recognition.lang = localeMap[currentLang] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult]);

  const handleClick = () => {
    if (!isSupported || disabled) return;

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      // Update language before starting
      const currentLang = getLanguage();
      const localeMap = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN'
      };
      if (recognitionRef.current) {
        recognitionRef.current.lang = localeMap[currentLang] || 'en-IN';
        recognitionRef.current.start();
      }
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`px-6 py-4 glass-button rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 min-h-[64px] ${
        isListening ? 'bg-red-500/20 border-red-400 text-red-400 animate-pulse' : 'text-white hover:bg-white/20'
      }`}
    >
      {isListening ? (
        <MicOff className="w-6 h-6" />
      ) : (
        <Mic className="w-6 h-6" />
      )}
    </button>
  );
}
