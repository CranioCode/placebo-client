import TextInput from "./text/TextInput";
import PswdInput from "./pswd/PswdInput";
import Date from "./date/Date";
import DateTime from "./datetime/DateTime";
import OptionsInput from "./options/OptionsInput";
import Textarea from "./textarea/Textarea";

function Input(props) {
  switch (props.type) {
    case "password":
      return <PswdInput {...props} />;

    case "options":
      return <OptionsInput {...props} />;

    case "date":
      return <Date {...props} />;
    
    case "textarea":
      return <Textarea {...props} />;
      

    case "datetime":
      return <DateTime {...props} />;

    default:
      return <TextInput {...props} />;
  }
}

export default Input;
