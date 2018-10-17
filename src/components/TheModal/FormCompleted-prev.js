import React from "react";

import { FormResponse, LinkButton } from "./styles";

// 43291558-865b-4992-99d4-aa9dbdd3c6fc

class FormCompleteted extends React.Component {
  state = {
    formResponse: null
  };

  UNSAFE_componentWillMount() {
    this.setState({ formResponse: this.props.formResponse });
  }

  sendEmail = () => {
    const {
      customer_name,
      job_pickup_address,
      customer_address,
      pickup_tracking_link,
      delivery_tracing_link
    } = this.props.formResponse;

    const EmailBody = `
      Hello ${customer_name},

      Voici les liens de suivis de votre course sur paps.sn

      <ul>
        <li>
          Ramassage: <a target="_blank" href="${pickup_tracking_link}" rel="noopener noreferrer">${job_pickup_address}</a>
        </li>
        <li>
          Livraison: <a target="_blank" href="${delivery_tracing_link}" rel="noopener noreferrer">${customer_address}</a>
        </li>
      </ul>
    `;
    Email.send(
      "hello@paps-app.com",
      "to@them.com",
      "Lien de suivi de votre commande sur Paps.sn",
      EmailBody,
      { token: "63cb3a19-2684-44fa-b76f-debf422d8b00" }
    );
  };

  render() {
    // if (condition) {

    // }
    const {
      job_pickup_address,
      customer_address,
      pickup_tracking_link,
      delivery_tracing_link
    } = this.state.formResponse;

    console.log(this.state.formResponse);

    return (
      <FormResponse>
        Votre commande a été prise en charge. Voici les liens pour suivre votre course:{" "}
        <ul>
          <li>
            Ramassage:{" "}
            <a target="_blank" href={pickup_tracking_link} rel="noopener noreferrer">
              {job_pickup_address}
            </a>
          </li>
          <li>
            Livraison :{" "}
            <a target="_blank" href={delivery_tracing_link} rel="noopener noreferrer">
              {customer_address}
            </a>
          </li>
        </ul>
        <LinkButton
          href="https://paps.sn?ref=express"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aller à l'acceuil
        </LinkButton>
      </FormResponse>
    );
  }
}

export default FormCompleteted;
