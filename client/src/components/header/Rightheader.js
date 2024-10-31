import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";



const rightheader = () => {
  const { account, setAccount } = useContext(LoginContext);

  const history=useNavigate();

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2=await res2.json();
    console.log(data2);

    if(res2.status!==201){
      console.log("error");
    }else{
      alert("logging out");
      // toast.success("Logged Out", {
      //   position: "top-center",
      // });
      setAccount(false);
      history("/");
      window.location.reload();
    }
  };

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar" style={{ backgroundColor: "blue" }}>
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar">{}</Avatar>
          )}
          <div className="" style={{marginLeft:"20px",color:"white",marginBottom:"-16px",fontSize:"18px"}}>
          {
            account?(<h2>Hello, {account.fname}</h2>):""
          }
        </div>
        </div>
        
        <div className="nav_btn">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>

          <Divider style={{width:"100%" ,marginLeft:"-20px"}} />

          <NavLink to="/">today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your orders</NavLink>
          ) : (
            <NavLink to="/login">Your orders</NavLink>
          )}

          <Divider style={{width:"100%" ,marginLeft:"-20px"}}/>

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
          </div>
          {
            account?
            <div className="flag">
              <LogoutIcon style={{fontSize:"26px"}}/>
              <span onClick={logoutuser} style={{cursor:"pointer",marginLeft:"5px",fontSize:"18px",fontWeight:"600"}}>Log out</span>
            </div>:<NavLink to="/login">Sign in</NavLink>
          }
        </div>
      </div>
    </>
  );
};

export default rightheader;
