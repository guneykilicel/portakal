import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantCard from './elements/RestaurantCard'
import StarRating from './StarRating'
const RestaurantList = ({il_id, ilce_id, semt_id}) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    let history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                // console.log(response.data.data.restaurants);
                setRestaurants(response.data.data.restaurants);
            } catch (err) {

            }
        }
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // update veya delete e bastığımızda restaurant detail açılıyordu bunu engellemek için
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            // console.log(response);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
    }

    const renderRating = (restaurant) => {
        // console.log(restaurant);
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }
        return (
            <>
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };

    return (

        <div className='md:container mx-auto p-8 page-content'>
            <div className='grid grid-cols-5 grid-flow-row gap-5 max-w-[1280px] mx-auto'>
                {restaurants &&
                    restaurants.map((restaurant) => {
                        return (
                            <RestaurantCard key={restaurant.id}
                                handleRestaurantSelect={handleRestaurantSelect} restaurant={restaurant} />
                        );
                    })}

            </div>
        </div>

        // <div className="list-group">
        //     <table className="table table-hover table-dark">
        //         <thead>
        //             <tr className="bg-primary">
        //                 <th scope="col">Restaurant</th>
        //                 <th scope="col">Location</th>
        //                 <th scope="col">Price Range</th>
        //                 <th scope="col">Ratings</th>
        //                 <th scope="col">Edit</th>
        //                 <th scope="col">Delete</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {restaurants &&
        //                 restaurants.map((restaurant) => {
        //                     return (
        //                         <tr
        //                             key={restaurant.id}
        //                             onClick={() => handleRestaurantSelect(restaurant.id)}
        //                         >
        //                             <td>{restaurant.name}</td>
        //                             <td>{restaurant.location}</td>
        //                             <td>{"$".repeat(restaurant.price_range)}</td>
        //                             <td>{renderRating(restaurant)}</td>
        //                             <td>
        //                                 <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
        //                             </td>
        //                             <td>
        //                                 <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
        //                             </td>
        //                         </tr>
        //                     );
        //                 })}
        //         </tbody>
        //     </table>
        // </div>
    )
}

export default RestaurantList