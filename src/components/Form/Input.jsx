import TextInput from "./text/TextInput";
import PswdInput from "./pswd/PswdInput";
import Date from "./date/Date";
import OptionsInput from "./options/OptionsInput";

function Input(props) {
  switch (props.type) {
    case "password":
      return <PswdInput {...props} />;

    case "options":
      return <OptionsInput {...props} />;

    case "date":
      return <Date {...props} />;

    default:
      return <TextInput {...props} />;
  }
}

export default Input;
