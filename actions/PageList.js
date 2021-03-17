/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import {GET_PAGE_LIST} from '../constants';

export const setPageList = pageList => {
  return {
    type: GET_PAGE_LIST,
    payload: pageList,
  };
};

export const getPageList = pageList => {
  return async dispatch => {
    try {
      const apiReq = await fetch(
        'http://dummy.restapiexample.com/api/v1/employees',
        {
          method: 'GET',
        },
      );
      console.log(apiReq);
      await dispatch(setPageList(apiReq));
      return apiReq || [];
    } catch (err) {
      console.error(err);
    }
  };
};
