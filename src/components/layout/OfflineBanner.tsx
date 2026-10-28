'use client'

import { useSyncExternalStore } from "react"
import { HiSignalSlash as Offline } from "react-icons/hi2"

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange)
  window.addEventListener("offline", onChange)
  return () => {
    window.removeEventListener("online", onChange)
    window.removeEventListener("offline", onChange)
  }
}

/** Tells the creator when the device loses its connection. */
export function OfflineBanner() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true)
  if (online) return null
  return (
    <div role="status" className="flex items-center justify-center gap-2 bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-sm font-semibold text-foreground">
      <Offline className="h-4 w-4 text-amber-700 dark:text-amber-300" aria-hidden />
      You&apos;re offline. Shoot plans you opened recently still work; new ones need a connection.
    </div>
  )
}
