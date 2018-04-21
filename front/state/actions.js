export const actions = {
  fieldChange: change => state => ({ ...state, form: { ...state.form, ...change } }),
  updateErrMessage: errMessage => state => ({ ...state, errMessage }),
  pushProgress: progress => state => ({ ...state, progress })
}
