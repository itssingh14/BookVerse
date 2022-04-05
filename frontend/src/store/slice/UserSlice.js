import {createSlice} from '@reduxjs/toolkit'

const USER_INIT = {
    name : "",
    email : "",
    userImage : "",
    cart : [],
    token : "",
    orders : []
}

const UserSlice = createSlice({
    name : "UserSlice",
    initialState : {
        userObj : USER_INIT,
        totalCart : 0,
        totalQuantity : 0
    },
    reducers : {
        setUser(state, action){
            state.userObj = action.payload
            state.userObj.cart.forEach(item => {
                state.totalQuantity += item.quantity
            });
        },
        logoutUser(state){
            state.userObj = USER_INIT
        },
        setCart(state, action){
            state.totalCart = 0
            state.totalQuantity = 0
            state.userObj.cart = action.payload
            state.userObj.cart.forEach(item => {
                state.totalCart += item.totalPrice
                state.totalQuantity += item.quantity
            });
        },
        setOrders(state, action){
            state.userObj.orders = action.payload
        },
        addToCart(state, action){
            state.totalQuantity += action.payload
        },
        removeItem(state, action){
            state.userObj.cart = state.userObj.cart.filter(item=>item.productId !== action.payload)
            state.totalQuantity = 0
            state.totalCart = 0
            state.userObj.cart.forEach(item => {
                state.totalQuantity += item.quantity
                state.totalCart += item.totalPrice
            });
        }
    }
})

export const UserActions = UserSlice.actions
export default UserSlice.reducer