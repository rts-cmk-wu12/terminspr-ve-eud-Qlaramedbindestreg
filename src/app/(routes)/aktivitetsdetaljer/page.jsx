import { Suspense } from "react";
// Kilde: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
import AktivitetsDetaljerClient from "./aktivitetsdetaljer-client";

export const metadata = {
  title: "Aktivitetsdetaljer",
};

export default function AktivitetsDetaljer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AktivitetsDetaljerClient />
    </Suspense>
  );
}