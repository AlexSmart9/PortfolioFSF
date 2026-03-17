import { useState } from "react";
import axios from "axios";

export const Login = () => {

    // Capture what user writes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    

    // Function to handle inputs
    const handleSubmit = async (e:React.SubmitEvent) => {
        const url = '';
        e.preventDefault();
        setError('');

        if (!email || !password) {
            
            setError('Por favor, completa todos los campos 🕵️‍♂️');
            return;

        }
        
        setLoading(true);

        try{
            const response = await axios.post('https://portfoliofs-production.up.railway.app/api/login', {
                email:email,
                password:password
            });
            
            console.log('Server response', response.data);

            const token = response.data.token;

            localStorage.setItem('token', token);

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
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesion</h2>
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
            
                <div className="form-group">
                    <label htmlFor="email">Correo Electronico</label>
                    <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Write Your Email"
                    autoComplete="email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                    />
                </div>
            
                <button type="submit">{loading ? 'Connecting to Railway...' : 'Ingresar'}</button>
            </form>
        </div>
    );
    

};