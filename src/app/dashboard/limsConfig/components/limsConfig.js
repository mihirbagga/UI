import React, { Component } from "react";
import {
  withStyles,
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton
} from "@material-ui/core";
import { FaMinusCircle } from "react-icons/fa";
import {withRouter} from 'react-router-dom';
import "./style.css";

const styles = theme => ({
  cardRoot: {
    minWidth: 275
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonLabel: {
    textTransform: "capitalize"
  }
});

const TextFieldComponent = props => {
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

class LimsConfig extends Component {
  state = {
    selectedSource: "",
    configData: []
  };


  handleChange = (state, evt) => {
    if (evt) {
      let value = evt.target.value;
      this.setState({
        [state]: value
      });
    }
  };

  addConfig = () => {
    let data = [...this.state.configData];
    data.push({ source: this.state.selectedSource, columns: [{}] });
    this.setState({ configData: data, selectedSource: "" });
  };

  addColumn = index => {
    let data = [...this.state.configData];
    data[index]["columns"].push({});
    this.setState({ configData: data });
  };

  handleColumnChange = (columnKey, columnIndex, index, evt) => {
    if (evt) {
      let value = evt.target.value;
      let data = [...this.state.configData];
      data[index]["columns"][columnIndex][columnKey] = value;
      this.setState({configData: data})
    }
  };

  actionDelete = (type, columnIndex, index) => {
    let data = [...this.state.configData];
    if (type === 'column') {
        data[index]['columns'].splice(columnIndex, 1);
    } else if (type === 'source') {
        data.splice(index, 1);
    }
    this.setState({configData: data});
  }

  renderColumnsData = (columns, index) => {
    let columnData = columns.map((column, columnIndex) => {
      return (
        <Grid container spacing={2} key={columnIndex}>
          <Grid item sm={5}>
            <TextFieldComponent
              label="Key"
              value={column.key}
              onChange={e =>
                this.handleColumnChange("key", columnIndex, index, e)
              }
            />
          </Grid>
          <Grid item sm={5}>
            <TextFieldComponent
              label="Display Name"
              value={column.displayName}
              onChange={e =>
                this.handleColumnChange("displayName", columnIndex, index, e)
              }
            />
          </Grid>
          <Grid item sm={2}>
              <div style={{ marginTop: "10px"}}>
                <IconButton aria-label="delete" className="mat-icon-btn-danger" onClick={e => this.actionDelete("column", columnIndex, index)}>
                    <FaMinusCircle />
                </IconButton>
            </div>
          </Grid>
        </Grid>
      );
    });
    return columnData;
  };
  renderConfigData = () => {
    let data = [...this.state.configData];
    const { classes } = this.props;

    let sourceData = data.map((sourceItem, index) => {
      return (
        <Grid item sm="6" key={index}>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography
                className={classes.cardTitle}
                color="textSecondary"
                gutterBottom
              >
                {sourceItem.source}

                <span style={{ float: "right" }}>
                  <Button
                  size="small"
                    variant="contained"
                    color="primary"
                    classes={{ label: classes.buttonLabel }}
                    onClick={e => this.addColumn(index)}
                  >
                    Add Column
                  </Button>
                  <Button
                    style={{marginLeft:"5px"}}
                    size="small"
                    variant="contained"
                    color="default"
                    className="mat-btn-danger"
                    classes={{ label: classes.buttonLabel }}
                    onClick={e => this.actionDelete("source", index)}
                  >
                    Delete Source
                  </Button>
                </span>
              </Typography>
              <div>
                  <hr />
              </div>

              {sourceItem.columns &&
                sourceItem.columns.length > 0 &&
                this.renderColumnsData(sourceItem.columns, index)}
            </CardContent>
          </Card>
        </Grid>
      );
    });

    return sourceData;
  };

  saveConfig = () => {
    console.log("Config", this.state.configData);
  };
  render() {
    const { classes } = this.props;
    const { selectedSource, configData } = this.state;
    return (
      <div>
        <Container>
          <div>
            <div className="action-add">
              <Grid container spacing={3}>
                <Grid sm={3}>
                  <TextFieldComponent
                    label="Source"
                    value={selectedSource}
                    onChange={e => this.handleChange("selectedSource", e)}
                  />
                </Grid>
                <Grid sm={3}>
                  <div style={{ marginTop: "27px", marginLeft: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      classes={{ label: classes.buttonLabel }}
                      onClick={this.addConfig}
                    >
                      Add
                    </Button>
                  </div>
                </Grid>
                <Grid sm={6}>
                  {configData && configData.length > 0 && <div style={{ float: "right", marginTop: "15px" }}>
                    <Button
                      style={{minWidth: "100px"}}
                      variant="contained"
                      color="primary"
                      classes={{ label: classes.buttonLabel }}
                      onClick={this.saveConfig}
                    >
                      Save
                    </Button>
                  </div>}
                </Grid>
              </Grid>
            </div>
            <div className="config-view">
              <hr />
              {configData && configData.length > 0 && (
                <Grid container spacing={3}>
                  {this.renderConfigData()}
                </Grid>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(LimsConfig));
