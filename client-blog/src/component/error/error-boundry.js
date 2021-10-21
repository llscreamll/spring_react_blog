import React from "react";
import Loading from "../loading/loading-page";

export default class ErrorBoundry extends React.Component{

    state = {
        hasError :false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError : true
        })
    }

    render() {
        if(this.state.hasError){
            return <Loading />
        }else {
            return this.props.children;
        }
    }

}