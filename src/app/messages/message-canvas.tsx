"use client"

import { useState, useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Note } from "./note"
import { UserAvatar } from "./user-avatar"
import { AllMessages } from '@/utils/type'
import { CANVAS_SIZE, MESSAGE_ZOOM_THRESHOLD, CENTER_POINT } from '@/utils/default-data'
import { Session } from "next-auth"

interface MessageCanvasProps {
  messages: AllMessages[]
  session: Session | null
  isAdmin: boolean
}

function MessageCanvas({ messages }: MessageCanvasProps) {
  const [transform, setTransform] = useState({ scale: 1, positionX: 0, positionY: 0 })
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 })

  // Track viewport dimensions
  useEffect(() => {
    const updateViewportDimensions = () => {
      const contentEl = document.querySelector('.react-transform-component')
      if (contentEl) {
        setViewportDimensions({
          width: contentEl.clientWidth,
          height: contentEl.clientHeight
        })
      }
    }

    window.addEventListener('resize', updateViewportDimensions)
    
    // Initial check
    setTimeout(updateViewportDimensions, 100)
    
    return () => {
      window.removeEventListener('resize', updateViewportDimensions)
    }
  }, [])

  const visibleArea = {
    width: Math.round(viewportDimensions.width / transform.scale),
    height: Math.round(viewportDimensions.height / transform.scale)
  }

  // Dummy delete function for notes (since we're not handling deletion in this component)
  const deleteNote = () => {
    // This is a placeholder since deletion is handled in the sidebar
  }

  return (
    <div className="flex-1 overflow-hidden relative">
      {/* Grid overlay that moves with the canvas */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundSize: `${50 * transform.scale}px ${50 * transform.scale}px`,
          backgroundImage: `
            linear-gradient(to right, #010101 1px, transparent 1px),
            linear-gradient(to bottom, #010101 1px, transparent 1px)
          `,
          backgroundPosition: `${transform.positionX}px ${transform.positionY}px`
        }}
      />
      
      {/* Status display at bottom right */}
      <div className="absolute bottom-4 right-4 bg-black border-gray-800 text-white bg-opacity-75 p-2 rounded shadow-md text-xs font-mono z-10">
        <div>Zoom: {(transform.scale * 100).toFixed(0)}%</div>
        <div className="hidden sm:block">Visible: {visibleArea.width} × {visibleArea.height}</div>
      </div>
      
      <TransformWrapper
        initialScale={0.6}
        minScale={0.11}
        maxScale={7}
        limitToBounds={false}
        wheel={{ step: 0.05 }}
        onTransformed={({ state }) => {
          setTransform({
            scale: state.scale,
            positionX: state.positionX,
            positionY: state.positionY
          })
        }}
        centerOnInit={true}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <div 
            className="relative" 
            style={{ 
              width: `${CANVAS_SIZE}px`, 
              height: `${CANVAS_SIZE}px` 
            }}
          >
            {/* Center indicator */}
            <div 
              className="absolute rounded-full bg-gray-300" 
              style={{ 
                left: `${CENTER_POINT}px`, 
                top: `${CENTER_POINT}px`, 
                width: '8px', 
                height: '8px',
                transform: 'translate(-50%, -50%)'
              }} 
            />
            
            {/* Display notes or avatars based on zoom threshold */}
            {messages.map((message: AllMessages) => {
              // Show avatar if below threshold, show note if above threshold
              return transform.scale >= MESSAGE_ZOOM_THRESHOLD ? (
                <Note key={message.id} message={message} deleteNote={deleteNote} />
              ) : (
                <UserAvatar 
                  name={message?.user_name}
                  image={message?.user_image}
                  key={message.id}
                  x={message.x} 
                  y={message.y} 
                  scale={transform.scale}
                  isPublic={message.isPublic}
                  userEmail={message.user_email}
                />
              )
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default MessageCanvas