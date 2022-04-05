import {Card, Modal} from 'react-bootstrap'
import classes from './OrderCard.module.css'
import {useState} from 'react'
import CartCard from '../CartCard/CartCard'

const OrderCard = (props)=>{ 

    const[show, setShow] = useState(false)

    const handleClose = ()=>{
        setShow(false)
    }

    const orderModal = ()=>{
        setShow(true)
    }

    return(
        <>
            <Card className={classes.orderContainer} onClick={orderModal}>
            <Card.Title>Order Id : {props.item._id}</Card.Title>
            <Card.Body>
                <Card.Text style={{color : props.item.status==="Delivered"?"green":"red", fontWeight : "700"}}>Status : {props.item.status}</Card.Text>
                <Card.Text>Price : ₹ {props.item.totalPrice}</Card.Text>
                <Card.Text>Items : {props.item.products.length}</Card.Text>
                <Card.Text>{props.item.createdAt.split("T")[0]}</Card.Text>
            </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={classes.modalTitle}>Order Id : {props.item._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.item.products.map(prod=>{
                        return(
                            <CartCard key={prod.productId} item={prod} orderMode={false}/>
                        )
                    })}
                </Modal.Body>
                <Modal.Footer className={classes.modalPrice}>Total : ₹ {props.item.totalPrice}</Modal.Footer>
            </Modal>
        </>
    )
}

export default OrderCard