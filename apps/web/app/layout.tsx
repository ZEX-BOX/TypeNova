import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "TypeNova — Read more. Type better.",
 description: "A calm book-first reading and typing space. Explore classic books, practise paragraphs, and build lasting typing fluency.",
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
