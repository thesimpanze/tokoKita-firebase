import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

const FormPembelian = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    namaBarang: "",
    jumlah: "",
    hargaBeli: "",
    tanggalMasuk: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "items"));
      setItems(snapshot.docs.map((doc) => doc.data().namaBarang));
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "stock"), {
      ...form,
      jumlah: parseInt(form.jumlah),
      hargaBeli: parseInt(form.hargaBeli),
      tanggalMasuk: Timestamp.fromDate(new Date(form.tanggalMasuk)),
      batchId: Date.now().toString(),
    });
    console.log("berhasil menyimpan barang")
    setForm({
      namaBarang: "",
      jumlah: "",
      hargaBeli: "",
      tanggalMasuk: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className=" border-black/10 border-1 flex flex-col px-5 py-5 gap-2 shadow-xl rounded-lg ">
      <h1 className="font-bold text-3xl">Tambah Stock Barang</h1>
      <div className="flex flex-col mt-1">

      <span className="" >Pilih Barang</span >
      <select name="namaBarang"  className="px-2 py-2 outline-2 rounded-lg" value={form.namaBarang} onChange={handleChange} required>
        <option value="">Pilih Barang</option>
        {items.map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
        </div>
      <div className="flex flex-col mt-1">

      <span>Jumlah Beli</span>
      <input type="number" name="jumlah" className="px-2 py-2 outline-2 rounded-lg" placeholder="Jumlah" value={form.jumlah} onChange={handleChange} required />
      </div>
      <div className="flex flex-col mt-1">
        <span>Harga Beli</span>
      <input type="number" name="hargaBeli"  className="px-2 py-2 outline-2 rounded-lg" placeholder="Harga Beli" value={form.hargaBeli} onChange={handleChange} required />
      </div>
      <div className="flex flex-col mt-1">

      <span>Tanggal Beli</span>
      <input type="date" name="tanggalMasuk"  className="px-2 py-2 outline-2 rounded-lg" value={form.tanggalMasuk} onChange={handleChange} required />
      </div>
      <div className="flex justify-center items-center mt-2 font-semibold">

      <button type="submit" className="bg-black text-white px-3 py-1">Simpan Pembelian</button>
      </div>
    </form>
  );
};

export default FormPembelian;
