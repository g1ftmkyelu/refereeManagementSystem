import React, { useState } from "react";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import {
  CrudAddButton,
  CrudViewButton,
  CrudEditButton,
  CrudDeleteButton,
  CrudSwitchStatus,
} from "./CrudButtons";
import DynamicForm from "../specialRenderComponents/dynamicForm";
import ViewData from "../specialRenderComponents/viewData";
import Injectible from "../utilityComponents/Injectible";
import { FaAccusoft, FaAd, FaAdversal, FaAngellist } from "react-icons/fa";
import DynamicRenderer from "../specialRenderComponents/dynamicRenderer";

const CustomTable = ({
  rdata,
  data,
  openCrudAddModal,
  openCrudViewModal,
  openCrudEditModal,
  handleDelete,
  statusCaption,
  handleSwitchStatus,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData =
    rdata.type === "crudTab"
      ? data.filter((item) =>
          item["status"].toLowerCase().includes(statusCaption.toLowerCase())
        )
      : data.filter((item) =>
          rdata.schema.some((field) =>
            item[field.name].toLowerCase().includes(searchText.toLowerCase())
          )
        );

  const columns = rdata.schema.map((field) => ({
    name: field.name,
    selector: field.name,
    sortable: true,
  }));

  const newData = filteredData.map((item) => {
    const actions = (
      <div style={{ display: "flex" }}>
        {rdata.view && <CrudViewButton {...{ openCrudViewModal, item }} />}
        {rdata.edit && <CrudEditButton {...{ openCrudEditModal, item }} />}
        {rdata.delete && <CrudDeleteButton {...{ handleDelete, item }} />}

        {statusCaption &&
          rdata.tabs.map(({ name, Icon }) =>
            statusCaption !== name ? (
              <CrudSwitchStatus
                key={name}
                handleSwitchStatus={handleSwitchStatus}
                item={item}
                name={name}
                Icon={Icon}
              />
            ) : null
          )}
      </div>
    );

    return { ...item, actions };
  });

  columns.push({
    name: "Actions",
    cell: (row) => row.actions,
    sortable: false,
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
      {rdata.sidePanel && (
        <div>
          <DynamicRenderer
            action={"edit"}
            data={selectedItem || {}}
            schema={rdata.schema}
            onDataFromGrandchild={selectedItem}
          />
        </div>
      )}

      <div style={{ width: "100%" }}>

        <section className=" flex content-center justify-between bg-white p-5 mb-4 shadow-sm rounded-lg">
          {rdata.add && <CrudAddButton {...{ openCrudAddModal }} />}
          <div >
            <input
              type="text"
              className=" bg-gray-100 border-0 outline-0 p-2 rounded-md"
              placeholder={`Search ${rdata.path}...`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </section>
        <DataTable
          columns={columns}
          data={newData}
          pagination
          paginationPerPage={10}
          highlightOnHover
          onRowClicked={(row, e) => {
            setSelectedItem(row);
          }}
          responsive
          theme="light"
          title={rdata.path}
        />
      </div>
    </div>
  );
};

CustomTable.propTypes = {
  rdata: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  openCrudViewModal: PropTypes.func.isRequired,
  openCrudEditModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  status: PropTypes.bool, // Add a prop type for 'status'
  statusCaption: PropTypes.string.isRequired, // Add a prop type for 'statusCaption'
};

export default CustomTable;
