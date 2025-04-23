import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableImage } from './components/SortableImage';
import './App.css';

const initialImages = [
  { id: '1', url: 'https://picsum.photos/id/1015/800/800' },
  { id: '2', url: 'https://picsum.photos/id/1018/800/800' },
  { id: '3', url: 'https://picsum.photos/id/1019/800/800' },
  { id: '4', url: 'https://picsum.photos/id/1025/800/800' },
  { id: '5', url: 'https://picsum.photos/id/1039/800/800' },
  { id: '6', url: 'https://picsum.photos/id/1043/800/800' },
  { id: '7', url: 'https://picsum.photos/id/1044/800/800' },
  { id: '8', url: 'https://picsum.photos/id/1050/800/800' },
];

function App() {
  const [images, setImages] = useState(initialImages);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Drag & Drop Galeri</h1>
        <p className="subtitle">Görselleri sürükleyerek yerlerini değiştirebilirsiniz</p>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="image-grid">
            {images.map((image) => (
              <SortableImage key={image.id} image={image} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
