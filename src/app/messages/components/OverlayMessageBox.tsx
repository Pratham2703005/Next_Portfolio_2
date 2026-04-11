import React from 'react'

const OverlayMessageBox = () => {
  return (
    <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/60 flex flex-col justify-center items-center p-4">
          <p className="mb-4 text-center text-white">Please sign in to post messages.</p>
        </div>
  )
}

export default OverlayMessageBox
