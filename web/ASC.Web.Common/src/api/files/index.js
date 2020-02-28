import { request } from "../client";
//import axios from "axios";
import Filter from "./filter";
import * as fakeFiles from "./fake";

export function getMyFolderList(filter = Filter.getDefault(), fake = false) {

  if (fake) {
    return fakeFiles.getFakeElements(filter, "My Documents");
  }

  return request({
    method: "get",
    url: `/files/@my.json`
  });
}

export function getCommonFolderList(filter = Filter.getDefault(), fake = false) {

  if (fake) {
    return fakeFiles.getFakeElements(filter, "Common Documents");
  }

  return request({
    method: "get",
    url: `/files/@common.json`
  });
}

export function getProjectsFolderList(filter = Filter.getDefault(), fake = false) {

  if (fake) {
    return fakeFiles.getFakeElements(filter, "Project Documents");
  }

  return request({
    method: "get",
    url: `/files/@projects.json`
  });
}

export function getTrashFolderList(filter = Filter.getDefault(), fake = true) {

  if (fake) {
    return fakeFiles.getFakeElements(filter, "Recycle Bin");
  }

  return request({
    method: "get",
    url: `/files/@trash.json`
  });
}