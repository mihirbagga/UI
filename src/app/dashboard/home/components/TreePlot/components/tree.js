import React from 'react'
import TreePlot from './multiParent'
import {
  FaPlus,
  FaMinus,
  FaExpandArrowsAlt,
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltRight
} from "react-icons/fa";
import {
  IconButton,
  Container,
  Tooltip,
} from "@material-ui/core";
import './style.scss'
import NotificationMessage from "../../../../../../utilities/snackbarComponent/components/MySnackbarContentWrapper";
import Snackbar from '@material-ui/core/Snackbar'
class Tree extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      chartData: this.props.config.data,
      selectedHeader: this.props.config.selectedHeader,
      chartType: this.props.config.chartType,
      showTreePlot: this.props.config.showTreePlot,
      loader:this.props.config.loader,
      toastOpen: false,
      toastMessage: "",
      toastVariant: "",
  
    };
    console.log(this.props.config);
  }
  handleChange = (state, evt) => {
    if (evt) {
      let value = evt.target.value;
      this.setState({
        [state]: value,
      });
    }
  };
  // handleChartClick = (nodeDetail) => {
  //   this.props.config.handleChartClick(nodeDetail)
  // }
  getPlot = (type) => {
     this.setState({
      showTreePlot: false,
      loader:true,
     chartType: type,
    },()=>{
      if (type == "forward") {
        this.getForwardPlot();
      } else if (type == "backward") {
        this.getBackwardPlot("nodeId");
      }
    });
    
  };

  getBackwardPlot = (hasNodeId) => {
    //this.setState({chartData: []})
    //this.props.clearChartData();
    const { selectedHeader } = this.state;
    const { nodeId } = this.props.config;
    console.log('nodeid backward', nodeId)
    let _req = {
      level: 5,
      matBatchNo: hasNodeId ? nodeId.replace(/\s/g, "") : selectedHeader.replace(/\s/g, ""),
    };
  
    this.props.config.getBackwardData(_req).then(
      (response) => {
        let res = response.data;
        console.log('response', res)
        if (res && res.length) {
          this.setState({
            showTreePlot: true,
            chartData: res.length>0 ? res[0] : [],
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

  getForwardPlot = () => {
    //this.setState({chartData:[]})
    const { nodeId } = this.props.config;
    let _req = {
      level: 5,
      matBatchNo: nodeId ? nodeId.replace(/\s/g, "") : "",
    };
    this.props.config.getForwardData(_req).then(
      (response) => {
        
        let res = response.data;
        console.log('response', res)
        if (res && res.length) {
             this.setState({
            showTreePlot: true,
            chartData: res ? res[0] : [],
            chartType: "forward",
          });
          //console.log('outside data', this.state.chartData)

        } else {
          this.setState({
            toastOpen: true,
            toastMessage: "No Data is returned",
            toastVariant: "error",
          })
        }
      },
      // (err) => {
      //   this.setState({
      //     ////showTreePlot: false,
      //     chartData: [],
      //   });
      // }
    ).catch(err=>console.log(err))
  };
  render() {
    console.log(this.state);
    console.log(this.state.chartData.length>0)
    //let chartData = [...this.state.chartData]
    //console.log(this.state.chartData)
    //console.log(this.state.chartType)
    const { nodeId } = this.props.config
    var Legend = []
    if (this.props.config.l) {
      var L = [...this.props.config.l];
      Legend = L
    }
    const isLegend = Legend.length
    const isZoom = this.props.config.zoom;
    let mimage = Legend[0]['icon']
    let pimage = Legend[1]['icon']
    let mcolor
    let pcolor
    var color = false
    if (mimage[0] == '#') {
      mcolor = mimage
      mimage = ''
      color = true
    }
    if (pimage[0] == '#') {
      pcolor = pimage
      pimage = ''
      color = true
    }
    //console.log('color', mcolor, pcolor)


    //console.log('slectedHeader', this.state.selectedHeader)
    //console.log('slectedHeader', this.state.////showTreePlot)

    return (
      <div className="page-container">
         <Snackbar
          id="client-snackbar"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.toastOpen}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ toastOpen: false });
          }}
        >
          <NotificationMessage
            variant={this.state.toastVariant}
            message={this.state.toastMessage}
            onClose={() => {
              this.setState({ toastOpen: false });
            }}
          />
        </Snackbar>
        {this.state.showTreePlot && 
        <Container maxWidth={false}>
          <div className="chart-tree-d3">
            <div>
              <div className="chart-legends">
                <div>
                  {isLegend > 0 && color == false ?
                    (
                      <div >
                        {Legend.map((ar) => (
                          <span>
                            <img
                              x="-12"
                              height="30"
                              width="30"
                              y="-12"
                              src={ar.icon}
                              textAnchor="start"
                              style={{ borderRadius: "50%" }}
                            />{'   '}
                            <b>{ar.name}</b>
                          </span>
                        ))}
                        <span>
                          <FaLongArrowAltRight
                            style={{ color: "rgb(0, 0, 255)" }}
                          />{" "}
                          <b>Input</b>
                        </span>{" "}
                        <span>
                          <FaLongArrowAltRight style={{ color: "darkorange" }} />{" "}
                          <b>Output</b>
                        </span>

                      </div>
                    ) : (
                      <div>
                      <span style={{ height: '25px', width: '25px', backgroundColor: mcolor, borderRadius: '50%', display: 'inline-block' }} /> &nbsp; 
                      <b style={{marginBottom:'60px'}}>{Legend[0]['name']}</b> &nbsp; &nbsp;
                      <span style={{ height: '25px', width: '25px', backgroundColor: pcolor, borderRadius: '50%', display: 'inline-block' }} />&nbsp;
                      <b>{Legend[1]['name']}</b>
                      <span>
                        <FaLongArrowAltRight
                          style={{ color: "rgb(0, 0, 255)" }}
                        />{" "}
                        <b>Input</b>
                      </span>{" "}
                      <span>
                        <FaLongArrowAltRight style={{ color: "darkorange" }} />{" "}
                        <b>Output</b>
                      </span>
                      </div>
                    )
                  }
                </div>
              </div>

              {isZoom ? (
                <div id="custom-zoom-controls" style={{ marginTop: '15px' }}>
                  <div id="zoom-out">
                    <Tooltip
                      title={<span style={{ fontSize: "12px" }}>Zoom Out</span>}
                    >
                      <IconButton
                        color="primary"
                        aria-label="zoomout"
                      // aria-describedby={""}
                      >
                        <FaMinus />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div id="zoom-reset">
                    <Tooltip
                      title={<span style={{ fontSize: "12px" }}>Reset</span>}
                    >
                      <IconButton color="primary" aria-label="zoomout">
                        <FaExpandArrowsAlt />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div id="zoom-in">
                    <Tooltip
                      title={<span style={{ fontSize: "12px" }}>Zoom In</span>}
                    >
                      <IconButton color="primary" aria-label="zoomin">
                        <FaPlus />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div id="custom-genealogy">
                <div onClick={(e) => this.getPlot("backward")} style={{ paddingRight: "63px" }}>
                  <Tooltip
                    title={
                      <span style={{ fontSize: "12px" }}>Backward Genealogy</span>
                    }
                  >
                    <IconButton
                      color="primary"
                      aria-label="zoomout"
                      id="backward-genealogy"
                      disabled={nodeId ? false : true}
                    >
                      <FaArrowLeft />
                    </IconButton>
                  </Tooltip>
                </div>
                <div onClick={(e) => this.getPlot("forward")}>
                  <Tooltip
                    title={
                      <span style={{ fontSize: "12px" }}>Forward Genealogy</span>
                    }
                  >
                    <IconButton
                      color="primary"
                      aria-label="zoomout"
                      id="forward-genealogy"
                      disabled={nodeId ? false : true}
                    >
                      <FaArrowRight />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div>
          {console.log(this.props.config.zoom)}
                <TreePlot
                  data={this.state.chartData}
                  chartType={this.state.chartType}
                  zoom={this.props.config.zoom}
                  mimage={mimage}
                  pimage={pimage}
                  mcolor={mcolor}
                  pcolor={pcolor}
                  NodeRadius={this.props.config.NodeRadius}
                  Rclick={this.props.config.contextmenu}
                  handleChartClick={this.props.config.handleChartClick}
                  backgroundColor={this.props.config.backgroundColor}
                  textColor={this.props.config.textColor}
                  handleChartType={(e) => this.getPlot(e)}
                />
              </div>
            </div>
          </div>
        </Container>
  }
      </div>
    )
  }
}

export default Tree