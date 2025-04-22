import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/clerk-react';
import { useAuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

// Google icon
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
        <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
        <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
        <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
        <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
    </svg>
);

// Facebook icon
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mr-2">
        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const ClerkAuthButton = () => {
    const { t } = useTranslation()

    const { handleSocialLogin } = useAuthContext();
    const { isSignedIn, getToken } = useAuth();
    const { signIn, isLoaded } = useSignIn();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    // Check for successful sign-in and call backend API
    React.useEffect(() => {
        if (isSignedIn) {
            const completeAuth = async () => {
                setProcessing(true);
                setError(null);

                try {
                    console.log("User signed in with social provider, getting token");
                    const token = await getToken();
                    console.log("Sending token to backend API");

                    // Call the social login API with the Clerk token
                    const result = await handleSocialLogin(token);

                    if (result && result.token) {
                        console.log("Social login successful");
                    }
                } catch (error) {
                    console.error("Error during social auth:", error);
                }
            };

            completeAuth();
        }
    }, [isSignedIn]);

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: window.location.href,
                redirectUrlComplete: window.location.href
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };



    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center cursor-pointer bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow hover:bg-gray-50 transition-colors"
                disabled={!isLoaded}
            >
                <GoogleIcon />
                {t('auth.signinWithGoogle')}
            </button>



            {isSignedIn && processing && (
                <div className="text-center text-sm text-gray-500 mt-2">
                    Authenticating with server...
                </div>
            )}

            <div className="text-center text-xs text-gray-500 mt-4">
                Note: Make sure your server has the correct Clerk Secret Key configured.
            </div>
        </div>
    );
};

export default ClerkAuthButton;