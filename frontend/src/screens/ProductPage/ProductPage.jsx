import { Container, Row, Col, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import classes from './ProductPage.module.css'
import {Rating} from 'react-simple-star-rating'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {BookActions} from '../../store/slice/BookSlice'
import {UserActions} from '../../store/slice/UserSlice'
import {toast, ToastContainer} from 'react-toastify'
import {ArrowLeftCircleFill} from 'react-bootstrap-icons'

const ProductPage = ()=>{

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[quantity, setQuantity] = useState("1")
    const user = localStorage.getItem("user")

    useEffect(()=>{
        axios.get(`http://localhost:5000/shop/product/${id}`)
        .then(res=>{
            console.log(res.data)
            dispatch(BookActions.setBook(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
    },[dispatch, id])
    
    const userObj = useSelector(state=>state.user.userObj)
    const bookObj = useSelector(state=>state.book.bookObj)

    const handleQuantity = (event)=>{
        setQuantity(event.target.value)
    }

    const addToCart = ()=>{
        if(user){
            axios.post(`http://localhost:5000/user/add-to-cart/${id}`, {quantity}, { headers: { Authorization: `Bearer ${userObj.token}` }})
            .then(res=>{
                console.log(res.data)
                dispatch(UserActions.addToCart(Number(quantity)))
                toast.success(res.data.Message,{
                    autoClose : 2000,
                    draggable : true,
                    hideProgressBar : false,
                    position : "top-center",
                    theme : "colored"
                })
            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            toast.error("User not logged in",{
                autoClose : 2000,
                draggable : true,
                hideProgressBar : false,
                position : "top-center",
                theme : "colored"
            })
        }
        
    }

    const buyNow = ()=>{
        if(user){
            axios.post(`http://localhost:5000/user/buy-now/${id}`, {quantity}, {headers: { Authorization: `Bearer ${userObj.token}` }})
            .then(res=>{
                console.log(res.data)
                dispatch(UserActions.setOrders([res.data.Order]))
                toast.success(res.data.Message,{
                    autoClose : 2000,
                    draggable : true,
                    hideProgressBar : false,
                    position : "top-center",
                    theme : "colored"
                })
            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            toast.error("User not logged in",{
                autoClose : 2000,
                draggable : true,
                hideProgressBar : false,
                position : "top-center",
                theme : "colored"
            })
        }
    }

    return(
        <Container className={classes.pageContainer}>
            <ToastContainer/>
            <ArrowLeftCircleFill size={30} style={{color : "#DF362D"}} onClick={()=>navigate("/")}>Back</ArrowLeftCircleFill>
            <Row>
                <Col className={classes.imageCol}>
                    <img src={`../productUploads/${bookObj.productImage}`} alt={bookObj.name} className={classes.bookImg}/>
                </Col>
                <Col>
                    <h1>{bookObj.name}</h1>
                    <h5 className={classes.author}>by {bookObj.author}</h5>
                    <Rating initialValue={bookObj.ratings} readonly size='21'/>
                    <h5 className={classes.price}>₹ {bookObj.price}</h5>
                    <p className={classes.desc}>{bookObj.description}</p>
                    {bookObj.inStock?
                    <>
                    <span>Quantity : </span><select onChange={handleQuantity}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    <Row className={classes.btnRow}>
                        <Button className={classes.customBtn} onClick={addToCart}>Add to Cart</Button>
                    </Row>
                    <Row className={classes.btnRow}>
                        <Button className={classes.customBtn} onClick={buyNow}>Buy now</Button>
                    </Row>
                    </>
                    : <p className={classes.outofStock}>Out of Stock</p>}
                </Col>
            </Row>
        </Container>
    )
}

export default ProductPage