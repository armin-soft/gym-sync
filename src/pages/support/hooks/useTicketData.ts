
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
      if (e.key === 'studentSupportTickets' || e.key === 'studentSupportMessages') {
        console.log('Storage changed, reloading tickets...');
        loadTickets();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for direct localStorage changes
    const interval = setInterval(() => {
      loadTickets();
    }, 2000); // Check every 2 seconds for new data
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadTickets = () => {
    try {
      console.log('Loading tickets from localStorage...');
      
      // Load tickets from student support system
      const studentTickets = getLocalStorageItem<any[]>('studentSupportTickets', []);
      console.log('Found student tickets:', studentTickets);
      
      // Load messages and convert them to tickets for display
      const studentMessages = getLocalStorageItem<any[]>('studentSupportMessages', []);
      console.log('Found student messages:', studentMessages);
      
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

      // Also create tickets from chat messages for better visibility
      const messageTickets: SupportTicket[] = studentMessages
        .filter(msg => msg.sender === 'student')
        .map(message => ({
          id: `msg_${message.id}`,
          ticketNumber: `MSG-${message.id.slice(-6).toUpperCase()}`,
          studentId: message.studentId || 0,
          studentName: message.senderName,
          subject: `پیام چت: ${message.message.substring(0, 30)}...`,
          description: message.message,
          category: 'other' as any,
          priority: 'medium' as any,
          status: 'open' as any,
          createdAt: message.timestamp,
          updatedAt: message.timestamp,
          responses: []
        }));

      const allTickets = [...convertedTickets, ...messageTickets];
      console.log('All converted tickets:', allTickets);
      
      setTickets(allTickets);
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
      
      // Separate real tickets from message tickets
      const realTickets = updatedTickets.filter(ticket => !ticket.id.startsWith('msg_'));
      const messageTickets = updatedTickets.filter(ticket => ticket.id.startsWith('msg_'));
      
      // Convert back to student format and save real tickets
      const studentTickets = realTickets.map(ticket => ({
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
      
      // Update message status if needed
      if (messageTickets.length > 0) {
        const messages = getLocalStorageItem<any[]>('studentSupportMessages', []);
        const updatedMessages = messages.map(msg => {
          const messageTicket = messageTickets.find(t => t.id === `msg_${msg.id}`);
          if (messageTicket && messageTicket.status !== 'open') {
            return { ...msg, isRead: true };
          }
          return msg;
        });
        setLocalStorageItem('studentSupportMessages', updatedMessages);
      }
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
    
    // Send notification to student
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
    saveTickets,
    refreshTickets: loadTickets
  };
};
