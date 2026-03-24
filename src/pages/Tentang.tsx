import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneTentang from "@/components/scenes/SceneTentang";
import CustomCursor from "@/components/CustomCursor";

const Tentang = () => {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <div className="pt-20">
        <SceneTentang />
      </div>
      <Footer />
    </main>
  );
};

export default Tentang;