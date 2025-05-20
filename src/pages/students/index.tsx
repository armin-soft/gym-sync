
import React, { Suspense } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { Spinner } from "@/components/ui/spinner";
const StudentsPage = React.lazy(() => import("./components/StudentsPage"));

export default function StudentsPageWrapper() {
  return (
    <PageContainer withBackground fullHeight className="w-full">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }>
        <StudentsPage />
      </Suspense>
    </PageContainer>
  );
}
