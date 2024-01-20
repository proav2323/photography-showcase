"use client"
import React from 'react'
import {Circles} from "react-loader-spinner"

export default function Loader() {
  return (
             <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
    <Circles
  height="80"
  width="80"
  color="#4fa94d"
  visible={true}
  />
    </div>
  )
}
