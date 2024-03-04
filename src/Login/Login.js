import './Login.css';
import download from '../assets/image/download.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login=()=>{

  const [getForm,setForm]=useState({
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
     if(!emptyValidation(getForm.email)){
        alert("email  cannot be empty");
        return ;
     }
     if(!emptyValidation(getForm.password)){
        alert("password cannot be empty");
        return ;
     }
     axios.get(`http://localhost:3000/registration?email=${getForm.email}&password=${getForm.password}`).then((result)=>{
        console.log(result.data);
        if(result.data && result.data.length>0){
            sessionStorage.setItem('email',getForm.email);
            navigate('/table');
        }else{
            alert("email and password match is not found");
        }
   
     }).catch(()=>{

     })
   
   
 
     
}
    return (<div>

      <div class="container" style={{width:"1000px",height:"1000px",backgroundColor:"green"}}>
          <div class="row">
              <div class="col-md-12">
                <div  class="text-center">
                     <h1>Sign up</h1>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-4">

              </div>
              <div class="col-md-4 background-login">
                  <div class="row">
                      <div class="col-md-4">
                        <img  width="100" height="100" src={download}/>
                      </div>
                      <div class="col-md-8">
                          <h1>LIBRARY</h1>
                          <h4>MANAGEMENT SYSTEM</h4>
                      </div>
                  </div>
                <form>
              
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email"  onChange={onChangeHandler}  class="form-control" name="email"/>
                       
                      </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password"  onChange={onChangeHandler}  class="form-control" name="password"/>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div  class="text-center">
                               <button onClick={onSubmitHandler} type="submit" class="btn btn-outline-success">Login</button>
                            </div>
                           
                        </div>
                    </div>
                   
                  </form>
              </div>
              <div class="col-md-4">

              </div>
          </div>
      </div>
   
    </div>)
}
export default Login;