require("dotenv").config();
const router = require("express").Router()
const db = require("../db");

// Get all Restaurants
router.get("/", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );
      // console.log("results", results);
      console.log("restaurantRatingsData",restaurantRatingsData);
    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
    // res.status(200).json({
    //   status: "success",
    //   results: results.rows.length,
    //   data: {
    //     restaurants: results.rows,
    //   },
    // });
  } catch (err) {
    console.log(err);
  }
});

//arayüze yansıtılmadı zaman yetmeyecek
router.put("/addressli", async (req, res) => {
  try{
    // req.user has the payload
    // res.json(req.user);

    const restaurants = await db.query("call RestaurantsWithAddress($1, $2, $3)",[
      req.body.il_id, req.body.ilce_id, req.body.semt_id
    ]);

    res.status(200).json({
      status: "succes",
      data: {
        restaurants: restaurants.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

//Get a Restaurant
router.get("/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    // select * from restaurants wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );
    // console.log(reviews);

    const products = await db.query(
      "select products.* , categories.name as category_name from products inner join categories on products.category_id = categories.category_id where products.restaurant_id= $1 order by products.category_id;",
      [req.params.id]
    );


    res.status(200).json({
      status: "succes",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
        products: products.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Restaurant

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// order
router.post("/order", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO past_orders (user_id, product_id, note, date_time, order_state, quantity) values ($1, $2, $3, now(), 'Siparişiniz Alındı!', 1) returning *",
      [req.body.userName, req.body.product_id, req.body.note]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Restaurants

router.put("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Restaurant

router.delete("/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

// yorum ekleme
router.post("/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;