import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {UserActions} from '../../store/slice/UserSlice'
import {useNavigate} from 'react-router-dom'
import classes from './RegisterPage.module.css'
import {PersonFill} from 'react-bootstrap-icons'
import { toast, ToastContainer } from 'react-toastify'

const RegisterPage = ()=>{

    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[userImage, setuserImage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleName = (event)=>{
        setName(event.target.value)
    }

    const handleEmail = (event)=>{
        setEmail(event.target.value)
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value)
    }

    const handleImage = (event)=>{
        if(event.target.files[0])
            setuserImage(event.target.files[0])
    }

    const handleForm = (event)=>{
        event.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("userImage", userImage)
        axios.post('http://localhost:5000/user/register',formData)
        .then(res=>{
            console.log(res.data)
            if(res.data.Status==="Success"){
                dispatch(UserActions.setUser(res.data.User))
                localStorage.setItem("user", res.data.token)
                navigate('/')
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
        <Container className={classes.registerContainer}>
            <ToastContainer/>
            <Card className={classes.registerCard}>
            <h1 className={classes.registerHead}>Signup</h1>
                <Form onSubmit={handleForm}>
                    <Row>
                        <Col>
                            <Form.Group className="mt-4 mb-3">
                            <Form.Control className={classes.registerInput} type="text" placeholder="Enter name" onChange={handleName} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control className={classes.registerInput} type="email" placeholder="Enter email" onChange={handleEmail} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control className={classes.registerInput} type="password" placeholder="Password" onChange={handlePassword} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Control className={classes.registerInput} type="file" onChange={handleImage} required/>
                            </Form.Group>
                            <Button type="submit" className={classes.registerBtn}>
                                Signup
                            </Button>
                        </Col>
                        <Col className={classes.imageCol}>
                            <Form.Group className="mb-3">
                                {userImage===null?<PersonFill size={250} color='#DF362D'/>
                                :<img alt='user' src={URL.createObjectURL(userImage)} className={classes.userImg}/>}                                
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}

export default RegisterPage