import React, { useEffect, useState } from "react";
import "./buynow.css";
import Option from "./Option";
import Subtotal from "./Subtotal";
import { Divider } from "@mui/material";
import Right from "./Right";

const Buynow = () => {
  const [cartdata, setCartdata] = useState("");
  // console.log(cartdata);
  // console.log(cartdata[0].description)

  

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartdata ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all item</p>
              <span className="leftbuyprice">price</span>
              <Divider />
              {cartdata.map((e, k) => {
                return (
                  <div className="item_containert">
                    <img
                      src={e.url}
                      alt="img"
                    />
                    <div className="item_details">
                      <h3>{e.title.shortTitle}</h3>
                      <h3>{e.title.longTitle}</h3>
                      <h3 className="diffrentprice" style={{color:"red"}}>{e.price.cost}</h3>
                      <p className="unusuall">{e.discount}</p>
                      <p>{e.tagline}</p>
                      <img
                        src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                        alt="img"
                      />
                      <Option deletedata={e.id} get={getdatabuy} />
                    </div>
                    <h3 className="item_price">{e.price.cost}</h3>
                  </div>
                );
              })}

              <Divider />
              <Subtotal itm={cartdata}/>
            </div>
            <Right itm={cartdata}/>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Buynow;
