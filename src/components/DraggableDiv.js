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

  const handleMotions = (div) => {
    const classList = div?.classList;
    if (classList[2]) {
      operations[classList[2]].push(type);
    }
  };

  const isEvent = () => {
    return Object.values(Constants.EVENTS).includes(type);
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
    console.log(isEvent());
    newPositionDiv.className = isEvent()
      ? `dragged-div event-dragged ${type}`
      : "dragged-div";
    newPositionDiv.innerHTML = htmlString;
    const midAreaDiv = document.getElementById("midArea");
    if (isEvent()) {
      newPositionDiv.style.left = `${
        clientX - dragStart.x + e.target.getBoundingClientRect().left
      }px`;
      newPositionDiv.style.top = `${
        clientY - dragStart.y + e.target.getBoundingClientRect().top
      }px`;
      newPositionDiv.style.position = "absolute";
      midAreaDiv.append(newPositionDiv);
      handleEvents();
    } else {
      const closestEventDiv = getClosestDiv(clientX, clientY);
      if (closestEventDiv) {
        closestEventDiv.appendChild(newPositionDiv);
      } else {
        midAreaDiv.appendChild(newPositionDiv);
      }
      handleMotions(closestEventDiv);
    }
  };

  function getClosestDiv(clientX, clientY) {
    let closestDiv = null;
    let closestDistance = Infinity;

    const divElements = document.getElementsByClassName("event-dragged");
    console.log(divElements);
    if (!divElements) {
      return;
    }
    Array.from(divElements).forEach((div) => {
      const divRect = div.getBoundingClientRect();
      const centerX = divRect.left + divRect.width / 2;
      const centerY = divRect.top + divRect.height / 2;

      const distance = Math.sqrt(
        (clientX - centerX) ** 2 + (clientY - centerY) ** 2
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestDiv = div;
      }
    });

    return closestDiv;
  }

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
