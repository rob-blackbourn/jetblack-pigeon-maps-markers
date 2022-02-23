import React, { useState } from 'react'

import { SVGMarkerEvent, SVGMarkerProps } from './types'

export function SVGMarker(props: SVGMarkerProps): JSX.Element {
  const {
    anchor,
    color = '#93C0D0',
    height,
    hover,
    latLngToPixel,
    onClick,
    onContextMenu,
    onMouseOver,
    onMouseOut,
    payload,
    width,
  } = props
  const [internalHover, setInternalHover] = useState(hover || false)
  const localHover = typeof hover === 'undefined' ? internalHover : hover

  const [x, y] = latLngToPixel(anchor)

  // what do you expect to get back with the event
  const eventParameters = (event: React.MouseEvent<SVGElement>): SVGMarkerEvent => ({
    event,
    anchor,
    payload,
  })

  const localWidth = width ?? (height * 29) / 34 ?? 29
  const localHeight = height ?? (width * 34) / 29 ?? 34

  const handleClick = (event: React.MouseEvent<SVGElement>): void => {
    console.log('click')
    onClick && onClick(eventParameters(event))
  }

  const handleContextMenu = (event: React.MouseEvent<SVGElement>): void => {
    onContextMenu && onContextMenu(eventParameters(event))
  }

  const handleMouseOver = (event: React.MouseEvent<SVGElement>): void => {
    onMouseOver && onMouseOver(eventParameters(event))
    setInternalHover(true)
  }

  const handleMouseOut = (event: React.MouseEvent<SVGElement>): void => {
    onMouseOut && props.onMouseOut(eventParameters(event))
    setInternalHover(false)
  }

  return (
    <svg
      style={{ pointerEvents: 'none', filter: localHover ? 'drop-shadow(0 0 4px rgba(0, 0, 0, .3))' : '' }}
      width={localWidth}
      viewBox="0 0 61 71"
      fill="none"
      transform={`translate(${x - localWidth / 2}, ${y - (localHeight - 1)})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style={{ pointerEvents: 'visibleFill' }}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <path
          d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z"
          fill={color}
          stroke="white"
          strokeWidth="4"
        />
        <circle cx="30.5" cy="30.5" r="8.5" fill="white" opacity={localHover ? 0.98 : 0.6} />
      </g>
    </svg>
  )
}
