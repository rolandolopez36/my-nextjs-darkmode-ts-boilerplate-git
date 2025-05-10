"use client";
import { useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    console.log("Intentando conectar la wallet...");
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Cuentas recibidas:", accounts);
        setAccount(accounts[0]);
      } else {
        alert("Por favor, instala MetaMask para conectar tu wallet");
      }
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      {account ? (
        <p>Cuenta conectada: {account}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Conectar Wallet
        </button>
      )}
    </div>
  );
}
