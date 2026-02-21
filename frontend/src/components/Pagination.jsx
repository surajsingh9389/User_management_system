const PaginationComponent = ({ page, setPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-end gap-1.5 py-3">
      {/* Previous arrow */}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 text-sm transition-colors ${
          page === 1
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
        onClick={() => page > 1 && setPage(page - 1)}
        disabled={page === 1}
      >
        ‹
      </button>

      {/* Page number buttons */}
      {pages.map((p) => (
        <button
          key={p}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors cursor-pointer ${
            p === page
              ? "bg-[#7b1a1a] text-white border-none"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      {/* Next arrow */}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 text-sm transition-colors ${
          page === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100"
        }`}
        onClick={() => page < totalPages && setPage(page + 1)}
        disabled={page === totalPages}
      >
        ›
      </button>
    </div>
  );
};

export default PaginationComponent;