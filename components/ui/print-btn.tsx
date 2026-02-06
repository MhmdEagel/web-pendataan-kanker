"use client";

import { Button } from "./button";

export default function PrintBtn() {
  return (
    <Button
      onClick={() => window.print()}
      className="mx-auto block print:hidden"
    >
      Download Data
    </Button>
  );
}
