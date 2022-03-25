import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

/**
 * Props:
 *    text (string)
 *    link (string)
 *    flat (bool)
 *    size (string: small | large)
 *    disabled (bool)
 *    outline (bool)
 *    focus (bool)
 *    classList ([string])
 *    func (function () => void)
 */

function Button(props) {
  const navigate = useNavigate();

  // Calculate
  const size = useCallback(() => {
    if (props.size === "small")
      return {
        px: "px-1 md:px-2",
        py: "py-1",
        fontSize: "text-micro md:text-xs",
      };
    else if (props.size === "large")
      return {
        px: "px-3 md:px-7",
        py: "py-2 md:py-4",
        fontSize: "text-sm md:text-base",
      };
    else
      return {
        px: "px-1 md:px-3",
        py: "py-1 md:py-2",
        fontSize: "text-xs md:text-sm",
      };
  }, [props])(props);

  const border = useCallback(() => {
    if (props.outline) {
      if (props.size === "small") {
        return "border";
      } else if (props.size === "large") {
        return "border-3";
      } else {
        return "border-2";
      }
    } else {
      return "";
    }
  }, [props])(props);

  // Classes
  const staticClasses = ["text-center", "uppercase", "transition-colors"];
  props.classList && staticClasses.push(...props.classList);

  const dynamicList = useCallback(
    () => ({
      ...size,
      rounded: props.flat ? "" : "rounded",

      text: props.outline
        ? "text-back hover:text-dark"
        : "text-dark hover:text-back",

      bg: props.outline
        ? "bg-tertiary hover:bg-quaternary"
        : "bg-quaternary hover:bg-primary",

      border: props.outline
        ? `${border} border-transparent hover:border-primary`
        : "",

      focus: props.focus
        ? "focus:bg-tertiary focus:border-secondary focus:text-back"
        : "",

      disabled: props.disabled ? "cursor-not-allowed" : "",
    }),
    [props, border, size]
  )();

  return (
    <button
      className={
        Object.values(dynamicList).join(" ") + " " + staticClasses.join(" ")
      }
      onClick={(e) => {
        e.preventDefault();
        props.func && !props.disabled && props.func({ e });
        props.link && !props.disabled && navigate(props.link);
      }}>
      {props.text}
    </button>
  );
}

export default Button;
