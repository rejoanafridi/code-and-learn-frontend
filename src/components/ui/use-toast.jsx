import { createContext, useContext, useState } from 'react'
import { cn } from '../../lib/utils'

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = (toast) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prev) => [...prev, { ...toast, id }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts?.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            'flex items-center p-4 rounded-md shadow-lg',
                            toast.variant === 'destructive'
                                ? 'bg-destructive text-destructive-foreground'
                                : 'bg-primary text-primary-foreground'
                        )}
                    >
                        <div className="flex-1">
                            <p className="font-medium">{toast.title}</p>
                            {toast.description && (
                                <p className="text-sm opacity-90">
                                    {toast.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
