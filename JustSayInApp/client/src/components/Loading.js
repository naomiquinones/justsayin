import React from "react"
import { FontAwesomeIcon } from 'react-fontawesome'
// import { fa-globe-americas } from '@fortawesome/free-solid-svg-icons'

function Loading(props) {
return <p className="loading-message">Loading...{props.message}<i class="fas fa-globe-americas"></i></p>

}

export default Loading