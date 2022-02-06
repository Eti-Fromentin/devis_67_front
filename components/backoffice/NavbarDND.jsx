/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState, useContext, useRef, forwardRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTable, usePagination, useRowSelect } from 'react-table';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import LoginContext from '../../contexts/loginContext';
import axios from 'axios';
import styles from '../../styles/NavBarTable.module.css';

// const EditableNumberCell = (props) => {
//   const { column, row, cell, updateMyData } = props;
//   const value = cell.value;
//   const rowIndex = row.index;
//   const columnId = column.id;
//   const onChange = (e) => {
//     updateMyData(rowIndex, columnId, parseInt(e.target.value, 10));
//   };
//   return <input value={value} onChange={onChange} type="number" />;
// };

const EditableTextCell = (props) => {
  const { column, row, cell, updateMyData } = props;
  const value = cell.value;
  const rowIndex = row.index;
  const columnId = column.id;
  const onChange = (e) => {
    updateMyData(rowIndex, columnId, e.target.value);
  };
  return <input value={value} onChange={onChange} />;
};

function Table({ columns, data, updateMyData, removeRow, addRow, resetData, reorderData }) {
  const table = useTable({
    columns,
    data,
    // non-API instance pass-throughs
    updateMyData,
    removeRow,
    addRow,
    reorderData,
  });
  // console.log({ table });
  const { getTableProps, headerGroups, prepareRow, rows } = table;

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    reorderData(source.index, destination.index);
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table-body">
            {(provided, snapshot) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Draggable draggableId={row.original.id} key={row.original.id} index={row.index}>
                      {(provided, snapshot) => {
                        return (
                          <tr
                            {...row.getRowProps()}
                            {...provided.draggableProps}
                            // {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                          >
                            {row.cells.map((cell, index) => (
                              <td key={index} {...cell.getCellProps()}>
                                {cell.render('Cell', {
                                  dragHandleProps: provided.dragHandleProps,
                                  isSomethingDragging: snapshot.isDraggingOver,
                                })}
                              </td>
                            ))}
                          </tr>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <tr>
                  <td style={{ backgroundColor: 'darkblue' }} colSpan={columns.length}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                      }}
                    ></div>
                  </td>
                </tr>
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <pre>
        {JSON.stringify(
          rows.map((row) => row.values),
          null,
          2,
        )}
      </pre>
    </>
  );
}

const TrashCan = ({ removeRow, row, className }) => (
  <span className={className} onClick={() => removeRow(row.index)} role="img" aria-label="delete">
    🗑️
  </span>
);

const UpDownArrow = (props) => (
  <span {...props.dragHandleProps} className={props.className} aria-label="move" role="img">
    ↕️
  </span>
);

const AddItem = (props) => (
  <span className={props.className} onClick={() => props.addRow()} role="img" aria-label="add">
    1️⃣ Add Item
  </span>
);

const ResetData = (props) => (
  <span className={props.className} onClick={() => props.resetData()} role="img" aria-label="reset">
    Reset Items 🔁
  </span>
);

function NavDND() {
  const columns = React.useMemo(() => {
    const DescriptionCell = (props) => {
      return (
        <>
          <UpDownArrow {...props} />
          <EditableTextCell {...props} />
        </>
      );
    };
    return [
      {
        Header: 'Description',
        accessor: 'description',
        Cell: DescriptionCell,
      },
      {
        Header: 'One',
        accessor: 'one',
      },
      {
        Header: 'Two',
        accessor: 'two',
      },
      {
        Header: 'Sum',
        accessor: (row) => row.one + row.two,
        id: 'sum',
      },
    ];
  }, []);

  const staticData = [
    { id: 'item-1', description: 'First thing', one: 0, two: 5, sum: 0 },
    { id: 'item-2', description: 'Second thing', one: 7, two: 1, sum: 0 },
    { id: 'item-3', description: 'Third thing', one: 2, two: 4, sum: 0 },
  ];

  // const [data, setData] = React.useState(() => makeData(3));
  // const [originalData] = React.useState(data);
  const [data, setData] = React.useState(staticData);
  const [idCount, setIdCount] = React.useState(staticData.length + 1);

  const resetData = () => setData(staticData);
  const removeRow = (rowIndex) => {
    setData((old) => old.filter((row, index) => index !== rowIndex));
  };
  const addRow = () => {
    const one = Math.floor(Math.random() * 10);
    const two = Math.floor(Math.random() * 10);
    const sum = one + two;
    setData((old) => [
      ...old,
      {
        id: `item-${idCount}`,
        description: `Thing ${idCount}`,
        one,
        two,
        sum,
      },
    ]);
    setIdCount(idCount + 1);
  };
  const updateMyData = (rowIndex, columnID, newValue) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: newValue,
          };
        }
        return row;
      }),
    );
  };
  const reorderData = (startIndex, endIndex) => {
    const newData = [...data];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    setData(newData);
  };

  return (
    <Table
      columns={columns}
      data={data}
      updateMyData={updateMyData}
      removeRow={removeRow}
      addRow={addRow}
      resetData={resetData}
      reorderData={reorderData}
    />
  );
}

export default NavDND;
