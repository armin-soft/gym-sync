
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
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      // Handle progress field specifically
      if (sortField === "progress") {
        aValue = a.progress || 0;
        bValue = b.progress || 0;
      }
      // Convert to numbers for weight and height
      else if (sortField === "weight" || sortField === "height") {
        aValue = parseFloat(aValue as string) || 0;
        bValue = parseFloat(bValue as string) || 0;
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
