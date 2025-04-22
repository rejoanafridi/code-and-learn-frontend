import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

export function TutorialSection({ tutorial }) {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

    // When i18n language changes, update selected language
    useEffect(() => {
        setSelectedLanguage(i18n.language);
    }, [i18n.language]);

    // Get available languages from tutorial translations
    const availableLanguages = tutorial?.translations
        ? Object.keys(tutorial.translations)
        : ['en'];

    // Get content in selected language or fallback to default
    const getTranslatedContent = () => {
        if (!tutorial) return null;

        // If selected language exists in translations
        if (tutorial.translations && tutorial.translations[selectedLanguage]) {
            return {
                title: tutorial.translations[selectedLanguage].title || tutorial.title,
                content: tutorial.translations[selectedLanguage].content || tutorial.content
            };
        }

        // Fallback to original content
        return {
            title: tutorial.title,
            content: tutorial.content
        };
    };

    const translatedContent = getTranslatedContent();

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        // Optionally change the global i18n language
        i18n.changeLanguage(newLang);
    };

    return (
        <Card className="h-full">
            <CardContent className="p-6">
                {tutorial ? (
                    <div className="prose max-w-none">
                        {availableLanguages.length > 1 && (
                            <div className="mb-4 flex justify-end">
                                <select
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {availableLanguages.map(lang => (
                                        <option key={lang} value={lang}>
                                            {lang === 'en' ? 'English' : lang === 'ar' ? 'Arabic' : lang === 'bn' ? 'Bengali' : lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <h1 className="text-2xl font-bold mb-4">{translatedContent.title}</h1>
                        <ReactMarkdown>{translatedContent.content}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a tutorial to start learning
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 