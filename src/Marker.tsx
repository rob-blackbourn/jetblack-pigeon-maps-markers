import React from 'react'

import { SVGAdornment } from './SVGAdornment'
import { SVGMarker } from './SVGMarker'
import { MarkerProps, SVGMarkerProps } from './types'

export function Marker(props: MarkerProps): JSX.Element {
  return <SVGAdornment {...props} render={(props: SVGMarkerProps) => <SVGMarker {...props} />} />
}
