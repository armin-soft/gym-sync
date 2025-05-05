
import * as React from "react"
import { 
  type ToastActionElement, 
  type ToastProps 
} from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 2000 // 2 seconds auto-dismiss time

type ToastType = Omit<ToastProps, "id"> & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToastType
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToastType>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToastType["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToastType["id"]
    }

interface State {
  toasts: ToastType[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Use an array to manage listeners
const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToastType, "id">

// Custom variants to include "success" and "warning"
type ToastVariant = "default" | "destructive" | "success" | "warning";

// Track the last notification to prevent duplicates
const toastHistory = new Map<string, number>();

// Define toast function outside of the hook to avoid React hook rules violation
function toast({ ...props }: { variant?: ToastVariant } & Toast) {
  const id = genId()
  
  // Create a unique key for this notification based on content
  const toastKey = `${props.title}-${props.description}`;
  const now = Date.now();
  
  // Check for duplicate notifications within a short time frame (1 second)
  if (toastHistory.has(toastKey)) {
    const lastShown = toastHistory.get(toastKey) || 0;
    if (now - lastShown < 1000) {
      // Skip showing duplicates
      return { id, dismiss: () => {}, update: () => {} };
    }
  }
  
  // Record this notification in history
  toastHistory.set(toastKey, now);
  
  // Clean up old notifications from history after 30 seconds
  setTimeout(() => {
    toastHistory.delete(toastKey);
  }, 30000);

  const update = (props: Toast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
    
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Auto dismiss after TOAST_REMOVE_DELAY
  setTimeout(() => {
    dismiss()
  }, TOAST_REMOVE_DELAY - 100)

  return {
    id: id,
    dismiss,
    update,
  }
}

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

export { useToast, toast }
