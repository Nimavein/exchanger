import { Button, DatePicker, Table } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { SectionWrapper } from "../sectionWrapper/SectionWrapper";

export const Transactions = () => {
  const transactions = useAppSelector((state) => state.transactions);
  const [minDate, setMinDate] = useState<number>(Date.now() / 1000);
  const [maxDate, setMaxDate] = useState<number>(Date.now() / 1000);

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: any;
    }) => (
      <div style={{ padding: 8 }}>
        <DatePicker
          value={moment(minDate * 1000)}
          showTime={{ format: "HH:mm" }}
          placeholder="Begin date"
          style={{ marginRight: "10px" }}
          format="YYYY-MM-DD HH:mm:ss"
          onChange={(e) => {
            setSelectedKeys(e ? [e.unix()] : []);
            setMinDate(e!.unix());
          }}
        />
        <DatePicker
          value={moment(maxDate * 1000)}
          showTime={{ format: "HH:mm" }}
          placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          onChange={(e) => {
            setSelectedKeys(e ? [e.unix()] : []);
            setMaxDate(e!.unix());
          }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),

    onFilter: (value: any, record: any) =>
      record[dataIndex] > minDate && record[dataIndex] < maxDate,
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const currencyFilter = [
    {
      text: "PLN",
      value: "PLN",
    },
    {
      text: "USD",
      value: "USD",
    },
    {
      text: "EUR",
      value: "EUR",
    },
  ];

  const usersFilter = [
    {
      text: "1",
      value: 1,
    },
    {
      text: "2",
      value: 2,
    },
    {
      text: "3",
      value: 3,
    },
  ];

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 80,
      filters: [
        {
          text: "Deposit",
          value: "Deposit",
        },
        {
          text: "Withdraw",
          value: "Withdraw",
        },
        {
          text: "Transfer",
          value: "Transfer",
        },
        {
          text: "Exchange",
          value: "Exchange",
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => record.type.includes(value),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 80,
      sorter: (a: any, b: any) => a.createdAt - b.createdAt,
      ...getColumnSearchProps("createdAt"),
      render: (createdAt: number) =>
        dayjs.unix(createdAt).format("DD/MM/YYYY H:mm A "),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 80,
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Amount sending",
      dataIndex: "amountFrom",
      key: "amountFrom",
      width: 80,
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Amount receiving",
      dataIndex: "amountTo",
      key: "amountTo",
      width: 80,
      sorter: (a: any, b: any) => a.amount - b.amount,
    },

    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 80,
      filters: currencyFilter,
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record?.currency?.includes(value) ||
        record?.currencyFrom?.includes(value) ||
        record?.currencyTo?.includes(value),
    },
    {
      title: "Currency sending",
      dataIndex: "currencyFrom",
      key: "currencyFrom",
      width: 80,
    },
    {
      title: "Currency receiving",
      dataIndex: "currencyTo",
      key: "currencyTo",
      width: 80,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 80,
      filters: usersFilter,
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record?.userId === value ||
        record?.userFromId === value ||
        record?.userToId === value,
    },
    {
      title: "User sending ID",
      dataIndex: "userFromId",
      key: "userFromId",
      width: 80,
    },
    {
      title: "User receiving ID",
      dataIndex: "userToId",
      key: "userToId",
      width: 80,
    },
  ];

  return (
    <SectionWrapper title="Operations">
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={transactions}
        size="middle"
        scroll={{ y: 300, x: "100vw" }}
        rowKey="id"
      />
    </SectionWrapper>
  );
};
