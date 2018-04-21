import { h } from "hyperapp";
import HField from "./hfield";
import FormModel from "../form-model";
import FileUpload from "../file-upload";

export default (state, actions) => {

  const bindChange = fname => ({
    onchange: evt => actions.fieldChange({ [fname]: evt.target.value }),
    value: state.form[fname]
  })

  const bindFileChange = {
    onchange: evt => actions.fieldChange({ "file": evt.target.files[0] })
  }

  const submit = _ => {
    const errMessage = FormModel.validate(state.form);
    actions.updateErrMessage(errMessage);

    if (!errMessage) {
      FileUpload.doFileUpload({
        file: state.form.file,
        onProgress: process => actions.pushProgress(progress),
        onSuccess: uid => FormModel.send(uid, state.form).then(({ data }) => actions.pushProgress(100))
      });
    }
  }

  return (
    <div class="container">
      <section class="brew-placeholder">
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      </section>
      <section class="form-placeholder">
        <form>
          {state.errMessage && <div class="notification is-warning">
            {state.errMessage}
          </div>}

          {!!state.progress && <progress class="progress is-info" value={state.progress} max="100">
            {state.progress}%
          </progress>}

          {state.progress === 100 && <div class="notification is-success">
            Your upload has been successfuly processed
          </div>}


          <HField label="Name">
            <input placeholder="Enter your name" {...bindChange("name")} class="input"/>
          </HField>
          <HField label="Email">
            <input placeholder="Enter your Email" {...bindChange("email")} class="input"/>
          </HField>
          <HField label="Your comments">
            <textarea placeholder="Got any comments? let us know!" {...bindChange("comments")} class="textarea"></textarea>
          </HField>
          <HField label="File">
            <input {...bindFileChange} type="file" class="input"/>
          </HField>
          <HField>
            <button onclick={_ => submit()} type="button" class="button">Submit</button>
          </HField>
        </form>
      </section>
    </div>
  )
}
