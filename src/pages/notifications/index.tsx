
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { NotificationPanel } from "@/components/notifications/components/NotificationPanel";

const NotificationsPage = () => {
  return (
    <PageContainer withBackground fullWidth fullHeight className="min-h-screen">
      <div className="py-8">
        <NotificationPanel />
      </div>
    </PageContainer>
  );
};

export default NotificationsPage;
