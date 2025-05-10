"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Por favor, instala MetaMask para conectar tu wallet");
      }
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };

  return (
    <html lang="es">
      <head>
        <title>My Next.js Dark Mode App</title>
        <meta
          name="description"
          content="Un sitio con modo oscuro en Next.js y TypeScript"
        />
      </head>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="border-b border-gray-300 dark:border-gray-700 px-[70px] py-4 flex items-center">
          <h1 className="text-xl font-bold">Mi Sitio</h1>
          {/* Contenedor que agrupa la navegación y el botón Connect Wallet */}
          <div className="ml-auto flex items-center gap-4">
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
            {/* Botón Connect Wallet */}
            <button
              onClick={connectWallet}
              className="py-1 px-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {account ? account : "Connect Wallet"}
            </button>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-grow px-[70px] py-4">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-gray-300 dark:border-gray-700 px-[70px] py-4 flex justify-between items-center">
          <div></div>
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} - Todos los derechos reservados
          </p>
          <button
            onClick={toggleDarkMode}
            className="py-1 px-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? (
              // Ícono de Sol (cuando está en modo oscuro, para cambiar a claro)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            ) : (
              // Ícono de Luna (cuando está en modo claro, para cambiar a oscuro)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 116.707 2.707a8.001 8.001 0 0010.586 10.586z" />
              </svg>
            )}
          </button>
        </footer>
      </body>
    </html>
  );
}
