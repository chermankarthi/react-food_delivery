import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//page component files
import Home from "./home";
import MenuPage from "./menuPage";
import OrderPage from "./orderPage";
import BillPage from "./billPage";
import OrderStatusPage from "./orderStatusPage";

//

//Style sheet
import "./styleSheet/home.css";
import "./styleSheet/menuPage.css";
import "./styleSheet/orderPage.css";
import "./styleSheet/billPage.css";
import "./styleSheet/orderStatusPage.css";
import OrderTrackingPage from "./orderTrackingPage";
//

const App = () => {
  // const [items, setItems] = useState([...data]);
  // const [addItems, setAddItems] = useState([{}]);

  // const { addCartItem: cartItem } = useSelector((store) => store.cartItem);

  // let Price = 0;
  // let Quantity = 0;
  // for (let i = 0; i < cartItem.length; i++) {
  //   Price += cartItem[i].totalPrice;
  //   Quantity += cartItem[i].quantity;
  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route
            path="/menuPage"
            element={
              <MenuPage />
              // items={items}
              // setItems={setItems}
              // addItems={addItems}
              // setAddItems={setAddItems}
              // Price={Price}
              // Quantity={Quantity}
            }
          ></Route>
          <Route path="/orderPage" element={<OrderPage />}></Route>
          <Route
            path="/billPage"
            element={
              <BillPage
              // items={items}
              // setItems={setItems}
              // addItems={addItems}
              // setAddItems={setAddItems}
              />
            }
          ></Route>
          <Route path="/orderStatusPage" element={<OrderStatusPage />}></Route>
          <Route
            path="/orderTrackingPage/:id"
            element={<OrderTrackingPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
