const express = require("express");
const { addInsighttoDb, getAllInsight, addToFav, deleteInsight } = require("../controllers/insight.controllers");



const insightRouter = express.Router();



insightRouter.post("/",addInsighttoDb);


insightRouter.get("/getallinsight",getAllInsight);


insightRouter.patch("/addtofav/:insightId",addToFav);


insightRouter.delete("/delete/:insightId",deleteInsight)


module.exports={
    insightRouter
}