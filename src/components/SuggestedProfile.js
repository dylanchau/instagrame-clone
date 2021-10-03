/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateFollowedUserFollowers, updateFollowing } from 'services/firebase'

function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
  logInUserDocId,
}) {
  const [followed, setFollowed] = useState(false)

  const handleFollower = async () => {
    setFollowed(true)
    await updateFollowing(logInUserDocId, profileId, false)
    await updateFollowedUserFollowers(userDocId, userId, false)
  }

  return (
    !followed && (
      <div className="flex flex-row items-center align-items justify-between">
        <div className="flex items-center justify-between">
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={username}
            className="rounded-full w-8 mr-3"
          />
          <Link to={`/p/${username}`}>
            <p className="font-bold text-sm">{username}</p>
          </Link>
        </div>
        <button
          type="button"
          className="text-xs font-bold text-blue-medium"
          onClick={handleFollower}
        >
          Follow
        </button>
      </div>
    )
  )
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  logInUserDocId: PropTypes.string.isRequired,
}

export default SuggestedProfile
