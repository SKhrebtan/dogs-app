import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import "./styles.css";

interface PaginatedItemsProps {
  dogs: any[];
  setPages: (pages: number) => void;
  pages: number;
  totalPages: number;
}

const PaginatedItems: FC<PaginatedItemsProps> = ({
  dogs,
  setPages,
  pages,
  totalPages,
}) => {
  const handlePageClick2 = ({ selected }: { selected: number }) => {
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
          pages === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-200 hover:bg-blue-400 cursor-pointer"
        }`}
        nextClassName={`tuzik w-24 h-10 flex items-center justify-center rounded-md ${
          totalPages === pages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-200 hover:bg-blue-400 cursor-pointer"
        }`}
        containerClassName="flex flex-row justigy-center items-center m-8 gap-[5px]"
        pageClassName="group block border- border-solid border-lightgray hover:bg-teal-500 w-10 h-10 flex items-center justify-center rounded-md"
        activeClassName="bg-blue-500 text-white"
        // forcePage={pages - 1}
      />
    </div>
  );
};

export default PaginatedItems;
