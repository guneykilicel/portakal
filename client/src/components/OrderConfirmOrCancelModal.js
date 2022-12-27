import React from 'react'
import DashboardFinder from '../apis/DashboardFinder';

function OrderConfirmOrCancelModal({state, setState, past_order_id, order_state}) {


    const handleConfrim = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await DashboardFinder.put(`/`, {
          order_state: "Sipariş Tamamlandı!",
          past_order_id
        });
      };


  return (
    false  ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setState(false)}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-4xl p-4 mx-auto bg-zinc-50 rounded-md shadow-lg flex justify-around">
                    <button onClick={handleConfrim}>Siparişi Tamamla!</button>
                    <button>Siparişi İptal Et!</button>
                </div>
                    </div>
                </div>
        ) : ''
  )
}

export default OrderConfirmOrCancelModal