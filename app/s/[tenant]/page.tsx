import { db } from "@/lib/db";
import React from "react";

const verifyTenant = (tenant: string) => {
  return db.products.some((product) => product.tenantId === tenant);
};

async function Page({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  if (!verifyTenant(tenant)) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-lg font-semibold">404 Not Found</h1>
      </div>
    );
  }
  const products = db.products.filter((product) => product.tenantId === tenant);
  return (
    <>
      <nav className="w-full h-12 border-b border-zinc-800 flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">
          {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
        </h1>
      </nav>
      <div className="w-full max-w-5xl p-4 mx-auto space-y-4">
        <h1 className="text-lg font-semibold">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-zinc-800 p-4">
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
