
import * as React from "react"
import { toast } from "./toast/toast-utils"
import { listeners, memoryState } from "./toast/toast-reducer"
import { State } from "./toast/toast-types"

// This is a React hook that must be used within a React component
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Export function for direct access
export { useToast, toast }

// Need to import dispatch for the dismiss function
import { dispatch } from "./toast/toast-reducer"
