import classes from './CategoryBar.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { BookActions } from '../../store/slice/BookSlice'

const CategoryBar = ()=>{

    const categories = useSelector(state=>state.book.categories)
    const dispatch = useDispatch()

    const handleCategory = (category)=>{
        dispatch(BookActions.setCategory(category))
    }

    return(
        <ul className={classes.list}>
            <li className={classes.listTitle}>Category</li>
            <li className={classes.category} onClick={()=>handleCategory("All")}>All</li>
            {categories.map(item=>{
                return(
                    <li className={classes.category} key={item} onClick={()=>handleCategory(item)}>{item}</li>
                )
            })}
        </ul>
    )
}

export default CategoryBar