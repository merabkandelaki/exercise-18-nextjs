import Home from "@/ui/Home";
import AuthContextProvider from "@/context/AuthContext";

export default function HomePage() {
  return (
    <div>
      <AuthContextProvider>
        <Home />
      </AuthContextProvider>
    </div>
  );
}
