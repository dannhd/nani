import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spider Date — Una pregunta del barrio",
  description:
    "Una experiencia interactiva pixel-art inspirada en Spider-Man y Nueva York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
