/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useContext, useRef, forwardRef } from 'react';
import axios from 'axios';
import { useTable, usePagination, useRowSelect } from 'react-table';
import { Button, Table } from 'react-bootstrap';

import LoginContext from '../../contexts/loginContext';

import styles from '../../styles/NavBarTable.module.css';

const _ = require('lodash');

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

function DataTable({
  columns,
  data,
  table,
  updateMyData,
  skipPageReset,
  setDisplayedData,
  displayedData,
  setTableData,
  tableData,
  dataToUpdate,
  newEmptyRow,
}) {
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      initialState: { pageIndex: 0, pageSize: 20 },
      updateMyData,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  const sendUpdatedData = async () => {
    const newData = await dataToUpdate(displayedData);
    const filteredData = await newData.filter((elt, index) => !_.isEqual(elt, tableData[index]));
    await axios({
      method: 'put',
      url: `${apiUrl}/${table}/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: filteredData,
    })
      .then((res) => {
        if (res.status === 200) {
          const body = res.body;
          alert('Données mises à jour');
          setTableData([...newData, { body }]);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  const addEmptyRow = async () => {
    await axios({
      method: 'post',
      url: `${apiUrl}/${table}/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: newEmptyRow,
    })
      .then((res) => {
        if (res.status === 201) {
          setDisplayedData([...displayedData, newEmptyRow(res)]);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  const deleteRow = async () => {
    const items = selectedFlatRows.map((elt) => elt.original);
    const itemsToDelete = await items.map((elt) => ({ id: elt.colId }));
    await axios({
      method: 'delete',
      url: `${apiUrl}/${table}/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: itemsToDelete,
    })
      .then((res) => {
        if (res.status === 204) {
          setDisplayedData(displayedData.filter((elt) => !itemsToDelete.some((element) => elt.colId === element.id)));
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  return (
    <>
      <section className={styles.buttonsDevis}>
        <Button
          className={styles.buttonAjouterUneLigne}
          variant="info"
          onClick={() => {
            addEmptyRow();
          }}
        >
          {' '}
          Ajouter une ligne{' '}
        </Button>
        <Button
          className={styles.buttonMettreAJour}
          variant="primary"
          onClick={() => {
            sendUpdatedData();
          }}
        >
          {' '}
          Mettre à jour{' '}
        </Button>
        <Button
          className={styles.buttonEffacerLesDonnées}
          variant="danger"
          onClick={() => {
            deleteRow();
          }}
        >
          {' '}
          Effacer les données{' '}
        </Button>
      </section>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Aller à la page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Voir {pageSize} lignes
            </option>
          ))}
        </select>
      </div>
      <Table {...getTableProps()}>
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
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default DataTable;
