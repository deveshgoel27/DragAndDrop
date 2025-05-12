// DragDropBuilder.jsx
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ELEMENTS = ["Text", "Image", "Button"];

const DraggableElement = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`p-2 border rounded bg-white shadow cursor-move mb-2 ${isDragging ? "opacity-50" : ""}`}>
      {type}
    </div>
  );
};

const CanvasElement = ({ element, index, onSelect }) => {
  return (
    <div className="p-2 border mb-2 bg-gray-50 cursor-pointer" onClick={() => onSelect(index)}>
      {element.type === "Text" && <p>{element.properties.text || "Sample Text"}</p>}
      {element.type === "Image" && <img src={element.properties.src || ""} alt="" className="max-w-full" />}
      {element.type === "Button" && <button className="bg-blue-500 text-white px-4 py-2 rounded">{element.properties.label || "Click Me"}</button>}
    </div>
  );
};

const DropCanvas = ({ elements, onDrop, onSelect, selectedIndex }) => {
  const [, drop] = useDrop(() => ({
    accept: "ELEMENT",
    drop: (item) => onDrop(item.type),
  }));

  return (
    <div ref={drop} className="min-h-[400px] p-4 border border-dashed border-gray-300 bg-white">
      {elements.map((el, idx) => (
        <CanvasElement
          key={idx}
          element={el}
          index={idx}
          onSelect={onSelect}
          isSelected={idx === selectedIndex}
        />
      ))}
    </div>
  );
};

const PropertyForm = ({ element, onChange }) => {
  if (!element) return <div className="text-gray-500">Select an element to edit</div>;

  const updateProperty = (key, value) => {
    onChange({ ...element, properties: { ...element.properties, [key]: value } });
  };

  return (
    <div className="space-y-4">
      {element.type === "Text" && (
        <Input placeholder="Text" value={element.properties.text || ""} onChange={(e) => updateProperty("text", e.target.value)} />
      )}
      {element.type === "Image" && (
        <Input placeholder="Image URL" value={element.properties.src || ""} onChange={(e) => updateProperty("src", e.target.value)} />
      )}
      {element.type === "Button" && (
        <Input placeholder="Button Label" value={element.properties.label || ""} onChange={(e) => updateProperty("label", e.target.value)} />
      )}
    </div>
  );
};

export default function DragDropBuilder() {
  const [elements, setElements] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDrop = (type) => {
    setElements([...elements, { type, properties: {} }]);
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handlePropertyChange = (updatedElement) => {
    const newElements = [...elements];
    newElements[selectedIndex] = updatedElement;
    setElements(newElements);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Elements</h2>
              {ELEMENTS.map((el) => (
                <DraggableElement key={el} type={el} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Canvas</h2>
              <DropCanvas elements={elements} onDrop={handleDrop} onSelect={handleSelect} selectedIndex={selectedIndex} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">Properties</h2>
              <PropertyForm element={elements[selectedIndex]} onChange={handlePropertyChange} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
}
