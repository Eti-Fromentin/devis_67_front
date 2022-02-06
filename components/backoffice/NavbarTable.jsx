/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState } from 'react';
import Select from 'react-select';

import DataTable from './DataTable';

import styles from '../../styles/NavBarTable.module.css';

function NavbarTable({ navbarData, setNavbarData, urls }) {
  const [table] = useState('navbar');

  const dataToUpdate = (data) => {
    const newData = data.map((elt) => ({
      id: elt.colId,
      position: Number(elt.colPos),
      text: elt.colText,
      visible: Number(elt.colVisi),
      pagetype: elt.colSite,
      pages: elt.colLink === 'Homepage' ? '/' : elt.colLink,
    }));

    return newData;
  };

  const newEmptyRow = (res) => {
    const emptyRow = { colId: res.data.id, colText: 'à remplir', colPos: 20, colVisi: 0, colLink: 'Homepage', colSite: 'devis' };
    return emptyRow;
  };

  const callToData = navbarData.map((elt) => ({
    colId: elt.id,
    colText: elt.text,
    colPos: elt.position,
    colVisi: elt.visible,
    colLink: elt.pages === '/' ? 'Homepage' : elt.pages,
    colSite: elt.pagetype,
  }));

  const positionList = [
    { value: 1, label: '✅' },
    { value: 0, label: '❌' },
  ];

  const urlsList = urls.map((elt) => ({ value: elt.url, label: elt.url }));

  const typeList = [
    { value: 'devis', label: 'Devis' },
    { value: 'aides', label: 'Aides' },
  ];

  const data = useMemo(() => callToData, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Text',
        accessor: 'colText',
      },
      {
        Header: 'Position',
        accessor: 'colPos',
      },
      {
        Header: 'Visible ?',
        accessor: 'colVisi',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'colVisi', e.value);
              }}
              options={positionList}
              defaultValue={{ label: row.original.colVisi === 1 ? '✅' : '❌', value: row.original.colVisi }}
            />
          );
        },
      },
      {
        Header: 'Lien vers ?',
        accessor: 'colLink',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'colLink', e.value);
              }}
              options={urlsList}
              defaultValue={{ label: row.original.colLink === '/' ? 'Homepage' : row.original.colLink, value: row.original.colLink }}
            />
          );
        },
      },
      {
        Header: 'Partie du site',
        accessor: 'colSite',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                updateMyData(row.index, 'colSite', e.value);
              }}
              options={typeList}
              defaultValue={{ label: row.original.colSite === 'devis' ? 'Devis' : 'Aides', value: row.original.colSite }}
            />
          );
        },
      },
    ],
    [],
  );

  const [displayedData, setDisplayedData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setDisplayedData(
      displayedData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...displayedData[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [displayedData]);

  return (
    <section className={styles.xyz}>
      <DataTable
        columns={columns}
        data={displayedData}
        table={table}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setDisplayedData={setDisplayedData}
        displayedData={displayedData}
        setTableData={setNavbarData}
        tableData={navbarData}
        newEmptyRow={newEmptyRow}
        dataToUpdate={dataToUpdate}
      />
    </section>
  );
}

export default NavbarTable;
