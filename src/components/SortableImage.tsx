import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ImageType {
  id: string;
  url: string;
}

interface Props {
  image: ImageType;
}

export function SortableImage({ image }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    cursor: isLoading ? 'default' : 'grab',
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`image-container ${isLoading ? 'loading' : ''}`}
    >
      <img
        src={image.url}
        alt={`Görsel ${image.id}`}
        className="gallery-image"
        onLoad={handleLoad}
        loading="lazy"
      />
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
} 