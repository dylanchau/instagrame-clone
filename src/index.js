import './styles/app.css'

import { FirebaseContext } from 'context'
import { FieldValue, firebase } from 'lib/firebase'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)
