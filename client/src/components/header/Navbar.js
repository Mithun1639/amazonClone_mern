import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./rightheader.css";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


const Navbar = () => {
  const [dropen, setDropen] = useState(false);
  const { account, setAccount } = useContext(LoginContext);

  const [text,setText]=useState("");
  console.log(text);

  const [liopen,setLiopen]=useState(true);
  const { products } = useSelector((state) => state.getproductsdata);

  const history=useNavigate();
  // console.log()

  const drwfun = () => {
    setDropen(!dropen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getvalidateuser = async () => {
    const res = await fetch("/validateuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

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
      alert("logout");
      // toast.success("Logged Out", {
      //   position: "top-center",
      // });
      setAccount(false);
      history("/");
      window.location.reload();
    }
  };

  const getText=(items)=>{
    setText(items);
    setLiopen(false)
  }

  useEffect(() => {
    getvalidateuser();
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="left">
            <IconButton className="hamburgur" onClick={drwfun}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Drawer open={dropen} onClick={drwfun}>
              <Rightheader />
            </Drawer>
            <div className="navlogo">
              <NavLink to="/">
                <img src="./image.png" alt="img" />
              </NavLink>
            </div>
            <div className="nav_searchbaar">
              <input type="text" 
                placeholder="Search your products"
                onChange={(e)=>getText(e.target.value)}
              />
              <div className="search_icon">
                <SearchIcon id="search" />
              </div>

              {/* search filter */}
              {
                text && 
                <List className="extrasearch" hidden={liopen}>
                  {
                    products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                      <ListItem>
                        <NavLink to={`/getproductsone/:${product.id}`} onClick={()=>setLiopen(true)}>
                        {product.title.longTitle}
                        </NavLink>
                      </ListItem>
                    ))
                  }
                </List>
              }
            </div>
          </div>
          <div className="right">
            <div className="nav_btn">
              <NavLink to="/login">sign in</NavLink>
            </div>
            <div className="cart_btn">
              {account ? (
                <NavLink to="/buynow">
                  <Badge badgeContent={account.carts.length} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              )}

              <p>Cart</p>
            </div>
            {account ? (
              <Avatar
                className="avtar"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ backgroundColor: "blue" }}
              >
                {account.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                className="avtar"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {}
              </Avatar>
            )}
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem onClick={handleClose} style={{ fontSize: "14px" }}>
                My account
              </MenuItem>
              {account ? (
                <MenuItem
                  onClick={handleClose}
                  style={{ fontSize: "14px", marginRight: "6px" }}
                >
                  <LogoutIcon />
                    <span onClick={logoutuser}>Log out</span>
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
