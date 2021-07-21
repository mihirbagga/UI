import React, { Component } from "react";
import { withStyles, Divider } from "@material-ui/core";
import { withRouter } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import StorageIcon from "@material-ui/icons/Storage";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import DescriptionIcon from "@material-ui/icons/Description";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ShareIcon from "@material-ui/icons/Share";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { FaPlay, FaStop } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    boxShadow: "none",
    marginBottom: 15,
  },
  root: {
    width: "30%",
    margin: "20px",
    height: "257px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  selectBox: {
    border: "1px solid rgba(0, 0, 0, 0.26)",
    // display: "grid",
    "border-radius": "5px",
    width: "100%",
    // "grid-template-columns": "1fr 0.05fr"
  },
  inputlabel: {
    transform: "translate(1px, -6px) scale(0.75)",
  },
  inputRoot: {
    fontSize: "14px !important",
  },
  labelRoot: {
    fontSize: "13px !important",
    transform: "translate(0, -17px) scale(1) !important",
    fontWeight: 600,
  },
  typography: {
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 400,
  },
});

export class Connector extends Component {
  state = {
    errorLogsDialogOpen: null,
    sourceSystemDialogOpen: null,
    anchorEl: null,
  };
  constructor(props) {
    super(props);
  }

  handleJobsClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleJobsClose = () => {
    this.setState({ anchorEl: null });
  };

  handleErrorLogsDialogClick = () => {
    this.setState({ errorLogsDialogOpen: true });
  };

  handleSourceSystemDialogClick = () => {
    this.setState({ sourceSystemDialogOpen: true });
  };

  handleErrorLogsDialogClose = () => {
    this.setState({ errorLogsDialogOpen: false });
  };

