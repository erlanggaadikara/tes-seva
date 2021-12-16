import React from 'react'

interface UncheckedCircleOutlinedProps {
  width?: number
  height?: number
}

export const UncheckedCircleOutlined = ({
  width = 24,
  height = 24,
}: UncheckedCircleOutlinedProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
    >
      <circle cx="12" cy="12" r="11.25" stroke="#E4E9F1" strokeWidth="1.5" />
    </svg>
  )
}
