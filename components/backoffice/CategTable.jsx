/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import DataTable from './DataTable';
import LoginContext from '../../contexts/loginContext';

import styles from '../../styles/DataTable.module.css';

function CategTable({ categData, setCategData }) {
  const [table] = useState('categories');
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [emptyRowTable] = useState({
    title: 'catégorie',
  });

  const visibleList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];

  const newEmptyRowDisplay = (res) => {
    const emptyRow = { id: res.id, title: 'catégorie', position: 50, visible: 1 };
    return emptyRow;
  };

  const dataToUpdate = (data) => {
    const newData = data.map((elt) => ({
      id: elt.id,
      position: Number(elt.position),
      title: elt.title,
      visible: Number(elt.visible),
      alias: elt.title,
    }));
    return newData;
  };

  const data = useMemo(() => categData, [categData]);
  const columns = useMemo(
    () => [
      {
        Header: 'Nom',
        accessor: 'title',
      },
      {
        Header: 'Visible',
        accessor: 'visible',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'visible', e.value);
              }}
              options={visibleList}
              defaultValue={{ label: row.original.visible === 1 ? '✅' : '❌', value: row.original.visible }}
            />
          );
        },
      },
      {
        Header: 'Position',
        accessor: 'position',
        className: 'position',
        style: {
          width: 100,
        },
      },
      {
        Header: 'Effacer',
        accessor: '🗑️',
        Cell: ({ row }) => {
          return (
            <Button variant="light" onClick={() => deleteRow(row.original.id)}>
              <span role="img" aria-label="delete">
                🗑️
              </span>
            </Button>
          );
        },
      },
    ],
    [categData],
  );
  const [skipPageReset, setSkipPageReset] = useState(false);

  const deleteRow = async (id) => {
    await axios({
      method: 'delete',
      url: `${apiUrl}/${table}/admin/${userId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      data: { id: id },
    })
      .then((res) => {
        if (res.status === 204) {
          setCategData(categData.filter((elt) => elt.id !== id));
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Oups, une erreur s'est produite");
        }
      });
  };

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setCategData(
      categData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...data[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [categData]);

  return (
    <section className={styles.xyz}>
      <DataTable
        columns={columns}
        data={data}
        table={table}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setTableData={setCategData}
        tableData={categData}
        newEmptyRowDisplay={newEmptyRowDisplay}
        dataToUpdate={dataToUpdate}
        newEmptyRowTable={emptyRowTable}
        setSkipPageReset={setSkipPageReset}
        // refreshData={refreshData}
      />
    </section>
  );
}

export default CategTable;
