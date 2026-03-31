import { useCrud } from "../hooks/useCrud"
import React, { useState, useEffect } from "react"
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi"
import type {ChangeEvent} from 'react';
import './styles/projects.css'
export interface Project {
    id?: string | number
    title: string
    description: string
    image_url?: string
    link:string
    technologies:string
}

export const Projects = () => {

    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api/';

    const endpoint = 'projects';

    const {
        loading,
        getAll,
        create,
        update,
        destroy,
    } = useCrud(API_BASE_URL);

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [formData, setFormData] = useState<any>({title: '', description: '', image_url: null, link: '', technologies: ''}); 
    const [data, setData] = useState<Project[]>([]);

    useEffect(() => {
        
        try {
            const getData = async() => {
                const response = await getAll(endpoint);
                setData(response);
                console.log(`Data fetched successfully:`, data);
            }
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

    // Special handler for input file type (Image)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Validate that files exist before doing anything
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prev: any) => ({ ...prev, image: e.target.files![0] }));
        
        }
    }

    const handleSubmit = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const dataToSend = new FormData();

            dataToSend.append('title', formData.title);
            dataToSend.append('description', formData.description);
            dataToSend.append('link', formData.link);
            dataToSend.append('technologies', formData.technologies);

            if(formData.image) {
                dataToSend.append('image', formData.image);
            }

            if(editingId) {
                await update(endpoint, editingId, dataToSend);
            } else {
                const newProject = await create(endpoint, dataToSend);
                setData(prevData => [...prevData, newProject]);
            }

            const refreshData = await getAll(endpoint);
            setData(refreshData);
            setIsFormOpen(false);
            setFormData({title: '', description: '', image_url: null, link: '', technologies: ''});
            setEditingId(null);

        } catch (err) {
            console.error(err, 'Error whit project action: create or update')            
        }
    }

    //Open form to create a new project
    const handleOpenCreate = () => {
        setFormData({title: '', description: '', image_url: null, link: '', technologies: ''});
        setEditingId(null);
        setIsFormOpen(true);

    }

    const handleOpenEdit = (project: Project) => {
        setFormData({title: project.title, description: project.description, image_url: '', link: project.link, technologies: project.technologies});
        setEditingId(project.id as string | number);
        setIsFormOpen(true);
    }

    const handelDelete = async (id: string | number) => {
        if(window.confirm('Are you sure you want to delete this project?')) {
            await destroy(endpoint, id);
            setData(prevData => prevData.filter(item => item.id !== id));
        }
    }

    return (
        <section className="projects__section">
            <h2 className="admin-subtitle">Projects</h2>
            <button onClick={handleOpenCreate} title="Create Project" className="btn__admin-create flex-container"><BiPlus/> <span>New Project</span></button>
            <div className="projects__content grid-container">
                {
                loading ? (
                    <p>Loading...</p>

                ) : data.map((item) => (
                    <div key={item.id} className="project__card flex-container">
                        {
                            item.image_url && (<img className="project__card-image" src={item.image_url} alt={item.title}/>)
                        }
                        <div className="project__card-content flex-container">
                            <h3 className="project__card-title">{item.title}</h3>
                            <p className="project__card-description">{item.description}</p>
                            <p className="project__card-technologies">Technologies: {item.technologies}</p>
                        <div className="project__card-actions flex-container">
                                <button className="project__card-edit flex-container" onClick={() =>handleOpenEdit(item)} title="Edit Project">
                                    <BiEdit/>
                                </button>
                                <button className="project__card-delete flex-container" onClick={() => item.id && handelDelete(item.id)} title="Delete Project">
                                    <BiTrash/>
                                </button>
                        </div>
                        </div>
                    </div>
                
                ))
                }
            </div>
            {
                isFormOpen && (
                    <div className="modal__overlay">
                        <div className="modal__content">
                            <h3 className="modal__title">{editingId ? 'Edit Project' : 'Create New Project'}</h3>
                            <form className="modal__form" onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label>Title</label>
                                    <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Write the name of your project"
                                    required
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Description</label>
                                    <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write a description of your project"
                                    rows={5}
                                    required
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Link</label>
                                    <input 
                                    type="text" 
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    placeholder="Write the link of your project"
                                    required
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Technologies</label>
                                    <input 
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="Write the technologies used in your project"
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
                                    <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                    <button type="submit" className="btn-submit">
                                        {editingId ? 'Update' : 'Publish'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )  

                
            }
        </section>
    )
}