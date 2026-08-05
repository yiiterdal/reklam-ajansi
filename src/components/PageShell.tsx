"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import PageTransition from "@/components/PageTransition";
import CursorGlow from "@/components/CursorGlow";
import { usePathname } from "next/navigation";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");

  return (
    <MotionProvider>
      {!isAbout ? <CursorGlow /> : null}
      <PageTransition>{children}</PageTransition>
      <Header />
      {!isAbout ? <Footer /> : null}
    </MotionProvider>
  );
}
