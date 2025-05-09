import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale);

const LaporanPage = () => {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const fetchLaporan = async () => {
      const snap = await getDocs(collection(db, "sales"));
      const raw = snap.docs.map(doc => doc.data());

      // Group by bulan
      const bulanMap = {};

      raw.forEach(sale => {
        const tanggal = sale.tanggalJual.toDate();
        const bulanKey = `${tanggal.getFullYear()}-${tanggal.getMonth() + 1}`;
        const pendapatan = sale.hargaJual * sale.jumlahJual;
        const hpp = sale.totalHPP;

        if (!bulanMap[bulanKey]) {
          bulanMap[bulanKey] = { pendapatan: 0, hpp: 0 };
        }

        bulanMap[bulanKey].pendapatan += pendapatan;
        bulanMap[bulanKey].hpp += hpp;
      });

      const result = Object.entries(bulanMap).map(([bulan, data]) => ({
        bulan,
        pendapatan: data.pendapatan,
        hpp: data.hpp,
        laba: data.pendapatan - data.hpp,
      }));

      setLaporan(result);
    };
    fetchLaporan();
  }, []);

  const dataChart = {
    labels: laporan.map((r) => r.bulan),
    datasets: [
      {
        label: "Laba Bulanan",
        data: laporan.map((r) => r.laba),
        backgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Laporan Laba Bulanan</h2>

      <Bar data={dataChart} />

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th>Bulan</th><th>Pendapatan</th><th>HPP</th><th>Laba</th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((r, i) => (
            <tr key={i}>
              <td>{r.bulan}</td>
              <td>{r.pendapatan}</td>
              <td>{r.hpp}</td>
              <td>{r.laba}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanPage;
