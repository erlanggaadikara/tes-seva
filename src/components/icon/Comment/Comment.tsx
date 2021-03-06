import React from 'react'
import { colors } from 'styles/colors'

interface CommentProps {
  width?: number | string
  height?: number | string
  color?: string
}

export const Comment = ({
  width = 20,
  height = 18,
  color = colors.primary1,
}: CommentProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.50073 1.5C3.01545 1.5 1.00073 3.51472 1.00073 6V9C1.00073 9.18026 1.01133 9.35805 1.03194 9.53277C1.01117 9.60153 1 9.67446 1 9.75V16.3693C1 17.0101 1.75159 17.3558 2.23809 16.9388L5.68827 13.9815C6.05075 13.6708 6.51243 13.5 6.98985 13.5H14.5007C16.986 13.5 19.0007 11.4853 19.0007 9V6C19.0007 3.51472 16.986 1.5 14.5007 1.5H5.50073Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  )
}
