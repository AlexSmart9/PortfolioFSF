import { useState } from "react";
import {AxiosError} from 'axios';
import api from '../api/axiosConfig';

//Generic custom hook to handle standart API operations
export const useCrud = <T,>( ) => {

    //State to store fetched data, loading status and potential errors
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    //Read: Fetch all records from a specific endpoint
    const getAll = async (endpoint: string) => {
        setLoading(true);
        setError(null);

        try {

            const response = await api.get(endpoint);
            setData(response.data);
            return response.data;

        } catch (err) {
        
            const axiosError = err as AxiosError<{message?: string}>
            setError(axiosError.response?.data.message || 'Something went wrong');

        } finally {
            
            setLoading(false);
                        
        }

    }

    // Send new data to the server and update local state
    const create = async (endpoint: string, payload: Partial<T>) => {
    
        setLoading(true);
        setError(null);
        try {
            
            const response = await api.post(endpoint, payload);
            const newData = response.data;

            //Optimiscally update the UI by adding the new data to the existing data
            setData([...data, newData]);

            return newData;

        } catch (err : any) {
            
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred while creating');
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

            const response = await api[method](`${endpoint}/${id}`, payload);
            
            const updatedData = response.data;
       
            setData((prevData) => prevData.map((item:any) => (item.id === id ? updatedData : item)));
       
            return updatedData;

        } catch (err : any) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred while updating');
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
            
            await api.delete(`${endpoint}/${id}`);
            setData((prevData) => prevData.filter((item:any) => item.id !== id));

        } catch (err: any) { 
            
        
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || axiosError.message || 'Error deleting');
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