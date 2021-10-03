import { useEffect } from 'react'

function NotFound() {
  useEffect(() => {
    document.title = '404 Not Found'
  }, [])
  return (
    <div>
      <p>Not Found</p>
    </div>
  )
}

export default NotFound
