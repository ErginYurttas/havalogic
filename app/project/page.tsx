import React, { Suspense } from "react";
import ProjectClient from "./ProjectClient";

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading project...</div>}>
      <ProjectClient />
    </Suspense>
  );
}
