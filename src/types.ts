import React from 'react'

import { Point, MapProps, MapState } from 'pigeon-maps'

export interface SVGAdornmentRenderProps {
  left?: number
  top?: number
  mapState?: MapState
  mapProps?: MapProps

  latLngToPixel?: (latLng: Point, center?: Point, zoom?: number) => Point
  pixelToLatLng?: (pixel: Point, center?: Point, zoom?: number) => Point
  setCenterZoom?: (center: Point | null, zoom: number, zoomAround?: Point | null, animationDuration?: number) => void
}

export interface SVGAdornmentProps extends SVGAdornmentRenderProps {
  className?: string

  render: (props: SVGAdornmentRenderProps) => JSX.Element
}

export interface SVGMarkerEvent {
  event: React.MouseEvent<SVGElement>
  anchor?: Point
  coordinates?: Point[]
  payload: unknown
}

export interface SVGMarkerProps extends SVGAdornmentRenderProps {
  anchor?: Point
  payload?: unknown

  width?: number
  height?: number
  color?: string

  // optional modifiers
  hover?: boolean

  // callbacks
  onClick?: (event: SVGMarkerEvent) => void
  onContextMenu?: (event: SVGMarkerEvent) => void
  onMouseOver?: (event: SVGMarkerEvent) => void
  onMouseOut?: (event: SVGMarkerEvent) => void
}

export interface SVGPolyLineEvent {
  event: React.MouseEvent<SVGElement>
  point: Point
  coordinates: Point[]
  payload?: unknown
}

export interface SVGPolyLineProps extends SVGAdornmentRenderProps {
  payload?: unknown
  coordinates?: Point[]

  strokeWidth?: number

  color?: string
  hover?: boolean

  // callbacks
  onClick?: (event: SVGPolyLineEvent) => void
  onContextMenu?: (event: SVGPolyLineEvent) => void
  onMouseOver?: (event: SVGPolyLineEvent) => void
  onMouseOut?: (event: SVGPolyLineEvent) => void
}

export type MarkerProps = Omit<SVGAdornmentProps, 'render'> & SVGMarkerProps
