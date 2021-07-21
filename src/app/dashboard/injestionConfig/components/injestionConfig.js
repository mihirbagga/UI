import React, { Component } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  withStyles,
  Checkbox,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withRouter } from "react-router-dom";
import "./style.scss";
import {
  getSourceColumnList,
  saveSourceConfig,
  getSourceConfig,
} from "../../../../utilities/appAPI";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import NotificationMessage from "../../../../utilities/snackbarComponent/components/MySnackbarContentWrapper";
const MyCircularProgress = withStyles({})(CircularProgress);

let defaultTargetNodes = ["MaterialBatch", "Order"];
let defaultMatBatchOrder = ["material", "batch", "order"];

const styles = (theme) => ({
  buttonLabel: {
    textTransform: "capitalize",
  },
});

const TextFieldComponent = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      className="outline-textfield"
      type="text"
      fullWidth
    />
  );
};

class InjestionConfig extends Component {
  state = {
    dataSources: [],
    dataSource: { label: "", value: "" },
    dataSourceColumns: [],
    uniqueId: { label: "", value: "" },
    nodeLabel: "",
    targetNode: { label: "", value: "" },
    targetNodes: [],
    relationshipName: "",
    material: { label: "", value: "" },
    batch: { label: "", value: "" },
    order: { label: "", value: "" },
    tableConfigData: [],
    showLoader: false,
    toastOpen: false,
    toastMessage: null,
    toastVariant: null,
  };

  getSourceColumnConfig = (req, callback) => {
    this.setState({showLoader:true})
    getSourceColumnList(req).then(
      (response) => {
        this.setState({showLoader:false})
        let res = response.data;
        if (req.column == "data_source") {
          this.setState({
            dataSources: res.map((item) => {
              return {
                label: item,
                value: item,
              };
            }),
            // showLoader:false
          });
        } else if (req.column == "column_name") {
          if (callback) {
            callback({
              status: true,
              defaultColumns: res,
            });
          }
        }
      },
      (err) => {
        this.setState({showLoader:false})
        if (callback) {
          callback({
            status: false,
            message: err,
          });
        }
      }
    );
  };

  componentDidMount() {
    let req = { column: "data_source", filter: null };
    this.getSourceColumnConfig(req);
    this.setState({
      targetNodes: defaultTargetNodes.map((item) => {
        return {
          label: item,
          value: item,
        };
      }),
    });
  }

  updateTableConfigData = (state) => {
    if (defaultMatBatchOrder.indexOf(state) != -1) {
      const tableConfigData = [...this.state.tableConfigData];
      let selectedColumns = [];
      const { material, batch, order } = this.state;

      if (material && material.value) {
        selectedColumns.push(material.value);
      }
      if (batch && batch.value) {
        selectedColumns.push(batch.value);
      }
      if (order && order.value) {
        selectedColumns.push(order.value);
      }

      tableConfigData.forEach((item) => {
        if (selectedColumns.indexOf(item.columnName) === -1) {
          item.isKeep = false;
          item.isShowInExplorer = false;
          item.isKeepDisabled = false;
          item.isShowInExplorerDisabled = false;
        } else {
          item.isKeep = true;
          item.isShowInExplorer = true;
          item.isKeepDisabled = true;
          item.isShowInExplorerDisabled = true;
        }
      });

      this.setState({
        tableConfigData,
      });
    }
  };

  handleAutoCompleteChange = (state, evt, value) => {
    if (evt) {
      if(value==null){
        value={label:"",value:""}
      }
      this.setState(
        {
          [state]: value,
        },
        () => {
          this.updateTableConfigData(state);
        }
      );
      if (state == "dataSource" && value && value.value) {
        this.getSavedConfig(value.value, () => {
          this.initializeConfig(value.value);
        });
      } else if (state == "targetNode") {
        let tableConfigData = this.getInitTableConfigData(
          this.state.dataSourceColumns
        );
        this.setState({
          tableConfigData,
          material: "",
          batch: "",
          order: "",
        });
      }
    }
  };

