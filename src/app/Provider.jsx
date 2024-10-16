"use client"
import React from 'react'
import GlobalState from '@/context/GlobalState'
const Provider = ({ children }) => {
  return (
    <GlobalState>
      {
        children
      }
    </GlobalState>
  )
}

export default Provider
