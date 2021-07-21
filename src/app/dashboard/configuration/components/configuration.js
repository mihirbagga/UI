import React, { Component } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { withRouter } from 'react-router-dom';
import "../styles.scss";

class Configuration extends Component {

  render() {
    return (
      <div id="treeWrapper" class="mainDiv">
        <div className="tablediv">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    SAP 1
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Movement Type</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">LinkTo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">101</TableCell>
                  <TableCell align="right">Receipt</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">102</TableCell>
                  <TableCell align="right">Reversal</TableCell>
                  <TableCell align="right">101</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">261</TableCell>
                  <TableCell align="right">Issue</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">262</TableCell>
                  <TableCell align="right">Reversal</TableCell>
                  <TableCell align="right">261</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">901</TableCell>
                  <TableCell align="right">Receipt</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="tablediv">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    SAP 2
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Movement Type</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">LinkTo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">101</TableCell>
                  <TableCell align="right">Receipt</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">102</TableCell>
                  <TableCell align="right">Reversal</TableCell>
                  <TableCell align="right">101</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">261</TableCell>
                  <TableCell align="right">Issue</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">262</TableCell>
                  <TableCell align="right">Reversal</TableCell>
                  <TableCell align="right">261</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">921</TableCell>
                  <TableCell align="right">Receipt</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="tablediv">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    JDE 1
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Movement Type</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">LinkTo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">U5</TableCell>
                  <TableCell align="right">Receipt</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">SU</TableCell>
                  <TableCell align="right">Issue</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="tablediv width-100per">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    Cross Site / Cross system
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">Plant</TableCell>
                  <TableCell align="right">Vendor</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Movement Type</TableCell>
                  <TableCell align="right">Document</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">US01</TableCell>
                  <TableCell align="right">MX01</TableCell>
                  <TableCell align="right">Site</TableCell>
                  <TableCell align="right">101</TableCell>
                  <TableCell align="right">UB</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">US01</TableCell>
                  <TableCell align="right">EUDIV</TableCell>
                  <TableCell align="right">System</TableCell>
                  <TableCell align="right">101</TableCell>
                  <TableCell align="right">NB</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
export default withRouter(Configuration);
