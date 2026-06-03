"use client";

import { useEffect } from "react";
import { ErrorLayout } from "@/components/error/ErrorLayout";
import { AmbientMedia } from "@/components/error/AmbientMedia";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorLayout
      code="500"
      eyebrow="Internal Server Error"
      title="Something cracked in the foundation."
      body="A beam came loose on our end. Try again, or head back home while we patch the plaster."
      media={<AmbientMedia src="/images/misc/cta-plaster.webp" />}
      primaryCta={{ label: "Try again", onClick: reset }}
      secondaryCta={{ label: "Back to home", href: "/" }}
    />
  );
}
