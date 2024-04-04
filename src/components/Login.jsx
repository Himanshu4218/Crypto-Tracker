import React, { useState } from "react";
import { useCurrency } from "../Contexts/CryptoContext";
import { auth } from "../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useCurrency();
  const GoogleProvider = new GoogleAuthProvider()
  const signInWithGoogle = () => {
    signInWithPopup(auth,GoogleProvider)
    .then((res)=>{
      setAlert({
        opem: true,
        message: `Sign In successfully with ${res.user.email}`
      })
    })
    .catch(error => {
      setAlert({
        open: true,
        message: error.message
      })
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert({
        open: true,
        message: "please fill all fields",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
      });
      return;
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">LOGIN</button>
      <div className="googlebtn">
        <span>OR</span>
        <GoogleButton
          style={{ width: "100%", outline: "none" }}
          onClick={signInWithGoogle}
        />
      </div>
    </form>
  );
};

export default Login;
