import React, { useState } from "react";
import { useCatSpriteContext } from "../context/CatSpriteContext";

const useCatSprite = () => {
  const { position, setPosition, rotation, setRotation } =
    useCatSpriteContext();

  const move10Steps = () => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + 10,
      y: prevPosition.y,
    }));
  };

  const handleRotateClockwise = () => {
    setRotation(rotation + 15);
  };

  const handleRotateAntiClockwise = () => {
    setRotation(rotation - 15);
  };

  return {
    position,
    move10Steps,
    handleRotateClockwise,
    handleRotateAntiClockwise,
  };
};

export default useCatSprite;
