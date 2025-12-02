"use client";

import { useState } from "react";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async ( e: any ) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
       const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur inconnue");

      alert("Connexion réussie !");
    } catch (err) {
      setError(e.message);
    }
  };

  return (
<div className=" bg-blue-500 ">
  
               
  
   <div className="fixed flex gap-[20vh] pt-[30vh] pl-[20vh]">
       <h1 className="text-white font-bold text-[30px]">Bienvenu pour une meilleur  réservation d’événements</h1>
        <div className="min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Connexion</h1>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            className="w-full p-2 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Se connecter
        </button>

        <p className="text-blue-500"> <a href="/component/Signup">Inscription</a></p>
      </form>
    </div>
  </div>

           
</div>
   
  );
}
