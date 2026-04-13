import { BiEdit, BiTrash } from "react-icons/bi";
import { type Post } from "./Posts";
import styles from "./PostsCard.module.css";

export interface PostsCardProps {
    post: Post;
    onEdit: () => void;
    onDelete: () => void;
}

export const PostsCard = ({ post, onEdit, onDelete }: PostsCardProps) => {
    return (
        <div className={styles.card}>
            <header className={`${styles.header} flex-container`}>
                <h3>{post.title}</h3>
                <div className={`${styles.actions} flex-container`}>
                    <button className={styles.editBtn} onClick={onEdit} title="Edit Post">
                        <BiEdit size={30}/>
                    </button>
                    <button className={styles.deleteBtn} onClick={onDelete} title="Delete Post">
                        <BiTrash size={30}/>
                    </button>
                </div>
            </header>
            <div className={styles.content}>
                <p>{post.content}</p>
                {post.image_url && (
                    <img className={styles.image} src={post.image_url} alt={post.title} />
                )}
            </div>
        </div>
    );
};