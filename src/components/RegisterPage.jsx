import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ClerkAuthButton from './ClearkAuthButton';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
    const { register, loading, error, token } = useAuthContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register({
                email,
                password,
                name
            });
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    // If already logged in, redirect to home
    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h2>{ }</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">{t('auth.name')}</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">{t('auth.email')}</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">{t('auth.password')}</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading ? `${t('auth.processing')}` : t('auth.login')}

                    </button>
                </form>

                <div className="auth-toggle">
                    <Link to="/login" className="auth-toggle-button">
                        {t('auth.haveAccount')}
                    </Link>
                </div>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <ClerkAuthButton />
            </div>
        </div>
    );
};

export default RegisterPage; 