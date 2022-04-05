import {Container, Nav, Navbar, Dropdown, DropdownButton, Row, Col, Badge, NavbarBrand} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { BookActions } from '../../store/slice/BookSlice'
import { UserActions } from '../../store/slice/UserSlice'
import {Search, Cart} from 'react-bootstrap-icons'
import classes from './BookNavBar.module.css'
import {useNavigate} from 'react-router-dom'

const BookNavBar = ()=>{

    const userObj = useSelector(state=>state.user.userObj)
    const navigate = useNavigate()
    const totalQuantity = useSelector(state=>state.user.totalQuantity) 
    const dispatch = useDispatch()

    const handleSearch = (event)=>{
        dispatch(BookActions.setQuery(event.target.value.toLowerCase()))
    }

    const logoutUser = ()=>{
        dispatch(UserActions.logoutUser())
        localStorage.clear()
        navigate('/')
    }

    return(
        <Navbar expand="lg" className={classes.navBar}>
            <Container className={classes.navContainer}>
                <NavbarBrand>
                    <LinkContainer to='/'><Nav.Link><span className={classes.bookStore}>BookStore</span></Nav.Link></LinkContainer>
                </NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Row className={`me-auto ${classes.searchRow}`}>
                    <Col><input className={classes.search} type='text' placeholder='Search' onChange={handleSearch}/></Col>
                    <Col className={classes.searchCol}><Search color='#DF362D' size={20}/></Col>
                </Row>
                <Nav className={classes.userNav}>
                    {userObj.token!==""?
                    <>
                        <DropdownButton className={classes.dropBtn} title={<span><img className={classes.userImg} alt='user' src={`./userUploads/${userObj.userImage}`}/>{userObj.name}</span>}>
                            <LinkContainer to='/user/orders'><Dropdown.Item>My Orders</Dropdown.Item></LinkContainer>
                            <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
                        </DropdownButton>
                        <LinkContainer to='/user/cart'><Badge className={classes.cartBadge}><Cart size={22}/>{totalQuantity===0?"":<span className={classes.cartQuant}>{totalQuantity}</span>}</Badge></LinkContainer>
                    </>
                        :<Row>
                            <Col className={classes.userOptions}><Link to='/user/login'>Login</Link></Col>
                            <Col className={classes.userOptions}><Link to='user/register'>Signup</Link></Col>
                        </Row>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default BookNavBar