import { useState, useEffect } from 'react'
import {
    getProfile,
    loginUser as loginApi,
    registerUser as registerApi
} from '../lib/api'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
            // You might want to fetch user data here if needed
        }
    }, [])
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const userData = await getProfile(token)
                    setUser(userData)
                } catch (err) {
                    setError(err.message)
                    localStorage.removeItem('token')
                    setToken(null)
                }
            }
            setLoading(false)
        }

        loadUser()
    }, [token])

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

    const updateUser = (updatedUser) => {
        setUser(updatedUser)
    }

    return {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!token
    }
}
