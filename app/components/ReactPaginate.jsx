import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles.css";
export default function PaginatedItems({ dogs, setPages, pages, totalPages }) {
  //   const [pageCount, setPageCount] = useState(0);
  //   const [itemOffset, setItemOffset] = useState(0);
  //   const itemsPerPage = 4;
  //   useEffect(() => {
  //     if (!dogs) return;
  //     const endOffset = itemOffset + itemsPerPage;
  //     setCurrentItems(dogs.slice(itemOffset, endOffset));
  //       setPageCount(Math.ceil(dogs.length / itemsPerPage));
  //     setPageCount(Math.ceil(dogs.length));
  //   }, [itemOffset, itemsPerPage, dogs]);

  //   const handlePageClick = (event) => {
  //     const newOffset = (event.selected * itemsPerPage) % dogs.length;
  //     setItemOffset(newOffset);
  //   };

  const handlePageClick2 = ({ selected }) => {
    setPages(selected + 1);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick2}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        previousClassName={`tuzik w-24 h-10 flex items-center justify-center rounded-md ${
          pages === 1 ? "bg-gray-300 disabled" : "bg-blue-200 hover:bg-blue-400"
        }`}
        nextClassName={`tuzik w-24 h-10 flex items-center justify-center rounded-md ${
          totalPages === pages
            ? "bg-gray-300 disabled"
            : "bg-blue-200 hover:bg-blue-400"
        }`}
        containerClassName="flex flex-row justigy-center items-center m-8 gap-[5px]"
        pageClassName="group block border- border-solid border-lightgray hover:bg-teal-500 w-10 h-10 flex items-center justify-center rounded-md"
        activeClassName="bg-blue-500 text-white"
        forcePage={pages - 1}
      />
    </div>
  );
}
