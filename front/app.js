import { app } from "hyperapp"
import { actions } from "./state/actions"
import { state } from "./state/create"
import "./style.css"

import Form from "./components/form"

app(state, actions, Form, document.getElementById("app"))