  handleSourceSystemDialogClose = () => {
    this.setState({ sourceSystemDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const {
      anchorEl,
      errorLogsDialogOpen,
      sourceSystemDialogOpen,
    } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <div className="mainDiv">
        <Card className={classes.root}>
          <CardHeader
            className="cardHeader"
            titleColor="white"
            titleStyle={{ textAlign: "center" }}
            title="SAP 1"
          />
          <CardContent style={{ height: "60%" }}>
            <DescriptionIcon className="imagePosition green" />
          </CardContent>
          <CardActions>
            <IconButton
              className="iconBut"
              aria-label=""
              onClick={this.handleErrorLogsDialogClick}
            >
              <ErrorOutlineIcon />
            </IconButton>
            <IconButton
              className="iconBut"
              aria-label=""
              aria-describedby={id}
              onClick={this.handleJobsClick}
            >
              <ImportExportIcon />
            </IconButton>
            <IconButton
              className="iconBut"
              aria-label=""
              onClick={this.handleSourceSystemDialogClick}
            >
              <StorageIcon />
            </IconButton>

 
            <IconButton className="iconButLast" aria-label="" target="_blank" href="http://demo.mareana.com/SPECTRA/login?app=ROLE_E2EMF"/>
  
            <IconButton
              className="iconButLast"
              aria-label=""
              // target="_blank"
              // href="http://demo.mareana.com/SPECTRA/login?app=ROLE_E2EMF"
            >
   
              <LaptopMacIcon />
            </IconButton>
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardHeader className="cardHeader" title="SAP 2">
            <IconButton className="iconBut" aria-label="Close">
              <ShareIcon />
            </IconButton>
          </CardHeader>
          <CardContent style={{ height: "60%" }}>
            <DescriptionIcon className="imagePosition red" />
          </CardContent>
          <CardActions>
            <IconButton
              className="iconBut"
              aria-label=""
              onClick={this.handleErrorLogsDialogClick}
            >
              <ErrorOutlineIcon />
            </IconButton>
            <IconButton
              className="iconBut"
              aria-label=""
              aria-describedby={id}
              onClick={this.handleJobsClick}
            >
              <ImportExportIcon />
            </IconButton>
            <IconButton
              className="iconBut"
              aria-label=""
              onClick={this.handleSourceSystemDialogClick}
            >
              <StorageIcon />
            </IconButton>

 
            <IconButton className="iconButLast" aria-label="" target="_blank" href="http://demo.mareana.com/SPECTRA/login?app=ROLE_E2EMF"/>
  
            <IconButton
              className="iconButLast"
              aria-label=""
              // target="_blank"
              // href="http://demo.mareana.com/SPECTRA/login?app=ROLE_E2EMF"
            >
   
              <LaptopMacIcon />
            </IconButton>
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardHeader className="cardHeader" title="JDE 1">
            <IconButton className="iconBut" aria-label="Close">
              <ShareIcon />
            </IconButton>
          </CardHeader>
          <CardContent style={{ height: "60%" }}>
            <DescriptionIcon className="imagePosition yellow" />
          </CardContent>
          <CardActions>
            <IconButton className="iconBut" aria-label="">
              <ErrorOutlineIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="">
              <ImportExportIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="">
              <StorageIcon />
            </IconButton>

            <IconButton className="iconButLast" aria-label="">
              <LaptopMacIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader className="cardHeader" title="eLIMS">
            <IconButton className="iconBut" aria-label="Close">
              <ShareIcon />
            </IconButton>
          </CardHeader>
          <CardContent style={{ height: "60%" }}>
            <DescriptionIcon className="imagePosition green" />
          </CardContent>
          <CardActions>
            <IconButton className="iconBut" aria-label="">
              <ErrorOutlineIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="">
              <ImportExportIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="">
              <StorageIcon />
            </IconButton>

            <IconButton className="iconButLast" aria-label="">
              <LaptopMacIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader className="cardHeader" title="Documentum">
            <IconButton className="iconBut" aria-label="Close">
              <ShareIcon />
            </IconButton>
          </CardHeader>
          <CardContent style={{ height: "60%" }}>
            <DescriptionIcon className="imagePosition red" />
          </CardContent>
          <CardActions>
            <IconButton className="iconBut" aria-label="">
              <ErrorOutlineIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="">
              <ImportExportIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="">
              <StorageIcon />
            </IconButton>

            <IconButton className="iconButLast" aria-label="">
              <LaptopMacIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardHeader className="cardHeader" title="Sharepoint">
            <IconButton className="iconBut" aria-label="Close">
              <ShareIcon />
            </IconButton>
          </CardHeader>
          <CardContent style={{ height: "60%" }}>
            <DescriptionIcon className="imagePosition yellow" />
          </CardContent>
          <CardActions>
            <IconButton className="iconBut" aria-label="Close">
              <DeleteIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton className="iconBut" aria-label="share">
              <ShareIcon />
            </IconButton>

            <IconButton className="iconButLast" aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleJobsClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Typography
            className={classes.typography}
            variant="h6"
            style={{ paddingTop: "5px", paddingBottom: "5px" }}
          >
            Jobs
          </Typography>
          <Divider />
          <Typography
            className={classes.typography}
            variant="body2"
            style={{ paddingTop: "10px" }}
          >
 
            qSync Workflow -
  
            <a
              //  href="http://192.168.1.80:8889/hue/jobbrowser/#!id=0000019-210310152118359-oozie-oozi-W"
              // href="http://192.168.1.80:8889/hue/jobbrowser/#!id=0000027-210310152118359-oozie-oozi-W"
              // target="_blank"
            >
              qSync Workflow -
            </a>

   
            <span className="jobs-icon-action">
              <IconButton size="small" className="green">
                <FaPlay />
              </IconButton>
            </span>
            <span className="jobs-icon-action">
              <IconButton size="small" className="red">
                <FaStop />
              </IconButton>
            </span>
            <span className="jobs-icon-action">
              <IconButton size="small" className="green">
                <FiRefreshCw />
              </IconButton>
            </span>
          </Typography>
        </Popover>

        <div>
          {/* Error Logs Dialog */}
          <Dialog
            open={errorLogsDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleErrorLogsDialogClose}
            aria-labelledby="dialog-error-logs-title"
            aria-describedby="dialog-error-logs-description"
          >
            <DialogTitle id="dialog-error-logs-title">Error Logs</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="dialog-error-logs-description">
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Out of Memory - 14
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Connection Timeout - 2
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Application Error - 7
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Others -
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleErrorLogsDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          {/* Error Logs Dialog END*/}
        </div>
        <div>
          {/* Source System*/}
          <Dialog
            open={sourceSystemDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleSourceSystemDialogClose}
            aria-labelledby="dialog-source-systems-title"
            aria-describedby="dialog-source-systems-description"
          >
            <DialogTitle id="dialog-source-systems-title">
              Source Systems
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="dialog-source-systems-description">
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Scheduled Refresh
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Daily
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Ping Stat
                        </TableCell>
                        <TableCell component="th" scope="row">
                          Successfull,5 mins back
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Encryption Type
                        </TableCell>
                        <TableCell component="th" scope="row">
                          RSA
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Data Encoding
                        </TableCell>
                        <TableCell component="th" scope="row">
                          UTF-8
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Location
                        </TableCell>
                        <TableCell component="th" scope="row">
                          FTP
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Connectivity (FTP, API, webservice, file copy)
                        </TableCell>
                        <TableCell component="th" scope="row">
                          FTP
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Connection string
                        </TableCell>
                        <TableCell component="th" scope="row">
                          JDBC:192.169.101.323:5423
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSourceSystemDialogClose}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          {/* Source System END*/}
        </div>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(Connector));
