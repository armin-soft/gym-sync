
import React, { useState, useMemo } from "react";
import { SupportHeader } from "./components/SupportHeader";
import { TicketStats } from "./components/TicketStats";
import { TicketFilters } from "./components/TicketFilters";
import { TicketCard } from "./components/TicketCard";
import { EmptyState } from "./components/EmptyState";
import { TicketFilter, TicketSort } from "./types";
import { useTicketData } from "./hooks/useTicketData";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [filter, setFilter] = useState<TicketFilter>("all");
  const [sortBy, setSortBy] = useState<TicketSort>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const deviceInfo = useDeviceInfo();
  
  const { 
    tickets, 
    loading, 
    updateTicketStatus, 
    addTicketResponse, 
    getTicketStats,
    getStudentInfo 
  } = useTicketData();

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesFilter = filter === "all" || ticket.status === filter;
      const matchesSearch = searchQuery === "" || 
        ticket.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });

    // مرتب‌سازی
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "status":
          const statusOrder = { open: 4, in_progress: 3, resolved: 2, closed: 1 };
          return statusOrder[b.status] - statusOrder[a.status];
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return filtered;
  }, [tickets, filter, searchQuery, sortBy]);

  const handleAddResponse = (ticketId: string, message: string) => {
    addTicketResponse(ticketId, {
      ticketId,
      authorType: "trainer",
      authorName: "مربی",
      message,
      timestamp: Date.now()
    });
  };

  const getContainerClasses = () => {
    if (deviceInfo.isMobile) return "p-2 space-y-3";
    if (deviceInfo.isTablet) return "p-4 space-y-4";
    return "p-6 space-y-6";
  };

  const getTicketListSpacing = () => {
    if (deviceInfo.isMobile) return "space-y-3";
    if (deviceInfo.isTablet) return "space-y-4";
    return "space-y-4";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری تیکت‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40" dir="rtl">
      <div className={cn("w-full", getContainerClasses())}>
        <SupportHeader />
        <TicketStats stats={getTicketStats()} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TicketFilters 
              filter={filter}
              onFilterChange={setFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              tickets={tickets}
            />
          </div>
          
          <div className="lg:col-span-3">
            {filteredAndSortedTickets.length > 0 ? (
              <div className={cn("w-full", getTicketListSpacing())}>
                {filteredAndSortedTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onStatusChange={updateTicketStatus}
                    onAddResponse={handleAddResponse}
                    studentInfo={getStudentInfo(ticket.studentId)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState filter={filter} searchQuery={searchQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
