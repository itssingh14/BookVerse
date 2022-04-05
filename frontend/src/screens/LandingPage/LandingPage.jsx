import CategoryBar from "../../components/CategoryBar/CategoryBar"
import {Row, Col, Container, Spinner} from 'react-bootstrap'
import classes from './LandingPage.module.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { BookActions } from "../../store/slice/BookSlice"
import BookCard from "../../components/BookCard/BookCard"

const LandingPage = ()=>{
    const dispatch = useDispatch()
    const[loading, setLoading] = useState(false)
    const filteredBookList = useSelector(state=>state.book.filteredBookList)
    useEffect(()=>{
        setLoading(true)
        axios.get('http://localhost:5000/shop/products')
        .then(res=>{
            console.log(res.data)
            dispatch(BookActions.setBookList(res.data))
        })
        .catch(err=>{
            console.log(err)
        })
        setLoading(false)
    },[dispatch, loading])
    return(
        <Container className={classes.container}>
            <Row>
                <Col lg='2'>
                    <CategoryBar/>
                </Col>
                <Col>
                    <Row>
                        {loading?<Spinner animation="border"/>:
                        filteredBookList.map(item=>{
                            return(
                                <BookCard 
                                key={item._id}
                                bookObj={item}
                                />
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default LandingPage