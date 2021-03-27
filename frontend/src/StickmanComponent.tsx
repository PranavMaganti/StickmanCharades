import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { useState } from "react";

type Coordinates = {
  x: number;
  y: number;
};

// const HEAD_HEIGHT = 30;

export default function StickmanComponent() {
  const [center, setCenter] = useState<Coordinates>({ x: 0, y: 0 });

  const onDrag = (p5: p5Types) => {
    setCenter({ x: p5.winMouseX, y: p5.winMouseY });
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1000, 1000).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.fill("#000000");
    p5.ellipse(center.x, center.y, 10, 10);
  };

  return <Sketch setup={setup} draw={draw} mouseDragged={onDrag} />;
}
