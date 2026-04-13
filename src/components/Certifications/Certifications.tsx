import { useEffect, useState } from 'react';
import styles from './Certifications.module.css';
import { useCrud} from '../../hooks/useCrud';
import { AdminButton } from '../common/AdminButton/AdminButton';
import { Modal } from '../common/Modal/Modal';
import { CertificationsForm, type CertificationFormData } from './CertificactionsForm';
import { CertificationsCard } from './CertificationsCard';

export interface Certification {
    id: string | number;
    title: string;
    issuing_entity: string;
    date_acquisition: string;
    image_url?: string;
};


export const Certifications = () => {

    const [data, setData] = useState<Certification[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api/';

    const endpoint = 'certifications';

    // Initialize CRUD Hook

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
            setData(response || []);
            console.log(response)
        } catch (error) {
             console.error('Error fetching certifications:', error);
        };
    };

    useEffect(() => {
        getData();
    }, []);

    const handleOpenCreate = () => {
        setSelectedCertification(null);
        setModalIsOpen(true);
    };

    const handleOpenEdit = (certification: Certification) => {
        setSelectedCertification(certification);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCertification(null);
        setModalIsOpen(false);
    };

    const handleSubmit = async ( formData: CertificationFormData) => {

        try {
            
            const dataToSend = new FormData();

            dataToSend.append('title', formData.title);
            dataToSend.append('issuing_entity', formData.issuing_entity);
            dataToSend.append('date_acquisition', formData.date_acquisition);

            if (formData.image) {
                dataToSend.append('image', formData.image)
            }

            if (selectedCertification && selectedCertification.id) {
                await update(endpoint, selectedCertification.id, dataToSend);
            } else {
                await create(endpoint, dataToSend);
            }

            await getData();
            handleCloseModal();


        } catch (error) {
            console.error('Error saving certification:', error);
        }

    }
    
    const handleDelete = async (id: string | number) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            
            await destroy(endpoint, id);
            setData(prevData => prevData.filter(item => item.id !== id));
        }
    };

    return (
        <section className={`${styles.section}`}>
            <header className={`${styles.header} flex-container`}>
                <h2>Certifications</h2>
                <AdminButton
                    tooltipText="Add new Certification"
                    onClick={handleOpenCreate}
                />
            </header>
            <div className={`${styles.container} grid-container`}>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        data.map((certification) => (
                            <CertificationsCard
                                key={certification.id}
                                certification={certification}
                                onEdit={() => handleOpenEdit(certification)}
                                onDelete={() => handleDelete(certification.id)}
                            />
                        ))
                    )
                }
            </div>
            <Modal
                isOpen={modalIsOpen}
                onClose={handleCloseModal}
                title={selectedCertification ? 'Update Certification' : 'New Certification'}
            >
                <CertificationsForm
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    initialData={selectedCertification || undefined}
                />
            </Modal>
        </section>
    )
}