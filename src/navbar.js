import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerName from "./slice/customerName";
import { useDispatch, useSelector } from "react-redux";
import { inputName } from "./slice/nameSlice";
import { clearCart } from "./slice/cartItemSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { name } = useSelector((store) => store.name);
  const { userDetails } = useSelector((store) => store.cartItem);
  const [datas, setDatas] = useState("");
  const [pageNavigate, setPageNavigate] = useState([]);
  console.log(pageNavigate, "navv");
  useEffect(() => {
    pageNavigate.filter((value) => {
      return navigate(`/orderTrackingPage/${value.userorderid}`);
    });
  }, [pageNavigate, navigate]);
  const handleTracking = (e) => {
    let item = e.target.value;
    setDatas(item);
  };
  console.log(datas);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (datas) {
      var a = userDetails.filter(
        (value) => value.userorderid === parseInt(datas)
        // navigate(`/orderTrackingPage/${value.userorderid}`)
      );

      if (a.length <= 0) {
        alert("Not match");
      } else {
        setPageNavigate(a);
      }
    }

    setDatas("");
  };

  const dispatch = useDispatch();
  const handleUser = () => {
    dispatch(inputName(""));
    dispatch(clearCart([]));
  };

  return (
    <div className="navDiv">
      <div className="navLogoDiv">
        <Link to="/" className="brandLogo">
          Logo
        </Link>
      </div>
      <div className="navSearchDiv">
        <form onSubmit={handleSubmit}>
          <input
            className="homeSearchBox"
            placeholder="Search order #"
            onChange={(e) => handleTracking(e)}
            value={datas}
          ></input>
        </form>
      </div>

      <div className="navNameDiv">
        <CustomerName />
      </div>
      <div className="navLogoutDiv">
        {name.length > 0 && (
          <Link to="/" className="logout" onClick={() => handleUser()}>
            Log out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";
// import CustomerName from "./slice/customerName";
// import { useDispatch, useSelector } from "react-redux";
// import { inputName } from "./slice/nameSlice";
// import { clearCart } from "./slice/cartItemSlice";
// import data from "./data.json";
// const Navbar = ({ addItems, setAddItems }) => {
//   const { name } = useSelector((store) => store.name);

//   const dispatch = useDispatch();
//   const handleUser = () => {
//     dispatch(inputName(""));
//     dispatch(clearCart([]));
//     setAddItems([...data]);
//   };
//   return (
//     <div>
//       <div className="nav">
//         <div>
//           <Link to="/" className="link">
//             <span className="brandLogo">Logo</span>
//           </Link>
//         </div>
//         <div>
//           <input
//             className="homeSearchBox"
//             type="text"
//             placeholder="Search order #"
//           ></input>
//         </div>
//         <div>
//           <CustomerName />
//         </div>
//         {name.length > 0 && (
//           <div>
//             <Link to="/">
//               <span onClick={() => handleUser()}>Log out</span>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
