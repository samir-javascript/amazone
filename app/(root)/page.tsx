import Header from "@/components/shared/Header";
import Image from "next/image";
import { LocateIcon } from "lucide-react";
import Hero from "@/components/shared/Hero";
import ProductGrid from "@/components/shared/ProductGrid";

export default async function Home() {
 
  return (
      <div>
     
       <Hero />
        <ProductGrid />
      <main className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Page Content Area</h1>
        <p className="text-gray-600 mt-2">The header component is displayed above.</p>
      </main>
    </div>
  );
}
