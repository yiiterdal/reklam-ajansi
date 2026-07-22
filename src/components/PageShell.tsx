import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import PageTransition from "@/components/PageTransition";
import CursorGlow from "@/components/CursorGlow";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <CursorGlow />
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </MotionProvider>
  );
}
