import React from "react";
import { User } from "./config/type";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, Otp, Signup } from "./page";
import { Footer, Header } from "./components";
import axios from "axios";

const App = () => {
  let [user, setUser] = React.useState<User>({ logged: false, phone: "", name: "" });
  let navigate = useNavigate();
  React.useEffect(() => {
    axios.get("/user/auth").then((response) => {
      if (response.data.userData) {
        setUser({
          phone: response.data.userData.phone,
          name: response.data.userData.name,
          logged: true,
        });
        navigate("/");
      }
      else{
        navigate("/login");
      }
    });
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Header user={user} />
      <main>
        <Routes>
          <Route path="/otp" element={<Otp setUser={setUser} />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
