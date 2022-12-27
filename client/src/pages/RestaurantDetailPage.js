import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import RestaurantDetailHeader from "../components/RestaurantDetailHeader";
import Cart from "../components/elements/Cart";
import ProductCard from "../components/elements/ProductCard";
import Loading from "../components/Loading";
import OrderModal from "../components/OrderModal";

const RestaurantDetailPage = () => {

  const {userName, setUserName} = useContext(RestaurantsContext);
  const {name, setName} = useContext(RestaurantsContext);
  const {surname, setSurname} = useContext(RestaurantsContext);

  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  const [state, setState] = useState(false); //ordermodal
  const [cart,setCart] = useState([]);
  const [total, setTotal] = useState(0);
  // console.log(selectedRestaurant);

  useEffect(() => {
    console.log(cart)
  },[cart])
  
  useEffect(() => {
		setTotal(
			cart.reduce((acc, item) => {
        console.log(item.quantity);
				return acc + (item.quantity * (selectedRestaurant.products.find(product => product.product_id === item.product_id).price))
			}, 0)
		)
	}, [cart])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data.data);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


  if (selectedRestaurant === null) {
    return (
      <Loading />
    )
  }

  
  // const addToCart = (product) => {
  //   // // alert(product.name)
  //   // let newCart = cart;
  //   // // var addedItem = newCart.find(c => c.product.product_id === product.product_id);
  //   // setCart([...cart,{product:product, quantity: 1}])
  //   // console.log("satın al")
  //   setCart([...cart,product])
  // }

 
  return (
    // <div>
    //   {selectedRestaurant && (
    //     <>
    //       <h1 className="text-center display-1">
    //         {selectedRestaurant.restaurant.name}
    //       </h1>
    //       <div className="text-center">
    //         <StarRating rating={selectedRestaurant.restaurant.average_rating} />
    //         <span className="text-warning ml-1">
    //           {selectedRestaurant.restaurant.count
    //             ? `(${selectedRestaurant.restaurant.count})`
    //             : "(0)"}
    //         </span>
    //       </div>
    //       <div className="mt-3">
    //         {/* {console.log(selectedRestaurant.reviews[selectedRestaurant.reviews.length-1, selectedRestaurant.reviews.length-2])} */}
    //         <Reviews reviews={selectedRestaurant.reviews} />
    //       </div>
    //       <AddReview />
    //     </>
    //   )}
    // </div>

    <div className='md:container mx-auto pt-8 relative'>
      <RestaurantDetailHeader
        restaurant_name={selectedRestaurant.restaurant.name}
        restaurant_picture={selectedRestaurant.restaurant.picture}
        rating={selectedRestaurant.restaurant.average_rating}
        review_count={selectedRestaurant.restaurant.count}
        reviews={selectedRestaurant.reviews}
        review1={selectedRestaurant.reviews[selectedRestaurant.reviews.length - 1]}
        review2={selectedRestaurant.reviews[selectedRestaurant.reviews.length - 2]}
        name={name}
        surname={surname}
      />
      {/* {console.log(selectedRestaurant.products)} */}
      {/* {console.log(selectedRestaurant.reviews[selectedRestaurant.reviews.length-1])} */}
      <div className='flex mt-12 gap-x-10'>
        <div className='sticky top-0'>
          <Cart state={state} setState={setState} cart ={cart} setCart={setCart} total={total} />
        </div>

        <div>
          <div className='my-5'>
            <h1 className='text-2xl font-semibold text-orange-500 mb-2'>Menüler</h1>
            <div className='bg-gray-700 h-px'></div>
          </div>
          <div className='grid grid-cols-2 grid-flow-row gap-5 mt-5'>
            {selectedRestaurant.products.map((product, index) => {
              return (
                <ProductCard
                  key={product.product_id}
                  cart={cart}
                  setCart={setCart}
                  product={product}
                  // key={product.product_id}
                  // name={product.name}
                  // price = {product.price}
                  // explanation = {product.explanation}
                  // picture={product.picture}
                />
              );
            })}
          </div>
        </div>
      </div>
      <OrderModal userName={userName} state={state} setState={setState} cart={cart} setCart={setCart} total={total} />
    </div>

  );
};

export default RestaurantDetailPage;