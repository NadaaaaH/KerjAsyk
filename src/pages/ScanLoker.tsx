import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneScanLoker from "@/components/scenes/SceneScanLoker";
import SceneImageDetect from "@/components/scenes/SceneImageDetect";

const ScanLoker = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-20">
        <SceneScanLoker />
        <SceneImageDetect />
      </div>
      <Footer />
    </main>
  );
};

export default ScanLoker;
