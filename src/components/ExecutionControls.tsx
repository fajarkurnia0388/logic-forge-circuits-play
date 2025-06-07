
import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw } from 'lucide-react';

interface ExecutionControlsProps {
  isExecuting: boolean;
  onExecute: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const ExecutionControls = ({ 
  isExecuting, 
  onExecute, 
  onStop, 
  onReset 
}: ExecutionControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={isExecuting ? onStop : onExecute}
        className={`
          px-6 py-2 font-medium transition-all duration-300
          ${isExecuting 
            ? 'bg-red-500/20 border-red-400 text-red-400 hover:bg-red-500/30' 
            : 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary hover:bg-cyber-primary/30'
          }
          border neon-border
        `}
        disabled={false}
      >
        {isExecuting ? (
          <>
            <Square size={16} className="mr-2" />
            Stop
          </>
        ) : (
          <>
            <Play size={16} className="mr-2" />
            Execute
          </>
        )}
      </Button>
      
      <Button
        onClick={onReset}
        variant="outline"
        className="border-cyber-muted text-cyber-muted hover:border-cyber-text hover:text-cyber-text"
        disabled={isExecuting}
      >
        <RotateCcw size={16} className="mr-2" />
        Reset
      </Button>
      
      {isExecuting && (
        <div className="flex items-center gap-2 ml-4">
          <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse" />
          <span className="text-sm text-cyber-text">Running...</span>
        </div>
      )}
    </div>
  );
};
