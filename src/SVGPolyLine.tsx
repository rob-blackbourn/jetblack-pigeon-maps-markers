import React, { useState } from 'react'

import { SVGPolyLineProps, SVGPolyLineEvent } from './types'

export function SVGPolyLine(props: SVGPolyLineProps): JSX.Element {
  const {
    color = 'red',
    coordinates,
    hover,
    latLngToPixel,
    onClick,
    onContextMenu,
    onMouseOver,
    onMouseOut,
    mapState: { width, height },
    payload,
    pixelToLatLng,
    strokeWidth = 2,
  } = props

  const [internalHover, setInternalHover] = useState(hover || false)
  const localHover = typeof hover === 'undefined' ? internalHover : hover

  const pixels = coordinates.map((latLng) => latLngToPixel(latLng))

  // what do you expect to get back with the event
  const eventParameters = (event: React.MouseEvent<SVGElement>): SVGPolyLineEvent => ({
    event,
    point: pixelToLatLng([event.clientX, event.clientY]),
    coordinates,
    payload,
  })

  const handleClick = (event: React.MouseEvent<SVGElement>): void => {
    onClick && onClick(eventParameters(event))
  }

  const handleContextMenu = (event: React.MouseEvent<SVGElement>): void => {
    onContextMenu && onContextMenu(eventParameters(event))
  }

  const handleMouseOver = (event: React.MouseEvent<SVGElement>): void => {
    onMouseOver && onMouseOver(eventParameters(event))
    setInternalHover(true)
  }

  const handleMouseOut = (event: React.MouseEvent<SVGElement, MouseEvent>): void => {
    onMouseOut && props.onMouseOut(eventParameters(event))
    setInternalHover(false)
  }

  return (
    <svg
      style={{ pointerEvents: 'none', filter: localHover ? 'drop-shadow(0 0 4px rgba(0, 0, 0, .3))' : '' }}
      width={width === -1 ? null : width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        style={{ pointerEvents: 'auto' }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        points={pixels.map((xy) => xy.join(',')).join(' ')}
        strokeWidth={strokeWidth}
        stroke={color}
        fill="none"
      />
    </svg>
  )
}
