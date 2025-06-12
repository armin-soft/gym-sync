
import { useState, useEffect } from "react";
import { SupportTicket, TicketStats } from "../types";
import { useStudents } from "@/hooks/useStudents";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";

export const useTicketData = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const { students } = useStudents();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    try {
      const savedTickets = getLocalStorageItem<SupportTicket[]>('supportTickets', []);
      setTickets(savedTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const saveTickets = (updatedTickets: SupportTicket[]) => {
    setTickets(updatedTickets);
    setLocalStorageItem('supportTickets', updatedTickets);
  };

  const updateTicketStatus = (ticketId: string, newStatus: SupportTicket['status']) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: Date.now() }
        : ticket
    );
    saveTickets(updatedTickets);
  };

  const addTicketResponse = (ticketId: string, response: Omit<SupportTicket['responses'][0], 'id'>) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId 
        ? {
            ...ticket,
            responses: [...ticket.responses, { ...response, id: `resp_${Date.now()}` }],
            updatedAt: Date.now(),
            status: response.authorType === "trainer" ? "in_progress" : ticket.status
          }
        : ticket
    );
    saveTickets(updatedTickets);
  };

  const getTicketStats = (): TicketStats => {
    const today = new Date().setHours(0, 0, 0, 0);
    
    return {
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === "open").length,
      inProgressTickets: tickets.filter(t => t.status === "in_progress").length,
      resolvedTickets: tickets.filter(t => t.status === "resolved").length,
      closedTickets: tickets.filter(t => t.status === "closed").length,
      todayTickets: tickets.filter(t => new Date(t.createdAt).setHours(0, 0, 0, 0) === today).length,
      averageResponseTime: calculateAverageResponseTime()
    };
  };

  const calculateAverageResponseTime = (): number => {
    const respondedTickets = tickets.filter(t => t.responses.length > 0);
    if (respondedTickets.length === 0) return 0;
    
    const totalTime = respondedTickets.reduce((acc, ticket) => {
      const firstResponse = ticket.responses.find(r => r.authorType === "trainer");
      if (firstResponse) {
        return acc + (firstResponse.timestamp - ticket.createdAt);
      }
      return acc;
    }, 0);
    
    return Math.round(totalTime / respondedTickets.length / (1000 * 60 * 60)); // Hours
  };

  const getStudentInfo = (studentId: number) => {
    return students.find(s => s.id === studentId);
  };

  return {
    tickets,
    loading,
    updateTicketStatus,
    addTicketResponse,
    getTicketStats,
    getStudentInfo,
    saveTickets
  };
};
