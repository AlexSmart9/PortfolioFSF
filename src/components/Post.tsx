import React, { useState, useEffect} from "react";
import type {ChangeEvent} from 'react';
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi";
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
    const [formData, setFormData] = useState<any>({title: '',content: '', image_url: null});
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        
        try {
            const getData = async () => {
                const response = await getAll(endpoint);
                setData(response);
                console.log(`Data fetched successfully:`, data );
            };
            getData();
    
        } catch (error) {
            console.error(error, 'Error fetching data');
        }
        
    }, []);

    // Handle changes in the input fields
    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev : any) => ({...prev, [name]: value}));
    };

    // Manejador especial para el input de tipo archivo (Imagen)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Validamos que existan archivos ANTES de hacer nada
        if (e.target.files && e.target.files.length > 0) {
            
            // 2. Le decimos a TypeScript que prev es de tipo 'any' (ya que cambiaste tu useState a <any>)
            // Y usamos e.target.files! (con exclamación) porque el if de arriba ya garantiza que no es null
            setFormData((prev: any) => ({ ...prev, image: e.target.files![0] }));
        }
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

            const dataToSend = new FormData();

            dataToSend.append('title', formData.title);
            dataToSend.append('content', formData.content);

            if(formData.image) {
                dataToSend.append('image', formData.image);
            }


            if(editingId) {
                // Update the Id already exists in state
                await update(endpoint, editingId, dataToSend)

            } else {
                // Create a new post
                const newPost = await create(endpoint, dataToSend)
                setData(prevData => [...prevData, newPost]);
            }

            const refreshData = await getAll(endpoint);
            setData(refreshData);
            setIsFormOpen(false);
            setFormData({ title: '', content: '', image: null });
            setEditingId(null);


        } catch (err) {
            console.error(err, 'Error creating post');
        }
    };

    // Handle DELETE operation
    const handleDelete = async (id : string | number) => {
        if(window.confirm('Are you sure you want to delete this post?')) {
            await destroy(endpoint, id);
            setData(prevData => prevData.filter(item => item.id !== id));
        }
    };

    return (

        <section className="post__section">
            <h2 className="post__title">Posts</h2>
            <div className="post__content flex-container">
                {
                loading ? (
                    <p>Loading...</p>
                ) : data.map((item) => (
                    <div key={item.id} className="post__card"> 
                        <div className="post__card-header flex-container">
                            <h3 className="post__card-title">{item.title}</h3>
                            <div className="post__card-actions flex-container">
                                <button className="post__card-edit" onClick={() => handleOpenEdit(item)} title="Edit Post">
                                    <BiEdit/>
                                </button>
                                <button className="post__card-delete" onClick={() => item.id && handleDelete(item.id)} title="Delete Post">
                                    <BiTrash/>
                                </button>
                            </div>

                        </div>
                        <p className="post__card-content">{item.content}</p>
                        {
                            item.image_url && (<img className="post__card-image" src={item.image_url} alt={item.title} />)
                        }
                        </div>
                    ))
                }

                <button className="post__create-button flex-container" onClick={handleOpenCreate} title="Create Post">
                    <BiPlus/> <span>New Post</span>
                </button>
            </div>
                {/* 🪟 EL MODAL DE CREACIÓN/EDICIÓN */}
            {isFormOpen && (
                <div className="modal__overlay">
                    <div className="modal__content">
                        <h3 className="modal__title">{editingId ? 'Edit Post' : 'Create New Post'}</h3>
                        
                        <form onSubmit={handleSubmit} className="modal__form">
                            <div className="form__group">
                                <label>Títle</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    placeholder="Ej: High performance computation HPC" 
                                    required 
                                />
                            </div>
                            <div className="form__group">
                                <label>Content</label>
                                <textarea 
                                    name="content" 
                                    value={formData.content} 
                                    onChange={handleChange} 
                                    placeholder="What are you thinking about" 
                                    rows={5}
                                    required 
                                />
                            </div>

                            <div className="form__group">
                                <label> + Add image</label>
                                <input 
                                    type="file" 
                                    name="image" 
                                    accept="image/*"
                                    onChange={handleFileChange} 
                                />
                            </div>

                            <div className="modal__actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingId ? 'Update' : 'Publish'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </section>
        
    )

}
