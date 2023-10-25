import React, { useContext, useEffect, useReducer } from "react";
import styled from "./Input.module.css";
import Card from "../UI/Card";
import Button from '../UI/Button'
import AuthContext from "../../context/auth-context";
const NameReducer = (state, action) => {
  if (action.type === "Name_Field") {
    return { value: action.val, isValid: action.val.trim().length > 3 };
  }
  if (action.type === "Name_Blur") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 3,
    };
  }
  return {
    isValid: null,
    value: "",
  };
};
const EmailReducer=(state,action)=>{
    if(action.type==="Email_Field"){
        return{value:action.val,isValid:action.val.includes("@")}
    }
    if(action.type==="Email_Blur"){
        return{value:state.value,isValid:state.value.includes("@")}
    }
    return{
        value:"",
        isValid:null
    }
}

const PhoneNumberReducer=(state,action)=>{
    if(action.type==="Number_Field"){
        return{value:action.val,isValid:action.val.trim().length>6}
    }
    if(action.type==="Number_Blur"){
        return{
            value:state.value,
            isValid:state.value.trim().length>6
        }
    }
    return{
        isValid:null,
        value:""
    }
}

const DateOfBirthReducer = (state, action) => {
  switch (action.type) {
    case "DOB_Field":
      return { ...state, value: action.val };
    case "DOB_Blur":
      const parsedDateOfBirth = new Date(state.value);
      const today = new Date();
      const age = today.getFullYear() - parsedDateOfBirth.getFullYear() - ((today.getMonth(), today.getDate()) < (parsedDateOfBirth.getMonth(), parsedDateOfBirth.getDate()));

      return { ...state, isValid: age >= 18 };
    default:
      return state;
  }
  }
  const FormReducer=(state,action)=>{
    if(action.type==="Form_Fieid"){
        return{value:action.NameState.val,isValid:action.val.trim().length>6}
    }
    if(action.type===""){
        return{
            value:state.value,
            isValid:state.value.trim().length > 6
        }
    }
    return{
        isValid:null,
        value:""
    }
}


const Input = (props) => {
  const ctx=useContext(AuthContext)
  // const [FormIsValid, setFormIsValid] = useState(false)
  const [FormState, dispatchForm] = useReducer(FormReducer, {
    
    value: "",
    isValid: null,
   
  });

  const [NameState, dispatchName] = useReducer(NameReducer, {
    
    value: "",
    isValid: null,
   
  });

  const [EmailState,dispatchEmail]=useReducer(EmailReducer,{
   
    value:"",
     isValid:null
    
  })

  const [PhoneNumberState,dispatchPhoneNumber]=useReducer(PhoneNumberReducer,{
    value:"",
    isValid:null
  })

  const [DateOfBirthState,dispatchDateOfBirth]=useReducer(DateOfBirthReducer,{
    value:"",
    isValid:null
  })

  const {isValid: NameIsValid } = NameState;
  const {isValid: EmailIsValid}=EmailState;
  const {isValid: PhoneNumberIsValid}=PhoneNumberState;
  const {isValid: DateOfBirthIsValid}=DateOfBirthState;
  const {isValid: FormIsValid}=FormState;
  


  useEffect(() => {
    setTimeout(() => {
      console.log("clearing");
      dispatchForm(NameIsValid && EmailIsValid && PhoneNumberIsValid && DateOfBirthIsValid);
    }, 500);

    return () => {
      console.log("CLEAN");
      clearTimeout();
    };
  }, [NameIsValid,EmailIsValid,PhoneNumberIsValid,DateOfBirthIsValid]);


  const FormValidation = () => {
    dispatchForm({ type: "Form_Valid" });
  };

  const NameHandler = (event) => {
    dispatchName({ type: "Name_Field", val: event.target.value });
  };

  const NameValidationHandler = () => {
    dispatchName({ type: "Name_Blur" });
  };
  const EmailHanlder=(event)=>{
    dispatchEmail({type:"Email_Field",val:event.target.value})
  }

  const EmailValidationHandler=()=>{
    dispatchEmail({type:"Email_Blur"})
  }

  const PhoneNumberHandler=(event)=>{
    dispatchPhoneNumber({type:"Number_Field",val:event.target.value})
  }
  const PhoneNumberValidationHandler=()=>{
    dispatchPhoneNumber({type:"Number_Blur"})
  }

  
  const DateOfBirthHandler = (event) => {
    dispatchDateOfBirth({ type: "DOB_Field", val: event.target.value });
  };

  const DateOdBirthValidationHandler = () => {
    dispatchDateOfBirth({ type: "DOB_Blur" });
  };

  const SubmitHandlder=(event)=>{
    event.preventDefault()
    // const Details = {
    //   Name: NameState,
    //   Contact: PhoneNumberState,
    //   email:EmailState,
    //   Address:AddressState
    // };
    ctx.onLogIn(NameState.value,EmailState.value,PhoneNumberState.value,DateOfBirthState.value)
  }
  // console.log(NameState,EmailState,PhoneNumberState,AddressState)

  return (
    <Card className={styled.login}>
      <form  onSubmit={SubmitHandlder} >
        <div
          className={`${styled["form_control"]} ${
            NameIsValid === false ? styled.invalid : ""
          }`}
        >
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            type="text"
            value={NameState.value}
            onChange={NameHandler}
            onBlur={NameValidationHandler}
          ></input>
        </div>
      
        <div
          className={`${styled["form_control"]} ${
            PhoneNumberIsValid === false ? styled.invalid : ""
          }`}
        >
          <label htmlFor="number">Contact Number:</label>
          <input
          id="number"
          name="number"
          type="number"
          value={PhoneNumberState.value}
          onChange={PhoneNumberHandler}
          onBlur={PhoneNumberValidationHandler}
          ></input>
        </div>
        <div
          className={`${styled["form_control"]} ${
            EmailIsValid === false ? styled.invalid : ""
          }`}
        >
          <label htmlFor="email">Email:</label>
          <input
          type="email"
          id="email"
          name="email"
          value={EmailState.value}
          onChange={EmailHanlder}
          onBlur={EmailValidationHandler}
          ></input>
        </div>
     
        <div   className={`${styled["form_control"]}
          `}
         
        >
          <label htmlFor="dob">Date of Birth: </label>
          <input
          id="dob"
          name="dob"
          type="date"
          value={DateOfBirthState.value}
          onChange={DateOfBirthHandler}
          onBlur={DateOdBirthValidationHandler}
          ></input>
        </div>
        
        <div className={styled.button}>
          <Button type="submit" className={styled.btn} disabled={!FormIsValid} onChange={FormValidation}>submit</Button>
        </div>
      </form>
    </Card>
  );
};
export default Input;
