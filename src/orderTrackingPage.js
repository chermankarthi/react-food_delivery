import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { handleOrderPendingTime } from "./slice/cartItemSlice";
import { useParams } from "react-router-dom";

const OrderTrackingPage = () => {
  const params = useParams();
  console.log(params.id, "hello");
  const { userDetails, totalPrice } = useSelector((store) => store.cartItem);

  const [seconds, setSeconds] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (seconds === 59000) {
        setSeconds(0);
        dispatch(handleOrderPendingTime());
      } else {
        setSeconds(seconds + 1000);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  });
  return (
    <div>
      <Navbar />
      <div className="statusPageContainer">
        <div>
          {userDetails.map(
            (value, index) =>
              value.userorderid === parseInt(params.id) && (
                <div className="orderStatusPage">
                  <div className="orderStatus">
                    <div style={{ width: "30%" }}>
                      <p className="orderNumber">
                        Order ID : {value.userorderid}
                      </p>
                    </div>
                    {value.userpriority && (
                      <div style={{ width: "30%" }}>
                        <button className="priorityBg">Priority</button>
                      </div>
                    )}
                    <div style={{ width: "30%" }}>
                      <button className="orderStatusBg">Preparing Order</button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="expPendingTime">
                        <div style={{ width: "40%" }}>
                          <p className="detailsPendingTime">
                            {value.delpendingtime} minutes left
                          </p>
                        </div>
                        <div style={{ width: "60%" }}>
                          <div className="detailsDeliveryTime">
                            expected delivery time {value.userexpdeltime}
                          </div>
                        </div>
                      </div>
                      <div className="orderTimeDate" style={{ width: "100%" }}>
                        <div style={{ width: "60%" }}>
                          <div className="detailsDeliveryTime">
                            <span style={{ fontWeight: "bold" }}>
                              order date
                            </span>{" "}
                            : {value.userorderdate} {"  "}
                            {value.userordertime}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="detailsDeliveryTime"
                          style={{ fontWeight: "bold" }}
                        >
                          Delivery Address
                        </div>
                        <div className="detailsDeliveryTime">
                          {value.username}
                        </div>
                        <div className="detailsDeliveryTime">
                          {value.userphone}
                        </div>
                        <div className="detailsDeliveryTime">
                          {value.useraddress}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="detailsDeliveryTime"
                    style={{ fontWeight: "bold" }}
                  >
                    Orter items
                  </div>
                  {value.cartitems.map((item) => (
                    <>
                      <div className="itemRow">
                        <div></div>
                        <div
                          className="items"
                          style={{
                            overflow: "hidden",
                            width: "25%",
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          className="items"
                          style={{
                            overflow: "hidden",
                            width: "20",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {item.quantity} x ${item.price}
                        </div>
                        <div
                          className="items"
                          style={{
                            overflow: "hidden",
                            width: "5",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          ${item.totalPrice}
                        </div>
                        <div
                          style={{
                            overflow: "hidden",
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        ></div>
                      </div>
                      <div
                        className="detailsDeliveryTime"
                        style={{ fontWeight: "bold", width: "100%" }}
                      >
                        To pay on delivery : ${totalPrice}
                      </div>
                    </>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
