import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

const Table = styled.table`
  display: table;

  table-layout: fixed;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const TableHead = styled.thead`
  padding: 2px;
`;

const TableRow = styled.tr`
  border: 1px solid rgb(107 114 128);
`;

const TableHeader = styled.th`
  border: 1px solid rgb(107 114 128);
  padding: 2px;
`;
const TableBody = styled.tbody``;

const TableData = styled.td`
max-width: 70px,
  max-height: 70px,
  border: 1px solid rgb(107 114 128);
  background-color: gray;
`;

const Button = styled.button`
  padding: 2px 4px;
  color: black;
  background-color: lime;
  &:hover {
    background-color: green;
    transition: 0.5s;
  }
`;
const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get('https://fakestoreapi.com/products')
      .catch((error) => console.log(console.log(error)));

    if (response) {
      const products = response.data;

      console.log('Products', products);
      setProducts(products);
    }
  };

  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== 'rating')
            .map((key) => {
              if (key === 'image')
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} />,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Edit',
        Cell: ({ row }) => (
          <Button onClick={() => alert('Editing: ' + row.values.price)}>
            Edit
          </Button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchProducts();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);

          return (
            <TableRow
              {...row.getRowProps()}
              className={isEven(idx) ? 'bg-green-400 bg-opacity-30' : ''}
            >
              {row.cells.map((cell, idx) => (
                <TableData {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableData>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Products;
