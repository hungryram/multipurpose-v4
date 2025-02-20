import { useEffect, useCallback } from "react"

export function useKeyPress(targetKey: string, onKeyPress: () => void) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        onKeyPress()
      }
    },
    [targetKey, onKeyPress],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])
}

