import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneSalary from "@/components/scenes/SceneSalary";

const CekGaji = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <SceneSalary />
      </div>
      <Footer />
    </main>
  );
};

export default CekGaji;
