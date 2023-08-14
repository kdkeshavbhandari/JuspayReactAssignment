import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Constants from "../assets/constants/Constants";
import { useCatSpriteContext } from "../context/CatSpriteContext";

function DraggableDiv({ type, onClick, children }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { operations, setOperations } = useCatSpriteContext();

  const handleEvents = () => {
    if (Object.values(Constants.EVENTS).includes(type)) {
      if (operations[type]) {
        return;
      }
      operations[type] = [];
    }
  };

  const handleMotions = () => {
    if (Object.values(Constants.MOTION).includes(type)) {
      if (operations[Constants.EVENTS.FLAG_CLICK]) {
        operations[Constants.EVENTS.FLAG_CLICK].push(type);
      }
    }
    console.log(operations);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    const { clientX, clientY } = e;
    const newPositionDiv = document.createElement("div");
    const htmlString = ReactDOMServer.renderToString(children);
    newPositionDiv.className = "dragged-div";
    newPositionDiv.style.left = `${
      clientX - dragStart.x + e.target.getBoundingClientRect().left
    }px`;
    newPositionDiv.style.top = `${
      clientY - dragStart.y + e.target.getBoundingClientRect().top
    }px`;
    newPositionDiv.style.position = "absolute";
    newPositionDiv.innerHTML = htmlString;
    const midAreaDiv = document.getElementById("midArea");
    midAreaDiv.appendChild(newPositionDiv);
    handleEvents();
    handleMotions();
  };

  return (
    <div
      onClick={onClick}
      className={`original-div ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
}

export default DraggableDiv;
