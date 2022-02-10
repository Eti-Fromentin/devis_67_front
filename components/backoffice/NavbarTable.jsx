/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import DataTable from './DataTable';
import LoginContext from '../../contexts/loginContext';

import styles from '../../styles/DataTable.module.css';

function NavbarTable({ navbarData, setNavbarData, urls, refreshData }) {
  const [table] = useState('navbar');
  const { userId, adminToken } = useContext(LoginContext);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [emptyRowTable] = useState({
    text: 'à remplir',
    position: 20,
    visible: 0,
    pages_id: 1,
    pagetype: 'devis',
  });

  const dataToUpdate = (data) => {
    const newData = data.map((elt) => ({
      id: elt.id,
      position: Number(elt.position),
      text: elt.text,
      visible: Number(elt.visible),
      pagetype: elt.pagetype,
      pages: elt.pages,
    }));
    return newData;
  };

  const newEmptyRowDisplay = (res) => {
    const emptyRow = { id: res.id, text: 'à remplir', position: 20, visible: 0, pages: '/', pagetype: 'devis' };
    return emptyRow;
  };

  const visibleList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];

  const urlsList = urls.map((elt) => ({ value: elt.url, label: elt.url }));

  const typeList = [
    { value: 'devis', label: 'Devis' },
    { value: 'aides', label: 'Aides' },
  ];

  const data = useMemo(() => navbarData, [navbarData]);

  const columns = useMemo(
    () => [
      {
        Header: 'Text',
        accessor: 'text',
      },
      {
        Header: 'Visible ?',
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
        Header: 'Lien vers ?',
        accessor: 'pages',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'pages', e.value);
              }}
              options={urlsList}
              defaultValue={{ label: row.original.pages, value: row.original.pages }}
            />
          );
        },
      },
      {
        Header: 'Partie du site',
        accessor: 'pagetype',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'pagetype', e.value);
              }}
              options={typeList}
              defaultValue={{ label: row.original.pagetype === 'devis' ? 'Devis' : 'Aides', value: row.original.pagetype }}
            />
          );
        },
      },
      {
        Header: 'Position',
        accessor: 'position',

        minWidth: 50,
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
    [navbarData],
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
          setNavbarData(navbarData.filter((elt) => elt.id !== id));
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
    setNavbarData(
      navbarData.map((row, index) => {
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
  }, [navbarData]);

  return (
    <section className={styles.xyz}>
      <DataTable
        columns={columns}
        data={data}
        table={table}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setTableData={setNavbarData}
        tableData={navbarData}
        newEmptyRowDisplay={newEmptyRowDisplay}
        dataToUpdate={dataToUpdate}
        newEmptyRowTable={emptyRowTable}
        setSkipPageReset={setSkipPageReset}
        refreshData={refreshData}
      />
    </section>
  );
}

export default NavbarTable;
