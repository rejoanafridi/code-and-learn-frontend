const API_BASE_URL = 'http://localhost:5000/api'

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
    const response = await fetch(`${API_BASE_URL}/tutorials`, { headers })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const getTutorial = async (id) => {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`)
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
