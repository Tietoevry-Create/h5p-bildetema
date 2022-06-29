import React from 'react'
import type {Hotspot} from '../Svg/Svg'

export type PolygonProps = {
  hotspot: Hotspot
}

export const Polygon: React.FC<PolygonProps> = ({hotspot:{points, finishedDrawing}}) => {
  const pointsToDAttribute = ():string=> {
    const d = points.map(({x, y}, index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ")
    return finishedDrawing ? `${d} Z` : d
  }
  
  return (
    <>
      {/* {points.length && <path d="M 10 10 L 100 100" fill="transparent" stroke="black"/>} */}
      {points.length && <path d={pointsToDAttribute()} fill="transparent" stroke="black"/>}
      {/* {!finished && <circle cx="50" cy="50" r="1" fill="red"/>} */}
      {!finishedDrawing && points.map(({x,y}) => (<circle key={`${x}${y}`}cx={x} cy={y} r="1" fill="red"/>))}
    </>
  )
}
