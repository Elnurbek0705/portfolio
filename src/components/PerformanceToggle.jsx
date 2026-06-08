import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { Zap, ZapOff } from 'lucide-react';
import Tooltip from './Tooltip';

const PerformanceToggle = ({ mobile = false }) => {
  const { isHighPerf, setIsHighPerf } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  return (
    <Tooltip text={isHighPerf ? t('perf.high') : t('perf.low')} position={mobile ? "top" : "right"}>
      <button
        onClick={() => setIsHighPerf(!isHighPerf)}
        className={`p-2 rounded-full transition-all duration-300 bg-theme-secondary border hover:shadow-lg active:scale-90 ${
          isHighPerf ? 'border-theme-accent shadow-[0_0_10px_rgba(var(--accent),0.2)]' : 'border-theme-muted'
        }`}
      >
        {isHighPerf ? (
          <Zap className={`${mobile ? 'w-6 h-6' : 'w-8 h-8'} text-theme-accent fill-theme-accent/20`} />
        ) : (
          <ZapOff className={`${mobile ? 'w-6 h-6' : 'w-8 h-8'} text-theme-muted`} />
        )}
      </button>
    </Tooltip>
  );
};

export default PerformanceToggle;