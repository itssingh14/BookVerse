const express = require('express')
const {registerUser, authUser, addToCart, placeOrder, getCart, getOrders, updateCart, buyNow} = require('../controllers/userController')
const multer = require('multer')
const protect = require('../middleware/authMiddleware')

const userRouter = express.Router()
const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, './frontend/public/userUploads')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({storage : storage})

userRouter.post('/register', upload.single("userImage"), registerUser)
userRouter.post('/login', authUser)
userRouter.post('/add-to-cart/:productId', protect, addToCart)
userRouter.post('/place-order', protect, placeOrder)
userRouter.get('/cart', protect, getCart)
userRouter.get('/orders', protect, getOrders)
userRouter.put('/update-cart/:productId', protect, updateCart)
userRouter.post('/buy-now/:productId', protect, buyNow)


module.exports = userRouter