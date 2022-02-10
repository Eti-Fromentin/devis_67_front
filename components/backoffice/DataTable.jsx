/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useContext } from 'react';
import { useTable, usePagination } from 'react-table';
import { Button, Card, Table } from 'react-bootstrap';
import axios from 'axios';

import LoginContext from '../../contexts/loginContext';

import styles from '../../styles/DataTable.module.css';

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
  }, []);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

function DataTable({
  columns,
  data,
  table,
  updateMyData,
  skipPageReset,
  setTableData,
  tableData,
  dataToUpdate,
  newEmptyRowDisplay,
  newEmptyRowTable,
}) {
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
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
  );

  const sendUpdatedData = async () => {
    const newData = await dataToUpdate(tableData);
    await axios({
      method: 'put',
      url: `${apiUrl}/${table}/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: newData,
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Données mises à jour');
          setTableData([...newData]);
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
      data: newEmptyRowTable,
    })
      .then((res) => {
        if (res.status === 201) {
          const emptyRow = newEmptyRowDisplay(res.data);
          setTableData([...tableData, emptyRow]);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  return (
    <Card className={styles.cardTable}>
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
        </Button>{' '}
      </section>
      <div className={styles.pagination}>
        <section className={styles.sectionButtonRightLeft}>
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={styles.doubleLeft}>
            {'<<'}
          </Button>{' '}
          <Button onClick={() => previousPage()} disabled={!canPreviousPage} className={styles.simpleLeft}>
            {'<'}
          </Button>{' '}
          <Button onClick={() => nextPage()} disabled={!canNextPage} className={styles.doubleRight}>
            {'>'}
          </Button>{' '}
          <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={styles.simpleRight}>
            {'>>'}
          </Button>{' '}
        </section>
        <span className={styles.spanContainerPage1of1}>
          Page{'   '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className={styles.spanContainerAllerALaPage}>
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
          className={styles.selectContainerPageSize}
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
      <Table striped bordered hover className={styles.dataTable} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()} className={styles.trDataTable}>
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
    </Card>
  );
}

export default DataTable;
