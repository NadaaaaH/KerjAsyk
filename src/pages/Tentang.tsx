import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneTentang from "@/components/scenes/SceneTentang";

const Tentang = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <SceneTentang />
      </div>
      <Footer />
    </main>
  );
};

export default Tentang;