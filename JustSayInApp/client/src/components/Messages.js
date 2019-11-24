import React from "react";

const Messages = () => {
  return (
    <form className="recipient-box">
      <fieldset>
        <legend>Recipients</legend>
        <input id="1" language="es" type="checkbox" />
        <label htmlFor="1">Naomi</label>
        <br />
        <input id="2" type="checkbox" language="th" />
        <label htmlFor="2">Noi</label>
      </fieldset>
      <br />
      <input
        type="submit"
        value="Send message"
        onClick={this.sendMessages}
      />
    </form>
  )
}
export default Messages;