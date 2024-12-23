const Pagination = ({ totalPages, currentPage, onPageChange, pageLimit }: any) => {
    const handlePageClick = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(() => page);
      }
    };
  
    // 현재 페이지 기준으로 pageLimit 개씩 표시
    const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
  
    return (
      <div className="flex items-center justify-center space-x-2">
        {/* 첫 페이지로 이동 */}
        <button
          className="text-gray-400 bg-transparent hover:text-darkgray-100 disabled:text-[#CCCCCC]"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(1)}
        >
          &laquo;
        </button>
  
        {/* 이전 페이지로 이동 */}
        <button
          className="text-gray-400 bg-transparent hover:text-darkgray-100 disabled:text-[#CCCCCC]"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          &lt;
        </button>
  
        {/* 페이지 번호 */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
              currentPage === page
                ? "bg-[#384958] text-white"
                : "text-gray-600 bg-transparent hover:bg-gray-300 hover:text-white"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
  
        {/* 다음 페이지 또는 그룹으로 이동 */}
        <button
          className="text-gray-400 bg-transparent hover:text-darkgray-100 disabled:text-[#CCCCCC]"
          disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage === endPage && endPage < totalPages) {
              // 다음 그룹의 첫 페이지로 이동
              handlePageClick(endPage + 1);
            } else {
              // 단순히 다음 페이지로 이동
              handlePageClick(currentPage + 1);
            }
          }}
        >
          &gt;
        </button>
  {}
        {/* 마지막 페이지로 이동 */}
        <button
          className="text-gray-400 bg-transparent hover:text-darkgray-100 disabled:text-[#CCCCCC]"
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(totalPages)}
        >
          &raquo;
        </button>
      </div>
    );
  };
  
  export default Pagination;
  