/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from 'services/firebase'

import SuggestedProfile from './SuggestedProfile'

function Suggestion({ userId, following, logInUserDocId }) {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    const getSuggestionProfiles = async () => {
      const profileReponse = await getSuggestedProfiles(userId, following)

      setProfiles(profileReponse)
    }
    if (userId) {
      getSuggestionProfiles()
    }
  }, [userId])

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            userDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            logInUserDocId={logInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null
}

Suggestion.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  logInUserDocId: PropTypes.string,
}

export default Suggestion
