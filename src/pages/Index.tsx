
import { useState, useCallback } from 'react';
import { CircuitBackground } from '../components/CircuitBackground';
import { BlockPalette } from '../components/BlockPalette';
import { WorkspaceCanvas } from '../components/WorkspaceCanvas';
import { RobotSimulator } from '../components/RobotSimulator';
import { ExecutionControls } from '../components/ExecutionControls';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { Play, Square, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export interface LogicBlock {
  id: string;
  type: 'move' | 'turn' | 'if' | 'loop' | 'wait';
  label: string;
  parameters?: any;
  x: number;
  y: number;
  connections?: string[];
}

const Index = () => {
  const [blocks, setBlocks] = useState<LogicBlock[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(-1);
  const [robotState, setRobotState] = useState({
    x: 1,
    y: 1,
    direction: 0, // 0: right, 1: down, 2: left, 3: up
    energy: 100
  });
  const [feedback, setFeedback] = useState<string>('');

  const handleBlockDrop = useCallback((blockType: string, x: number, y: number) => {
    const blockTemplates = {
      move: { label: 'Move Forward', parameters: { steps: 1 } },
      turn: { label: 'Turn Right', parameters: { direction: 'right' } },
      if: { label: 'If Wall Ahead', parameters: { condition: 'wall' } },
      loop: { label: 'Repeat 3 times', parameters: { count: 3 } },
      wait: { label: 'Wait 1 second', parameters: { duration: 1 } }
    };

    const template = blockTemplates[blockType as keyof typeof blockTemplates];
    if (template) {
      const newBlock: LogicBlock = {
        id: `block-${Date.now()}`,
        type: blockType as LogicBlock['type'],
        label: template.label,
        parameters: template.parameters,
        x,
        y,
        connections: []
      };
      
      setBlocks(prev => [...prev, newBlock]);
      toast.success(`Added ${template.label} block!`);
    }
  }, []);

  const executeProgram = useCallback(async () => {
    if (blocks.length === 0) {
      setFeedback('Add some logic blocks to create your program!');
      return;
    }

    setIsExecuting(true);
    setExecutionStep(0);
    setFeedback('Executing program...');

    // Sort blocks by y position for sequential execution
    const sortedBlocks = [...blocks].sort((a, b) => a.y - b.y);

    for (let i = 0; i < sortedBlocks.length; i++) {
      setExecutionStep(i);
      const block = sortedBlocks[i];
      
      // Simulate block execution with visual feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update robot state based on block type
      setRobotState(prev => {
        const newState = { ...prev };
        
        switch (block.type) {
          case 'move':
            const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
            const [dx, dy] = directions[prev.direction];
            newState.x = Math.max(0, Math.min(9, prev.x + dx));
            newState.y = Math.max(0, Math.min(9, prev.y + dy));
            break;
          case 'turn':
            newState.direction = (prev.direction + 1) % 4;
            break;
          case 'wait':
            // Just wait, no state change
            break;
        }
        
        return newState;
      });
    }

    setExecutionStep(-1);
    setIsExecuting(false);
    setFeedback('Program executed successfully! 🎉');
    toast.success('Program completed!');
  }, [blocks]);

  const resetProgram = useCallback(() => {
    setBlocks([]);
    setExecutionStep(-1);
    setIsExecuting(false);
    setRobotState({ x: 1, y: 1, direction: 0, energy: 100 });
    setFeedback('Workspace cleared. Ready to build!');
    toast.info('Workspace reset');
  }, []);

  const stopExecution = useCallback(() => {
    setIsExecuting(false);
    setExecutionStep(-1);
    setFeedback('Execution stopped.');
    toast.warning('Execution stopped');
  }, []);

  return (
    <div className="min-h-screen bg-cyber-background relative overflow-hidden">
      <CircuitBackground />
      
      {/* Header */}
      <header className="relative z-10 p-6 glass-panel border-b border-cyber-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyber-primary glow-text">
              Logic Forge
            </h1>
            <p className="text-cyber-muted mt-1">
              Build logic, forge the future
            </p>
          </div>
          
          <ExecutionControls
            isExecuting={isExecuting}
            onExecute={executeProgram}
            onStop={stopExecution}
            onReset={resetProgram}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-120px)]">
        {/* Block Palette */}
        <div className="w-80 glass-panel border-r border-cyber-primary/20 p-4">
          <h2 className="text-xl font-semibold text-cyber-text mb-4 glow-text">
            Logic Blocks
          </h2>
          <BlockPalette />
        </div>

        {/* Workspace */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <WorkspaceCanvas
              blocks={blocks}
              onBlockDrop={handleBlockDrop}
              executionStep={executionStep}
              onBlockDelete={(id) => setBlocks(prev => prev.filter(b => b.id !== id))}
            />
          </div>
          
          {/* Bottom Panel */}
          <div className="h-40 glass-panel border-t border-cyber-primary/20 p-4">
            <FeedbackPanel feedback={feedback} />
          </div>
        </div>

        {/* Robot Simulator */}
        <div className="w-80 glass-panel border-l border-cyber-primary/20 p-4">
          <h2 className="text-xl font-semibold text-cyber-text mb-4 glow-text">
            Neon Lab
          </h2>
          <RobotSimulator robotState={robotState} />
        </div>
      </div>
    </div>
  );
};

export default Index;
