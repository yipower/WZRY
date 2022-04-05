module.exports = app=>{
    const express = require('express')
    const router = express.Router(
       {
        mergeParams:true
       }
    )
    // const Category = require('../../model/Category')
    router.post('/',async(req, res)=>{
        
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get("/",async(req, res)=>{
        const queryOptions = {};
        if(req.Model.modelName==="Category"){
            queryOptions.populate="parent"
        }
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    router.get("/:id",async(req, res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put("/:id",async(req, res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete("/:id",async(req, res)=>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true,
        })
    })
    app.use("/admin/api/rest/:resource",async(req, res, next)=>{
        const modelName = require("inflection").classify(req.params.resource)
        req.Model = require(`../../model/${modelName}`)
        next()
    },router)


    const multer = require("multer")
    const upload = multer({dest:__dirname+"../../upload"})
    app.post("/admin/api/upload",upload.single("file"),async(req, res)=>{
        const file = req.file
        res.send(file)
    })
}