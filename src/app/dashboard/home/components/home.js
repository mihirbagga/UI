import React, { Component } from "react";
import { dataTableConfig } from "../../../../constants/datatableConfig";
import {
  getBackwardData,
  getForwardData,
  getTableData,
} from "../../../../utilities/appAPI";
import GenericTable from "rl-react-generic-table";
import Loader from "../../../../components/Loading/Loader";
import {IconButton, Container, Tooltip } from "@material-ui/core";
import { TextField, Button,withStyles} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./style.scss";
import Tree from spectramicro-geneology
import display_config from "./display_config.json";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonLabel: {
    textTransform: "capitalize",
  },
  button: {
    margin: theme.spacing(1),
  },
});
class Home extends Component {
  state = {
    tableData: [],
    displayConfig: display_config,
    showGrid: false,
    showStreamPlot: false,
    loader: false,
    chartData: [],
    selectedHeader: "",
    chartType: "backward",
    toastOpen: false,
    toastMessage: null,
    toastVariant: null,
   
  };

  handleChange = (state, evt) => {
    if (evt) {
      let value = evt.target.value;
      this.setState({
        [state]: value,
      });
    }
  };

  handleChartClick = (nodeDetail) => {
    let selectedNodeConfig = [];
    let { displayConfig } = this.state;
    if (nodeDetail.type == "Material") {
      this.setState({ showStreamPlot: false, nodeId: nodeDetail.nodeId });
      selectedNodeConfig = displayConfig["material"];
    } else if (nodeDetail.type == "Process Order") {
      this.setState({ showStreamPlot: true, nodeId: "" });
      selectedNodeConfig = displayConfig["processOrder"];
    }
    this.setState({
      loader: true,
      showGrid: false,
    });
    this.prepareGridView(selectedNodeConfig, nodeDetail);
  };
  async prepareGridView(config, nodeDetail) {
    let data = [];
    for (let i = 0; i < config.length; i++) {
      let apiUrl = config[i]["webserviceName"];
      let requestParams = config[i]["webserviceArgs"];
      let req = {};
      for (let key in requestParams) {
        let value = requestParams[key];
        let nodeKey = value.substring(
          value.lastIndexOf("[") + 1,
          value.lastIndexOf("]")
        );
        req[key] = nodeKey ? nodeDetail[nodeKey] : value;
      }
      let tableContent = await this.getGridData(apiUrl, req);
      let tableData = {
        ...dataTableConfig,
        toolBar: {
          ...dataTableConfig.toolBar,
          title: config[i]["gridConfig"]["titleConfig"],
        },
        header: {
          ...dataTableConfig.header,
          width: config[i]["gridConfig"]["columnWidth"],
          columnsStyle: config[i]["gridConfig"]["columnsStyle"],
          config: config[i]["gridConfig"]["colHeaders"],
        },
        body: {
          ...dataTableConfig.body,
          content: tableContent ? tableContent : [],
          totalRecord: tableContent ? tableContent.length : 0,
        },
      };
      data.push(tableData);
    }
    this.setState({
      showGrid: true,
      tableData: data,
      loader: false,
    });
  }
  getGridData = (url, req) => {
    return getTableData(url, req).then(
      (res) => {
        return res.data;
      },
      (err) => {
        return [];
      }
    );
  };
  handleFilterClick = () => {
    this.setState({
      showTreePlot: false,
      loader: true,
      showGrid: false,
      showStreamPlot: false,
      chartType: "backward",
    })
    this.getBackwardPlot();
  };
  


  getBackwardPlot = (hasNodeId) => {
    const { selectedHeader } = this.state;
    const { nodeId } = this.state;
    let _req = {
      level: 5,
      matBatchNo: hasNodeId ? nodeId.replace(/\s/g, "") : selectedHeader.replace(/\s/g, ""),
    };
    getBackwardData(_req).then(
      (response) => {
        let res = response.data;
        if (res && res.length) {
          this.setState({
            showTreePlot: true,
            chartData: res ? res : [],
            loader: false,
            nodeId: "",
            chartType: "backward",
          });
        } else {
          this.setState({
            toastOpen: true,
            toastMessage: "No Data is returned",
            toastVariant: "error",
          })
        }

      },
      (err) => {
        this.setState({
          showTreePlot: false,
          chartData: [],
          loader: false,
          nodeId: "",
        });
      }
    );
  };


  render() {
    const {
      showStreamPlot,
      chartData,
      showGrid,
      loader,
      selectedHeader,
      showTreePlot,
      tableData,
      toastOpen,
      nodeId,
      toastMessage,
      toastVariant
    } = this.state;

    const { classes } = this.props;
  console.log('home nodeId',nodeId)


  const config =
  {
  data:chartData[0],
  l: [{ 'icon': '/img/MVA/material_edited.png', 'name': 'Material' }, { 'icon': '/img/MVA/processorder.png', 'name': 'Process Order ' }],  
  contextmenu: [{
    Text: 'HOME',
    Url: 'http://www.google.com',
   
  },

  {
    Text: 'Google Link',
    Url: 'http://www.google.com',
    
  },
  {
    Text: 'Google Link',
    Url: 'http://www.google.com',
   
  },
  {
    Text: 'Yahoo!!',
    Url: 'http://www.google.com',
   
    }
  
  ],
  zoom: true,
  chartType: 'backward',
  handleChartClick:this.handleChartClick,
  selectedHeader:selectedHeader,
  getBackwardData:getBackwardData,
  getForwardData:getForwardData,
  showTreePlot:showTreePlot,
  nodeId:nodeId
 

}
    console.log(this.config)
    return (
      <div className="page-container">
      
        <Container maxWidth={false}>
          {loader && (
            <div className="home-loader-container">
              <Loader />
            </div>
          )}
          <div className="filter-header">
            <div style={{ margin: "0 0 10px 0" }}>
              <TextField
                id="header-material-batch"
                variant="outlined"
                className="outline-textfield"
                label="Material Batch No."
                type="text"
                fullWidth
                value={selectedHeader}
                onChange={(e) => this.handleChange("selectedHeader", e)}
              />
            </div>

            <div style={{ marginTop: "27px", marginLeft: "10px" }}>
              <Button
                id="explore-btn"
                type="submit"
                variant="contained"
                color="primary"
                
                onClick={(e) => this.handleFilterClick()}
              >
                Exp
              </Button>
            </div>
          </div>

          <div className="chart-tree-d3">
            {showTreePlot && chartData.length > 0 && (
              <div>
                <Tree config={config}/>
                
              </div>
            )}
          </div>

          <div className="table-div">
            {showGrid &&
              tableData.map((item) => {
                return <div id={item.toolBar.title.name.replace(/ /g, "-").replace("/", "-")}><GenericTable tableData={item} /></div>;
              })}
          </div>
          <hr></hr>
        </Container>
        
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Home));