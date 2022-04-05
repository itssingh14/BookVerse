import {configureStore} from '@reduxjs/toolkit'
import BookReducers from './slice/BookSlice'
import UserReducers from './slice/UserSlice'

const store = configureStore({
    reducer : {
        book : BookReducers,
        user : UserReducers
    }
})

export default store