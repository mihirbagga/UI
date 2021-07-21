export const dataTableConfig = {
  templateType: "primary",
  enableRowSelect: false,
  showNoOfColumns: 10,
  enableCheckBoxSelection: false,
  navigateButton: {
    show: false,
    header: "",
    icon: '',
    color: ''
  },
  toolBar: {
    show: true,
    title: {
      show: true,
      name: "",
      style: {}
    },
    search: {
      show: false,
      highlightKeyword: true,
      label: "Search",
      width: "120%",
      style: {
        marginLeft: 0
      }
    },
    columnVisibility: {
      show: true,
      style: {}
    },
    filter: {
      show: false,
      style: {}
    },
    style: {}
  },
  header: {
    show: true,
    config: [],
    align: "left",
    field: "fieldName",
    // sort: true,
    columnFilter: true,
    // style: {}*/
    // moreOptions: {
    //   header: "Actions",
    //   menuItems: [
    //     "Add",
    //     "Remove",
    //     "Clone"
    //   ]
    // },
    width: '300px',
    columnsStyle: [{
      "Header Material": {
        style: {
          width: "100%",
          textAlign: "left"
        }
      }
    }],
    columnFilterMenus: [
      { "key": "contain", "value": "Contains" },
      { "key": "start with", "value": "Starts With" },
      { "key": "ends with", "value": "Ends With" },
      { "key": "matches", "value": "Matches" },
      { "key": "less than", "value": "Less Than" }
    ],
    order: 'asc',
    orderBy: 'abc'
  },
  body: {
    align: "left",
    content: [],
    // cellClicks: [
    //   { cellName: 'Material Name', enableHyperLink: true, url: "http://...." },
    //   { cellName: 'Material' }
    // ],
    emptyRows: {
      message: 'No Record Found',
      showEmptyRows: true,
      style: {
        fontWeight: 'bolder',
        textAlign: 'center',
        padding: '20px'
      }
    },
    filteredRecord: 10,
    pageNumber: 0,
    pageSize: 100,
    totalRecord: 0,
    style: {}
  },
  footer: {
    show: false,
    paginations: {
      show: true,
      rowsPerPageOptions: [10, 25, 50],
      colSpan: 6,
      style: {}
    },
    style: {}
  },
  style: {},
  mode: {
    "apiConfig": {
      "apiLink": "",
      "params": {
        "resultsetId": "resultsetId",
        "appId": "appId",
        "search": "search",
        "pageNumber": "pageNumber",
        "sortColumn": "sortColumn",
        "sortOrder": "sortOrder",
        "pageSize": "pageSize",
        "pageOffset": "pageOffset",
        "filters": "filters"
      }
    },
    requiredInfo: {
      "resultsetId": 4,
      "appId": "ENT"
    }
  }
};