  initializeConfig = (selectedDataSource) => {
    let req = {
      column: "column_name",
      filter: { columnName: "data_source", columnValue: selectedDataSource },
    };
    this.getSourceColumnConfig(req, (result) => {
      if (result.status == true) {
        let dataSourceColumns = this.getInitDataSourceColumns(
          result.defaultColumns
        );
        let tableConfigData = this.getInitTableConfigData(
          dataSourceColumns,
          true
        );
        this.setState({
          uniqueId: {},
          nodeLabel: "",
          targetNode: {},
          relationshipName: "",
          material: "",
          batch: "",
          order: "",
          dataSourceColumns,
          tableConfigData,
        });
      }
    });
  };

  getInitDataSourceColumns = (defaultColumns) => {
    let dataSourceColumns = defaultColumns.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    return dataSourceColumns;
  };

  getInitTableConfigData = (dataSourceColumns, isReset) => {
    const { tableConfigData } = this.state;
    let initTableConfigData = dataSourceColumns.map((item, index) => {
      return {
        columnName: item.value,
        isKeep: false,
        isShowInExplorer: false,
        columnLabel: isReset
          ? ""
          : tableConfigData[index] && tableConfigData[index]["columnLabel"]
          ? tableConfigData[index]["columnLabel"]
          : "",
        isKeepDisabled: false,
        isShowInExplorerDisabled: false,
        fieldName: isReset
          ? ""
          : tableConfigData[index] && tableConfigData[index]["fieldName"]
          ? tableConfigData[index]["fieldName"]
          : "",
      };
    });
    return initTableConfigData;
  };

  handleTextFieldChange = (state, evt) => {
    if (evt) {
      let value = evt.target.value;
      this.setState({
        [state]: value,
      });
    }
  };

  handleTableConfigFieldChange = (state, index, event) => {
    if (event) {
      let value =
        state == "isKeep" || state == "isShowInExplorer"
          ? event.target.checked
          : event.target.value;
      const tableConfigData = [...this.state.tableConfigData];
      tableConfigData[index][state] = value;
      this.setState({
        tableConfigData,
      });
    }
  };

  getSavedConfig = (source, callback) => {
    let req = { dataSource: source };
    let that = this;
    getSourceConfig(req).then(
      (response) => {
        let res = response.data;
        const config =
          res.config && res.config.length > 0 ? JSON.parse(res.config) : {};
        if (res && Object.keys(config).length > 0) {
          that.autoFillConfig(config);
          // callback();
        } else {
          if (callback) {
            callback();
          }
        }
      },
      (err) => {
        if (callback) {
          callback();
        }
      }
    );
  };

  TableConfigComponent = () => {
    const { tableConfigData } = this.state;

    return (
      <div id="table-config">
        <Grid container spacing={1}>
          <Grid item sm={3} className="table-config-header text-center" id="columns">
            <h6>Columns</h6>
          </Grid>
          <Grid item sm={1} className="table-config-header text-center" id="select">
            <h6>Select </h6>
          </Grid>
          <Grid item sm={3} className="table-config-header text-center" id="mdh-field-name">
            <h6>MDH Field Name </h6>
          </Grid>
          <Grid item sm={2} className="table-config-header text-center" id="show-in-explorer">
            <h6>Show in Explorer</h6>
          </Grid>
          <Grid item sm={3} className="table-config-header text-center" id="display-name">
            <h6>Display Name </h6>
          </Grid>
        </Grid>
        {tableConfigData.map((item, index) => {
          return (
            <Grid container spacing={1} key={index}>
              <Grid item sm={3} className="text-center" id ={item.columnName}>
                <p>{item.columnName}</p>
              </Grid>
              <Grid item sm={1} className="text-center">
                <Checkbox
                  id={item.columnName+'-checkbox'}
                  disabled={item.isKeepDisabled}
                  color="primary"
                  checked={item.isKeep}
                  onChange={(e) =>
                    this.handleTableConfigFieldChange("isKeep", index, e)
                  }
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>

              <Grid item sm={3} className="text-center">
                <TextFieldComponent
                  id={item.columnName+'-fieldname'}
                  value={item.fieldName}
                  onChange={(e) =>
                    this.handleTableConfigFieldChange("fieldName", index, e)
                  }
                />
              </Grid>
              <Grid item sm={2} className="text-center">
                <Checkbox
                  id={item.columnName+'-showInExplorer'}
                  disabled={item.isShowInExplorerDisabled}
                  color="primary"
                  checked={item.isShowInExplorer}
                  onChange={(e) =>
                    this.handleTableConfigFieldChange(
                      "isShowInExplorer",
                      index,
                      e
                    )
                  }
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
              <Grid item sm={3} className="text-center">
                <TextFieldComponent
                  id={item.columnName+'-displayname'}
                  value={item.columnLabel}
                  onChange={(e) =>
                    this.handleTableConfigFieldChange("columnLabel", index, e)
                  }
                />
              </Grid>
            </Grid>
          );
        })}
      </div>
    );
  };

