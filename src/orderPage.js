import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUserDetails,
  handleOrderId,
  clearCart,
} from "./slice/cartItemSlice";

const OrderPage = () => {
  const { orderId, addCartItem } = useSelector((store) => store.cartItem);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPriority, setUserPriority] = useState(false);
  const [sub, setSub] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleUserPhone = (e) => {
    setUserPhone(e.target.value);
  };
  const handleUserAddress = (e) => {
    setUserAddress(e.target.value);
  };
  const handleOrderPriority = (e) => {
    setUserPriority(!userPriority);
  };

  const handleForm = (e) => {
    let a = new Date();
    let b = new Date();
    let orderDate = new Date().toDateString();
    let orderTime = new Date().toTimeString();

    let hours = parseInt(new Date().getHours());
    let minutes = parseInt(new Date().getMinutes() + 30);

    a.setMinutes(a.getMinutes() + 30);

    let delPendingTime = b.getMinutes() - a.getMinutes();
    console.log(delPendingTime, "delpendingTIme");
    // Date.prototype.addMins = function (m) {
    //   return this.setTime(this.getTime() + m * 60 * 1000);
    // };
    // a.addMins(58);
    console.log(delPendingTime, "pend");
    e.preventDefault();
    let newUser = {
      userorderid: orderId + 1,
      username: userName,
      userphone: userPhone,
      useraddress: userAddress,
      userpriority: userPriority,
      userorderdate: orderDate,
      userordertime: orderTime,
      userorderhours: hours,
      userorderminutes: minutes,
      userexpdeltime: a.toString(),
      delpendingtime: delPendingTime,
      cartitems: addCartItem,
    };

    dispatch(handleUserDetails(newUser));
    dispatch(handleOrderId());
    navigate("/orderStatusPage");
    dispatch(clearCart());
    console.log(sub, "sub");
  };
  console.log(sub, "sub");
  return (
    <div>
      <Navbar />

      <div className="orderAddress">
        <p className="orderPageFirstLine">Ready to order? Let's go!</p>
        <form onSubmit={handleForm} className="DivFOrm">
          <div className="inputBox">
            <label className="labels">First name</label>
            <input
              required
              minLength={5}
              type="text"
              className="inputBoxAddress"
              onChange={(e) => handleUserName(e)}
            ></input>
          </div>
          {/* <br></br>
          <br></br> */}
          <div className="inputBox">
            <label className="labels">Phone number</label>
            <input
              minLength={10}
              maxLength={10}
              pattern="[7-9]{1}[0-9]{9}"
              type="tel"
              required
              className="inputBoxAddress"
              onChange={(e) => {
                handleUserPhone(e);
              }}
            ></input>
          </div>
          {/* <br></br>
          <br></br> */}
          <div className="inputBox">
            <label className="labels">Address</label>
            <input
              type="text"
              required
              minLength={10}
              maxLength={30}
              className="inputBoxAddress"
              onChange={(e) => handleUserAddress(e)}
            ></input>
          </div>
          {/* <br></br>
          <br></br> */}
          <div>
            <input
              type="checkbox"
              name="priority"
              value={"priority"}
              onChange={(e) => handleOrderPriority(e)}
            ></input>
            <label for="priority" className="priorityCheck">
              Want to give your order priority?
            </label>
          </div>

          <button className="orderNowBtn" type="submit" on>
            ORDER NOW FROM
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
