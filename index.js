const express=require("express")
require("./dbConnet")
const MaincategoryRouter=require("./routes/MaincategoryRouter")
const SubcategoryRouter=require("./routes/SubcategoryRouter")
const BrandRouter=require("./routes/BrandRouter")
const ProductRouter=require("./routes/ProductRouter")
const UserRouter=require("./routes/UserRouter")
const CartRouter=require("./routes/CartRouter")
const WishlistRouter=require("./routes/WishlistRouter")
const CheckoutRouter=require("./routes/CheckoutRouter")
const NewslatterRouter=require("./routes/NewslatterRouter")
const ContactRouter=require("./routes/ContactRouter")




const app=express()
app.use(express.json())
app.use("public",express.static)

app.use("/api/maincategory",MaincategoryRouter)
app.use("/api/subcategory",SubcategoryRouter)
app.use("/api/brand",BrandRouter)
app.use("/api/product",ProductRouter)
app.use("/api/user",UserRouter)
app.use("/api/cart",CartRouter)
app.use("/api/wishlist",WishlistRouter)
app.use("/api/checkout",CheckoutRouter)
app.use("/api/newslatter",NewslatterRouter)
app.use("/api/contact",ContactRouter)


var port=80
app.listen(port,()=>{
    console.log(`Server is Running at Port at http://localhost:${port}`)
})