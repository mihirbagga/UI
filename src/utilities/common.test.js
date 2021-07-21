import { shallow, render, mount } from "enzyme";
import nock from "nock";
import { storageMock } from "./mock_local_storage";
let localStorage = storageMock();

// get object value from nested object
const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

export const commonTests = {
  // check shallow render of component
  checkShallow: (options) => {
    const { component, componentName } = options;

    it(`${componentName} shallow renders`, () => {
      shallow(component);
    });
  },
  // check mount of component
  checkMount: (options) => {
    const { component, componentName } = options;

    it(`${componentName} mounts`, () => {
      mount(component);
    });
  },
  // check render of component
  checkRender: (options) => {
    const { component, componentName } = options;
    it(`${componentName} renders`, () => {
      render(component);
    });
  },
  // check if a value set on field is saved in component state
  checkState: (options) => {
    let wrapper;
    const {
      component,
      field,
      name,
      value,
      stateObjKey,
      componentName,
    } = options;

    it(`${componentName} > ${stateObjKey.join(" > ")} check`, () => {
      wrapper = shallow(component);
      wrapper
        .find(field)
        .simulate("change", { target: { name: name, value: value } });

      let componentState = getNestedObject(wrapper.state(), stateObjKey);
      expect(componentState).toEqual(value);
    });
  },
  // mock API http calls
  checkAPI: (options) => {
    const {
      baseUrl,
      subUrl,
      request,
      response,
      service,
      keyToCompare,
      componentName,
    } = options;
    test(`${componentName} > ${baseUrl + subUrl}`, async () => {
      nock(baseUrl).post(subUrl, request).reply(200, response);

      await service(request).then((resp) => {
        let compareVal = getNestedObject(resp, keyToCompare);
        let actualVal = getNestedObject(response, keyToCompare);
        expect(compareVal).toEqual(actualVal);
      });
    });
  },
  // mock localstorage key value
  checkLocalStorage: (options) => {
    const { key, value, componentName } = options;
    it(`${componentName} > ${key} check`, () => {
      localStorage.setItem(key, value);
      expect(localStorage.getItem(key)).toEqual(value);
    });
  },
  // check if button is clickable
  checkButtonClick: (callbackOptions) => {
    const {
      component,
      btnSpy,
      btnComponent,
      componentName,
    } = callbackOptions();
    let wrapper;

    it(`${componentName} > ${btnComponent} button check`, () => {
      wrapper = mount(component);
      wrapper.find(btnComponent).simulate("click");
      expect(btnSpy).toHaveBeenCalled();
    });
  },
  // check if form is submittable
  checkFormSubmit: (callbackOptions) => {
    const {
      component,
      fnSpy,
      formComponent,
      componentName,
    } = callbackOptions();
    let wrapper;

    it(`${componentName} > ${formComponent} form check`, () => {
      wrapper = mount(component);
      wrapper
        .find(formComponent)
        .simulate("submit", { preventDefault: () => {} });
      expect(fnSpy).toHaveBeenCalled();
    });
  },
  checkComponentMethod: (options) => {
    let wrapper;
    const {
      component,
      method,
      stateObjKey,
      expectedVal,
      methodArguments,
      componentName,
      testCase,
    } = options;

    it(testCase, () => {
      wrapper = shallow(component);
      let instance = wrapper.instance(); // get class instance
      instance[method](...methodArguments); // will trigger component method
      // wrapper.update(); // re-render component
      let actualVal = getNestedObject(wrapper.state(), stateObjKey); // get state key value
      expect(expectedVal).toEqual(actualVal);
    });
  },
  checkMethodOutput: (options) => {
    let wrapper, instance;
    const {
      component,
      method,
      expectedVal,
      methodArguments,
      componentName,
      testCase,
    } = options;
    it(testCase, () => {
      wrapper = shallow(component);
      instance = wrapper.instance();
      let actualVal = instance[method](...methodArguments);
      expect(actualVal).toEqual(expectedVal);
    });
  },
  checkFunctionCall: (callbackOptions) => {
    const {
      component,
      method,
      methodArguments,
      fnSpy,
      componentName,
    } = callbackOptions();
    let wrapper;

    it(`${componentName} > ${method} form check`, () => {
      wrapper = shallow(component);
      let instance = wrapper.instance(); // get class instance
      instance[method](...methodArguments); // will trigger component method
      expect(fnSpy).toBeTruthy();
    });
  },
};

// just to avoid warning, that no tests in test file
describe("Common tests for CommonService implementations", () => {
  test.skip("skip", () => {});
});
