import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const FormPembuatan = ()=>{
    const [value, setValue] = useState({
        namaPemasok:"",
        namaBarang: "",
        jumlah: "",
        hargaBeli: "",
        tanggalMasuk: ""
    })
    const handleChange = (e) =>{
        const {name, value}= e.target;
        setValue((prev)=>({
            ...prev,
            [name]: value,

        }))

    }
    const handelSubmit = async (e) =>{
        e.preventDefault()
        const dateObj = new Date(value.tanggalMasuk);
        try{
            await addDoc(collection(db, "stock"),{
                namaPemasok: value.namaPemasok,
                namaBarang: value.namaBarang,
                jumlah: parseInt(value.jumlah),
                hargaBeli: parseInt(value.hargaBeli),
                tanggalMasuk: Timestamp.fromDate(dateObj),
                batchId: Date.now().toString()
            })
            setValue({
                namaBarang: "",
                jumlah: "",
                hargaBeli: "",
                tanggalMasuk: ""
            })

        }
        catch(err){
            console.log('error', err)
        }
    }
    
    return(
        <form onSubmit={handelSubmit} className="text-black flex flex-col gap-2 outline-gray-700 outline-1 rounded-lg px-8 py-5">
            <h1 className="text-center font-bold text-2xl">Input Stock Baru</h1>
            <div className="flex flex-col gap-0.5">

            <span className="font-semibold text-lg">Nama Pemasok</span>
            <input type="text" name="namaPemasok" className="rounded-lg outline-1 px-2 py-1.5" placeholder="Nama Supplier" value={value.namaPemasok}  onChange={handleChange}  />
            </div>
            <div className="flex flex-col gap-0.5">

            <span className="font-semibold text-lg">Nama Barang</span>
            <input type="text" name="namaBarang" className="rounded-lg outline-1 px-2 py-1.5" placeholder="Nama Barang" value={value.namaBarang}  onChange={handleChange}  />
            </div>
            <div className="flex flex-col gap-0.5">

            <span className="font-semibold text-lg">Jumlah</span>
            <input type="number" name="jumlah" className="rounded-lg outline-1 px-2 py-1.5" placeholder="Jumlah" value={value.jumlah} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-0.5">

            <span className="font-semibold text-lg">Harga Beli</span>
            <input type="number" name="hargaBeli" className="rounded-lg outline-1 px-2 py-1.5" placeholder="Harga Beli" value={value.hargaBeli} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-0.5">

            <span className="font-semibold text-lg">Tanggal Masuk Stok</span>
            <input type="date" name="tanggalMasuk" className="rounded-lg outline-1 px-2 py-1.5" id="" value={value.tanggalMasuk} onChange={handleChange} />
            </div>
            <div className="mt-3 flex justify-center items-center">

            <button type="submit" className="bg-black text-white px-8 text-lg ">Buat</button>
            </div>
        </form>
    )
}
export default FormPembuatan