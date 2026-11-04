import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "TypeNova — Type with purpose", description: "Build typing confidence with focused practice, clear feedback and measurable progress." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
