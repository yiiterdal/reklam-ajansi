import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <Header />
      {children}
      <Footer />
    </MotionProvider>
  );
}
