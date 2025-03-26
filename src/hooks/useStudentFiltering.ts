
import { useState, useMemo } from "react";
import { Student } from "@/components/students/StudentTypes";

export const useStudentFiltering = (
  students: Student[],
  exercises: any[] = []
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");

  const sortedAndFilteredStudents = useMemo(() => {
    let filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.phone.includes(searchQuery)
    );

    return filteredStudents.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      const aValue = Number(a[sortField]);
      const bValue = Number(b[sortField]);
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [students, searchQuery, sortField, sortOrder]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    sortOrder,
    sortField,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch
  };
};
