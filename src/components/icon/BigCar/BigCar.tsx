import React from 'react'
import Car from './BigCar.png'

export const BigCar = (width = 101, height = 49) => {
  return <img src={Car} alt="BigCar" style={{ width, height }} />
}
