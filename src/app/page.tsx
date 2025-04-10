import Footer from "components/Footer"
import Header from "components/Header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Sample App!</h2>
        <p className="text-slate-300">
          This is the home page. You can (soon) login, register, or learn more about us.
        </p>
      </main>

      <Footer />
    </div>
  );
}
