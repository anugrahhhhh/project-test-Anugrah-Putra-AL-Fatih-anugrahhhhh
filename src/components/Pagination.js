import React from 'react';
import './Pagination.css';

function Pagination({ totalItems, perPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / perPage);
  if (totalPages === 1) return null;

  const getPageNumbers = () => {
    const maxPages = 5;
    let start = Math.max(currentPage - Math.floor(maxPages / 2), 1);
    let end = start + maxPages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxPages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container d-flex justify-content-center align-items-center gap-2 flex-wrap">
      <button
        className="btn-page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`btn-page ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="btn-page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
