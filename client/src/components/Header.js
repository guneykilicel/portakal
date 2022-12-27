import React from "react";
import Navigator from "./Navigator";

const Header = ({past_order_id ,order_state, set_order_state, name,surname,logout}) => {
  return (
    <div>
      <div className=' flex md:container mx-auto p-8 page-content items-center justify-between'>
        <div className=' ml-20'>
          <h1 className="text-6xl font-bold"><span className='text-orange-500'>Sipariş</span> verme zamanı!</h1>
          <span className='text-orange-500 text-lg'>Hadi portakal toplayalım!</span>
          <p className="!text-m underline mt-30">{order_state}</p>
        </div>
          <Navigator name={name} surname={surname} logout={logout} />

      </div>
    </div>
  );
};

export default Header;