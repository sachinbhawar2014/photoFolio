import Spinner from "react-spinner-material";
import React, { Component } from "react";

export default class Example extends Component {
    render() {
        return (
            <div>
                <Spinner radius={50} color={"#d627ca"} stroke={6} visible={true} />
            </div>
        );
    }
}
