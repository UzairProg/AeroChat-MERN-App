import React from 'react'

const BorderAnimatedContainer = ({children, className=""}) => {
  return (
    <div
      className={`
        relative
        rounded-3xl 
        border 
        border-transparent 
        animate-border
        ${className}
      `}
      style={{
        background: `
          linear-gradient(45deg, #172033, rgb(30 41 59) 50%, #172033) padding-box,
          conic-gradient(
            from var(--border-angle),
            rgb(71 85 105 / 0.48) 80%,
            rgb(99 102 241) 86%,
            rgb(165 180 252) 90%,
            rgb(99 102 241) 94%,
            rgb(71 85 105 / 0.48)
          ) border-box
        `
      }}
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer
