import { useState } from "react";
import axios, {AxiosError} from 'axios';

//Generic custom hook to handel standart API operations
export const useCrud = <T,>( baseUrl:string ) => {

    //State to store fetched data, loading status and potential errors
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');


    //Read: Fetch all records from a specific endpoint
    const getAll = async (endpoint: string) => {
        setLoading(true);
        setError(null);

        try {

            const response = await axios.get(`${baseUrl}${endpoint}`);
            setData(response.data);
            return response.data;

        } catch (err) {
        
            const axiosError = err as AxiosError<{message?: string}>
            setError(axiosError.response?.data.message || 'Something went wrong');

        } finally {{
            
            setLoading(false);
            
            }
        }

    }

    // Send new data to the server and update local state
    const create = async (endpoint: string, payload: Partial<T>) => {
    
        setLoading(true);
        setError(null);
        try {
            
            const response = await axios.post(`${baseUrl}${endpoint}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } );
            const newData = response.data;

            //Optimiscally update the UI by adding the new data to the existing data
            setData([...data, newData]);

            return newData;

        } catch (err : any) {
            
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred while creating');
            if (err.response && err.response.status === 401) {
                alert("Your sesion has expired, please login again.");
                localStorage.removeItem('token'); 
                window.location.href = '/login'; 
            }
            
            console.error('Error deleting data', err);
            throw err;

        } finally {

            setLoading(false);
            
        }
    }

    // Modify an existing record on the server and update local state
    const update = async (endpoint: string, id:string | number, payload: Partial<T>) => {
        setLoading(true);
        setError(null);
        try {
            
            const isFormData = payload instanceof FormData;

            const method = isFormData ? 'post' : 'put';

            const response = await axios[method](`${baseUrl}${endpoint}/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const updatedData = response.data;
       
            setData((prevData) => prevData.map((item:any) => (item.id === id ? updatedData : item)));
       
            return updatedData;

        } catch (err : any) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred while updating');
            if (err.response && err.response.status === 401) {
                alert("Your sesion has expired, please login again.");
                localStorage.removeItem('token'); 
                window.location.href = '/login'; 
            }
            
            console.error('Error updating data', err);
            throw err;

        } finally {

            setLoading(false);

            };
    };

    // Remove a record from the server and update local state
    const destroy = async (endpoint: string, id: string | number) => {
        setLoading(true);
        setError(null);

        try {
            
            await axios.delete(`${baseUrl}${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData((prevData) => prevData.filter((item:any) => item.id !== id));

        } catch (err: any) { 
            
        
            if (err.response && err.response.status === 401) {
                alert("Your sesion has expired, please login again.");
                localStorage.removeItem('token'); 
                window.location.href = '/login'; 
            }
            
            console.error('Error deleting data', err);
            throw err;
        } finally {

            setLoading(false);
            
        }
    };

    return {
        data,
        loading,
        error,
        getAll,
        create,
        update,
        destroy,
    }
    
};