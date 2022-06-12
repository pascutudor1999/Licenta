import {useState, useEffect} from 'react'
import axios from './api/axios';


const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const[errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values, 
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const {values: res} = await axios.post(values);
            console.log(res.message);
        }catch(error){
            
        }

        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 &&
        isSubmitting) {
            callback();
        }
    }, [errors]
    );
    
    return { handleChange, values, handleSubmit, errors };
};

export default useForm;
