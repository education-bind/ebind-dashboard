/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "../components/DefaultCell";
import ActionCell from "../components/ActionCell";
import StatusCell from "../components/StatusCell";
import CustomerCell from "../components/CustomerCell";

import { useEffect, useState } from "react";
import axios from "axios";

import useAuth from "hooks/useAuth";

const dataTableData = () => {
  const [rows, setRows] = useState<object[]>([]);
  const { setApiError } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PUBLIC_SERVER_ENDPOINT}/v1/edu/schools/e_admin`
        );
        response.data.data.results.map((data: any) => {
          setRows([
            ...rows,
            {
              school: [`${data.name}`, { image: `${data.logoImage}` }],
              country: "Rwanda",
              students: 50000,
              entryDate: `${new Date(data.regDate)}`.slice(0, 15),
              status: `${data.active ? "active" : "inactive"}`,
              action: data.id,
            },
          ]);
        });
      } catch (e: any) {
        setApiError(e);
      }
    };
    fetchData();
  }, []);

  return {
    columns: [
      {
        Header: "school",
        accessor: "school",
        Cell: ({ value: [name, data] }: any) => (
          <CustomerCell image={data.image} color={data.color || "dark"} name={name} />
        ),
      },
      {
        Header: "country",
        accessor: "country",
        Cell: ({ value }: any) => <DefaultCell value={value} />,
      },
      {
        Header: "students",
        accessor: "students",
        Cell: ({ value }: any) => <DefaultCell value={value} />,
      },
      {
        Header: "entry date",
        accessor: "entryDate",
        Cell: ({ value }: any) => <DefaultCell value={value} />,
      },
      {
        Header: "status",
        accessor: "status",
        Cell: ({ value }: any) => {
          let status;

          if (value === "active") {
            status = <StatusCell icon="done" color="success" status="Active" />;
          } else if (value === "pending") {
            status = <StatusCell icon="replay" color="dark" status="Pending" />;
          } else {
            status = <StatusCell icon="close" color="error" status="Inactive" />;
          }

          return status;
        },
      },
      {
        Header: "action",
        accessor: "action",
        Cell: ({ value }: any) => <ActionCell value={value} />,
      },
    ],

    rows,
  };
};

export default dataTableData;
