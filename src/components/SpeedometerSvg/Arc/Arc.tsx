import React, { useEffect, useRef } from 'react'

interface ArcProps {
  color: string
  x: number
  y: number
  radius: number
  lineWidth: number
  startAngle: number
  endAngle: number
}

export const Arc = ({
  color,
  x,
  y,
  startAngle,
  endAngle,
  radius,
  lineWidth,
}: ArcProps) => {
  const svgRef = useRef<SVGPathElement | null>(null)
  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    svgRef.current!.setAttribute(
      'd',
      describeArc(x, y, radius, startAngle, endAngle),
    )
  }, [])

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInRadian: number,
  ) => {
    return {
      x: centerX + radius * Math.cos(angleInRadian),
      y: centerY + radius * Math.sin(angleInRadian),
    }
  }

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ')
  }
  return (
    <path ref={svgRef} fill="none" stroke={color} strokeWidth={lineWidth} />
  )
}
