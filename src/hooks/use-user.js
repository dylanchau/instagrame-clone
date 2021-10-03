import { UserContext } from 'context'
import { useContext, useEffect, useState } from 'react'
import { getUserById } from 'services/firebase'

export default function useUser() {
  const { user } = useContext(UserContext)
  const [activeUser, setActiveUser] = useState({})

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const [response] = await getUserById(user.uid)
      setActiveUser(response)
    }

    user?.uid && getUserObjByUserId()
  }, [user])

  return { user: activeUser }
}
