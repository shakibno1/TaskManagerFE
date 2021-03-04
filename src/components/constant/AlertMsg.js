import React, { Component } from 'react';
import { useAlert } from 'react-alert'

const AlertMsg = (props) => {
    debugger;
    const alert = useAlert();
    return(
        alert.success("Data save successfully")
    );
}
export default AlertMsg;

