import { useState, useEffect} from "react";
import { useCrud } from "../../hooks/useCrud";
import style from './Posts.module.css';
import { AdminButton } from "../common/AdminButton/AdminButton";
import { Modal } from "../common/Modal/Modal";
import { PostsForm, type PostsFormData } from "./PostsForm";
import { PostsCard } from "./PostsCard";
import { ConfirmDialog } from "../common/Modal/ConfirmDialog";
import { Loader } from "../common/Loader/Loader";

// Define the structure of a post.

export interface Post {
    id: string | number;
    title: string;
    content: string;
    image_url?: string;
}

export const Posts = () => {
    
    const [data, setData] = useState<Post[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [deleteId, setDeleteId] = useState<any | null>(null);


    const endpoint = 'posts'

    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api/';

    // Initialize CRUD hook

    const {
        loading,
        getAll,
        create,
        update,
        destroy,
    } = useCrud(API_BASE_URL);

    const getData = async () => {
        try {
            const response = await getAll(endpoint);
            setData(response || [])
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {   
        getData()
    }, []);


    // Open form to create a new post
    const handleOpenCreate = () => {
        setSelectedPost(null);
        setModalIsOpen(true);
    };

    //Open form to edit an existing post
    const handleOpenEdit = (post: Post) => {
        setSelectedPost(post);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        setModalIsOpen(false);
    };


    const handleSubmit = async (formData : PostsFormData) => {

        try {
            const dataToSend = new FormData();

            dataToSend.append('title', formData.title);
            dataToSend.append('content', formData.content);

            if (formData.image) {
                dataToSend.append('image', formData.image)
            }

            if (selectedPost && selectedPost.id) {
                
                dataToSend.append('_method', 'PUT');
                await update(endpoint, selectedPost.id, dataToSend);
                
            } else {
                await create(endpoint, dataToSend);
            }

            await getData();
            handleCloseModal();


        } catch (error) {
            console.error('Error saving post:', error)
        }

    }

    // Handle DELETE operation
    const handleDelete =  (id : string | number) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            try {
                await destroy(endpoint, deleteId)
                setData(prev => prev.filter(item => item.id !== deleteId))
                setDeleteId(null);
            } catch (error) {
                
            }
        }
    }

    return (
    <>
            <section className={style.section}>
                <header className={`${style.header} flex-container`}>
                    <h2>Blog</h2>
                </header>
            <div className={`${style.container} flex-container`}>
                {
                    loading ? (
                        <Loader/>
                    ) : (
                        data.map((post) => (
                            <PostsCard
                                key={post.id}
                                post={post}
                                onEdit={() => handleOpenEdit(post)}
                                onDelete={() => handleDelete(post.id)}
                            />
                        )
                        )
                    )
                }
            </div>
            
            <Modal
                isOpen={modalIsOpen}
                onClose={handleCloseModal}
                title={selectedPost ? 'Update Post' : 'New Post'}

            >
                <PostsForm
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    initialData={selectedPost || undefined}
                />
            </Modal>
            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
            />
        </section>
        <AdminButton
            tooltipText="Add new Post"
            onClick={handleOpenCreate}
        />
    </>
    )

}
