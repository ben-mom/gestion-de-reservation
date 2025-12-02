"use client";
import { useState } from "react";
// import style from '@/app/component/Registre/'

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Exemple d'appel API (à personnaliser)
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur inconnue");

      setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
                 <h1 className="text-2xl font-bold text-center">Créer un compte</h1>

                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                 {success && <p className="text-green-600 text-sm text-center">{success}</p>}
         
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
         
                 <div className="space-y-1">
                   <label className="text-sm font-medium">Confirmer le mot de passe</label>
                   <input
                     type="password"
                     className="w-full p-2 border rounded-xl"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                   />
                 </div>
         
                 <button
                   type="submit"
                   className="w-full p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                 >
                   S'inscrire
                 </button>
                  <p className="text-blue-500"> <a href="/component/Login">Se connecter</a></p>
               </form>
             </div>
          </div>
               
     </div>
    
  );
}
