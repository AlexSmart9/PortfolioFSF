import React, { useState, useEffect} from "react";
import type {ChangeEvent} from 'react';
import { useCrud } from "../hooks/useCrud";
import './post.css'

// Define the structure of a post.

export interface Post {
    id?: string | number;
    title: string;
    content: string;
    image_url?: string;
}

export const Posts = () => {

    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api/';

    // Initialize CRUD hook

    const {
        data: posts,
        loading,
        getAll,
        create,
        update,
        destroy,
    } = useCrud(API_BASE_URL);

    const endpoint = 'posts'
    const [isFormOpen, setIsFormOpen]  = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [formData, setFormData] = useState({title: '',content: '', image_url: ''});
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        
        try {
            const getData = async () => {
                const response = await getAll(endpoint);
                setData(response);
                console.log(`Data fetched successfully: ${data}` );
            };
            getData();
    
        } catch (error) {
            console.error(error, 'Error fetching data');
        }
        
    }, []);

    // Handle changes in the input fields
    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // Open form to create a new post
    const handleOpenCreate = () => {
        setFormData({title: '', content: '', image_url: ''})
        setEditingId(null);
        setIsFormOpen(true);
    }

    //Open form to edit an existing post
    const handleOpenEdit = (post: Post) => {
        setFormData({title: post.title, content: post.content, image_url: ''})
        setEditingId(post.id as string | number);// Set the current ID 
        setIsFormOpen(true);

    };

    // Handle Form Submit (handles both create and update)
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(editingId) {
                // Update the Id already exists in state
                await update(endpoint, editingId, formData)
            } else {
                // Create a new post
                await create(endpoint, formData)
            }

            setIsFormOpen(false);

        } catch (err) {
            console.error(err, 'Error creating post');
        }
    };

    // Handle DELETE operation
    const handleDelete = async (id : string | number) => {
        if(window.confirm('Are you sure you want to delete this post?')) {
            await destroy(endpoint, id);
        }
    };

    return (

        <section className="post__section">
            <h2 className="post__title">Posts</h2>
            <div className="post__content">
                {
                loading ? (
                    <p>Loading...</p>
                ) : data.map((item) => (
                    <div key={item.id} className="post_card"> 
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        if(image_url) {
                            <img className="post__image" src={item.image_url} alt={item.title} />
                        }
                        <button onClick={() => handleOpenEdit(item)}>Edit</button>
                    </div>
                ))}
            </div>
        </section>
    )

}
