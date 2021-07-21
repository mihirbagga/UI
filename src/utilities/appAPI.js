import { API_APPLICATION } from "../constants/apiBaseUrl";
import { AjaxService } from "./AjaxService";

export const getFilterData = (_reqParam) => {
  return AjaxService.post(
    API_APPLICATION + "/mdh-getFilteredResultSet-service",
    JSON.stringify(_reqParam)
  );
};

export const getBackwardData = (_reqParam) => {
  return AjaxService.post(
    API_APPLICATION + "/mdh-getBackwardGeneology-service",
    JSON.stringify(_reqParam)
  );
};

export const getForwardData = (_reqParam) => {
  return AjaxService.post(
    API_APPLICATION + "/mdh-getForwardGeneology-service",
    JSON.stringify(_reqParam)
  );
};

export const getMaterialBatch = (_reqParam) => {
  return AjaxService.post(
    API_APPLICATION + "/mdh-getMaterialBatchDetails-service",
    JSON.stringify(_reqParam)
  );
};

export const getTableData = (url, _reqParam) => {
  return AjaxService.post(url, JSON.stringify(_reqParam));
};

export const getSourceColumnList = (_reqParam) => {
  return AjaxService.post(API_APPLICATION + "/getColumnList", _reqParam);
};
export const getSourceConfig = (_reqParam) => {
  return AjaxService.get(API_APPLICATION + "/getConfig", _reqParam);
};
export const saveSourceConfig = (_reqParam) => {
  return AjaxService.post(API_APPLICATION + "/saveConfig", _reqParam);
};
