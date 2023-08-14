import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import Constants from "../assets/constants/Constants";
import { useCatSpriteContext } from "../context/CatSpriteContext";

function DraggableDiv({ type, onClick, children }) {
  const [isDragging, setIsDragging] = useState(false);
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
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    const { clientX, clientY } = e;
    // console.log(clientX, clientY);
    if (clientX < 300) {
      return;
    }
    const newPositionDiv = document.createElement("div");
    const htmlString = ReactDOMServer.renderToString(children);
    newPositionDiv.className = "dragged-div";
    newPositionDiv.style.left = `${clientX}px`;
    newPositionDiv.style.top = `${clientY}px`;
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
