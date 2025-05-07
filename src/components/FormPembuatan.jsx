import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const FormPembuatan = () => {
  const [namaBarang, setNamaBarang] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "items"), {
      namaBarang,
    });
    setNamaBarang("");
    alert("Barang berhasil ditambahkan!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nama Barang"
        value={namaBarang}
        onChange={(e) => setNamaBarang(e.target.value)}
        required
      />
      <button type="submit">Tambah Barang</button>
    </form>
  );
};

export default FormPembuatan;
