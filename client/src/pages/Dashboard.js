import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import OrderConfirmOrCancelModal from "../components/OrderConfirmOrCancelModal";
import RestaurantList from "../components/RestaurantList";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { UserContext } from "../context/UserContext";

const Dashboard = ({ setAuth }) => {

  const {userName, setUserName} = useContext(RestaurantsContext);

  const [state, setState] = useState(true);

  const {name, setName} = useContext(RestaurantsContext);
  const {surname, setSurname} = useContext(RestaurantsContext);
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  const [il_id, set_il_id] = useState(0);
  const [ilce_id, set_ilce_id] = useState(0);
  const [semt_id, set_semt_id] = useState("");
  const [order_state, set_order_state] = useState("");
  const [past_order_id, set_past_order_id] = useState(0);

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token }
      })

      const parseRes = await response.json();

      // verileri buradan topluyoruz
      console.log(parseRes)
      setName(parseRes.user_name);
      setSurname(parseRes.user_surname);
      setUserName(parseRes.user_id);
      set_il_id(parseRes.il_id);
      set_ilce_id(parseRes.ilce_id);
      set_semt_id(parseRes.semt_id);
      set_order_state(parseRes.order_state);
      set_past_order_id(parseRes.past_order_id);
      
    } catch (err) {
      console.error(err.message)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false);
    toast.success("Logged out successfully!")
  }

  useEffect(() => {
    getName();
  })
  return (
    <Fragment>
      {/* <div className="container">
        <h1>Dashboard - {name}</h1>
      </div>
      <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button> */}
      <Header past_order_id={past_order_id} order_state={order_state} set_order_state={set_order_state} name={name} surname={surname} logout={logout} />
      <RestaurantList il_id={il_id} ilce_id={ilce_id} semt_id={semt_id} />
      <OrderConfirmOrCancelModal state={state} setState={setState} past_order_id={past_order_id} order_state={order_state} />
    </Fragment>
  )
}

export default Dashboard;