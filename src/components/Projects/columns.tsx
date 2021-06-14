import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

export const tableColumns = [
      {
        Header: () => null,
        id: "expander", // 'id' is required
        Cell: ({ row }: { row: any }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <IoMdArrowDropdown size="1rem" />
            ) : (
              <IoMdArrowDropright size="1rem" />
            )}
          </span>
        ),
      },
      {
        Header: "Username",
        accessor: "userid",
      },
      {
        Header: "Access Rights",
        accessor: "queryterms",
        Cell: ({ value }: { value?: any }) => {
          if (value) {return value.length} else return 0
        },
      },
    ]