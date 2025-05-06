import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"


const FormPenjualan = () => {
    const [value, setValue] = useState({
        namaBarang: "",
    })
    const [stock, setStock] = useState([])
    useEffect(()=>{
        const fetchData = async (e)=>{
            const getData = await getDocs(collection(db, 'stock'))
            const data = getData.docs.map(doc=> ({id: doc.id, ...doc.data()}))
            setStock(data)
        }
        fetchData()
    },[])

    return (
        <>
            <input type="text" />
            {stock.map((item)=>(
                <div className="" key={item.id}>
                    {item.namaBarang}
                </div>
            ))}
        </>
    )

}
export default FormPenjualan