import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Dashboard = () => {
  const [stock, setStock] = useState([]);
  const [sales, setSales] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const stockSnap = await getDocs(collection(db, "stock"));
      const stockData = stockSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const salesSnap = await getDocs(collection(db, "sales"));
      const salesData = salesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setStock(stockData);
      setSales(salesData);

      generateMonthlyReport(salesData);
    };

    fetchData();
  }, []);

  const generateMonthlyReport = (salesData) => {
    const laporan = {};

    salesData.forEach((sale) => {
      const tanggal = sale.tanggalJual?.toDate();
      const bulan = format(tanggal, "yyyy-MM");

      const pemasukan = sale.hargaJual * sale.jumlahJual;
      const hpp = sale.totalHPP;
      const laba = pemasukan - hpp;

      if (!laporan[bulan]) {
        laporan[bulan] = { pemasukan: 0, hpp: 0, laba: 0 };
      }

      laporan[bulan].pemasukan += pemasukan;
      laporan[bulan].hpp += hpp;
      laporan[bulan].laba += laba;
    });

    setMonthlyReport(laporan);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        <Link to={"/formBarang"}><button>Tambah Barang</button></Link>
        <Link to={"/formStock"}><button>Tambah Stock</button></Link>
        <Link to={"/penjualan"}><button>Jual Barang</button></Link>
      </div>

      <h2 className="text-lg font-bold mb-2">📦 Daftar Pembelian (Stock)</h2>
      {stock.map((item) => (
        <div key={item.id} className="mb-2 p-2 border">
          <p><strong>Barang:</strong> {item.namaBarang}</p>
          <p><strong>Jumlah:</strong> {item.jumlah}</p>
          <p><strong>Harga Beli:</strong> Rp {item.hargaBeli}</p>
          <p><strong>Tanggal:</strong> {item.tanggalMasuk?.toDate().toLocaleDateString()}</p>
          <p><strong>Batch ID:</strong> {item.batchId}</p>
        </div>
      ))}

      <h2 className="text-lg font-bold mt-6 mb-2">💸 Daftar Penjualan</h2>
      {sales.map((item) => (
        <div key={item.id} className="mb-2 p-2 border">
          <p><strong>Barang:</strong> {item.namaBarang}</p>
          <p><strong>Jumlah Terjual:</strong> {item.jumlahJual}</p>
          <p><strong>Harga Jual:</strong> Rp {item.hargaJual}</p>
          <p><strong>Total HPP:</strong> Rp {item.totalHPP}</p>
          <p><strong>Tanggal:</strong> {item.tanggalJual?.toDate().toLocaleDateString()}</p>
        </div>
      ))}

      <h2 className="text-lg font-bold mt-6 mb-2">📊 Laporan Laba Bulanan</h2>
      {Object.entries(monthlyReport).map(([bulan, data]) => (
        <div key={bulan} className="mb-2 p-2 border bg-gray-100">
          <p><strong>Bulan:</strong> {bulan}</p>
          <p><strong>Pemasukan:</strong> Rp {data.pemasukan.toLocaleString()}</p>
          <p><strong>HPP:</strong> Rp {data.hpp.toLocaleString()}</p>
          <p><strong>Laba:</strong> Rp {data.laba.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
