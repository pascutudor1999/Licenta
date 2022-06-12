import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import FormSuccess from './FormSuccess';
import './Form.css';

const Form = () => {
  const[isSubmitted, setIsSubmitted] = useState(false)

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
<div className="form-container">
  <span className="close-btn">x</span>
  <div className="form-content-left">
    <img src="img/salut.webp" alt="spaceship" className='form-img' />
  </div>
  {!isSubmitted ? <SignUpForm submitForm={submitForm} /> : <FormSuccess />}
</div> 
    </>
  );
};

export default Form