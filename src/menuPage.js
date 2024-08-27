import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

import data from "./data.json";
import {
  addToCart,
  handleDecrementItem,
  handleIncrementItem,
  handleDeleteItem,
  handleSelectItem,
  handleTotalQuantity,
  handleTotalPrice,
  quantityIncrement,
  quantityDecrement,
  deleteItem,
} from "./slice/cartItemSlice";
import { useDispatch, useSelector } from "react-redux";

const MenuPage = () => {
  const { name: user } = useSelector((store) => store.name);
  const dispatch = useDispatch();
  const {
    addCartItem: cartItem,
    items,
    totalPrice,
    totalQuantity,
  } = useSelector((store) => store.cartItem);
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
  // let Price = 0;
  // let Quantity = 0;
  // for (let i = 0; i < cartItem.length; i++) {
  //   Price += cartItem[i].totalPrice;
  //   Quantity += cartItem[i].quantity;
  // }

  const handleAddToCart = (id) => {
    dispatch(handleSelectItem(id));
  };

  const handleDeleteToCart = (id) => {
    const newData = items.map((item) =>
      item.id === id ? { ...item, select: false } : item
    );
    dispatch(handleDeleteItem(newData));
    dispatch(deleteItem(id));
  };
  //
  const handleDecrement = (id) => {
    dispatch(handleDecrementItem(id));
    dispatch(quantityDecrement(id));
  };

  const handleIncrement = (id) => {
    dispatch(handleIncrementItem(id));
    dispatch(quantityIncrement(id));
  };

  const handleAdd = (item) => {
    let newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity + 1,
      totalPrice: item.price,
      photoName: item.photoName,
      details: item.details,
    };
    dispatch(addToCart(newItem));
  };

  return (
    <div>
      <Navbar />

      <div className="menu">
        {items.map((item) => (
          <div className="card">
            <img src={item.photoName} alt="noImage" className="itemImage"></img>
            <h2 className="itemName">{item.name}</h2>
            <p className="price">${item.price}</p>
            <p className="details">{item.details}</p>
            <div className="addBtns">
              {item.quantity > 0 && (
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <button
                    style={
                      {
                        // marginRight: "10px"
                      }
                    }
                    className="decrementBtn"
                    onClick={() => {
                      handleDecrement(item.id);
                    }}
                  >
                    -
                  </button>
                  <span>
                    <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
                  </span>
                  <button
                    style={
                      {
                        //  marginLeft: "10px"
                      }
                    }
                    className="incrementBtn"
                    onClick={() => {
                      handleIncrement(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
              )}
              {item.quantity >= 1 && (
                <button
                  className="deleteBtn"
                  style={
                    {
                      // marginLeft: "10px"
                    }
                  }
                  onClick={() => {
                    handleDeleteToCart(item.id);
                  }}
                >
                  Delete
                </button>
              )}
              {item.quantity <= 0 && (
                <button
                  className="addToCart"
                  onClick={() => {
                    handleAdd(item);
                    handleAddToCart(item.id);
                  }}
                >
                  {item.addBtn}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {cartItem.length ? (
        <div className="footer">
          <div>
            <div>
              Total Quantity : {totalQuantity} , Total Amount : ${totalPrice}
            </div>
          </div>
          <div>
            <Link
              to="/billPage"
              className="link"
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "white" }}> OPEN CART &#8594;</span>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MenuPage;

// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./navbar";

// import {
//   addToCart,
//   quantityIncrement,
//   quantityDecrement,
//   deleteItem,
// } from "./slice/cartItemSlice";
// import { useDispatch, useSelector } from "react-redux";

// const MenuPage = ({ items, setItems, Price, Quantity }) => {
//   const dispatch = useDispatch();
//   const { addCartItem: cartItem } = useSelector((store) => store.cartItem);

//   // let Price = 0;
//   // let Quantity = 0;
//   // for (let i = 0; i < cartItem.length; i++) {
//   //   Price += cartItem[i].totalPrice;
//   //   Quantity += cartItem[i].quantity;
//   // }

//   const handleAddToCart = (id) => {
//     const newData = items.map((item) =>
//       item.id === id ? { ...item, select: true } : item
//     );
//     setItems(newData);
//   };

//   const handleDeleteToCart = (id) => {
//     const newData = items.map((item) =>
//       item.id === id ? { ...item, select: false } : item
//     );
//     setItems(newData);
//     dispatch(deleteItem(id));
//   };
//   //
//   const handleDecrement = (id) => {
//     dispatch(quantityDecrement(id));
//   };

//   const handleIncrement = (id) => {
//     dispatch(quantityIncrement(id));
//   };

//   const handleAdd = (item) => {
//     let newItem = {
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       totalPrice: item.price,
//       photoName: item.photoName,
//       details: item.details,
//     };
//     dispatch(addToCart(newItem));
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="menu">
//         {items.map((item) => (
//           <div className="card">
//             <img src={item.photoName} alt="noImage" className="itemImage"></img>
//             <h2>{item.name}</h2>
//             <p className="price">${item.price}</p>
//             <p>{item.details}</p>
//             <div className="addBtns">
//               <div>
//                 {cartItem.map((items) => (
//                   <div>
//                     {item.id === items.id ? (
//                       <span>
//                         <button
//                           style={{ marginRight: "10px" }}
//                           className="btnStyle"
//                           onClick={() => {
//                             handleDecrement(item.id);
//                           }}
//                         >
//                           -
//                         </button>
//                         <span>
//                           {item.id === items.id ? (
//                             <span style={{ fontWeight: "bold" }}>
//                               {items.quantity}
//                             </span>
//                           ) : (
//                             <span></span>
//                           )}
//                         </span>
//                         <button
//                           style={{ marginLeft: "10px" }}
//                           className="btnStyle"
//                           onClick={() => {
//                             handleIncrement(item.id);
//                           }}
//                         >
//                           +
//                         </button>
//                       </span>
//                     ) : (
//                       <span></span>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {item.select ? (
//                 <button
//                   className="btnStyle"
//                   style={{ marginLeft: "10px" }}
//                   onClick={() => {
//                     handleDeleteToCart(item.id);
//                   }}
//                 >
//                   Delete
//                 </button>
//               ) : (
//                 <button
//                   className="btnStyle"
//                   onClick={() => {
//                     handleAdd(item);
//                     handleAddToCart(item.id);
//                   }}
//                 >
//                   {item.addBtn}
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {cartItem.length ? (
//         <div className="footer">
//           <div>
//             <div>
//               Total Quantity : {Quantity} , Total Amount : ${Price}
//             </div>
//           </div>
//           <div>
//             <Link to="/billPage" className="link">
//               <span style={{ color: "white" }}> OPEN CART &#8594;</span>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// };

// export default MenuPage;
