import { Router } from "express";

let router: Router = Router();

router
  .get("/", (req, res) => {
    res.send("Property GET route is working ...");
  })
  .get("/:id", (req, res) => {
    res.send("Property GET by id route is working ...");
  })
  .post("/", (req, res) => {
    res.send("Property POST route is working ...");
  })
  .put("/:id", (req, res) => {
    res.send("Property PUT route is working ...");
  })
  .delete("/:id", (req, res) => {
    res.send("Property DELETE route is working ...");
  });

export default router;
