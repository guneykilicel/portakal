import React from 'react'

function ProductCard({cart,setCart,product}) {

    const addToCart = () => {
        const addedItem = cart.find(item => item.product_id === product.product_id);
        if(addedItem) {
            // console.log("zaten var");
            addedItem.quantity += 1;
            setCart([...cart.filter(item => item.product_id !== product.product_id),addedItem]);
        } else{
            setCart([...cart,{
                product_id: product.product_id,
                picture: product.picture,
                name: product.name,
                explanation: product.explanation,
                price: product.price,
                quantity: 1
            }])
        }
        // console.log(product)
        
    }
    return (
        <div className="overflow-hidden max-w-lg max-h-52 p-8 sm:flex sm:space-x-6 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl cursor-pointer relative">
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                <img src={product.picture} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="text-xl font-semibold text-orange-500">{product.name}</h2>
                    <span className="text-sm dark:text-gray-400">{product.explanation}</span>
                </div>
                <div className='flex gap-x-1 items-center'>
                <span className="text-lg font-semibold">{product.price} TL</span>
                {/* <span className="text-sm line-through dark:text-gray-600">indrimsiz TL</span> */}
                </div>
                <div className="space-y-1 absolute bottom-2 right-4">
                    <button onClick={addToCart} className='p-1.5 bg-orange-500 text-white font-medium rounded-md'>Sepete ekle</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard