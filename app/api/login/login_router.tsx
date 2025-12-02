import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";


// Base de données FAKE (pour test)
const users = [
  { email: "test@gmail.com", password: "1234" },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: "Email ou mot de passe incorrect" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Connexion réussie",
    user: { email: user.email },
  });
}
