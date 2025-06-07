
import { Move, RotateCw, GitBranch, Repeat, Clock } from 'lucide-react';

const blockTypes = [
  {
    type: 'move',
    label: 'Move Forward',
    icon: Move,
    description: 'Move the robot one step forward',
    color: 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-400/50'
  },
  {
    type: 'turn',
    label: 'Turn Right',
    icon: RotateCw,
    description: 'Turn the robot 90° to the right',
    color: 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-400/50'
  },
  {
    type: 'if',
    label: 'If Wall Ahead',
    icon: GitBranch,
    description: 'Execute if condition is true',
    color: 'bg-gradient-to-r from-purple-500/20 to-purple-400/20 border-purple-400/50'
  },
  {
    type: 'loop',
    label: 'Repeat 3x',
    icon: Repeat,
    description: 'Repeat actions multiple times',
    color: 'bg-gradient-to-r from-orange-500/20 to-orange-400/20 border-orange-400/50'
  },
  {
    type: 'wait',
    label: 'Wait 1s',
    icon: Clock,
    description: 'Pause execution for specified time',
    color: 'bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 border-cyan-400/50'
  }
];

export const BlockPalette = () => {
  const handleDragStart = (event: React.DragEvent, blockType: string) => {
    event.dataTransfer.setData('blockType', blockType);
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="space-y-4">
      <p className="text-cyber-muted text-sm">
        Drag blocks to the workspace to build your program
      </p>
      
      <div className="space-y-3">
        {blockTypes.map((block) => {
          const Icon = block.icon;
          
          return (
            <div
              key={block.type}
              draggable
              onDragStart={(e) => handleDragStart(e, block.type)}
              className={`
                drag-block p-4 rounded-lg cursor-grab active:cursor-grabbing
                ${block.color}
                hover:scale-105 transition-all duration-200
                group
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-black/20 flex items-center justify-center">
                  <Icon size={16} className="text-cyber-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-cyber-text text-sm">
                    {block.label}
                  </h3>
                  <p className="text-xs text-cyber-muted opacity-80 group-hover:opacity-100 transition-opacity">
                    {block.description}
                  </p>
                </div>
              </div>
              
              {/* Data flow animation */}
              <div className="relative mt-2 h-1 bg-black/20 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 w-2 bg-cyber-primary rounded-full animate-data-flow opacity-60" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-3 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20">
        <h4 className="text-sm font-medium text-cyber-primary mb-2">💡 Pro Tip</h4>
        <p className="text-xs text-cyber-muted">
          Connect blocks vertically to create a sequence. Watch the data flow through your circuit!
        </p>
      </div>
    </div>
  );
};
