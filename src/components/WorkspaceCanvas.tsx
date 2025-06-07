
import { useCallback, useState } from 'react';
import { LogicBlock } from '../pages/Index';
import { Move, RotateCw, GitBranch, Repeat, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkspaceCanvasProps {
  blocks: LogicBlock[];
  onBlockDrop: (blockType: string, x: number, y: number) => void;
  executionStep: number;
  onBlockDelete: (id: string) => void;
}

const blockIcons = {
  move: Move,
  turn: RotateCw,
  if: GitBranch,
  loop: Repeat,
  wait: Clock
};

const blockColors = {
  move: 'border-green-400/50 bg-green-500/10',
  turn: 'border-blue-400/50 bg-blue-500/10',
  if: 'border-purple-400/50 bg-purple-500/10',
  loop: 'border-orange-400/50 bg-orange-500/10',
  wait: 'border-cyan-400/50 bg-cyan-500/10'
};

export const WorkspaceCanvas = ({ 
  blocks, 
  onBlockDrop, 
  executionStep, 
  onBlockDelete 
}: WorkspaceCanvasProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const blockType = event.dataTransfer.getData('blockType');
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    onBlockDrop(blockType, x, y);
  }, [onBlockDrop]);

  return (
    <div 
      className={`
        relative w-full h-full bg-hologram-grid bg-hologram-grid
        transition-all duration-300
        ${dragOver ? 'bg-cyber-primary/5 border-cyber-primary/30' : 'border-cyber-primary/10'}
        border-2 border-dashed
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 245, 255, 0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Drop zone indicator */}
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-cyber-primary/30 flex items-center justify-center">
              <Move className="w-8 h-8 text-cyber-primary/50" />
            </div>
            <h3 className="text-lg font-medium text-cyber-text/70 mb-2">
              Drag blocks here to start
            </h3>
            <p className="text-cyber-muted text-sm">
              Build your logic circuit by dropping blocks from the palette
            </p>
          </div>
        </div>
      )}

      {/* Render blocks */}
      {blocks.map((block, index) => {
        const Icon = blockIcons[block.type];
        const isExecuting = executionStep === index;
        const hasExecuted = executionStep > index;
        
        return (
          <div
            key={block.id}
            className={`
              absolute drag-block p-3 rounded-lg min-w-32 group
              ${blockColors[block.type]}
              ${isExecuting ? 'animate-pulse-glow scale-110' : ''}
              ${hasExecuted ? 'opacity-60' : ''}
              transition-all duration-300
            `}
            style={{ 
              left: block.x - 64, 
              top: block.y - 20,
              zIndex: isExecuting ? 10 : 1
            }}
          >
            {/* Execution indicator */}
            {isExecuting && (
              <div className="absolute -inset-2 border-2 border-cyber-primary rounded-lg animate-pulse" />
            )}
            
            {/* Data flow visualization */}
            {isExecuting && (
              <div className="absolute -top-1 left-0 right-0 h-0.5 bg-cyber-primary/20 overflow-hidden">
                <div className="h-full w-4 bg-cyber-primary animate-data-flow" />
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-black/20 flex items-center justify-center">
                <Icon size={12} className="text-cyber-primary" />
              </div>
              <span className="text-sm font-medium text-cyber-text">
                {block.label}
              </span>
              
              {/* Delete button */}
              <Button
                variant="ghost"
                size="sm"
                className="w-5 h-5 p-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:text-red-400"
                onClick={() => onBlockDelete(block.id)}
              >
                <X size={10} />
              </Button>
            </div>

            {/* Connection point */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-cyber-primary/50" />
            {index < blocks.length - 1 && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-cyber-primary/30" />
            )}
          </div>
        );
      })}

      {/* Execution progress indicator */}
      {executionStep >= 0 && (
        <div className="absolute top-4 right-4 glass-panel p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse" />
            <span className="text-sm text-cyber-text">
              Executing step {executionStep + 1} of {blocks.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
