/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types'
import { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          src="/images/avatars/default.png"
          alt="avatar"
          className="rounded-full w-16 mr-3"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  )

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
}

User.defaultProps = {
  username: '',
  fullName: '',
}

User.whyDidYouRender = true

export default memo(User)
