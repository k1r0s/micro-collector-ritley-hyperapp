import { h } from "hyperapp"

export default ({ label }, children) => (
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">{label}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">{children}</p>
      </div>
    </div>
  </div>
)
