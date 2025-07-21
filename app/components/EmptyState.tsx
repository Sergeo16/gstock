import { icons } from 'lucide-react';
import React, { FC } from 'react';

// Affiche un état vide avec une icône et un message
interface EmptyStateProps {
  IconComponent: keyof typeof icons;
  message: string;
}

const EmptyState: FC<EmptyStateProps> = ({ IconComponent, message }) => {
  const SelectedIcon = icons[IconComponent];
  if (!SelectedIcon) return null;
  return (
    <div className="w-full h-full my-20 flex justify-center items-center flex-col">
      <div className="wiggle-animation">
        <SelectedIcon strokeWidth={1} className="w-30 h-30 text-accent" />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
