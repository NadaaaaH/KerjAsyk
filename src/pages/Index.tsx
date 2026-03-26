import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer.tsx";
import SceneIntro from "@/components/scenes/SceneIntro";
import SceneScam from "@/components/scenes/SceneScam";
import SceneFalling from "@/components/scenes/SceneFalling";
import SceneAdvice from "@/components/scenes/SceneAdvice";
import SceneDashboard from "@/components/scenes/SceneDashboard";
import SceneScanLoker from "@/components/scenes/SceneScanLoker";
import SceneImageDetect from "@/components/scenes/SceneImageDetect";
import SceneSalary from "@/components/scenes/SceneSalary";
import SceneTrust from "@/components/scenes/SceneTrust";
import SceneFinalCTA from "@/components/scenes/SceneFinalCTA";

const Index = () => {
  return (
    <main className="relative">
      <Navbar />
      <SceneIntro />
      <SceneScam />
      <SceneFalling />
      <SceneAdvice />
      <SceneDashboard />
      <SceneScanLoker />
      <SceneImageDetect />
      <SceneSalary />
      <SceneTrust />
      <SceneFinalCTA />
      <Footer />
    </main>
  );
};

export default Index;