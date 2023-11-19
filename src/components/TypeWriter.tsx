'use client'

import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}

const TypeWriter = (props: Props) => {
  return (
    <Typewriter 
        options={{
            loop: true,
        }}
        onInit={(typewriter) => {
            typewriter.typeString("Increase Your Productivity")
            .pauseFor(1000).deleteAll()
            typewriter.typeString("AI-powered Insights")
            .start()
        }}
    />
  )
}

export default TypeWriter