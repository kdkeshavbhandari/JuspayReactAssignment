import React from "react";
import useCatSprite from "../hooks/useCatSprite";
import DraggableDiv from "./DraggableDiv";
import Icon from "./Icon";

export default function Sidebar() {
  const { move10Steps, handleRotateClockwise, handleRotateAntiClockwise } =
    useCatSprite();

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <DraggableDiv>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer text-color-yeah">
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </div>
      </DraggableDiv>
      <DraggableDiv>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"When this sprite clicked"}
        </div>
      </DraggableDiv>
      <div className="font-bold"> {"Motion"} </div>
      <DraggableDiv onClick={move10Steps}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"Move 10 steps"}
        </div>
      </DraggableDiv>
      <DraggableDiv onClick={handleRotateAntiClockwise}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
      </DraggableDiv>
      <DraggableDiv onClick={handleRotateClockwise}>
        <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
      </DraggableDiv>
    </div>
  );
}
