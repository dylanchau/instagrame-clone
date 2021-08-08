import { FirebaseContext } from 'context'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValid = email !== '' || password !== ''

  const handleLogin = () => {}

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      Login
    </div>
  )
}

export default Login
