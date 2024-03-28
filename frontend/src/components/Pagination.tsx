import React from "react";
import { PaginationProps } from "../redux/interfaces/propertyInterface";

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { totalPages, prevPage, nextPage, currentPage } = pagination;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <nav
        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        {prevPage && (
          <button
            onClick={() => handlePageChange(prevPage)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${
              currentPage === page
                ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                : "border-gray-300 text-gray-500"
            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          >
            {page}
          </button>
        ))}
        {nextPage && (
          <button
            onClick={() => handlePageChange(nextPage)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Next
          </button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
