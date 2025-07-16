import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useCollection = (collatcionName) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, collatcionName), (qauerySnapshot) => {
            const data = []
            qauerySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            })
            setData(data)
        })
        return () => unsubscribe()
    }, [])
    return { data }
}