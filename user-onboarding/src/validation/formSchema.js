import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required'),
    email: yup 
        .string()
        .trim()
        .required('Email is required')
        .email('Must be a valid email address'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must contain at least 6 characters'),
    tos: yup.boolean().required('Must accept terms of service')
})

    export default formSchema