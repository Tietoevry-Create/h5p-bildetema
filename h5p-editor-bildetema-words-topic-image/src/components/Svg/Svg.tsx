import React from 'react'
import { Polygon } from '../Polygon/Polygon'
import styles from './Svg.module.scss'


export type Point = {
  x: number,
  y: number,
}

export type Hotspot = {
  points: Point[]
  finishedDrawing: boolean
}

export type SvgProps = {
  hotspots: Hotspot[]
}

export const Svg = ():JSX.Element => {
  const hotspot: Hotspot = {
    // points: [],
    // finished: true
    points: [{x:10, y:10},{x:25, y:20}, {x:30, y:30}],
    finishedDrawing: false
  }

  return (
    <svg className={styles.svg} preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <Polygon hotspot={hotspot}/>
    </svg>
  )
}
