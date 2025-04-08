import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export function Header({ user, onLogout }) {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'bn' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-primary">Code & Learn</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={toggleLanguage}
                            className="text-sm"
                        >
                            {i18n.language === 'en' ? 'বাংলা' : 'English'}
                        </Button>
                        <span className="text-sm text-gray-600 hidden md:block">
                            {user?.name || user?.email}
                        </span>
                        <Button
                            variant="ghost"
                            onClick={onLogout}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            {t('logout')}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
} 