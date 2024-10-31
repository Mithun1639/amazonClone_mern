const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const athenticate=require("../middleware/authenticate")

//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log(productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log(error);
  }
});

//get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nId = id.slice(2, 10); //new line added by me
    // console.log(nId);
    const individualdata = await Products.findOne({ id: nId });

    // console.log(individualdata)
    res.status(200).json(individualdata);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ msg: "error" });
  }
});

router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all details" });
  } else {
    try {
      const preuser = await USER.findOne({ email: email });
      if (preuser) {
        res.status(422).json({ msg: "user already registered" });
      } else {
        const finalUser = new USER({
          fname,
          email,
          mobile,
          password,
          cpassword,
        });

        const storedata = await finalUser.save();
        console.log(storedata);
        res.status(201).json({ storedata });
      }
    } catch (error) {
      res.status(422).json(error);
      console.log("catch block error");
    }
  }
});

//lign user api

router.post("/login",async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    res.status(400).json({error:"fill all details"});
  } else{
    try {
      const userLogin=await USER.findOne({email:email});
      console.log(userLogin);
      if(userLogin){
        const isMatch=await bcrypt.compare(password,userLogin.password);
        console.log(isMatch);

        //token generate
        const token=await userLogin.generateAuthToken();
        console.log(token)

        res.cookie("amazonWeb",token,{
          expires:new Date(Date.now()+900000),
          httpOnly:true
        })

        const result={
          userLogin,
          token
        }

        if(!isMatch){
          res.status(400).json({error:"Invalid Details"});
        } else{
          res.status(201).json({result});
        }
      } else{
        res.status(400).json({error:"Invalid details"})
      }

    } catch (error) {
      res.status(400).json({error:"invalid details"})
    }
  }

});

//adding the data into cart

router.post("/addcart/:id",athenticate,async(req,res)=>{
  try {
    const {id}=req.params;
    console.log(id);
    const rId=id.slice(1,9);
    const cart=await Products.findOne({id:rId});
    // console.log(cart+"cart value");
    console.log(req.rootUser +" lsdjfknsidkjjfd");


    const UserContact=await USER.findOne({_id:req.userID})
    // console.log(UserContact);

    if(UserContact){
      const cartData=await UserContact.addcartdata(cart);
      await UserContact.save();
      // console.log(cartData);
      // console.log(UserContact);
      res.status(201).json(UserContact);
    } else{
      res.status(401).json({error:"invalid user"});
    }
    
  } catch (error) {
    res.status(401).json({error:"invalid user"});
  }
});


//get cart details

router.get("/cartdetails",athenticate,async(req,res)=>{
  try {
    const buyuser=await USER.findOne({_id:req.userID});
    res.status(201).json(buyuser)
  } catch (error) {
    console.log(error);
  }
})

//get valid user
router.get("/validateuser",athenticate,async(req,res)=>{
  try {
    const validuserone=await USER.findOne({_id:req.userID});
    res.status(201).json(validuserone)
  } catch (error) {
    console.log(error);
  }
});

// remove item from cart
router.delete("/remove/:id",athenticate,async(req,res)=>{
  try{
    const {id}=req.params;
    req.rootUser.carts=req.rootUser.carts.filter((cruval)=>{
      return cruval.id!=id;  
    })
    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log(("item removed"))
    
    console.log(req.rootUser);
  } catch(error){
    res.status(400).json(error);
    console.log("delete route catch block error");
  }
})


//for user log out

router.get("/logout",athenticate,(req,res)=>{
  try{
    req.rootUser.tokens=req.rootUser.tokens.filter((currele)=>{
      return currele.token!==req.token
    });

    res.clearCookie("amazonWeb",{path:"/"});

    req.rootUser.save();

    res.status(201).json(req.rootUser);
    console.log("user logout")

  }catch(err){
    console.log(err+" error for logout router");
  }
})

module.exports = router;
