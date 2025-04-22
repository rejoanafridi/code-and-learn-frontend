import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentLang } from '../lib/utils';

import { ArrowRightLeft } from "lucide-react"
export function Header({ user, onLogout, toggleSidebar, isOpen }) {
    const { i18n } = useTranslation();
    const { isSignedIn } = useUser()
    const location = useLocation();
    const isAdmin = user && user.role === 'admin';
    const [language, setLanguage] = useState('English')
    const handleLanguageChange = (newLang) => {
        i18n.changeLanguage(newLang);
        localStorage.setItem("language", newLang);
        window.location.reload()
    };

    // Language options
    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' },
        { value: 'bn', label: 'Bengali' }
    ];

    const currentLang = getCurrentLang()
    useEffect(() => {
        if (currentLang) {
            setLanguage(currentLang)
        }

    }, [currentLang])

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">

                    <div className="flex items-center space-x-2">
                        {!isOpen && (

                            <button onClick={toggleSidebar} className="md:hidden ">
                                <ArrowRightLeft className='cursor-pointer' />
                            </button>
                        )}
                        <Link to="/" className="text-2xl font-bold text-primary">
                            Code & Learn
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/'
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Tutorials
                        </Link>

                        {isAdmin && (
                            <Link
                                to="/upload"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/upload'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Upload Tutorials
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Select
                            value={language}

                            onValueChange={handleLanguageChange}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languageOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <span className="text-sm text-gray-600 hidden md:block">
                            {user?.name || user?.email}
                        </span>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        {!isSignedIn && (

                            <button
                                onClick={onLogout}
                                className="text-sm cursor-pointer text-gray-600 hover:text-gray-900"
                            >
                                Logout
                            </button>
                        )}


                    </div>
                </div>
            </div>
        </header>
    );
} 