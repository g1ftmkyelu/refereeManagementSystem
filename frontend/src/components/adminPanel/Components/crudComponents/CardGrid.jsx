import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./CardGrid.css";
import {
  CrudViewButton,
  CrudEditButton,
  CrudDeleteButton,
} from "./CrudButtons";
import ViewData from "../specialRenderComponents/viewData";

const CardGrid = ({
  rdata,
  data,
  numColumns,
  openCrudViewModal,
  openCrudEditModal,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9); // Adjust this to your desired items per page.

  const gridStyle = {
    gridTemplateColumns: `repeat(${numColumns}, 1fr)`, // Dynamic number of columns
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Reset to the first page when changing items per page.
  };

  return (
    <>


      <div className="card-grid" style={gridStyle}>
        {paginatedData.map((item) => (
          <div key={item.id} className="card">
            <ViewData data={item} schema={rdata.schema} />
            <div className="button-container">
              {rdata.view && (
                <CrudViewButton {...{ openCrudViewModal, item }} />
              )}
              {rdata.edit && (
                <CrudEditButton {...{ openCrudEditModal, item }} />
              )}
              {rdata.delete && <CrudDeleteButton {...{ handleDelete, item }} />}
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={<button>Previous</button>}
        nextLabel={<button>Next</button>}
        breakLabel={"..."}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <div className="items-per-page-dropdown">
        <label htmlFor="itemsPerPage">Items per page: </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </>
  );
};

export default CardGrid;
