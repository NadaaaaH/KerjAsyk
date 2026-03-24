import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneCaraKerja from "@/components/scenes/SceneCaraKerja";
import CustomCursor from "@/components/CustomCursor";

const CaraKerja = () => {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <div className="pt-20">
        <SceneCaraKerja />
      </div>
      <Footer />
    </main>
  );
};

export default CaraKerja;