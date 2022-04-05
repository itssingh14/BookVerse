import {Container, Form, Button, Card} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {UserActions} from '../../store/slice/UserSlice'
import {useNavigate} from 'react-router-dom'
import classes from './LoginPage.module.css'
import {toast, ToastContainer} from 'react-toastify'

const LoginPage = ()=>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = localStorage.getItem("user")

    useEffect(()=>{
        if(user){
          navigate("/")  
        }
    }, [user, navigate])

    const handleEmail = (event)=>{
        setEmail(event.target.value)
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value)
    }

    const handleForm = (event)=>{
        event.preventDefault()
        axios.post('http://localhost:5000/user/login',
        {
            email,
            password
        }).then(res=>{
            console.log(res.data)
            if(res.data.Status === "Success"){
                dispatch(UserActions.setUser(res.data.User))
                localStorage.setItem("user", res.data.User.token)
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
        <Container className={classes.loginContainer}>
            <ToastContainer/>
            <Card className={classes.loginCard}>
                <h1 className={classes.loginHead}>Login</h1>
                <Form onSubmit={handleForm}>
                    <Form.Group className="mb-3">
                        <Form.Control className={classes.loginInput} type="email" placeholder="Enter email" onChange={handleEmail} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control className={classes.loginInput} type="password" placeholder="Password" onChange={handlePassword} required/>
                    </Form.Group>
                    <Button type="submit" className={classes.loginBtn}>
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default LoginPage