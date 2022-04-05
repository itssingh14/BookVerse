import {useDispatch, useSelector} from 'react-redux'
import CartCard from '../../components/CartCard/CartCard'
import {useEffect} from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import { UserActions } from '../../store/slice/UserSlice'
import classes from './CartPage.module.css'
import {toast, ToastContainer} from 'react-toastify'
import {ArrowLeftCircleFill} from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom'

const CartPage = ()=>{
    
    const totalCart = useSelector(state=>state.user.totalCart)
    const userObj = useSelector(state=>state.user.userObj)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = localStorage.getItem("user")

    useEffect(()=>{
        if(user){
            axios.get('http://localhost:5000/user/cart', { headers: { Authorization: `Bearer ${userObj.token}` }})
            .then(res=>{
                console.log(res.data)
                dispatch(UserActions.setCart(res.data.Cart))
            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            navigate("/")
        }
    }, [])

    const buyNow = ()=>{
        axios.post('http://localhost:5000/user/place-order', {},{ headers: { Authorization: `Bearer ${userObj.token}` }})
        .then(res=>{
            console.log(res.data)
            if(res.data.Status==="Success"){
                dispatch(UserActions.setCart([]))
                toast.success(res.data.Message,{
                    autoClose : 2000,
                    draggable : true,
                    hideProgressBar : false,
                    position : "top-center",
                    theme : "colored"
                })
            }
            else{
                toast.warn(res.data.Message,{
                    autoClose : 2000,
                    draggable : true,
                    hideProgressBar : false,
                    position : "top-center",
                    theme : "colored"
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <Container className={classes.cartContainer}>
            <ArrowLeftCircleFill className={classes.backBtn} size={30} style={{color : "#DF362D"}} onClick={()=>navigate("/")}>Back</ArrowLeftCircleFill>
            <ToastContainer/>
            {userObj.cart.length===0?<Container>
                <h1 className={classes.noOrders}>No Items</h1>
            </Container>:
            <Container>
                <Row>
                    <Col>
                        {userObj.cart.map(item=>{
                            return <CartCard key={item._id} item={item} orderMode={true}/>
                        })}
                    </Col>
                    <Col className={classes.cartTotalCol}>
                        <h3>Cart Total : {totalCart}</h3>
                        <Button className={classes.cartBtn} onClick={buyNow}>Buy now</Button>
                    </Col>
                </Row>
            </Container>}
        </Container>
    )
}

export default CartPage