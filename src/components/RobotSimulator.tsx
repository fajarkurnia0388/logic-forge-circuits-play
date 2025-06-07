
import { Bot, Zap } from 'lucide-react';

interface RobotState {
  x: number;
  y: number;
  direction: number;
  energy: number;
}

interface RobotSimulatorProps {
  robotState: RobotState;
}

export const RobotSimulator = ({ robotState }: RobotSimulatorProps) => {
  const gridSize = 10;
  
  const getRotation = (direction: number) => {
    return direction * 90;
  };

  // Create obstacles for the lab
  const obstacles = [
    { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
    { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 },
    { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 },
    { x: 8, y: 7 }, { x: 8, y: 8 }
  ];

  const isObstacle = (x: number, y: number) => {
    return obstacles.some(obs => obs.x === x && obs.y === y);
  };

  return (
    <div className="space-y-4">
      {/* Robot Status */}
      <div className="glass-panel p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-cyber-text">Robot Status</span>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-cyber-success" />
            <span className="text-xs text-cyber-success">{robotState.energy}%</span>
          </div>
        </div>
        
        <div className="text-xs text-cyber-muted space-y-1">
          <div>Position: ({robotState.x}, {robotState.y})</div>
          <div>Direction: {['→', '↓', '←', '↑'][robotState.direction]}</div>
        </div>
        
        {/* Energy bar */}
        <div className="mt-2 w-full bg-black/20 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-cyber-success to-cyber-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${robotState.energy}%` }}
          />
        </div>
      </div>

      {/* Lab Grid */}
      <div className="glass-panel p-4 rounded-lg">
        <h3 className="text-sm font-medium text-cyber-text mb-3">Neon Lab Environment</h3>
        
        <div 
          className="grid gap-1 mx-auto"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: 'fit-content'
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);
            const isRobotHere = robotState.x === x && robotState.y === y;
            const isObstacleHere = isObstacle(x, y);
            
            return (
              <div
                key={index}
                className={`
                  w-6 h-6 border border-cyber-primary/20 relative
                  ${isObstacleHere ? 'bg-red-500/20 border-red-400/50' : 'bg-cyber-surface/30'}
                  ${isRobotHere ? 'bg-cyber-primary/20 border-cyber-primary' : ''}
                  transition-all duration-300
                `}
              >
                {/* Grid coordinates for reference */}
                {(x === 0 && y === 0) && (
                  <span className="absolute -top-3 -left-1 text-xs text-cyber-muted">0,0</span>
                )}
                
                {/* Robot */}
                {isRobotHere && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bot 
                      size={16} 
                      className="text-cyber-primary animate-pulse-glow"
                      style={{ 
                        transform: `rotate(${getRotation(robotState.direction)}deg)`,
                        transition: 'transform 0.5s ease'
                      }}
                    />
                  </div>
                )}
                
                {/* Obstacle */}
                {isObstacleHere && (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-600/30 border border-red-400/30">
                    <div className="w-full h-full bg-circuit-pattern opacity-50" />
                  </div>
                )}
                
                {/* Neon grid effect */}
                <div className="absolute inset-0 border border-cyber-primary/10" />
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 text-xs text-cyber-muted space-y-1">
          <div className="flex items-center gap-2">
            <Bot size={12} className="text-cyber-primary" />
            <span>Robot position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500/20 border border-red-400/50" />
            <span>Obstacles</span>
          </div>
        </div>
      </div>
      
      {/* Mission objective */}
      <div className="glass-panel p-3 rounded-lg border border-cyber-success/20">
        <h4 className="text-sm font-medium text-cyber-success mb-2">🎯 Mission</h4>
        <p className="text-xs text-cyber-muted">
          Navigate the robot through the neon lab, avoiding obstacles and reaching the target zone.
        </p>
      </div>
    </div>
  );
};
