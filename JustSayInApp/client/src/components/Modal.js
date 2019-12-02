import React from 'react';
import { withRouter } from 'react-router-dom';
import AddContacts from "./AddContacts";

const Modal = () => (
  <div
    role="button"
    className="modal-wrapper"
    onClick={() => this.props.history.goBack()}
  >
    <div
      role="button"
      className="modal"
      onClick={e => e.stopPropagation()}
    >
      <AddContacts />
    </div>
  </div>
);

export default withRouter(Modal);