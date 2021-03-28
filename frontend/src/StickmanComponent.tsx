import React, { useEffect } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { useMemo } from "react";
import Stage from "./stage/Stage";
import { SpriteNode } from "./stage/SpriteNode";
import { Sprite } from "./stage/Sprite";
import { useState } from "react";
import { IPoint } from "./stage/IPoint";
import { Shape } from "./stage/Shape";
import socket from "./socket";
import { Button, Typography } from "@material-ui/core";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const STICKMAN_LENGTH = 60;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

function drawSprite(
  p5: p5Types,
  x: number,
  y: number,
  color: string = "#FF0000"
) {
  p5.push();
  p5.strokeWeight(2);
  p5.fill(color);
  p5.ellipse(x, y, 20, 20);
  p5.pop();
}

function drawSpriteNodes(
  p5: p5Types,
  currX: number,
  currY: number,
  sprites: SpriteNode[]
) {
  sprites.forEach((element) => {
    p5.strokeWeight(5);
    p5.noFill();
    switch (element.limbShape) {
      case Shape.Line: {
        p5.line(currX, currY, element.getX(), element.getY());

        break;
      }
      case Shape.Circle: {
        p5.circle(
          (currX + element.getX()) / 2,
          (currY + element.getY()) / 2,
          element.length
        );
        break;
      }
    }
    drawSpriteNodes(p5, element.getX(), element.getY(), element.children);
    drawSprite(p5, element.getX(), element.getY());
  });
}

function getClosestSprite(
  x: number,
  y: number,
  nodes: SpriteNode[]
): SpriteNode {
  let closestNode: SpriteNode = nodes[0];
  let minDistance: number = closestNode.getSquaredDistanceFrom(x, y);
  nodes.forEach((it) => {
    const distFromMouse = it.getSquaredDistanceFrom(x, y);

    if (it.children.length > 0) {
      const minChild = getClosestSprite(x, y, it.children);
      const minChildDist = minChild.getSquaredDistanceFrom(x, y);

      if (minChildDist < minDistance) {
        closestNode = minChild;
        minDistance = minChildDist;
      }
    }

    if (distFromMouse < minDistance) {
      closestNode = it;
      minDistance = distFromMouse;
    }
  });

  return closestNode;
}

export default function StickmanComponent() {
  const center = useMemo<Point>(
    () => new Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2),
    []
  );

  const [stickmanSprite, setStickmanSprite] = useState(
    Stage.generateStickman(center.x, center.y, STICKMAN_LENGTH)
  );
  const [selectedNode, setSelectedNode] = useState<IPoint>();
  const [wordHint, setWordHint] = useState("Room Code: W3z90");
  const [isGuesser, setIsGuesser] = useState(true);

  useEffect(() => {
    socket.on(
      "stickmanReceiveMove",
      (data: { message: string; id: string }) => {
        const sprite: Sprite = Sprite.fromJson(data.message);
        if (socket.id != data.id) {
          setStickmanSprite(sprite);
        }
      }
    );

    socket.on("startRound", (data: { type: string; word: string }) => {
      console.log(data);
      setIsGuesser(data.type == "guesser");
      console.log(isGuesser);
      setWordHint(data.word);
    });

    return () => {
      socket.off("stickmanReceiveMove");
      socket.off("startRound");
    };
  });

  const onClick = (p5: p5Types) => {
    let closestChild = getClosestSprite(
      p5.mouseX,
      p5.mouseY,
      stickmanSprite.sprites
    );
    let closestDist = closestChild.getSquaredDistanceFrom(p5.mouseX, p5.mouseY);
    let parentDist = stickmanSprite.getSquaredDistanceFrom(
      p5.mouseX,
      p5.mouseY
    );
    if (closestDist < parentDist) {
      setSelectedNode(closestChild);
    } else {
      setSelectedNode(stickmanSprite);
    }
  };

  const onDrag = (p5: p5Types) => {
    if (selectedNode != undefined) {
      if (selectedNode instanceof Sprite) {
        // TODO: Dont let this overflow the form
        selectedNode.movePos(p5.mouseX, p5.mouseY);
      } else if (selectedNode instanceof SpriteNode) {
        const selectedParent = selectedNode.parent;

        const parentX = selectedParent.getX();
        const parentY = selectedParent.getY();

        const angle =
          180 -
          Math.atan2(p5.mouseX - parentX, p5.mouseY - parentY) *
            (180 / Math.PI);

        selectedNode.setAngle(angle);
      }
      socket.emit("stickmanEmitMove", stickmanSprite.toJson());
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    drawSpriteNodes(
      p5,
      stickmanSprite.getX(),
      stickmanSprite.getY(),
      stickmanSprite.sprites
    );

    drawSprite(p5, stickmanSprite.getX(), stickmanSprite.getY(), "#FFA500");
  };

  const resetSprite = () => {
    let newMan = Stage.generateStickman(center.x, center.y, STICKMAN_LENGTH);
    setStickmanSprite(newMan);
    socket.emit("stickmanEmitMove", newMan.toJson());
  };

  // let sketch;
  // if (!isGuesser) {
  //   sketch = (
  //     <Sketch
  //       setup={setup}
  //       draw={draw}
  //       mouseDragged={onDrag}
  //       mousePressed={onClick}
  //     />
  //   );
  // } else {
  //   sketch = <Sketch setup={setup} draw={draw} />;
  // }

  return (
    <div>
      <div className="flex-col">
        <Typography className="hint_text">{wordHint}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => resetSprite()}
        >
          RESET
        </Button>
      </div>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={!isGuesser ? onDrag : () => {}}
        mousePressed={!isGuesser ? onClick : () => {}}
      />
    </div>
  );
}
