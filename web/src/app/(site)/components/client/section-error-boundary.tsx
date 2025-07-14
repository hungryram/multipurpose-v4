"use client"

import { Component, type ReactNode, type ErrorInfo } from "react"

export default class SectionErrorBoundary extends Component<
  { children: ReactNode; sectionName: string },
  { hasError: boolean }
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in section ${this.props.sectionName}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <p className="text-red-500">Error loading {this.props.sectionName} section</p>
        </div>
      )
    }
    return this.props.children
  }
}
