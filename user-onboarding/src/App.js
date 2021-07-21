import logo from './logo.svg';
import './App.css';
import Form from './Form'
import User from './User'
import axios from 'axios'
import schema from './validation/formSchema'
import { reach } from 'yup'
import React, { useState, useEffect } from 'react';

const initialFormValues = {
  name:'',
  email:'',
  password:'',
  tos: false,
}
const initialFormErrors = {
  name:'',
  email:'',
  password:'',
}
const initialUsers = []
const initialDisabled = true


function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err)
      })
    .finally(() => {
      setFormValues(initialFormValues)
    })
  }

  const validate = (name, value) => {
    reach(schema, name)
      .validate(value)
      .then(() => setFormErrors ({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
    }
  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
     
    }
    postNewUser(newUser)
  }
  useEffect(() => {
    getUsers()
  },[])
console.log(users)
  
useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  },[formValues])
  
  

  return (
    <div className="App">
     <h1>User-Onboarding</h1>

     <Form
     values={formValues}
     change={inputChange}
     submit={formSubmit}
     disabled={disabled}
     errors={formErrors}
     />
      
    {
      users.map(user => {
        return (
          <User key={user.id} details={user}/>
        )
      })
    }
    </div>
  );
}

export default App;
