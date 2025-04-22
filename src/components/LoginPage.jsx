import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import ClerkAuthButton from './ClearkAuthButton';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const { login, loading, error, token } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { t } = useTranslation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    // If already logged in, redirect to home
    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h2>{t('auth.login')}</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">{t('auth.email')}</label>
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
                    <Link to="/register" className="auth-toggle-button">
                        {t('auth.needAccount')}
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

export default LoginPage; 