import { Card, Row, Col } from 'react-bootstrap'
import classes from './CartCard.module.css'
import {XSquareFill} from 'react-bootstrap-icons'
import {useDispatch, useSelector} from 'react-redux'
import { UserActions } from '../../store/slice/UserSlice'
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const CartCard = (props)=>{

    const userObj = useSelector(state=>state.user.userObj)
    const dispatch = useDispatch()

    const removeItem = ()=>{
        axios.put(`http://localhost:5000/user/update-cart/${props.item.productId}`,
        {},
        { headers: { Authorization: `Bearer ${userObj.token}` }}
        ).then(res=>{
            console.log(res.data)
            if(res.data.Status==="Success"){
                dispatch(UserActions.removeItem(props.item.productId))
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
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <Card className={classes.cartCard}>
            <ToastContainer/>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Img className={classes.cardImg} src={`../productUploads/${props.item.productImg}`}/>
                    </Col>
                    <Col>
                        <Card.Title className={classes.cardTitle}>{props.item.productName}</Card.Title>
                        <Card.Text className={classes.cardPrice}>Price :  ₹ {props.item.productPrice}</Card.Text>
                        <Card.Text className={classes.cardQuantity}>Quantity : {props.item.quantity}</Card.Text>
                        <Card.Text className={classes.cardTotal}>Total : {props.item.totalPrice}</Card.Text>
                    </Col>
                    {props.orderMode && <Col className={classes.removeItemCol}>
                        <XSquareFill onClick={removeItem} className={classes.removeItem} size={25}/>
                    </Col>}
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CartCard