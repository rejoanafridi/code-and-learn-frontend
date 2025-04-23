import { getCurrentLang } from './utils'

const API_BASE_URL = 'https://learn-and-code-backend-or1n.vercel.app/api/'

const currentLang = `?language=${getCurrentLang()}`

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const getProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const getTutorials = async (token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const response = await fetch(`${API_BASE_URL}/tutorials${currentLang}`, {
        headers
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const getTutorial = async (id) => {
    const response = await fetch(
        `${API_BASE_URL}/tutorials/${id}${currentLang}`
    )
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const markTutorialComplete = async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const socialLogin = async (clerkToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/social-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: clerkToken })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const createTutorial = async (tutorialData, token) => {
    const response = await fetch(`${API_BASE_URL}/tutorials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tutorialData)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const bulkUploadTutorials = async (tutorials, token) => {
    const response = await fetch(`${API_BASE_URL}/tutorials/bulk`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tutorials })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}
