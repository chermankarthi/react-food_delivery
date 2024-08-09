import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";

import { inputName } from "./slice/nameSlice";

const Home = () => {
  //
  const [name, setName] = useState("");

  // const [btn, setBtn] = useState(true);
  //
  const dispatch = useDispatch();

  const { name: input } = useSelector((store) => store.name);

  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e);
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (!name) return;
    dispatch(inputName(name));
    navigate("/menuPage");
  };

  //
  return (
    <div>
      <Navbar />

      <div className="homeContent">
        <div className="firstLine"> The Best</div>
        <div className="secondLine">
          Straight out of the oven, straight to you.{" "}
        </div>
        {input === "" ? (
          <div className="inputNameForm">
            <p className="thirdLine">
              👋Welcome! Please start by telling us your name:
            </p>
            <form onSubmit={handleForm} className="formDiv">
              <input
                className="nameBox"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => {
                  handleNameChange(e.target.value);
                }}
              ></input>

              {name !== "" && (
                <button className="orderBtnStyle">START ORDER</button>
              )}
            </form>
          </div>
        ) : (
          <Link to="/menuPage" className="link">
            <button className="continueOrderBtn">Continue order</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import Navbar from "./navbar";
// import { useDispatch, useSelector } from "react-redux";

// import { inputName } from "./slice/nameSlice";

// const Home = ({ addItems, setAddItems }) => {
//   //
//   const [name, setName] = useState("");

//   // const [btn, setBtn] = useState(true);
//   //
//   const dispatch = useDispatch();
//   const { name: input } = useSelector((store) => store.name);

//   const navigate = useNavigate();

//   const handleForm = (e) => {
//     e.preventDefault();
//     if (!name) return;
//     dispatch(inputName(name));
//     navigate("/menuPage");
//   };

//   //
//   return (
//     <div>
//       <Navbar addItems={addItems} setAddItems={setAddItems} />

//       <div className="homeContent">
//         <h1>The Best</h1>
//         <h2>Straight out of the oven, straight to you. </h2>
//         {input === "" ? (
//           <div className="inputNameForm">
//             <p>👋Welcome! Please start by telling us your name:</p>
//             <form onSubmit={handleForm}>
//               <input
//                 className="nameBox"
//                 type="text"
//                 placeholder="Your full name"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//               ></input>

//               {name !== "" && (
//                 <button className="btnStyle" style={{ marginLeft: "25px" }}>
//                   START ORDER
//                 </button>
//               )}
//             </form>
//           </div>
//         ) : (
//           <div>
//             <Link to="/menuPage" className="link">
//               <button className="btnStyle" style={{ marginTop: "25px" }}>
//                 Continue order with {input}
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
