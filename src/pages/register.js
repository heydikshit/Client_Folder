import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from "@mui/material"
import axios from 'axios'
import toast from 'react-hot-toast';
import "./register.css"

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
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
            const { data } = await axios.post('/api/v1/user/register', { username: inputs.name, email: inputs.email, password: inputs.password })
            if (data.success) {
                toast.success('User Registed Successfully')
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='register'>
                <form className='registerForm' onSubmit={handleSubmit}>
                    <Box maxWidth={450} display="flex" flexDirection={'column'} alignItems="center" //box
                        justifyContent={'center'} marginTop={5}
                        padding={5}
                        boxShadow="10px 10px 20px"
                        borderRadius={5}
                    >
                        <Typography className='registerTitle' //typo
                        >Register</Typography>
                        <TextField className='registerInput' placeholder="Enter Name" value={inputs.name} onChange={handleChange} name="name" //text
                            margin='normal'
                            type={"text"}
                            required
                        />
                        <TextField className='registerInput' placeholder="Enter Email" value={inputs.email} onChange={handleChange} name="email" //text
                            margin='normal'
                            type={"email"}
                            required
                        />
                        <TextField className='registerInput' placeholder="Enter Password" value={inputs.password} onChange={handleChange} name="password" //text
                            margin='normal'
                            type={"password"}
                            required
                        />
                        <Button className='registerbutton'  //button
                            marginTop={5}
                            type="submit"

                            varient="contained"
                            color="primary"    //button
                        >Submit</Button>
                        <Button className='registerRegisterButton' onClick={() => navigate("/login")}>Already Registerd ? Please Login </Button>
                    </Box>
                </form>
            </div>
        </>
    )
}

export default Register