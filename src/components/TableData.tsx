import React, { ReactNode } from "react";
import "./TableData.scss";
interface ITableData {
  title: string | ReactNode;
  value: string | ReactNode;
}
export default ({ title, value }: ITableData) => (
  <div className="table-data">
    <span>{title}</span>
    <span>{value}</span>
  </div>
);
