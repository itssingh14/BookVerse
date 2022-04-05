import {Card, Col} from 'react-bootstrap'
import classes from './BookCard.module.css'
import {Rating} from 'react-simple-star-rating'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { BookActions } from '../../store/slice/BookSlice'

const BookCard = (props)=>{

    const dispatch = useDispatch()

    const selectBook = () =>{
        dispatch(BookActions.setBook(props.bookObj))
    }

    return(
        <Col className={classes.col} lg='4' onClick={selectBook}>
            <Link to={`/book/${props.bookObj._id}`} className={classes.link}>
                <Card className={classes.card}>
                    <Card.Body>
                        <Card.Img className={classes.bookImg} src={`./productUploads/${props.bookObj.productImage}`}/>
                        <Card.Title className={classes.name}>{props.bookObj.name}</Card.Title>
                        <Card.Text className={classes.author}>by {props.bookObj.author}</Card.Text>
                        <Card.Text>
                            <Rating initialValue={props.bookObj.ratings} readonly size={20}/>
                        </Card.Text>
                        <Card.Text className={classes.price}>₹ {props.bookObj.price}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default BookCard