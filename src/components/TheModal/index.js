import React from "react";
import ReactDOM from "react-dom";

import RequestDelivery from "./RequestDelivery";

import { ModalWrapper } from "./styles";

class TheModal extends React.Component {
  el = document.body;

  render() {
    const {
      mapCountryCode,
      className,
      price,
      onModalClose,
      onResetValues,
      placesValues
    } = this.props;

    return ReactDOM.createPortal(
      <ModalWrapper className={className}>
        <RequestDelivery
          onModalClose={onModalClose}
          onResetValues={onResetValues}
          mapCountryCode={mapCountryCode}
          price={price}
          placesValues={placesValues}
        />
      </ModalWrapper>,
      this.el
    );
  }
}

export default TheModal;
