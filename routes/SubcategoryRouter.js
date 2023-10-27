const express = require("express")

const Subcategory = require("../models/Subcategory")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        var data = new Subcategory(req.body)
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!", data: data })
    }
    catch (error) {
        console.log(error);
        if (error.keyValue)
            res.status(400).send({ result: "Fail", message: "Name Must Be Unique " })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", message: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})
//Api for getting the all record
router.get("/", async (req, res) => {
    try {
        var data = await Subcategory.find().sort({ _id: -1 })
        res.send({ result: "Done",total:data.length, data: data })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})
//Api for getting the single record
router.get("/:_id", async (req, res) => {
    try {
        var data = await Subcategory.findOne({ _id: req.params._id })
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
        var data = await Subcategory.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.status = req.body.status ?? data.status
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
         await Subcategory.deleteOne({ _id: req.params._id })
            res.send({ result: "Done", message:"Record is Deleted" })
    }
    catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
})

module.exports = router