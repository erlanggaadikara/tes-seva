import React from 'react'
import Car from './SmallCar.png'

export const SmallCar = (width = 102, height = 44) => {
  return <img src={Car} alt="SmallCar" style={{ width, height }} />
}
