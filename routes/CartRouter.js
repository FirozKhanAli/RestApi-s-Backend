const express = require("express")

const Cart = require("../models/Cart")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        var data = new Cart(req.body)
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!", data: data })
    }
    catch (error) {
         if (error.errors.userId)
            res.status(400).send({ result: "Fail", message: error.errors.userId.message })
            else if (error.errors.productId)
            res.status(400).send({ result: "Fail", message: error.errors.productId.message })
            else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
            else if (error.errors.color)
            res.status(400).send({ result: "Fail", message: error.errors.color.message })
            else if (error.errors.size)
            res.status(400).send({ result: "Fail", message: error.errors.size.message })
            else if (error.errors.price)
            res.status(400).send({ result: "Fail", message: error.errors.price.message })
            else if (error.errors.qty)
            res.status(400).send({ result: "Fail", message: error.errors.qty.message })
            else if (error.errors.total)
            res.status(400).send({ result: "Fail", message: error.errors.total.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})
//Api for getting the all record
router.get("/user/:userId", async (req, res) => {
    try {
        var data = await Cart.find({userId:req.params.userId}).sort({ _id: -1 })
        res.send({ result: "Done",total:data.length, data: data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})
//Api for getting the single record
router.get("/:_id", async (req, res) => {
    try {
        var data = await Cart.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Done", message: "No Record Found!!!" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})

//Api For Updating the Record
router.put("/:_id", async (req, res) => {
    try {
        var data = await Cart.findOne({ _id: req.params._id })
        if (data) {
            data.qty = req.body.qty ?? data.qty
            data.total = req.body.total ?? data.total
            await data.save()
            res.send({ result: "Done", message: "Record is Updated!!!" })
        }
        else
            res.send({ result: "Done", message: "No Record Found!!!" })
    }
    catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique " })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})
//Api for deleted

router.delete("/:_id", async (req, res) => {
    try {
         await Cart.deleteOne({ _id: req.params._id })
            res.send({ result: "Done", message:"Record is Deleted" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})

module.exports = router