
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
    
    // Listen for new tickets from students
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'studentSupportTickets') {
        loadTickets();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadTickets = () => {
    try {
      // Load tickets from student support system
      const studentTickets = getLocalStorageItem<any[]>('studentSupportTickets', []);
      
      // Convert student ticket format to management ticket format
      const convertedTickets: SupportTicket[] = studentTickets.map(studentTicket => ({
        id: studentTicket.id,
        ticketNumber: `TK-${studentTicket.id.slice(-6).toUpperCase()}`,
        studentId: studentTicket.studentId,
        studentName: studentTicket.studentName,
        subject: studentTicket.subject,
        description: studentTicket.description,
        category: studentTicket.category as any,
        priority: studentTicket.priority,
        status: studentTicket.status,
        createdAt: studentTicket.createdAt,
        updatedAt: studentTicket.lastUpdate || studentTicket.createdAt,
        responses: []
      }));
      
      setTickets(convertedTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const saveTickets = (updatedTickets: SupportTicket[]) => {
    if (Array.isArray(updatedTickets)) {
      setTickets(updatedTickets);
      
      // Convert back to student format and save
      const studentTickets = updatedTickets.map(ticket => ({
        id: ticket.id,
        subject: ticket.subject,
        category: ticket.category,
        status: ticket.status,
        priority: ticket.priority,
        createdAt: ticket.createdAt,
        lastUpdate: ticket.updatedAt,
        description: ticket.description,
        responses: ticket.responses.length,
        studentId: ticket.studentId,
        studentName: ticket.studentName
      }));
      
      setLocalStorageItem('studentSupportTickets', studentTickets);
    }
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
            responses: [...(ticket.responses || []), { ...response, id: `resp_${Date.now()}` }],
            updatedAt: Date.now(),
            status: response.authorType === "trainer" ? "in_progress" : ticket.status
          }
        : ticket
    );
    saveTickets(updatedTickets);
    
    // Send notification to student (optional)
    if (response.authorType === "trainer") {
      sendResponseNotificationToStudent(ticketId, response.message);
    }
  };

  const sendResponseNotificationToStudent = (ticketId: string, message: string) => {
    // Save notification for student
    const notifications = getLocalStorageItem<any[]>('studentNotifications', []);
    const newNotification = {
      id: Date.now().toString(),
      type: 'trainer_response',
      title: 'پاسخ جدید از مربی',
      description: `مربی به تیکت شما پاسخ داده است: ${message.substring(0, 50)}...`,
      timestamp: Date.now(),
      isRead: false,
      ticketId: ticketId
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setLocalStorageItem('studentNotifications', updatedNotifications);
    
    // Trigger storage event for real-time updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'studentNotifications',
      newValue: JSON.stringify(updatedNotifications)
    }));
  };

  const getTicketStats = (): TicketStats => {
    const today = new Date().setHours(0, 0, 0, 0);
    const safeTickets = Array.isArray(tickets) ? tickets : [];
    
    return {
      totalTickets: safeTickets.length,
      openTickets: safeTickets.filter(t => t?.status === "open").length,
      inProgressTickets: safeTickets.filter(t => t?.status === "in_progress").length,
      resolvedTickets: safeTickets.filter(t => t?.status === "resolved").length,
      closedTickets: safeTickets.filter(t => t?.status === "closed").length,
      todayTickets: safeTickets.filter(t => t?.createdAt && new Date(t.createdAt).setHours(0, 0, 0, 0) === today).length,
      averageResponseTime: calculateAverageResponseTime()
    };
  };

  const calculateAverageResponseTime = (): number => {
    const safeTickets = Array.isArray(tickets) ? tickets : [];
    const respondedTickets = safeTickets.filter(t => t?.responses && Array.isArray(t.responses) && t.responses.length > 0);
    
    if (respondedTickets.length === 0) return 0;
    
    const totalTime = respondedTickets.reduce((acc, ticket) => {
      const firstResponse = ticket.responses?.find(r => r?.authorType === "trainer");
      if (firstResponse && firstResponse.timestamp && ticket.createdAt) {
        return acc + (firstResponse.timestamp - ticket.createdAt);
      }
      return acc;
    }, 0);
    
    return Math.round(totalTime / respondedTickets.length / (1000 * 60 * 60)); // Hours
  };

  const getStudentInfo = (studentId: number) => {
    return Array.isArray(students) ? students.find(s => s?.id === studentId) : undefined;
  };

  return {
    tickets: Array.isArray(tickets) ? tickets : [],
    loading,
    updateTicketStatus,
    addTicketResponse,
    getTicketStats,
    getStudentInfo,
    saveTickets
  };
};
