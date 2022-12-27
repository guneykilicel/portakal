const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");
const authorization = require("../middleware/authorization");

// router.post("/", authorize, async (req, res) => {
//   try {
//     const user = await pool.query(
//       "SELECT user_name FROM users WHERE user_id = $1",
//       [req.user.id] 
//     ); 
    
//   //if would be req.user if you change your payload to this:
    
//   //   function jwtGenerator(user_id) {
//   //   const payload = {
//   //     user: user_id
//   //   };
    
//     res.json(user.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

router.get("/", authorization, async (req, res) => {
  try{
    // req.user has the payload
    // res.json(req.user);

    const user = await pool.query("SELECT users.*, past_orders.order_state, past_orders.past_order_id FROM users,past_orders WHERE users.user_id =$1 order by past_orders.past_order_id DESC limit 1;",[
      req.user.id
    ]);

    res.json(user.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})


// Update Restaurants

router.put("/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE past_orders SET order_state = $1 where past_order_id = $2 returning *;",
      [req.body.order_state, req.body.past_order_id]
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


module.exports = router;
