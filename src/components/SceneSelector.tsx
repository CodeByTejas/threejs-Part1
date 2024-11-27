import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SceneSelectorProps {
  currentScene: string;
  onSceneChange: (scene: string) => void;
  scenes: string[];
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({
  currentScene,
  onSceneChange,
  scenes,
}) => {
  const currentIndex = scenes.indexOf(currentScene);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + scenes.length) % scenes.length;
    onSceneChange(scenes[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % scenes.length;
    onSceneChange(scenes[newIndex]);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg flex items-center gap-4">
      <button
        onClick={handlePrevious}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <span className="text-lg font-medium min-w-48 text-center">
        {currentScene}
      </span>
      <button
        onClick={handleNext}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};