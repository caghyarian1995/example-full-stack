import React, { useState, useEffect, useRef } from 'react'
import { validate } from 'email-validator'
import './App.css'

/* Contains the form data so that it is visible both by the React component
and the ref used to listen to clicks outside of the form */
var formData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function App() {

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [submitDisabled, setSubmitDisabled] = useState(true)

  // A ref to the form that the user will use to enter their information
  const formRef = useRef(null)

  // A custom hook to alert when a user clicks outside of the form
  useOutsideAlerter(formRef)

  const validateForm = () => {

    // Username must be less than 16 characters
    // Email must be valid
    // Password and confirm password must match
    // Password must not be empty
    if ((formData.username && formData.username.length < 16) &&
         validate(formData.email) &&
        (formData.password == formData.confirmPassword) && formData.password){
      return true
    } else {
      return false
    }
  }

  const onSubmit = () => {
    alert('Submitted!')
  }

  const onChangeUsername = (jsEvent) => {
    setUsername(jsEvent.target.value)
  }
  
  const onChangeEmail = (jsEvent) => {
    setEmail(jsEvent.target.value)
  }
  
  const onChangePassword = (jsEvent) => {
    setPassword(jsEvent.target.value)
  }
  
  const onChangeConfirmPassword = (jsEvent) => {
    setConfirmPassword(jsEvent.target.value)
  }

  // Hook to alert when a user clicks outside of the form
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if(!validateForm()){
            alert('You did not fill out the form correctly.\nPlease ensure that:\n\n - Your username is less than 16 characters in length\n - Your email is valid\n - You entered a password\n - Your passwords match')
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    // Update form data variable
    formData.username = username
    formData.email = email
    formData.password = password
    formData.confirmPassword = confirmPassword

    // Disable the submit button if the form is invalid
    setSubmitDisabled(!validateForm())
  })

  return (
    <div className="App">
      <div className="App-body">
        <form ref={formRef} className= "form-body" onSubmit={onSubmit}>
          <div className='input-fields'>
            <span className='input-row'>
              <span>
                Username:
              </span>
              <input className='input-field' type="text" value={username} onChange={onChangeUsername} />
            </span>
            <span className='input-row'>
              <span>
                Email:
              </span>
              <input className='input-field' type="text" value={email} onChange={onChangeEmail} />
            </span>
            <span className='input-row'>
              <span>
                Password:
              </span>
              <input className='input-field' type="password" value={password} onChange={onChangePassword} />
            </span>
            <span className='input-row'>
              <span>
                Confirm Password:
              </span>
              <input className='input-field' type="password" value={confirmPassword} onChange={onChangeConfirmPassword} />
            </span>
          </div>
          <input className='submit-button' disabled={submitDisabled} type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default App
