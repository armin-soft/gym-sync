
import { useState, useMemo, useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const useStudentFiltering = (students: Student[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "weight" | "height" | "progress">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const deviceInfo = useDeviceInfo();

  const toggleSort = useCallback((field: "name" | "weight" | "height" | "progress") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }, [sortField, sortOrder]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Filter and sort students with optimizations for mobile
  const sortedAndFilteredStudents = useMemo(() => {
    let filtered = [...students];

    // Filter by search query
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(normalizedQuery) ||
          student.phone.toLowerCase().includes(normalizedQuery) ||
          (student.payment && student.payment.toLowerCase().includes(normalizedQuery))
      );
    }

    // Sort students with consideration for device performance
    return filtered.sort((a, b) => {
      let aValue: string | number = a.name;
      let bValue: string | number = b.name;

      if (sortField === "name") {
        aValue = a.name;
        bValue = b.name;
      } else if (sortField === "weight") {
        aValue = parseFloat(a.weight) || 0;
        bValue = parseFloat(b.weight) || 0;
      } else if (sortField === "height") {
        aValue = parseFloat(a.height) || 0;
        bValue = parseFloat(b.height) || 0;
      } else if (sortField === "progress") {
        aValue = a.progress || 0;
        bValue = b.progress || 0;
      }

      // Optimize string comparison for mobile devices
      if (deviceInfo.isMobile && sortField === "name") {
        // Simple string comparison for mobile to improve performance
        return sortOrder === "asc" 
          ? aValue.toString().localeCompare(bValue.toString()) 
          : bValue.toString().localeCompare(aValue.toString());
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [
    students,
    searchQuery,
    sortField,
    sortOrder,
    deviceInfo.isMobile
  ]);

  return {
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch
  };
};
