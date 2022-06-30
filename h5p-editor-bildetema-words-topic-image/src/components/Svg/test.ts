type Point = { x: number; y: number };
const svg: SVGElement = document.querySelector(".svg");
const canvas: HTMLCanvasElement = document.querySelector(".canvas");
const path: SVGPathElement = document.querySelector(".path");

const finishButton: HTMLButtonElement =
  document.querySelector(".finish-button");
const clearButton: HTMLButtonElement = document.querySelector(".clear-button");

const link = document.querySelector(".link");

let points: Point[] = [];

let { width, height } = canvas.getBoundingClientRect();
const viewBoxWidth = 100;
const viewBoxHeight = 100;

enum State {
  Drawing,
  Finished,
}
let state = State.Drawing;

canvas.addEventListener("click", handleClick);

function handleClick(event: MouseEvent) {
  if (state === State.Finished) {
    return;
  }

  const x = event.offsetX;
  const y = event.offsetY;

  const normalizedX = x / width;
  const normalizedY = y / height;

  const previousD = path.getAttribute("d");
  const isFirstPoint = previousD.length === 0;

  const pointX = roundToTwoSignificantDecimals(normalizedX * viewBoxWidth);
  const pointY = roundToTwoSignificantDecimals(normalizedY * viewBoxHeight);

  const newD = `${previousD} ${
    isFirstPoint ? "M" : "L"
  }${pointX} ${pointY}`.trim();
  path.setAttribute("d", newD);

  svg.appendChild(createPoint(pointX, pointY));
  points.push({ x: pointX, y: pointY });
}

function roundToTwoSignificantDecimals(num: number): number {
  return Number.parseFloat(num.toFixed(2));
}

function handlePointClick(event: Event) {
  event.stopPropagation();

  if (state === State.Finished) {
    return;
  }

  const { target } = event;

  const startPointWasClicked =
    [...target.parentElement.childNodes]
      .filter(element => element.tagName?.toUpperCase() === "CIRCLE")
      .indexOf(target) === 0;
  const threeOrMorePoints = points.length > 2;

  if (startPointWasClicked) {
    if (threeOrMorePoints) {
      finishDrawing();
    }
    return;
  }

  const x = Number.parseFloat(target.getAttribute("cx"));
  const y = Number.parseFloat(target.getAttribute("cy"));

  target.parentNode.removeChild(target);

  removePoint(x, y);
  draw(points);
}

function draw(points) {
  const d = points
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ");

  path.setAttribute("d", d);
}

function removePoint(x: number, y: number) {
  points = points.filter(point => point.x !== x && point.y !== y);
}

function createPoint(x: number, y: number) {
  const pointSize = 1;
  const svgNamespace = "http://www.w3.org/2000/svg";

  const point = document.createElementNS(svgNamespace, "circle");
  point.setAttributeNS(null, "cx", x);
  point.setAttributeNS(null, "cy", y);
  point.setAttributeNS(null, "r", pointSize);
  point.addEventListener("click", handlePointClick);

  return point;
}

window.addEventListener("resize", () => {
  const bcr = canvas.getBoundingClientRect();
  width = bcr.width;
  height = bcr.height;
});

finishButton.addEventListener("click", () => {
  finishDrawing();
});

function finishDrawing() {
  const previousD = path.getAttribute("d");
  const newD = `${previousD} Z`;

  path.setAttribute("d", newD);

  wrapPathInLink();

  canvas.classList.add("canvas--finished");

  state = State.Finished;
}

function reset() {
  const previousD = path.getAttribute("d");
  const newD = "";

  points = [];
  path.setAttribute("d", newD);

  unwrapPathFromLink();

  Array.from(svg.querySelectorAll("circle")).forEach(circle =>
    circle.parentNode.removeChild(circle),
  );

  state = State.Drawing;

  canvas.classList.remove("canvas--finished");
}

function wrapPathInLink() {
  link.appendChild(path);
  link.removeAttribute("hidden");
}

function unwrapPathFromLink() {
  svg.appendChild(path);
  link.setAttribute("hidden", "hidden");
}

clearButton.addEventListener("click", () => {
  reset();
});
