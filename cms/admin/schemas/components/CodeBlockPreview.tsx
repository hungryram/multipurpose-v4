import React from 'react'

interface CodeBlockPreviewProps {
  children: React.ReactNode
}

export default function CodeBlockPreview({ children }: CodeBlockPreviewProps) {
  return (
    <div 
      style={{
        backgroundColor: '#f5f5f5',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '12px',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#374151',
        whiteSpace: 'pre-wrap',
        overflowX: 'auto',
        margin: '16px 0'
      }}
    >
      {children}
    </div>
  )
}
