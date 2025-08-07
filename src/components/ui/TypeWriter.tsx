'use client';
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypeWriter = ({data}:{data:(string|number)[]}) => {
  return (
    <TypeAnimation
                sequence={data}
                wrapper="span"
                speed={50}
                cursor={true}
                className="text-lg sm:text-xl md:text-2xl text-purple-300 font-light"
                repeat={Infinity}
              />
  )
}

export default TypeWriter
