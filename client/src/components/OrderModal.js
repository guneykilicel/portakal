import React, { useState } from 'react'
import { toast } from 'react-toastify';
import RestaurantFinder from '../apis/RestaurantFinder';

function OrderModal({ userName, state, setState, cart, setCart, total }) {

    const [inputs, setInputs] = useState({
        name_surname: "",
        kart_no: "",
        ccv: "",
        note:""
      })
    
      const { name_surname, kart_no, ccv, note } = inputs;
    
      const onChange = (e) => {
        setInputs({
          ...inputs, [e.target.name]
            : e.target.value
        });
      }


      const onSubmitForm = async (e) => {
        e.preventDefault();
        console.log(userName);
        try {
          const response = await RestaurantFinder.post("/order", {
            userName: userName,
            product_id: cart[0].product_id,
            note,
            // quantity:1
          });
          toast.success("Siparişiniz Alındı!");
          setCart([]);
          setState(false);
          
        } catch (err) {
          console.log(err);
        }
      };

    return (
        state && userName ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setState(false)}></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-4xl p-4 mx-auto bg-zinc-50 rounded-md shadow-lg">
                        {/* <span className="block mb-2">Hadi portakal toplayalım!</span> */}
                        <h1 className="text-5xl font-extrabold text-center p-10 mb-5"><span className="text-orange-500">Sipariş </span>verme zamanı!</h1>
                        <div className='p-3 '>
                        <span>Sipariş Notu:</span>
                            <div>
                                <label for="note" className="text-sm sr-only">Kart Numarası</label>
                                <input
                                    id="note"
                                    type="note"
                                    name="note"
                                    onChange={e => onChange(e)}
                                    value={note}
                                    className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-x-10 p-3'>
                        <form onSubmit={onSubmitForm} novalidate="" action="" className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid w-1/2">
                            <p className='text-xs mb-5'>Lütfen kart bilgilerinizi eksiksiz bir şekilde doldurunuz.</p>
                            <span>Kart Sahibinin Adı ve Soyadı:</span>
                            <div className=''>
                                <label for="name_surname" className="text-sm sr-only">Kart sahibinin adı ve soyadı</label>
                                <input
                                    id="name_surname"
                                    type="name_surname"
                                    name="name_surname"
                                    onChange={e => onChange(e)}
                                    value={name_surname}
                                    className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
                            </div>
                            <span>Kart Numarası:</span>
                            <div>
                                <label for="kart_no" className="text-sm sr-only">Kart Numarası</label>
                                <input
                                    id="kart_no"
                                    type="kart_no"
                                    name="kart_no"
                                    onChange={e => onChange(e)}
                                    value={kart_no}
                                    className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
                            </div>
                            <span>CCV:</span>
                            <div>
                                <label for="ccv" className="text-sm sr-only">CCV</label>
                                <input
                                    id="ccv"
                                    type="ccv"
                                    name="ccv"
                                    onChange={e => onChange(e)}
                                    value={ccv}
                                    className="w-full rounded-md focus:ring-orange-500 bg-zinc-200 p-2.5" />
                            </div>
                            Toplam tutar: {total}
                            <button type="submit" className="w-full py-2 font-semibold rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white">Ödemeyi Tamamla!</button>
                            <span className='text-sm hover:text-orange-500 cursor-pointer font-bold'>Kartınızı kaydetmek ister misiniz?</span>
                        </form>
                        <div className='bg-white shadow-2xl w-1/2 h-60 flex flex-col p-5 rounded-md'>
                            <label className='mt-8 p-2'>
                                <input className='bg-white' disabled value={name_surname}></input>
                            </label>
                            <label className='p-3 border rounded-md'>
                                <input className='bg-white' disabled value={kart_no}></input>
                            </label>
                            <label className='p-3 border rounded-md w-16 overflow-hidden mt-2'>
                                <input className='bg-white' disabled value={ccv}></input>
                            </label>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : ''
    )
}

export default OrderModal