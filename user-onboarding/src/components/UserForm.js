import React from 'react'

export default function UserForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return(
        <form className = 'form-container' onSubmit={onSubmit}>
            <div className='form-submit'>
                <button disabled = {disabled}>Submit</button>
                <div className = 'errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tos}</div>
                </div>
            </div>
            <div className = 'form-input'>
             <label htmlFor='name'>name
                <input 
                    id='name'
                    value={values.name}
                    onChange={onChange}
                    name='name'
                    type='text'
                />
             </label>
             <label htmlFor='email'>email
                <input
                    id='email'
                    value={values.email}
                    onChange={onChange}
                    name='email'
                    type='email'
                />
             </label>
             <label htmlFor='password'>assword
                <input
                    id='password'
                    value={values.password}
                    onChange={onChange}
                    name='password'
                    type='password'
                />
             </label>
             <label htmlFor='terms-of-service'>Terms of Service
                <input
                    id='terms-of-service'
                    type='checkbox'
                    name='tos'
                    checked={values.tos}
                    onChange={onChange}
                    required="required"
                />
             </label>
            </div>
        </form>
    )
}