import React, { useState } from "react";
import { useCurrency } from "../Contexts/CryptoContext";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = useCurrency();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!email || !password || !confirmPassword){
        setAlert({
            open: true,
            message: "please fill all fields",
          });
          return;
    }

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
      });
      return;
    }
    try {
        const response = await createUserWithEmailAndPassword(auth,email,password);
        setAlert({
            open: true,
            message: `Sign Up Successful. Welcome ${response.user.email}`,
        })
        handleClose()
    } catch (error) {
        setAlert({
            open: true,
            message: error.message,
        })
        return
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">SIGNUP</button>
    </form>
  );
};

export default Signup;
