import React from 'react'

import { SVGAdornmentProps } from './types'

export function SVGAdornment({ className, render, ...props }: SVGAdornmentProps): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        cursor: 'pointer',
      }}
      className={className ? `${className} pigeon-click-block` : 'pigeon-click-block'}
    >
      {render(props)}
    </div>
  )
}
