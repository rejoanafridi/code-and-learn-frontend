import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser as loginApi, registerUser as registerApi, socialLogin as socialLoginApi } from '../lib/api'
import { useUser } from '@clerk/clerk-react'

const AuthContext = createContext('authContext')

export function AuthProvider({ children }) {
    const { isSignedIn, isLoaded: clerkLoaded } = useUser()
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isLogin, setIsLogin] = useState(true) // Default to login page

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)

            // User data will be fetched when needed or can be stored in localStorage too
        }

        // Only set loading to false after Clerk has loaded
        if (clerkLoaded) {
            setLoading(false)
        }
    }, [clerkLoaded])

    // Handle Clerk auth state changes
    useEffect(() => {
        if (clerkLoaded && !isSignedIn && token) {
            if (!isSignedIn && !token) {

                logout()
            }
        }
    }, [isSignedIn, clerkLoaded])

    const handleSocialLogin = async (clerkToken) => {
        try {
            setLoading(true)
            setError(null)
            console.log("Sending token to social-login API:", clerkToken.substring(0, 10) + "...");
            const data = await socialLoginApi(clerkToken)
            console.log("Received response from social-login API");
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUser(data.user)
            return data
        } catch (err) {
            console.error("Social login error:", err);
            setError(err.message || "Failed to authenticate with social provider")
            throw err
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            setLoading(true)
            setError(null)
            const data = await loginApi(email, password)
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUser(data.user)
            return data
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const register = async (userData) => {
        try {
            setLoading(true)
            setError(null)
            const data = await registerApi(userData)
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUser(data.user)
            return data
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                login,
                register,
                logout,
                handleSocialLogin,
                setIsLogin,
                isLogin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
