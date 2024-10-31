import React, { useState,useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";



const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const { account, setAccount } = useContext(LoginContext);
  // console.log(account)
  // const {account,setAccount}=useContext(LoginContext);

  const adddata = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    // console.log(data);

    if (res.status == 201) {
      // console.log("invalid details");
      // history("/");
      setAccount(data.result.userLogin);
      toast.success("User succesfully logged In", {
        position: "top-center",
      });
      setData({ email: "", password: "" });
      
    } else {
      // console.log("valid");
      toast.warn("invalid", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogo.png" alt="img" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={logdata.email}
                  onChange={adddata}
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="Password"
                  name="password"
                  placeholder="At least 6 charactors"
                  value={logdata.password}
                  onChange={adddata}
                />
              </div>
              <button className="signin_btn" onClick={sendData}>Continue</button>
            </form>
            <ToastContainer />
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <button>
              <NavLink to="/register">Create Your amazon account</NavLink>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sign_in;
