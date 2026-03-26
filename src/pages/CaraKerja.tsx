import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneCaraKerja from "@/components/scenes/SceneCaraKerja";

const CaraKerja = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <SceneCaraKerja />
      </div>
      <Footer />
    </main>
  );
};

export default CaraKerja;