import useUser from 'hooks/use-user'

import Suggestion from './suggestion'
import User from './user'

export default function Sidebar() {
  const {
    user: {
      docId = '',
      fullName = '',
      username = '',
      userId = '',
      following = [],
    } = {},
  } = useUser()
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestion
        userId={userId}
        following={following}
        logInUserDocId={docId}
      />
    </div>
  )
}
