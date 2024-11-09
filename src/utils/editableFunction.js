const editableFunction = (
  isEditable,
  editableCallback,
  nonEditbaleCallback
) => {
  if (isEditable) {
    if (editableCallback) {
      editableCallback();
    } else {
      return;
    }
  } else {
    if (nonEditbaleCallback) {
      nonEditbaleCallback();
    } else {
      return;
    }
  }
  return;
};

export default editableFunction;
