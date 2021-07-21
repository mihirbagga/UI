import React from "react";
import APPCONFIG from "../../../../constants/appConfig";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { userLogin } from "../../../../utilities/userAuthentication";
import { withRouter } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../../../../utilities/snackbarComponent/components/MySnackbarContentWrapper";
import auth from "../../../../utilities/auth";
import Icon from "../../../../assets/brand_logo.png";

import "./login.scss";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      userdetails: {
        username: "",
        password: "",
      },
      open: false,
      toastOpen: false,
      toastMessage: "",
      toastVariant: "",
      appId: "",
      connectionString: "",
      description1: "",
    };
  }

  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  componentDidMount() {
  
  }

  handleSubmit = (event) => {
    if (this.props.handleSubmit) this.props.handleSubmit(); // testing
    let array = new Uint32Array(1);
    const randomNumber = window.crypto.getRandomValues(array);
    const user = {
      username: this.state.userdetails.username,
      password: this.state.userdetails.password,
      transaction_id : Date.now() + randomNumber[0],
    };
    event.preventDefault();
    userLogin(user).then((res) => {
      if (res.accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify(this.state.userdetails.username)
        );
        localStorage.setItem("usertoken", res.accessToken);
        localStorage.setItem("userrefreshtoken", res.refreshToken);
        auth.login(() => {
          this.props.history.push("/app/home");
        });
      } else {
        this.setState({
          toastOpen: true,
          toastMessage: res.message,
          toastVariant: "error",
        });
      }
    });
  };
  handleChanges = (pname, event) => {
    const details = this.state;
    details[pname] = event.target.value;
    this.setState({
      userdetails: details,
    });
  };

  render() {
    return (
      <div className="page-login bg-img">
        <div className="page-login-header">
        <span className="brand-name">{APPCONFIG.brand}</span>
          <a href={APPCONFIG.brandUrl} target="_blank" rel="noopener noreferrer" >
            <img src={Icon} alt={"logo"} className="logo" />
          </a>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.toastOpen}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ toastOpen: false });
          }}
        >
          <MySnackbarContentWrapper
            variant={this.state.toastVariant}
            message={this.state.toastMessage}
            onClose={() => {
              this.setState({ toastOpen: false });
            }}
          />
        </Snackbar>
        <div className="main-body">
          <div className="body">
            <form
              id="login-form"
              className="form-horizontal"
              style={{ marginTop: "30px" }}
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <Card raised={true} className="login-card">
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item sm={12} style={{marginTop: '10px'}}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        fullWidth
                        value={this.state.userdetails.username}
                        onChange={(e) => this.handleChanges("username", e)}
                      />
                    </Grid>
                    <Grid item sm={12} style={{marginTop: '5px'}}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        type="password"
                        value={this.state.userdetails.password}
                        onChange={(e) => this.handleChanges("password", e)}
                      />
                    </Grid>
                    <Grid item sm={12} style={{paddingBottom: "15px"}}>
                      <Button
                        id="login-btn"
                        variant="contained" 
                        color="primary"
                        type="submit"
                        style={{
                          textTransform: "inherit",
                          fontWeight: "700",
                          float: "right",
                        }}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const NewLogin = withRouter(Login);
export default NewLogin;
