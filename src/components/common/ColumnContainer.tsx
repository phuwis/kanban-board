import React from "react";
import Column from "./Column";
import { ColumnContext } from "../../contexts";

interface ColumnType {
  id: number;
  title: string;
  className: string;
  limit: number;
}

interface ContextType {
  columns: ColumnType[];
}

const ColumnContainer: React.FC = () => {
  const { Consumer: ColumnConsumer } = ColumnContext;

  const generateColumns = (context: ContextType) => {
    return context.columns.map((column) => (
      <Column
        className={column.className}
        key={column.id}
        id={column.id}
        columnTitle={column.title}
        limit={column.limit}
      />
    ));
  };

  return (
    <div className="column__container">
      <ColumnConsumer>
        {(context: ContextType) => generateColumns(context)}
      </ColumnConsumer>
    </div>
  );
};

export default ColumnContainer;
