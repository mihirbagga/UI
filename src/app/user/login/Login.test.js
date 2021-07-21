import {Login} from "./components/Login";
import React from "react";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import { API_AUTHENTICATION_URL } from "../../../constants/apiBaseUrl";
import { userLogin } from "../../../utilities/userAuthentication";
import { commonTests } from "../../../utilities/common.test";

const componentName = "Login";

describe("Login Page Test", () => {
  let wrapper, shallow, mount;
  let username = "demo";
  let password = "demo";
  let loginRequest = {
    username: username,
    password: password
  };

  let loginResponse = {
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vIiwiYXV0aCI6WyJST0xFX1NZU0FETUlOIiwiUk9MRV9HUk9VUF9OQU1FIiwiUk9MRV9ERU1PMl9HUlAiXSwiaWF0IjoxNTY0Mzg1NTA4LCJleHAiOjE1NjQzODU2Mjh9.OoDzCCfkfR2neFvzcNbtv2p82jqL4rthooksnJNmYBc",
    refreshToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vIiwiYXV0aCI6WyJST0xFX1NZU0FETUlOIiwiUk9MRV9HUk9VUF9OQU1FIiwiUk9MRV9ERU1PMl9HUlAiXSwic2NvcGVzIjpbIlJPTEVfUkVGUkVTSF9UT0tFTiJdLCJpYXQiOjE1NjQzODU1MDgsImV4cCI6MTU2NDQwNzEwOH0.bDHoMtNdEn3OadKrrkRueH2JeuiN62PFGY4q0mAJoM4",
    jti: null
  };

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  afterEach(() => {
    // mount.cleanUp();
  });

  // Check if Page renders
  commonTests.checkRender({
    component: <Login />,
    componentName
  });

  // Check if username value is saved in state
  commonTests.checkState({
    component: <Login />,
    field: '#username',
    value: loginRequest.username,
    stateObjKey: ["userdetails", "username"],
    componentName
  });

  // Check if password value is saved in state
  commonTests.checkState({
    component: <Login />,
    field: '#password',
    value: loginRequest.password,
    stateObjKey: ["userdetails", "password"],
    componentName
  });

  // Check if login button is clickable
  it("login button is clickable", () => {
    const buttonSpy = jest.fn();
    wrapper = mount(<Login handleSubmit={buttonSpy} />);
    const fakeEvent = { preventDefault: () => {} };
    wrapper.find("form#login-form").simulate("submit", fakeEvent);
    expect(buttonSpy).toHaveBeenCalled()
  });

//   // Check if login api works
//   commonTests.checkAPI({
//     baseUrl: API_AUTHENTICATION_URL,
//     subUrl: "/signin",
//     request: loginRequest,
//     response: loginResponse,
//     service: userLogin,
//     keyToCompare: ["accessToken"],
//     componentName
//   });

  // Check if username is stored in localStorage
//   commonTests.checkLocalStorage({
//     key: "user",
//     value: loginRequest.username,
//     componentName
//   });

//   // Check if usertoken is stored in localStorage
//   commonTests.checkLocalStorage({
//     key: "usertoken",
//     value: loginResponse.accessToken,
//     componentName
//   });

//   // Check if userrefreshtoken is stored in localStorage
//   commonTests.checkLocalStorage({
//     key: "userrefreshtoken",
//     value: loginResponse.accessToken,
//     componentName
//   });
});
