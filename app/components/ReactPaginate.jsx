import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({ dogs, setCurrentItems }) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  console.log(pageCount);
  useEffect(() => {
    if (!dogs) return;
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(dogs.slice(itemOffset, endOffset));
    console.log(dogs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dogs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dogs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dogs.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        previousClassName="w-24 h-10 flex items-center justify-center rounded-md bg-blue-200 hover:bg-blue-400"
        nextClassName="w-24 h-10 flex items-center justify-center rounded-md bg-blue-200 hover:bg-blue-400"
        containerClassName="flex flex-row justigy-center items-center m-8 gap-[5px]"
        pageClassName="block border- border-solid border-lightgray hover:bg-teal-500 w-10 h-10 flex items-center justify-center rounded-md"
        activeClassName="bg-blue-500 text-white"
      />
    </div>
  );
}
