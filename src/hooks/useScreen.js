import { useEffect, useState } from 'react'

const getScreenSize = (width) => {
    if (width < 640) return 'small' // < 640px
    if (width < 1024) return 'medium' // 640px - 1023px
    return 'large' // ≥ 1024px
}

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(() =>
        getScreenSize(window.innerWidth)
    )

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(getScreenSize(window.innerWidth))
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return screenSize
}
