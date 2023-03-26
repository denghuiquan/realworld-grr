import { useEffect, useState } from 'react'
import { getCurrentUser } from '../endpoints'

export default function useLogin () {
  const [status, setStatus] = useState({ done: false, requesting: true })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && token !== '') {
      ;(async () => {
        try {
          await getCurrentUser(token)
          setStatus({ done: true, requesting: false })
        } catch (error) {
          const message = error.response.data.message
          console.log(message)
        }
      })()
    } else {
      setStatus({ done: false, requesting: false })
    }
  }, [])
  return {
    status,
    setStatus
  }
}
