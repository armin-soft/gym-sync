
import { useState, useMemo } from "react";
import { Student } from "@/components/students/StudentTypes";

export const useStudentFiltering = (students: Student[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleSort = (field: "name" | "weight" | "height") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Filter and sort students
  const sortedAndFilteredStudents = useMemo(() => {
    let filtered = [...students];

    // Filter by search query
    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(normalizedQuery) ||
          student.phone.toLowerCase().includes(normalizedQuery)
      );
    }

    // Sort students
    return filtered.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      // Convert to numbers for weight and height
      if (sortField === "weight" || sortField === "height") {
        aValue = parseFloat(aValue as string) || 0;
        bValue = parseFloat(bValue as string) || 0;
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
    sortOrder
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
