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
    alert("Pembelian berhasil disimpan!");
    setForm({
      namaBarang: "",
      jumlah: "",
      hargaBeli: "",
      tanggalMasuk: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="namaBarang" value={form.namaBarang} onChange={handleChange} required>
        <option value="">-- Pilih Barang --</option>
        {items.map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
      <input type="number" name="jumlah" placeholder="Jumlah" value={form.jumlah} onChange={handleChange} required />
      <input type="number" name="hargaBeli" placeholder="Harga Beli" value={form.hargaBeli} onChange={handleChange} required />
      <input type="date" name="tanggalMasuk" value={form.tanggalMasuk} onChange={handleChange} required />
      <button type="submit">Simpan Pembelian</button>
    </form>
  );
};

export default FormPembelian;