  handleCancel = () => {
    this.setState({ dataSource: { label: "", value: "" } });
  };

  autoFillConfig = (response) => {
    this.setState(
      {
        dataSource: {
          label: response.dataSource,
          value: response.dataSource,
        },
        uniqueId: {
          label: response.metaConfig.uniqueId,
          value: response.metaConfig.uniqueId,
        },
        nodeLabel: response.metaConfig.nodeLabel,
        targetNode: {
          label: response.metaConfig.targetNode,
          value: response.metaConfig.targetNode,
        },
        relationshipName: response.metaConfig.relationshipName,
        material: response.metaConfig.material
          ? {
              label: response.metaConfig.material,
              value: response.metaConfig.material,
            }
          : "",
        batch: response.metaConfig.batch
          ? {
              label: response.metaConfig.batch,
              value: response.metaConfig.batch,
            }
          : "",
        order: response.metaConfig.order
          ? {
              label: response.metaConfig.order,
              value: response.metaConfig.order,
            }
          : "",
        tableConfigData: response.tableConfig,
      },
      () => {
        let req = {
          column: "column_name",
          filter: {
            columnName: "data_source",
            columnValue: response.dataSource,
          },
        };
        this.getSourceColumnConfig(req, (result) => {
          if (result.status == true) {
            let dataSourceColumns = this.getInitDataSourceColumns(
              result.defaultColumns
            );
            this.setState({
              dataSourceColumns,
            });
          }
        });
      }
    );
  };

  handleSubmit = () => {
    const {
      dataSource,
      uniqueId,
      nodeLabel,
      targetNode,
      relationshipName,
      material,
      batch,
      order,
      tableConfigData,
    } = this.state;

    let columns = {};
    tableConfigData.forEach((item) => {
      columns[item.columnName] = item.fieldName;
    });
    let config = {
      dataSource: dataSource.value,
      metaConfig: {
        columns,
        uniqueId: uniqueId.value,
        nodeLabel,
        targetNode: targetNode.value,
        relationshipName,
        material: material ? material.value : undefined,
        batch: batch ? batch.value : undefined,
        order: order ? order.value : undefined,
      },
      tableConfig: tableConfigData,
    };
    let req = {
      config: JSON.stringify(config),
      source: config.dataSource,
    };
    console.log("Saved Config", req);
    // let that = this;
    this.setState({showLoader:true})
    saveSourceConfig(req).then(
      (response) => {
          // that.handleCancel();
          this.setState({ 
            showLoader: false,
            toastOpen: true,
            toastMessage: " Configuration saved successfully",
            toastVariant: "success",
           });
      },
      (err) => {
        this.setState({ 
          showLoader: false,
          toastOpen: true,
          toastMessage: "Error saving configuration",
          toastVariant: "error",
         });
      }
    );
  };

