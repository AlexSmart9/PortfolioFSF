import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/login.css'

export const Login = () => {

    const navigate = useNavigate();

    // Capture what user writes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    

    // Function to handle inputs
    const handleSubmit = async (e:React.SubmitEvent) => {
        const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api';
        e.preventDefault();
        setError('');

        if (!email || !password) {
            
            setError('Por favor, completa todos los campos 🕵️‍♂️');
            return;

        }
        
        setLoading(true);

        try{
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email:email,
                password:password
            });

            const token = response.data.token;

            localStorage.setItem('token', token);

            navigate('/admin')
        } catch (err:any) {
            console.error('Request Error', err);

            if(err.response) {
                setError(err.response.data.error || 'Invalid credentials');
            } else {
                setError('Server conncection Error');
            }
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="login__container flex-container">
            <form onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Iniciar Sesion</h2>
                {error && <p className="error__message" style={{color: 'red'}}>{error}</p>}
            
                <div className="form__group flex-container">
                    <label className="form__group-label" htmlFor="email">Correo Electronico</label>
                    <input className="form__group-input" 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Write Your Email"
                    autoComplete="email"
                    />
                </div>

                <div className="form__group flex-container">
                    <label className="form__group-label" htmlFor="password">Contraseña</label>
                    <input className="form__group-input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                    />
                </div>
            
                <div className="form__buttons-container flex-container">
                <button className="form__button" type="submit">
                    {loading ? 'Connecting to Railway...' : 'Ingresar'}    
                </button>
                </div>
            </form>
        </div>
    );
    

};