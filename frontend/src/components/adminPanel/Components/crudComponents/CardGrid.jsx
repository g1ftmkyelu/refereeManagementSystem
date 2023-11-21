import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./CardGrid.css";
import {
  CrudViewButton,
  CrudEditButton,
  CrudDeleteButton,
} from "./CrudButtons";
import ViewData from "../specialRenderComponents/viewData";
import GridCard1 from './GridCard1';
import GridCard2 from './GridCard2';
import GridCard3 from './GridCard3';

const CardGrid = ({
  rdata,
  data,
  numColumns,
  openCrudViewModal,
  openCrudEditModal,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const componentMapping = {
    GridCard1,
    GridCard2,
    GridCard3,
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  };

  const DisplayComponent = componentMapping[rdata.displayComponent] || ViewData;

  return (
    <>
      <div className="card-grid" style={gridStyle}>
        {paginatedData.map((item) => (
          <div key={item.id} className="card">
            <DisplayComponent data={item} schema={rdata.schema} />

            <div className="button-container flex items-center justify-between w-28 py-5">
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
