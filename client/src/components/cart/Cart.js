import React, { useEffect, useState, useContext } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
// import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {
  const { id } = useParams("");
  // console.log(id);

  const history = useNavigate("");

  const { account, setAccount } = useContext(LoginContext);

  const [inData, setInData] = useState([]);
  // console.log(inData);

  const getIndData = async () => {
    const res = await fetch(`/getproductsone/:${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (res.status !== 200) {
      console.log("no data available");
    } else {
      setInData(data);
    }
  };

  useEffect(() => {
    getIndData();
  }, [id]);

  //add cart function
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/:${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inData,
      }),
      credentials: "include", //we have to send cookie to backend so we include this line
    });

    const data1 = await checkres.json();
    // console.log(data1);

    if (checkres.status === 401 || !data1) {
      toast.warn("Please Login", {
        position: "top-center",
      });
      history("/login")
      console.log("user invalid");
    } else {
      // alert("data added in your cart");
      setAccount(data1);
      toast.success("Item added to the cart", {
        position: "top-left",
      });
      // history("/buynow")
    }
  };
  //
  return (
    <div className="cart_section">
      {inData &&
        Object.keys(inData).length && ( //very important line
          <div className="cart_container">
            <div className="left_cart">
              <img src={inData.url} alt="cart_img" />
              <div className="cart_btn">
                <button
                  className="cart_btn1"
                  onClick={() => addtocart(inData.id)}
                >
                  Add to Cart
                </button>
                <button className="cart_btn2">Buy Now</button>
              </div>
            </div>
            <div className="right_cart">
              <h3>{inData.title.shortTitle}</h3>
              <h4>{inData.title.longTitle}</h4>
              <Divider />
              <div className="mrp">M.R.P : ₹{inData.price.mrp}</div>
              <p>
                Deal of the Day{" "}
                <span style={{ color: "#B12704" }}>₹{inData.price.cost}</span>
              </p>
              <p>
                You save :
                <span style={{ color: "#B12704" }}>
                  ₹{inData.price.mrp - inData.price.cost} (
                  {inData.price.discount}){" "}
                </span>
              </p>
              <div className="discount_box">
                <h5>
                  Discount:{" "}
                  <span style={{ color: "#111" }}>{inData.price.discount}</span>
                </h5>
                <h4>
                  Free Delivary{" "}
                  <span style={{ color: "#111", fontWeight: "600" }}>
                    Oct 8-21
                  </span>
                </h4>
                <p>
                  Fastest delivery:
                  <span style={{ color: "#111", fontWeight: "600" }}>
                    Tomorrow 11Am
                  </span>
                </p>
              </div>
              <p className="description">
                About the Item:{" "}
                <span
                  style={{
                    color: "#565959",
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.4px",
                  }}
                >
                  {inData.description}
                </span>
              </p>
            </div>
          </div>
        )}
        <ToastContainer/>
    </div>
    
  );
};

export default Cart;
