import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

import {
  handleDeleteItem,
  quantityIncrement,
  handleTotalPrice,
  handleTotalQuantity,
  quantityDecrement,
  deleteItem,
  clearCart,
} from "./slice/cartItemSlice";
import { useDispatch, useSelector } from "react-redux";

const BillPage = () => {
  const { name: user } = useSelector((store) => store.name);
  const { addCartItem: cartItem, items } = useSelector(
    (store) => store.cartItem
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    user.length <= 0 && navigate("/");

    var price = 0;
    var quantity = 0;
    for (let i = 0; i < cartItem.length; i++) {
      price += cartItem[i].totalPrice;
      quantity += cartItem[i].quantity;
    }
    dispatch(handleTotalPrice(price));
    dispatch(handleTotalQuantity(quantity));
  });

  const handleClearCart = () => {
    const newData = items.map((item) =>
      item.select === true ? { ...item, select: false } : item
    );
    dispatch(handleDeleteItem(newData));
    dispatch(clearCart());
  };

  const handleDeleteItems = (id) => {
    const newData = items.map((item) =>
      item.id === id ? { ...item, select: false } : item
    );
    dispatch(handleDeleteItem(newData));
    dispatch(deleteItem(id));
  };

  const handleDecrement = (id) => {
    dispatch(quantityDecrement(id));
  };

  const handleIncrement = (id) => {
    dispatch(quantityIncrement(id));
  };
  return (
    <div>
      <Navbar />
      <div className="billPageContainer">
        <div className="billPage">
          <div className="backMenuBtn">
            <Link to="/menuPage" style={{ textDecoration: "none" }}>
              &#8592; Back to menu
            </Link>
          </div>
          {cartItem.length ? (
            <>
              {cartItem.map((item) => (
                <div className="itemRow">
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
                  >
                    <button
                      className="decrementBtn"
                      onClick={() => {
                        handleDecrement(item.id);
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                    <button
                      className="incrementBtn"
                      onClick={() => {
                        handleIncrement(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div
                    style={{
                      overflow: "hidden",
                      width: "20%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        handleDeleteItems(item.id);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}

              <div className="decisionDiv">
                <Link to="/orderPage" className="link">
                  <button className="confirmBtn"> CONFIRM ORDER</button>
                </Link>

                <button className="clearBtn" onClick={() => handleClearCart()}>
                  CLEAR CART
                </button>
              </div>
            </>
          ) : (
            <div className="cartStatus">
              Your cart is still empty. Start adding some items...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillPage;

// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./navbar";

// import {
//   quantityIncrement,
//   quantityDecrement,
//   deleteItem,
//   clearCart,
// } from "./slice/cartItemSlice";
// import { useDispatch, useSelector } from "react-redux";

// function BillPage({ items, setItems, addItems, setAddItems }) {
//   const { addCartItem: cartItem } = useSelector((store) => store.cartItem);

//   const dispatch = useDispatch();

//   const handleClearCart = () => {
//     const newData = items.map((item) =>
//       item.select === true ? { ...item, select: false } : item
//     );
//     setItems(newData);
//     dispatch(clearCart());
//   };

//   const handleDeleteItem = (id) => {
//     const newData = items.map((item) =>
//       item.id === id ? { ...item, select: false } : item
//     );
//     setItems(newData);
//     dispatch(deleteItem(id));
//   };

//   const handleDecrement = (id) => {
//     dispatch(quantityDecrement(id));
//   };

//   const handleIncrement = (id) => {
//     dispatch(quantityIncrement(id));
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="billPage">
//         <div className="backMenuBtn">
//           <Link to="/menuPage" className="link">
//             &#8592; Back to menu
//           </Link>
//         </div>
//         {cartItem.length ? (
//           <div>
//             <div className="cartItems">
//               {cartItem.map((item) => (
//                 <div className="itemRow">
//                   <div style={{ width: "50%" }}>
//                     {item.name} {item.quantity} x ${item.price}
//                   </div>
//                   <div>${item.totalPrice}</div>
//                   <div>
//                     <button
//                       className="btnStyle"
//                       style={{ marginRight: "10px" }}
//                       onClick={() => {
//                         handleDecrement(item.id);
//                       }}
//                     >
//                       -
//                     </button>
//                     <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
//                     <button
//                       className="btnStyle"
//                       style={{ marginLeft: "10px" }}
//                       onClick={() => {
//                         handleIncrement(item.id);
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <button
//                     className="btnStyle"
//                     onClick={() => {
//                       handleDeleteItem(item.id);
//                     }}
//                   >
//                     DELETE
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <Link to="/orderPage" className="link">
//                 <button className="btnStyle"> CONFIRM ORDER</button>
//               </Link>

//               <button
//                 className="btnStyle"
//                 style={{ backgroundColor: "lightgray", marginLeft: "25px" }}
//                 onClick={() => handleClearCart()}
//               >
//                 CLEAR CART
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div style={{ marginTop: "25px", fontSize: "20px" }}>
//             {" "}
//             Your cart is still empty. Start adding some items...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BillPage;
