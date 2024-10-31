import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [reg, setReg] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setReg(() => {
      return {
        ...reg,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = reg;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fname,
        email,
        mobile,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 201) {
      // alert("user registration done");
      toast.success("User succesfully registered", {
        position: "top-center",
      });
      setReg({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
      // console.log(reg)
    } else {
      // alert("user not registered");
      toast.warn("invalid", {
        position: "top-center",
      });
      setReg({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
    }
  };
  // setInpval({fname:"",email:"",password:"",cpassword:""});

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogo.png" alt="img" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input
                  type="text"
                  name="fname"
                  onChange={addData}
                  value={reg.fname}
                  // onChange((e)=>setReg({...reg,name:e.target.value}))
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={reg.email}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="mobile">Mobile no.</label>
                <input
                  type="number"
                  name="mobile"
                  value={reg.mobile}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 char"
                  value={reg.password}
                  onChange={addData}
                />
              </div>
              <div className="form_data">
                <label htmlFor="cpassword">Password Again</label>
                <input
                  type="password"
                  name="cpassword"
                  value={reg.cpassword}
                  onChange={addData}
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Continue
              </button>
              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">Sign-in</NavLink>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
