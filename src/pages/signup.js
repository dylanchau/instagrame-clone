import * as ROUTES from 'constants/route'
import { FirebaseContext } from 'context'
import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { doesUsernameExist } from 'services/firebase'

const Signup = () => {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isValid = email !== '' && password !== ''

  const handleSignup = async (e) => {
    e.preventDefault()

    const usernameExisted = await doesUsernameExist(username)

    if (!usernameExisted) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        await createdUser.user.updateProfile({
          displayName: username,
        })

        firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          username,
          fullName,
          emailAddress: email,
          following: [],
          followers: [],
          dateCreated: Date.now(),
        })

        history.push(ROUTES.DASHBOARD)
      } catch (err) {
        setError(err.message)
      }
    } else {
      setError('The username is already existing')
    }
  }

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your user name"
              type="text"
              placeholder="User name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={!isValid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${!isValid && ' opacity-50 cursor-not-allowed'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have a account
            {` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
