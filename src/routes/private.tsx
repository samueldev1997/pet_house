import { ReactNode, useState, useEffect } from "react"
import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps) {
    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user){
                try {
                    setSigned(true)
                } catch (error) {
                    console.error('Error storing user data:', error);
                }
            } else {
                setSigned(false)
            }
            setLoading(false)
        })
        return () => {
            unSub()
        }
    }, [])
    if (loading) {
        return <div>teste...</div>
    }
    if (!signed) {
        return <Navigate to='/login' />
    }
    console.log('Rendering children')
    return <>{children}</>
}


