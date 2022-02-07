/* eslint-disable react/display-name */
import React, { useMemo, useEffect, useState } from 'react';
import Select from 'react-select';

import DataTable from './DataTable';

import styles from '../../styles/NavBarTable.module.css';

function NavbarTable({ navbarData, setNavbarData, urls }) {
  const [table] = useState('navbar');
  const [emptyRowTable] = useState({
    text: 'à remplir',
    position: 20,
    visible: 0,
    pages_id: 1,
    pagetype: 'devis',
  });

  const dataToUpdate = (data) => {
    console.log(data);
    const newData = data.map((elt) => ({
      id: elt.id,
      position: Number(elt.position),
      text: elt.text,
      visible: Number(elt.visible),
      pagetype: elt.pagetype,
      pages: elt.pages,
    }));
    console.log(newData);
    return newData;
  };

  const newEmptyRowDisplay = (res) => {
    const emptyRow = { id: res.data.id, text: 'à remplir', position: 20, visible: 0, pages: 1, pagetype: 'devis' };
    return emptyRow;
  };

  // const callToData = navbarData.map((elt) => ({
  //   colId: elt.id,
  //   colText: elt.text,
  //   colPos: elt.position,
  //   colVisi: elt.visible,
  //   colLink: elt.pages,
  //   colSite: elt.pagetype,
  // }));

  const positionList = [
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
        Header: 'text',
        accessor: 'text',
      },
      {
        Header: 'Visible ?',
        accessor: 'visible',
        Cell: ({ row }) => {
          return (
            <Select
              onChange={(e) => {
                console.log(e.value);
                updateMyData(row.index, 'visible', e.value);
              }}
              options={positionList}
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
                console.log(e.value);
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
                console.log(e.value);
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

  console.log('paul', displayedData, navbarData, data);

  useEffect(() => {
    setSkipPageReset(false);
    console.log(displayedData);
  }, [displayedData]);

  return (
    <section className={styles.xyz}>
      <DataTable
        columns={columns}
        data={data}
        table={table}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setDisplayedData={setDisplayedData}
        displayedData={displayedData}
        setTableData={setNavbarData}
        tableData={navbarData}
        newEmptyRowDisplay={newEmptyRowDisplay}
        dataToUpdate={dataToUpdate}
        newEmptyRowTable={emptyRowTable}
        setSkipPageReset={setSkipPageReset}
      />
    </section>
  );
}

export default NavbarTable;
