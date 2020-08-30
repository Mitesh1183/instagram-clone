import {useState,useEffect} from 'react';

const useInput = (initialValues, callback, validate) => {
  const [inputs, setInputs] = useState(initialValues);
  const [check, setChecks] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
		
		useEffect(() => {

	        if (Object.keys(errors).length === 0 && isSubmitting) {
	            callback();
	        }
	    }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(inputs, check));
    setIsSubmitting(true);
     
  }
 
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  const handleCheck = (event) => {
        event.persist();
        setChecks(check => ({[event.target.name]: event.target.checked}));
        /*console.log({[event.target.name]: event.target.checked})*/
    }


  return {
    handleSubmit,handleInputChange,setInputs,
    inputs,handleCheck,errors,isSubmitting
  };
}
export default useInput;