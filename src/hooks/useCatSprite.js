import React, { useState } from "react";
import Constants from "../assets/constants/Constants";
import { useCatSpriteContext } from "../context/CatSpriteContext";

const useCatSprite = () => {
  const { position, setPosition, rotation, setRotation, operations } =
    useCatSpriteContext();

  const move10Steps = () => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + 10,
      y: prevPosition.y,
    }));
  };

  const handleRotateClockwise = () => {
    setRotation((prev) => {
      return prev + 15;
    });
  };

  const handleRotateAntiClockwise = () => {
    setRotation((prev) => {
      return prev - 15;
    });
  };

  const runEvents = (operations) => {
    operations.forEach((op) => {
      if (op === Constants.MOTION.MOVE_10_STEPS) {
        move10Steps();
      } else if (op === Constants.MOTION.ANTICLOCk_15_DEG) {
        handleRotateAntiClockwise();
      } else if (op === Constants.MOTION.CLOCK_15_DEG) {
        handleRotateClockwise();
      }
    });
  };

  const onFlagClicked = () => {
    const events = operations[Constants.EVENTS.FLAG_CLICK];
    runEvents(events);
    console.log(events);
  };

  const onSpriteClicked = () => {
    console.log("spriteClicked");
  };

  return {
    position,
    move10Steps,
    handleRotateClockwise,
    handleRotateAntiClockwise,
    onFlagClicked,
    onSpriteClicked,
  };
};

export default useCatSprite;
