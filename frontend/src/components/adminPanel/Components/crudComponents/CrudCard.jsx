import React from "react";
import {
  CrudViewButton,
  CrudEditButton,
  CrudDeleteButton,
} from "./CrudButtons";
import ViewData from "../specialRenderComponents/viewData";

const CrudCard = ({
  item,
  rdata,
  openCrudViewModal,
  openCrudEditModal,
  handleDelete,
}) => (
  <div key={item.id} className="card">
    <ViewData data={item} schema={rdata.schema} />
    <div className="button-container">
      {rdata.view && <CrudViewButton {...{ openCrudViewModal, item }} />}
      {rdata.edit && <CrudEditButton {...{ openCrudEditModal, item }} />}
      {rdata.delete && <CrudDeleteButton {...{ handleDelete, item }} />}
    </div>
  </div>
);

export default CrudCard;
