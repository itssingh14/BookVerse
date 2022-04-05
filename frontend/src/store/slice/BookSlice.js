import {createSlice} from '@reduxjs/toolkit'

const BOOK_INIT = {}

const BOOK_LIST_INIT = []

const BookSlice = createSlice({
    name : 'BookSlice',
    initialState : {
        bookObj : BOOK_INIT,
        bookList : BOOK_LIST_INIT,
        query : '',
        filteredBookList : BOOK_LIST_INIT,
        categories : [],
    },
    reducers : {
        setBook(state, action){
            state.bookObj = action.payload
        },
        setBookList(state, action){
            state.bookList = action.payload
            state.filteredBookList = state.bookList
            state.bookList.forEach(item => {
                if(!state.categories.includes(item.genre)){
                    state.categories.push(item.genre)
                }
            });
        },
        setQuery(state, action){
            if(action.payload===''){
                state.filteredBookList = state.bookList
                state.query = ''
            }
            else{
                state.query = action.payload 
                state.filteredBookList = state.bookList.filter(item=>item.name.toLowerCase().includes(state.query))
            }
        },
        setCategory(state, action){
            if(action.payload==="All"){
                state.filteredBookList = state.bookList
            }
            else{
                state.filteredBookList = state.bookList.filter(item=>item.genre===action.payload)
            }
        }
    }
})

export const BookActions = BookSlice.actions

export default BookSlice.reducer