import { useState, useCallback } from "react";
import "./DateTime.scss";

/**
 * Props:
 *    type ("text")
 *    value (string)    [useState]
 *    setValue    [useState]
 *    placeholder (text)
 *    containerClasses [String]
 *    inline (bool)
 *    width (string)
 *    trim (bool)
 *    small (bool)    [Use either small or tiny, not both]
 *    tiny  (bool)    [Use either small or tiny, not both]
 *    verify (function(value) -> {
 *        truth (bool)
 *        error (string)
 *    })
 *    setValidationError (function(newError))
 */

function TextInput(props) {
  const [verified, setVerified] = useState(true);
  const setError = useState(null)[1];

  // Container classes
  const dynamicContainerList = useCallback(
    () => ({
      width: props.tiny
        ? "w-1/2 lg:w-1/4"
        : props.small
        ? "w-3/4 lg:w-1/2"
        : "w-full",
      inline: props.inline ? "inline-block" : "",
      widthValue: props.width ? props.width : "",
    }),
    [props]
  )();

  // User Container classes
  const containerClasses = [];
  props.containerClasses && containerClasses.push(...props.containerClasses);

  // Input field classes
  const staticInputList = useCallback(
    () => ({
      width: "w-full",
      height: "h-full",
      padding: "pl-3 pr-2",
      background: "bg-transparent",
      top: "top-1/2",
      translate: "-translate-y-1/2",
      border: "rounded box-border border-2",
      text: "text-primary",
    }),
    []
  )();

  const dynamicInputList = useCallback(
    () => ({
      borderColor: verified
        ? "border-primary/10 focus:border-primary"
        : "border-rose-600",
      color: verified ? "text-primary" : "text-rose-500",
    }),
    [verified]
  )();

  // Input placeholder span classes
  const staticSpanList = useCallback(
    () => ({
      padding: "pl-3 pr-2",
      top: "top-1/2",
      translate: "-translate-y-1/2",
      pointerEvents: "pointer-events-none",
    }),
    []
  )();

  const dynamicSpanList = useCallback(
    () => ({
      color: verified ? "text-primary" : "text-rose-500",
    }),
    [verified]
  )();

  return (
    <>
      <div
        className={`input-date-cont h-12 ${Object.values(
          dynamicContainerList
        ).join(" ")} ${containerClasses.join(" ")}`}
      >
        <input
          className={`input-elem
          ${Object.values(staticInputList).join(" ")}
          ${Object.values(dynamicInputList).join(" ")}`}
          type="datetime-local"
          htmlFor={props.for}
          name={props.name}
          onChange={(e) => {
            if (typeof props.verify === "function") {
              setVerified(props.verify(e.target.value.trim()).truth);
              setError(props.verify(e.target.value.trim()).error);
              props.setVerificationError(
                props.verify(e.target.value.trim()).error
              );
            }

            props.setValue([e.target.name, e.target.value]);
          }}
          value={props.value}
          placeholder={props.placeholder} //Hidden in css but required for selectors
        />
        <span
          className={`input-text
          ${Object.values(staticSpanList).join(" ")}
          ${Object.values(dynamicSpanList).join(" ")}`}
        >
          {" "}
          {props.placeholder}
        </span>
      </div>
      {/* {error && (
        <div
          className={
            "error text-rose-500 text-sm ml-2 " + dynamicContainerList.width
          }>
          <i className="fas fa-times"></i>&nbsp;&nbsp;{error}
        </div>
      )} */}
    </>
  );
}

export default TextInput;
