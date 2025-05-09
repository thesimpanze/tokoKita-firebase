import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const FormPembuatan = () => {
  const [namaBarang, setNamaBarang] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(namaBarang !== ''){

      await addDoc(collection(db, "items"), {
        namaBarang,
      });
    }
      setNamaBarang("");
    alert("Barang berhasil ditambahkan!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <span className=" font-bold text-3xl">Tambah Barang Baru</span>
      <input className="px-3 py-1.5 rounded-md border-black border-2"
        type="text"
        placeholder="Nama Barang"
        value={namaBarang}
        onChange={(e) => setNamaBarang(e.target.value)}
        required
      />
      <button type="submit" className="bg-black text-white py-1.5">Tambah Barang</button>
    </form>
  );
};

export default FormPembuatan;
