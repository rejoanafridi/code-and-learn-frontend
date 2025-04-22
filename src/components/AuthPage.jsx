import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import './AuthStyles.css';
import ClerkAuthButton from './ClearkAuthButton';
import { useTranslation } from 'react-i18next';

const AuthPage = () => {
    const { login, register, loading, error, isLogin, setIsLogin } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { t } = useTranslation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register({
                    email,
                    password,
                    name
                });
            }
        } catch (err) {
            console.error('Authentication error:', err);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <h2>{isLogin ? t('auth.login') : t('auth.register')}</h2>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">{t('auth.name')}</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                    )}

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
                        {loading ? t('auth.processing') : isLogin ? t('auth.login') : t('auth.register')}
                    </button>
                </form>

                <div className="auth-toggle">
                    <button onClick={toggleAuthMode} className="auth-toggle-button">
                        {isLogin ? t('auth.needAccount') : t('auth.haveAccount')}
                    </button>
                </div>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <ClerkAuthButton />
            </div>
        </div>
    );
};

export default AuthPage; 