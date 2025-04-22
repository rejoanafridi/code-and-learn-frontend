import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAuthContext } from '../context/AuthContext';

const ClerkAuthPage = ({ mode = 'signin' }) => {
    const { isLogin } = useAuthContext();
    const displayMode = isLogin === null ? mode : isLogin ? 'signin' : 'signup';

    return (
        <div className="clerk-auth-container">
            {displayMode === 'signin' ? (
                <SignIn
                    path="/sign-in"
                    routing="path"
                    signUpUrl="/sign-up"
                    redirectUrl="/"
                    appearance={{
                        elements: {
                            rootBox: {
                                width: '100%',
                                maxWidth: '500px',
                                margin: '0 auto',
                            },
                        },
                    }}
                />
            ) : (
                <SignUp
                    path="/sign-up"
                    routing="path"
                    signInUrl="/sign-in"
                    redirectUrl="/"
                    appearance={{
                        elements: {
                            rootBox: {
                                width: '100%',
                                maxWidth: '500px',
                                margin: '0 auto',
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default ClerkAuthPage; 