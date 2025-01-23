import { Outlet } from "react-router"
import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
function App() {
  

  return (
    <>
    <AuthProvider>

    < Navbar/>
<main className="min-h-screen">
  <Outlet/>
</main>
 <Footer/>
    </AuthProvider>
    </>
  )
}
export default App
