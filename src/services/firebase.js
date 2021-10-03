import { FieldValue, firebase } from 'lib/firebase'

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return result.docs.length > 0
}

export const getUserById = async (userId) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  return response.docs.map((item) => ({ ...item.data(), docId: item.id }))
}

export const getSuggestedProfiles = async (userId, following) => {
  const response = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get()

  return response.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    )
}

export const updateFollowing = async (
  logInUserDocId,
  followingUserId,
  isFollowing
) => {
  await firebase
    .firestore()
    .collection('users')
    .doc(logInUserDocId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(followingUserId)
        : FieldValue.arrayUnion(followingUserId),
    })
}

export const updateFollowedUserFollowers = async (
  userDocId,
  userId,
  isFollowing
) => {
  firebase
    .firestore()
    .collection('users')
    .doc(userDocId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    })
}

export const getPhotos = async (userId, followingUserId) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', followingUserId)
    .get()

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }))

  const photoWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }

      const user = await getUserById(photo.userId)
      const { username } = user[0]
      return { username, ...photo, userLikedPhoto }
    })
  )

  return photoWithUserDetails
}
