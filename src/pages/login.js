import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from "@mui/material"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast';
import "./login.css"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //state
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    //handle input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //form handle
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/user/login', { email: inputs.email, password: inputs.password })
            if (data.success) {
                localStorage.setItem('userId', data?.user._id)
                dispatch(authActions.login())
                toast.success('User Login Successfully')
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='login'>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <Box maxWidth={450} display="flex" flexDirection={'column'} alignItems="center" //box
                        justifyContent={'center'} margin="auto" marginTop={5}
                        padding={5}
                        boxShadow="10px 10px 20px"
                        borderRadius={5}
                    >
                        <Typography varient="h3" //typo
                            marginBottom={4}
                        >Login</Typography>

                        <TextField placeholder="Enter your Email" value={inputs.email} onChange={handleChange} name="email" //text

                            type={"email"}
                            required
                        />
                        <TextField placeholder="Enter your Password" value={inputs.password} onChange={handleChange} name="password" //text

                            type={"password"}
                            required
                        />
                        <Button
                            type="submit"

                        >Login</Button>
                        <Button onClick={() => navigate("/register")}>Register Here</Button>
                    </Box>
                </form>
            </div>
        </>
    )
}

export default Login