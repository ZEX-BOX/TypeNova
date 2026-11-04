import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "TypeNova — Your typing training arc",
 description: "An anime-inspired typing academy. Build accuracy, speed, and confidence one session at a time.",
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }