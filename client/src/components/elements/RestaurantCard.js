import React from 'react'

function RestaurantCard({handleRestaurantSelect, restaurant}) {
    // console.log(restaurant)
    return (
        // <div className='bg-gray-200 w-full min-h-screen flex justify-center items-center'>
            <div onClick={() => handleRestaurantSelect(restaurant.id)} className='w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl cursor-pointer'>
                <img className='h-40 object-cover rounded-xl mx-auto' src={restaurant.picture} alt="hamburger" />
                <div className='p-2'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-lg'>{restaurant.name}</h2>
                        <span className='text-white bg-orange-500 px-3 py-0.3 rounded-md text-sm'>{restaurant.average_rating}<span className='text-gray-200 text-sm'> (500+)</span></span>
                    </div>
                    <p className='text-sm text-gray-700'>Sağlıklı ve sağlıksız tüm yiyecekler mevcut.</p>

                    <div className='flex items-center font-medium gap-x-3 mt-4 bg-orange-500 px-3 py-0.3 rounded-md text-white text-xs'>
                        <span >Söğütözü mah.</span>
                        <span >{restaurant.min_price} TL minimum</span>
                        <span >45dk</span>
                    </div>
                </div>
                {/* <div className='m-2'>
                    <a role='button' href='#' className='text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700'>Learn More</a>
                </div> */}
            </div>
        // </div>
    )
}

export default RestaurantCard