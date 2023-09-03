import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({

    })
    //GET BLOG DETAILS
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`)
            if (data?.success) {
                setBlog(data?.blog);
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBlogDetail();

    }, [id]);



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
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success('blog updated ')
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(blog)
    return (
        <>
            <form className='login' onSubmit={handleSubmit}>
                <Box border={3} padding={3} margin="auto" display={'flex'} flexDirection={'column'} marginTop={"30px"}>
                    <Typography variant='h2' textAlign={'center'} padding={3}>
                        Update Your Blog
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Title </InputLabel>
                    <TextField name="title" value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Description </InputLabel>
                    <TextField name="description" value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Image </InputLabel>
                    <TextField name="image" value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required />
                    <Button type='submit' color='warning' variant='contained'>Update</Button>

                </Box>
            </form>
        </>
    )
}

export default BlogDetails