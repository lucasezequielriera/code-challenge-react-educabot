import { useState } from "react"

export const useSessions = () => {
    const [sessions, setSessions] = useState<unknown[]>([])

    return { sessions, setSessions }
}
