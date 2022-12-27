// import React, { useState, createContext } from "react";

// export const RestaurantsContext = createContext();

// export const RestaurantContextProvider = props => {

//     const [restaurants, setRestaurants] = useState([]);
//     const [selectedRestaurant, setSelectedRestaurant] = useState(null)

//     const addRestaurants = (restaurant) => {
//         setRestaurants([...restaurants, restaurant])
//     }

//     return (
//         <RestaurantsContext.Provider
//             value={{
//                 restaurants,
//                 setRestaurants,
//                 addRestaurants,
//                 selectedRestaurant,
//                 setSelectedRestaurant,
//             }}
//         >
//             {props.children}
//         </RestaurantsContext.Provider>
//     )
// }

import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  //restaurants
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  //user
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [user, setUser] = useState(null);
  const [logoutc, setLogoutc] = useState(null);
  const [il_id, set_il_id] = useState(0);
  const [ilce_id, set_ilce_id] = useState(0);
  const [semt_id, set_semt_id] = useState("");



  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        user,
        setUser,
        logoutc,
        setLogoutc,
        userName,
        setUserName,
        name,
        setName,
        surname,
        setSurname,
        il_id,
        set_il_id,
        ilce_id,
        set_ilce_id,
        semt_id,
        set_semt_id
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};