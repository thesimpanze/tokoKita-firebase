import { Link, Navigate, useNavigate } from "react-router-dom"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"

const Dashboard = () =>{
    const [stock, setStock] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "stock"))
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setStock(data)
    }
    fetchData()
  }, [])
    return(
        <>
        <div className="">

        <Link to={"/form"}> 
            <button >Tambah stok</button>
        </Link>
        </div>
        {stock.map((item)=>(
            <div className="" key={item.id}>
                <span>{item.id}</span>
                <p>{item.namaPemasok}</p>
                <h1>{item.namaBarang}</h1>
                <span>{item.jumlah}</span>
                <span>{item.harga}</span>
               
            </div>
        ))}
        </>
    )
}
export default Dashboard