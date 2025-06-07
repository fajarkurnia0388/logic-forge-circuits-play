
import { MessageSquare, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

interface FeedbackPanelProps {
  feedback: string;
}

export const FeedbackPanel = ({ feedback }: FeedbackPanelProps) => {
  const getFeedbackType = (message: string) => {
    if (message.includes('successfully') || message.includes('🎉')) {
      return 'success';
    }
    if (message.includes('Error') || message.includes('stopped')) {
      return 'error';
    }
    if (message.includes('Add') || message.includes('Ready')) {
      return 'info';
    }
    return 'default';
  };

  const feedbackType = getFeedbackType(feedback);
  
  const getIcon = () => {
    switch (feedbackType) {
      case 'success':
        return <CheckCircle size={16} className="text-cyber-success" />;
      case 'error':
        return <AlertCircle size={16} className="text-cyber-error" />;
      case 'info':
        return <Lightbulb size={16} className="text-cyber-warning" />;
      default:
        return <MessageSquare size={16} className="text-cyber-primary" />;
    }
  };

  const getTextColor = () => {
    switch (feedbackType) {
      case 'success':
        return 'text-cyber-success';
      case 'error':
        return 'text-cyber-error';
      case 'info':
        return 'text-cyber-warning';
      default:
        return 'text-cyber-text';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-cyber-text glow-text">
        AI Assistant
      </h3>
      
      <div className="glass-panel p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className={`text-sm ${getTextColor()}`}>
              {feedback || "Welcome to Logic Forge! Drag logic blocks to the workspace to start programming your robot."}
            </p>
          </div>
        </div>
        
        {/* Animated thinking indicator */}
        <div className="mt-3 flex items-center gap-1">
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-cyber-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-cyber-muted ml-2">
            AI analyzing your logic flow...
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="glass-panel p-2 rounded text-center">
          <div className="text-cyber-success font-medium">Concepts</div>
          <div className="text-cyber-muted">5/12</div>
        </div>
        <div className="glass-panel p-2 rounded text-center">
          <div className="text-cyber-primary font-medium">Level</div>
          <div className="text-cyber-muted">Beginner</div>
        </div>
        <div className="glass-panel p-2 rounded text-center">
          <div className="text-cyber-warning font-medium">Score</div>
          <div className="text-cyber-muted">850</div>
        </div>
      </div>
    </div>
  );
};
