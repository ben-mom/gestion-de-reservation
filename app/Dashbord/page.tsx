"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [events, setEvents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const perPage = 5;

  // ---------------------
  // 🔥 Charger les events
  // ---------------------
  const loadEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3333/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
      showToast("Erreur lors du chargement");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // ------------------------
  //  Toast messages
  // ------------------------
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  
  // Ajouter et Modifier Event
  
  const saveEvent = async (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const data = {
      name: form.get("name"),
      lieux: form.get("lieux"),
      categorie: form.get("categorie"),
      date: form.get("date"),
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:3333/events/${editId}`, data);
        showToast("Événement modifié !");
        setEditId(null);
      } else {
        await axios.post("http://localhost:3333/events", data);
        showToast("Événement ajouté !");
      }

      e.target.reset();
      loadEvents();
    } catch (err: any) {
      console.log(err.response?.data);
      showToast("Erreur : " + (err.response?.data?.message || "inconnue"));
    }
  };


  const deleteEvent = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/events/${id}`);
      showToast("Événement supprimé !");
      loadEvents();
    } catch (err) {
      showToast("Erreur suppression");
    }
  };

  
  const editEvent = (ev: any) => {
    const form: any = document.querySelector("form");
    form.name.value = ev.name;
    form.lieux.value = ev.lieux;
    form.categorie.value = ev.categorie;
    form.date.value = ev.date;
    setEditId(ev.id);
    showToast("Mode édition activé");
  };

 
  const pages = Math.ceil(events.length / perPage);
  const paginated = events.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {toast && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}

      <aside className="w-64 bg-blue-500 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold">MyRezApp</h1>
        <nav className="space-y-2 text-sm">
          <p className="font-bold">Événements</p>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-bold">Gestion des événements</h2>
        </header>

        {/* FORMULAIRE */}
        <form onSubmit={saveEvent} className="flex gap-2 flex-wrap mb-4">

          <input name="name" required placeholder="Nom de l'événement" className="border p-2 rounded" />
          <input name="lieux" required placeholder="saisissez-Lieux" className="border p-2 rounded" />
          <input name="categorie" required placeholder="saisissez-Catégorie" className="border p-2 rounded" />
          <input name="date" required placeholder="saisissez votre date" className="border p-2 rounded" />

          <button type="submit" className="bg-blue-500 text-white px-4 rounded">
            {editId ? "Modifier" : "Ajouter"}
          </button>
        </form>

        {/* TABLE */}
        <div className="bg-white  text-black rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th>Nom</th>
                <th>Lieux</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map(ev => (
                <tr key={ev.id}>
                  <td>{ev.name}</td>
                  <td>{ev.lieux}</td>
                  <td>{ev.categorie}</td>
                  <td>{ev.jour}</td>

                  <td className="flex gap-2">
                    <button onClick={() => editEvent(ev)} className="text-blue-500">Modifier</button>
                    <button onClick={() => deleteEvent(ev.id)} className="text-red-500">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >{i + 1}</button>
          ))}
        </div>
      </main>
    </div>
  );
}
