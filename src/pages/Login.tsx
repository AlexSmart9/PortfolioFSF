import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/login.css'
import { useAuth } from "../context/AuthContext";

export const Login = () => {

    const navigate = useNavigate();

    const {login} = useAuth();

    // Capture what user writes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const API_BASE_URL = 'https://portfoliofs-production.up.railway.app/api';

    const executeLogin = async (credentials: any) => {
        setError('');
        setLoading(true);

        try {
            
            const response = await axios.post(`${API_BASE_URL}/login`, credentials);
            const token = response.data.token;

            login(token);

            navigate('/admin');


        } catch (err:any) {
            console.error('Request Error', err);

            if(err.response) {
                setError(err.response.data.error || 'Invalid credentials');
            } else {
                setError('Server connection Error');
            }
        } finally {
            setLoading(false);
        }
    }

    // Function to login as an admin
    const handleSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault();

        if(!email || !password) {
            setError('Please complete all field 🕵️‍♂️');
            return;
        }
        await executeLogin({email, password});
    };

    // Function to login as a guest
    const handleGuestLogin = async () => {
        
        await executeLogin({ 
            email: 'guest@guest.com', 
            password: 'guest1234' 
        });
    };

    return (
        <div className="login__container flex-container">
            <form onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Sign In</h2>
                {error && <p className="error__message" style={{color: 'red'}}>{error}</p>}
            
                <div className="form__group flex-container">
                    <label className="form__group-label" htmlFor="email">Email</label>
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
                    <label className="form__group-label" htmlFor="password">Password</label>
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
                    {loading ? 'Connecting' : 'Get In'}    
                </button>
                </div>
            </form>
            <div className="guest__container flex-container">
                <h2>Are you a recruiter?</h2>
                <button 
                    type="button" 
                    className="guest__button" 
                    onClick={handleGuestLogin}
                    disabled={loading}
                >
                    {loading ? 'Connecting...' : 'Access as Guest'}
                </button>
            </div>           
        </div>
    );
    

};