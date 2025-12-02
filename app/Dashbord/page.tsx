"use client";

import { useState } from "react";

export default function Dashboard() {
  const [reservations, setReservations] = useState([
    { id: 734813, client: "Marie. ", date: "2018-02-27", total: "10.00", status: "Confirmée", paiement: "Payé" },
    { id: 750000, client: "Eliser", date: "2018-02-27", total: "108.00", status: "Confirmée", paiement: "Payé" },
    { id: 768034, client: "Cantona", date: "2018-02-27", total: "47.00", status: "Annulée", paiement: "Annulé" },
  ]);

  const [filters, setFilters] = useState({ client: "", status: "", date: "" });
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = reservations.filter((r) =>
    (filters.client === "" || r.client.toLowerCase().includes(filters.client.toLowerCase())) &&
    (filters.status === "" || r.status === filters.status) &&
    (filters.date === "" || r.date === filters.date)
  );

  const pages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const addReservation = (e:any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newRes = {
      id: Math.floor(Math.random() * 1000000),
      client: form.get('client'),
      date: form.get('date'),
      total: form.get('total'),
      status: form.get('status'),
      paiement: form.get('paiement')
    };
    setReservations([ ...reservations]);
    e.target.reset();
  };

  const exportCSV = () => {
    const header = Object.keys(reservations[0]).join(",");
    const rows = reservations.map(r => Object.values(r).join(","));
    const csv = [header, ...rows].join("");
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reservations.csv';
    link.click();
  };

  // const exportPDF = async () => {
  //   const { jsPDF } = await import('jspdf');
  //   const doc = new jsPDF();
  //   let y = 10;
  //   filtered.forEach(r => {
  //     doc.text(`${r.id} | ${r.client} | ${r.date} | ${r.total}€ | ${r.status} | ${r.paiement}`, 10, y);
  //     y += 10;
  //   });
  //   doc.save('reservations.pdf');
  // };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-blue-500 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold">MyRezApp</h1>
        <nav className="space-y-2 text-sm">
          <p>Calendrier</p>
          <p className="font-bold">Réservations</p>
          <button>Clients</button>
          <button>Services</button>
              <button>Paiements </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Mes réservations d'evenement </h2>
          
        </header>

        <form onSubmit={addReservation} className="flex gap-2 mb-4">
          <input name="client" required placeholder="Client" className="border p-2 rounded" />
          <input name="date" type="date" className="border p-2 rounded" />
          <input name="total" placeholder="Total" className="border p-2 rounded" />
          <select name="status" className="border p-2 rounded">
            <option>Confirmée</option>
            <option>Annulée</option>
          </select>
          <select name="paiement" className="border p-2 rounded">
            <option>Payé</option>
            <option>À payer</option>
          </select>
          <button className="bg-blue-500 text-white px-4 rounded">Ajouter</button>
        </form>

        <div className="flex gap-2 mb-4">
          <input placeholder="Client" className="border p-2" onChange={e => setFilters({ ...filters, client: e.target.value })} />
          <input type="date" className="border p-2" onChange={e => setFilters({ ...filters, date: e.target.value })} />
          <select className="border p-2" onChange={e => setFilters({ ...filters, status: e.target.value })}>
            <option value="">Tous</option>
            <option value="Confirmée">Confirmée</option>
            <option value="Annulée">Annulée</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th>Ref</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Paiement</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(r => (
                <tr key={r.id} className="border-b">
                  <td>{r.id}</td>
                  <td>{r.client}</td>
                  <td>{r.date}</td>
                  <td>{r.total}€</td>
                  <td>{r.status}</td>
                  <td>{r.paiement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
