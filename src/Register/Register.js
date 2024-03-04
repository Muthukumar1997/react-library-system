import './Register.css';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Register=()=>{
     
    const [getForm,setForm]=useState({
        firstName:'',
        email:'',
        password:''

    });
    const navigate = useNavigate();

    const emptyValidation=(value)=>{
        if(value){
            return true;
        }
        else{
            return false;
        }
    }

    const onChangeHandler=(event)=>{
        setForm({...getForm,[event.target.name]:event.target.value})
    }
    const onSubmitHandler=(event)=>{
         event.preventDefault();
         if(!emptyValidation(getForm.firstName)){
            alert("first name cannot be empty");
            return ;
         }
         if(!emptyValidation(getForm.email)){
            alert("email  cannot be empty");
            return ;
         }
         if(!emptyValidation(getForm.password)){
            alert("password cannot be empty");
            return ;
         }
         axios.post('http://localhost:3000/registration',getForm).then((result)=>{
                console.log(result);
                navigate('/login');
         }).catch((error)=>{
                console.log(error); 
         })
        
    }

    return (<div>
      <Header logout="no"/>
    <div className="container">
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
                <h1>Sign Up</h1>
                <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" onChange={onChangeHandler} className="form-control" name="firstName"/>

                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" onChange={onChangeHandler} className="form-control" name="email"/>

                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" onChange={onChangeHandler} className="form-control" name="password"/>

                    </div>
                

                    <button onClick={onSubmitHandler} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-4"></div>
        </div>
    </div>
    </div>)
}
export default Register;