
import { useEffect, useState } from 'react';

interface CircuitNode {
  id: string;
  x: number;
  y: number;
  connections: string[];
  active: boolean;
}

export const CircuitBackground = () => {
  const [nodes, setNodes] = useState<CircuitNode[]>([]);

  useEffect(() => {
    // Generate circuit nodes
    const generatedNodes: CircuitNode[] = [];
    const gridSize = 50;
    const rows = Math.ceil(window.innerHeight / gridSize);
    const cols = Math.ceil(window.innerWidth / gridSize);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.random() > 0.7) { // Sparse distribution
          generatedNodes.push({
            id: `node-${i}-${j}`,
            x: j * gridSize + Math.random() * 20 - 10,
            y: i * gridSize + Math.random() * 20 - 10,
            connections: [],
            active: Math.random() > 0.8
          });
        }
      }
    }

    // Create connections between nearby nodes
    generatedNodes.forEach(node => {
      const nearby = generatedNodes.filter(other => {
        if (other.id === node.id) return false;
        const distance = Math.sqrt(
          Math.pow(other.x - node.x, 2) + Math.pow(other.y - node.y, 2)
        );
        return distance < 100 && Math.random() > 0.6;
      });
      
      node.connections = nearby.slice(0, 2).map(n => n.id);
    });

    setNodes(generatedNodes);

    // Animate circuit activity
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        active: Math.random() > 0.85
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Base circuit pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-30" />
      
      {/* Animated nodes and connections */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Render connections */}
        {nodes.map(node => 
          node.connections.map(connectionId => {
            const connectedNode = nodes.find(n => n.id === connectionId);
            if (!connectedNode) return null;
            
            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={node.x}
                y1={node.y}
                x2={connectedNode.x}
                y2={connectedNode.y}
                stroke="rgba(0, 245, 255, 0.3)"
                strokeWidth="1"
                filter="url(#glow)"
                className={node.active || connectedNode.active ? 'animate-pulse' : ''}
              />
            );
          })
        )}
        
        {/* Render nodes */}
        {nodes.map(node => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.active ? 4 : 2}
            fill={node.active ? '#00f5ff' : 'rgba(0, 245, 255, 0.5)'}
            filter="url(#glow)"
            className={node.active ? 'animate-pulse-glow' : 'animate-circuit-pulse'}
          />
        ))}
      </svg>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-primary rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
