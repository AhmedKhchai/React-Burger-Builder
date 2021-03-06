import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    constructor(props) {
      super(props);
      this.reqInteceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
      console.log("Will Unmount", this.reqInteceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInteceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {/* Something Didn't Work ! */}
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
