import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const FormPenjualan = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    namaBarang: "",
    jumlahJual: "",
    hargaJual: "",
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
    const qtyToSell = parseInt(form.jumlahJual);
    const q = query(
      collection(db, "stock"),
      where("namaBarang", "==", form.namaBarang)
    );
    const snapshot = await getDocs(q);
    const stock = snapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => a.tanggalMasuk.toDate() - b.tanggalMasuk.toDate());

    let totalStok = stock.reduce((sum, s) => sum + s.jumlah, 0);
    if (totalStok < qtyToSell) return alert("Stok tidak cukup!");

    let sisa = qtyToSell;
    let totalHPP = 0;
    let detailHPP = [];
    const batch = writeBatch(db);

    for (const s of stock) {
      if (sisa === 0) break;
      const digunakan = Math.min(sisa, s.jumlah);
      sisa -= digunakan;

      batch.update(doc(db, "stock", s.id), { jumlah: s.jumlah - digunakan });
      totalHPP += digunakan * s.hargaBeli;
      detailHPP.push({ batchId: s.batchId, jumlah: digunakan, hargaBeli: s.hargaBeli });
    }

    await batch.commit();

    await addDoc(collection(db, "sales"), {
      namaBarang: form.namaBarang,
      jumlahJual: qtyToSell,
      hargaJual: parseInt(form.hargaJual),
      tanggalJual: Timestamp.now(),
      totalHPP,
      detailHPP,
    });

    alert("Penjualan berhasil!");
    setForm({ namaBarang: "", jumlahJual: "", hargaJual: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="namaBarang" value={form.namaBarang} onChange={handleChange} required>
        <option value="">-- Pilih Barang --</option>
        {items.map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
      <input type="number" name="jumlahJual" placeholder="Jumlah Terjual" value={form.jumlahJual} onChange={handleChange} required />
      <input type="number" name="hargaJual" placeholder="Harga Jual" value={form.hargaJual} onChange={handleChange} required />
      <button type="submit">Jual</button>
    </form>
  );
};

export default FormPenjualan;