  render() {
    const {
      dataSources,
      dataSource,
      uniqueId,
      dataSourceColumns,
      nodeLabel,
      targetNodes,
      targetNode,
      relationshipName,
      material,
      batch,
      order,
      showLoader,
      toastOpen, 
      toastMessage, 
      toastVariant,
    } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Container>
          <Grid container spacing={1}>
            {showLoader && (
              <MyCircularProgress
                style={{
                  width: "70px",
                  height: "70px",
                  position: "absolute",
                  left: "600px",
                  zIndex: "1000",
                  top: "170px",
                }}
              />
            )}
            <Snackbar
            id="client-snackbar"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={toastOpen}
            autoHideDuration={3000}
            onClose={() => {
              this.setState({ toastOpen: false });
            }}
          >
            <NotificationMessage
              variant={toastVariant}
              message={toastMessage}
              onClose={() => {
                this.setState({ toastOpen: false });
              }}
            />
          </Snackbar>
            <Grid item sm={3}>
              <div className="md-autocomplete-wrapper">
                <label className="label">Data Source</label>
                <Autocomplete
                  className="md-textfield"
                  id="dataSourcedrop"
                  options={dataSources}
                  getOptionLabel={(option) => option.label}
                  value={dataSource}
                  onChange={(e, v) =>
                    this.handleAutoCompleteChange("dataSource", e, v)
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </div>
            </Grid>
            <Grid item sm={7}></Grid>
            {dataSource && dataSource.value && (
              <Grid item sm={1}>
                <div style={{ marginTop: "28px", marginLeft: "10px" }}>
                  <Button
                    id="save"
                    color="primary"
                    style={{ width: "100%" }}
                    variant="contained"
                    classes={{ label: classes.buttonLabel }}
                    onClick={this.handleSubmit}
                    type="button"
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            )}
            {dataSource && dataSource.value && (
              <Grid item sm={1}>
                <div style={{ marginTop: "28px", marginLeft: "10px" }}>
                  <Button
                    id="cancel"
                    style={{ width: "100%" }}
                    variant="contained"
                    color="default"
                    classes={{ label: classes.buttonLabel }}
                    onClick={this.handleCancel}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
          {dataSource.value && (
            <div>
              <hr></hr>
              <h5>Metadata Config</h5>
              <Grid container spacing={3} id="metaData-config">
                <Grid item sm={4}>
                  <div className="md-autocomplete-wrapper">
                    <label className="label">Unique ID</label>
                    <Autocomplete
                      id="uniqueId"
                      className="md-textfield"
                      options={dataSourceColumns}
                      getOptionLabel={(option) => option.label}
                      value={uniqueId}
                      onChange={(e, v) =>
                        this.handleAutoCompleteChange("uniqueId", e, v)
                      }
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <TextFieldComponent
                    id="nodelabel"
                    label="Node Label"
                    value={nodeLabel}
                    onChange={(e) => this.handleTextFieldChange("nodeLabel", e)}
                  />
                </Grid>
                <Grid item sm={4}>
                  <div className="md-autocomplete-wrapper">
                    <label className="label">Target Node</label>
                    <Autocomplete
                      id="targetNode"
                      className="md-textfield"
                      options={targetNodes}
                      getOptionLabel={(option) => option.label}
                      value={targetNode}
                      onChange={(e, v) =>
                        this.handleAutoCompleteChange("targetNode", e, v)
                      }
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <TextFieldComponent
                    id="relationshipName"
                    label="Relationship Name"
                    value={relationshipName}
                    onChange={(e) =>
                      this.handleTextFieldChange("relationshipName", e)
                    }
                  />
                </Grid>
                {targetNode && targetNode.value == "MaterialBatch" && (
                  <Grid item sm={4} id='material'>
                    <div className="md-autocomplete-wrapper">
                      <label className="label">Material</label>
                      <Autocomplete
                        id="material-select"
                        className="md-textfield"
                        options={dataSourceColumns}
                        getOptionLabel={(option) => option.label}
                        value={material}
                        onChange={(e, v) =>
                          this.handleAutoCompleteChange("material", e, v)
                        }
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </div>
                  </Grid>
                )}
                {targetNode && targetNode.value == "MaterialBatch" && (
                  <Grid item sm={4} id="batch">
                    <div className="md-autocomplete-wrapper">
                      <label className="label">Batch</label>
                      <Autocomplete
                        id="batch-select"
                        className="md-textfield"
                        options={dataSourceColumns}
                        getOptionLabel={(option) => option.label}
                        value={batch}
                        onChange={(e, v) =>
                          this.handleAutoCompleteChange("batch", e, v)
                        }
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </div>
                  </Grid>
                )}
                {targetNode && targetNode.value == "Order" && (
                  <Grid item sm={4} id="order">
                    <div className="md-autocomplete-wrapper">
                      <label className="label">Order</label>
                      <Autocomplete
                        id="order-select"
                        className="md-textfield"
                        options={dataSourceColumns}
                        getOptionLabel={(option) => option.label}
                        value={order}
                        onChange={(e, v) =>
                          this.handleAutoCompleteChange("order", e, v)
                        }
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
              <hr></hr>
              <h5>Table Config</h5>
              {this.TableConfigComponent()}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styles, { withTheme: true })(InjestionConfig)
);
