import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import './CreateBlog.css'

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })

    //INPUT CHANGE
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //FORM
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputs)
        try {
            const { data } = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success('blog created ')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <form className="blogform" onSubmit={handleSubmit}>
                <Box padding={3} margin="auto" display={'flex'} flexDirection={'column'} marginTop={""}>
                    <Typography variant='h2' textAlign={'center'} padding={3}>
                        Create Your Blog
                    </Typography>
                    <InputLabel className="blogInput" sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Title </InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel className="blogInput" sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Description </InputLabel>
                    <TextField name="description" value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel className="blogInput" sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Image </InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required />
                    <Button className='createButton' type='submit' color='primary' variant='contained'>Submit</Button>

                </Box>
            </form>

        </>
    )
}

export default CreateBlog