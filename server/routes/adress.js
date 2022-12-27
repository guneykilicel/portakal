require("dotenv").config();
const router = require("express").Router()
const db = require("../db");

router.get("/", async (req, res) => {
    try {
      // const results = await db.query("select * from restaurants");
      const provincesData = await db.query(
        "select IL_ID, IL_ADI from il;"
      );
        // console.log("results", results);
        console.log("provincesData",provincesData);
      res.status(200).json({
        status: "success",
        results: provincesData.rows.length,
        data: {
          provinces: provincesData.rows,
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

  router.get("/district", async (req, res) => {
    // console.log(req.params.id);
  
    try {
      const districts = await db.query(
        "SELECT * FROM ilce WHERE IL_ID = $1",
        [req.body.id]
      );
      // select * from restaurants where id = req.params.id
  
  
      res.status(200).json({
        status: "succes",
        data: {
          districts: districts.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router;