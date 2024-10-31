import React, { useEffect, useState } from 'react'

const Subtotal = ({itm}) => {

  const [pric,setpric]=useState(0);
  const [cnt,setCnt]=useState(0);
  // console.log(pric);

  useEffect(()=>{
    totalAmount();
  },[itm])

  const totalAmount=()=>{
    let price=0;
    let count=0;
    itm.map((it)=>{
      price+=it.price.cost;
      count++;
    })
    console.log(price)
    setpric(price);
    setCnt(count);
  }

  return (
    <div className='sub_item'>
      <h3>Subtotal ({cnt} items): <strong style={{fontWeight:700,color:"#111"}}>{pric}</strong></h3>
    </div>
  )
}

export default Subtotal
