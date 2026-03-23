import { useCrud } from "../hooks/useCrud"
import { useState, useEffect } from "react"
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi"
import type {ChangeEvent} from 'react';

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

    //Open form to create a new project
    const handleOpenCreate = () => {
        setFormData({title: '', description: '', image_url: null, link: '', technologies: ''});
        setEditingId(null);
        setIsFormOpen(true);

    }
    

    return (
        <section>
            <h2 className="admin-subtitle">Projects</h2>
            <button onClick={handleOpenCreate} title="Create Project" className="btn__admin-create flex-container"><BiPlus/> <span>New Project</span></button>
        </section>
    )
}