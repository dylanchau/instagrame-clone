import { UserContext } from 'context'
import { useContext, useEffect, useState } from 'react'
import { getPhotos, getUserById } from 'services/firebase'

function usePhoto() {
  const [photos, setPhotos] = useState(null)
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext)

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserById(userId)
      let followedUserPhotos = []

      if (following?.length > 0) {
        followedUserPhotos = await getPhotos(userId, following)
        setPhotos(followedUserPhotos)
      }
    }

    getTimelinePhotos()
  }, [])

  return { photos }
}

export default usePhoto
