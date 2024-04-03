import React from "react";

function Pagination({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPage,
  setTotalPage,
}) {
  React.useEffect(() => {
    console.log("pageSize: ", pageSize);
    console.log("totalPage: ", totalPage);
    console.log("currentPage: ", currentPage);
  }, [totalPage, currentPage, pageSize]);

  return (
    <div className="flex items-center justify-between w-full mt-10">
      <div className="flex items-center">
        <p>Data:</p>
        <select
          value={pageSize}
          className="pr-4 pl-4 pb-2 pt-2 ml-2 bg-white text-black border rounded-md cursor-pointer"
          onChange={(e) => {
            setPageSize(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50 ">50</option>
        </select>
      </div>
      <div className="flex items-center">
      <p className="ml-4 mr-4">Page {currentPage} of {totalPage}</p>
        {currentPage > 1 ? (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pr-4 pl-4 pb-2 pt-2 mr-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            &lt;
          </button>
        ) : (
          <button
            disabled
            className="pr-4 pl-4 pb-2 pt-2 mr-1 text-white rounded-md bg-gray-300"
          >
            &lt;
          </button>
        )}
        {currentPage < totalPage ? (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pr-4 pl-4 pb-2 pt-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            &gt;
          </button>
        ) : (
          <button
            disabled
            className="pr-4 pl-4 pb-2 pt-2 text-white rounded-md bg-gray-300"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
