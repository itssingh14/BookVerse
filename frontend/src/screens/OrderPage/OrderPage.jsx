import {useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { UserActions } from '../../store/slice/UserSlice'
import classes from './OrderPage.module.css'
import OrderCard from '../../components/OrderCard/OrderCard'
import {ArrowLeftCircleFill} from 'react-bootstrap-icons'
import {useNavigate} from 'react-router-dom'
import {Container} from 'react-bootstrap'

const OrderPage = ()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = localStorage.getItem("user")

    useEffect(()=>{
        if(user){
            axios.get('http://localhost:5000/user/orders', { headers: { Authorization: `Bearer ${userObj.token}` }})
            .then(res=>{
                console.log(res.data)
                dispatch(UserActions.setOrders(res.data.Orders))
            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            navigate('/')
        }
    }, [])

    const userObj = useSelector(state=>state.user.userObj)

    return(
        <Container className={classes.orderContainer}>
            <ArrowLeftCircleFill size={30} style={{color : "#DF362D"}} onClick={()=>navigate("/")}>Back</ArrowLeftCircleFill>
            {userObj.orders.length===0?<h1 className={classes.noOrders}>No Orders</h1>:
            userObj.orders.map(item=>{
                return(
                    <OrderCard key={item._id} item={item}/>
                )
            })
            }
        </Container>
    )
}

export default OrderPage