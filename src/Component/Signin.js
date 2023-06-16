import React, { useState} from "react";
import "./Signin.css";
import { useMutation } from "@apollo/client";
// import { AUTH_TOKEN } from "../constants";
import { USERS_QUERY,CREATE_USER_MUTATION, SIGNUP_MUTATION,  LOGIN_MUTATION} from '../graphql';

function Signin() {
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const [createMutation] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [
        {query: USERS_QUERY},
    ]
});


  const handleSubmit = evt => {
    evt.preventDefault();
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
   const result = pattern.test(formState.email);
   if(result===true){
      createMutation({
          variables: {
            name: formState.name,
            emailId: formState.email,
            password: formState.password
          }
      });
    }
    else{
      alert(`Please Enter valid email address`);
    }
    
};

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <div className="loginScreen__gradient" />
        <img
          className="loginScreen__logo"
          src="https://logos-download.com/wp-content/uploads/2016/03/Netflix_logo.png"
          alt="Netflix logo"
        />
      </div>
      <div className="signupScreen">
        <form onSubmit={evt => handleSubmit(evt)}>
          <h1>{formState.login ? "Login" : "Sign Up"}</h1>
          {!formState.login && (
            <input
              value={formState.name}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Your email address"
          />
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="password"
            placeholder="Choose a safe password"
          />
          {/* <button type="submit" onClick={signIn}>
            Sign In
          </button> */}
        <button
          className="pointer mr2 button"
        >
          {formState.login ? 'login' : 'create account'}
        </button>
          <h4>
            <span className="signupScreen__gray">New to Netflix? </span>
            <span
              className="signupScreen__link"
              onClick={(e) =>
                setFormState({
                  ...formState,
                  login: !formState.login,
                })
              }
            >
              Sign Up now.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default Signin;
