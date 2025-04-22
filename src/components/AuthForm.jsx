import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import ClerkAuthButton from './ClearkAuthButton';

export function AuthForm() {
    const { login, register, isLogin, setIsLogin, loading } = useAuthContext()
    const { t } = useTranslation();
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (isLogin) {
                await login(data.email, data.password);
                toast.success(t('auth.loginSuccess'));
            } else {
                await register(data);
                toast.success(t('auth.signupSuccess'));
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        reset()

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full md:max-w-1/4">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input
                                {...formRegister('email', {
                                    required: t('auth.emailRequired'),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: t('auth.invalidEmail'),
                                    },
                                })}
                                type="email"
                                placeholder={t('auth.email')}
                                className="w-full"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <Input
                                {...formRegister('password', {
                                    required: t('auth.passwordRequired'),
                                    minLength: {
                                        value: 6,
                                        message: t('auth.passwordMinLength'),
                                    },
                                })}
                                type="password"
                                placeholder={t('auth.password')}
                                className="w-full"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        {!isLogin && (
                            <div>
                                <Input
                                    {...formRegister('name', {
                                        required: t('auth.nameRequired'),
                                    })}
                                    type="text"
                                    placeholder={t('auth.name')}
                                    className="w-full"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? t('common.loading') : isLogin ? t('auth.login') : t('auth.signup')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        variant="link"
                        onClick={toggleMode}
                        className="text-sm"
                    >
                        {isLogin ? t('auth.needAccount') : t('auth.haveAccount')}
                    </Button>
                </CardFooter>
                <div className="m-6">

                    <ClerkAuthButton />
                </div>
            </Card>
        </div>
    );
}