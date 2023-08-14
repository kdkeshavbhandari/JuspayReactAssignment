import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";

function DraggableDiv({ onClick, children }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
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
