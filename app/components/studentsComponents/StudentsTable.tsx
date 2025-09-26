"use client";
import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";

// Types
interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  status: "Active" | "Inactive";
  guardian: string;
  admissionDate: string;
  fees: "Paid" | "Pending" | "Overdue";
  avatar: string;
}

interface SortConfig {
  key: keyof Student | null;
  direction: "asc" | "desc";
}

interface StudentsTableProps {
  students?: Student[];
  onView?: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students: propStudents,
  onView,
  onEdit,
  onDelete,
}) => {
  // Default data if no students prop is provided
  const defaultStudents: Student[] = [
    {
      id: 1,
      studentId: "STU001",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 234 567 8901",
      class: "Grade 10",
      section: "A",
      status: "Active",
      guardian: "Michael Johnson",
      admissionDate: "2023-08-15",
      fees: "Paid",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    },
    {
      id: 2,
      studentId: "STU002",
      name: "David Chen",
      email: "david.chen@email.com",
      phone: "+1 234 567 8902",
      class: "Grade 11",
      section: "B",
      status: "Active",
      guardian: "Lisa Chen",
      admissionDate: "2023-08-12",
      fees: "Pending",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 3,
      studentId: "STU003",
      name: "Emma Williams",
      email: "emma.williams@email.com",
      phone: "+1 234 567 8903",
      class: "Grade 9",
      section: "A",
      status: "Inactive",
      guardian: "Robert Williams",
      admissionDate: "2023-08-10",
      fees: "Overdue",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    {
      id: 4,
      studentId: "STU004",
      name: "James Rodriguez",
      email: "james.rodriguez@email.com",
      phone: "+1 234 567 8904",
      class: "Grade 12",
      section: "C",
      status: "Active",
      guardian: "Maria Rodriguez",
      admissionDate: "2023-08-08",
      fees: "Paid",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    {
      id: 5,
      studentId: "STU005",
      name: "Olivia Brown",
      email: "olivia.brown@email.com",
      phone: "+1 234 567 8905",
      class: "Grade 10",
      section: "B",
      status: "Active",
      guardian: "Thomas Brown",
      admissionDate: "2023-08-05",
      fees: "Paid",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
    },
  ];

  const students = propStudents || defaultStudents;
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const studentsPerPage = 20;

  // Sort logic
  const sortedStudents = [...students].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  const handleSort = (key: keyof Student) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleSelectStudent = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(currentStudents.map((student) => student.id));
    }
  };

  const getStatusBadge = (status: Student["status"]) => {
    const styles = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const getFeesBadge = (fees: Student["fees"]) => {
    const styles = {
      Paid: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Overdue: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[fees]}`}
      >
        {fees}
      </span>
    );
  };

  return (
    <div className="">
      <div className="bg-white-0 shadow-md/10 px-5 py-3 rounded-xl w-full mb-4">
        <div className="text-[10px] mb-2">Select a student group</div>
        <div className="flex justify-between">
          <div className="flex gap-3 items-end w-3/5">
            <div className="flex flex-col w-1/2">
              <label htmlFor="year">Academic Year</label>
              <select
                name="year"
                id="year"
                className="w-full p-3 bg-white-1 rounded-xl mt-2 appearance-none px-4 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-200"
              >
                <option value="">Select a year</option>
                <option value="">2025</option>
                <option value="">2025</option>
                <option value="">2025</option>
                <option value="">2025</option>
                <option value="">2025</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="class">Class</label>
              <select
                name="class"
                id="class"
                className="w-full p-3 bg-white-1 rounded-xl mt-2 appearance-none px-4 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-200"
              >
                <option value="">Select a class</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
                <option value="">6</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="section">Section</label>
              <select
                name="section"
                id="section"
                className="w-full p-3 bg-white-1 rounded-xl mt-2 appearance-none px-4 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-200"
              >
                <option value="">Select a section</option>
                <option value="">A</option>
                <option value="">B</option>
                <option value="">C</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-accent rounded-xl px-4 py-2 text-white hover:bg-light-accent duration-300 cursor-pointer">
              <CiSearch className="size-5" />
              Search
            </button>
          </div>
          <div className="flex gap-4 items-end">
            <button className="flex items-center gap-2 bg-white-2 rounded-xl px-4 py-2 text-accent hover:bg-white-2/60 duration-300 cursor-pointer">
              <IoMdAdd className="size-5" />
              Add a Student
            </button>
            <button className="flex items-center gap-2 bg-white-2 rounded-xl px-4 py-2 text-accent hover:bg-white-2/60 duration-300 cursor-pointer">
              <IoCloudUploadOutline className="size-5" />
              Upload a CSV File
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl w-full shadow-md/10 border border-gray-200 ">
        {/* Table */}
        <div className="max-h-100 overflow-y-auto overflow-x-auto rounded-xl">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selectedStudents.length === currentStudents.length &&
                      currentStudents.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Student
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("studentId")}
                >
                  <div className="flex items-center gap-1">
                    Student ID
                    {sortConfig.key === "studentId" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Contact
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("class")}
                >
                  <div className="flex items-center gap-1">
                    Class
                    {sortConfig.key === "class" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Fees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-black">
                        {student.name}
                      </span>
                      <span className="text-xs text-gray">
                        {student.guardian}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black">{student.email}</div>
                    <div className="text-xs text-gray">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black">{student.class}</div>
                    <div className="text-xs text-gray">
                      Section {student.section}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4">{getFeesBadge(student.fees)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={() => onView?.(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        onClick={() => onEdit?.(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        onClick={() => onDelete?.(student)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-2 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstStudent + 1} to{" "}
            {Math.min(indexOfLastStudent, students.length)} of {students.length}{" "}
            students
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm border rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
