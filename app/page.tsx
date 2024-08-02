"use client";
import { Suspense } from "react";
import ClientComponent from "./ClientComponent";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-items-center justify-between p-24">
        <Suspense fallback={<p>Loading...</p>}>
          <ClientComponent />
        </Suspense>
      </main>
    </div>
  );
}
