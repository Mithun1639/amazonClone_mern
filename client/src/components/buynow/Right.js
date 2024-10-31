import {React,useState,useEffect} from "react";
import { NavLink } from "react-router-dom";

const Right = ({itm}) => {


    const [pric,setpric]=useState(0);
    // const [cnt,setCnt]=useState(0);
    // console.log(pric);
  
    useEffect(()=>{
      totalAmount();
    },[itm])
  
    const totalAmount=()=>{
      let price=0;
      // let count=0;
      itm.map((it)=>{
        price+=it.price.cost;
        // count++;
      })
      console.log(price)
      setpric(price);
      // setCnt(count);
    }

  return (
    <div className="right_buy">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt="img"
      />
      <div className="cost_right">
        <p>
          Your order is eligible for FREE Delivery. <br />
          <span style={{ color: "#565959" }}>
            Select this option at checkout. Details
          </span>
        </p>
        <h3>
          Subtotal ({itm.length}   items):
          <span style={{ fontWeight: "700" }}> ₹{pric}</span>
        </h3>
        <button className="rightbuy_btn">
          <NavLink to="/" style={{textDecoration:"none"}}>Proceed to Buy</NavLink>
        </button>
        <div className="emi">
            emi available
        </div>
      </div>
    </div>
  );
};

export default Right;
