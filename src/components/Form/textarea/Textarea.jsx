import { useState, useCallback, useRef } from "react";
import "./Textarea.scss";

/**
 * Props:
 *    type ("text")
 *    value (string)    [useState]
 *    setValue    [useState]
 *    placeholder (text)
 *    containerClasses [String]
 *    resize (bool)
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

function Textarea(props) {
  const [verified, setVerified] = useState(true);
  const setError = useState(null)[1];

  const textArea = useRef();

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
      height: props.minHeight ? `h-[${props.minHeight}px]` : "h-full",
      padding: "px-2 py-2",
      background: "bg-transparent",
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
      resize: props.resize ? "" : "resize-none",
    }),
    [verified, props]
  )();

  const handleResize = (e) => {
    textArea.current.style.height = "1px";
    textArea.current.style.height =
      Math.min(
        parseInt(props.maxHeight) || 1600,
        Math.max(parseInt(props.minHeight) || 0, e.target.scrollHeight)
      ) + "px";
  };

  return (
    <>
      <div
        className={`inputArea-cont h-full flex items-center
        ${Object.values(dynamicContainerList).join(
          " "
        )} ${containerClasses.join(" ")}`}>
        <textarea
          ref={textArea}
          className={`inputArea-elem 
          ${Object.values(staticInputList).join(" ")}
          ${Object.values(dynamicInputList).join(" ")}`}
          type="text"
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

            if (props.trim) {
              e.target.value = e.target.value.trim();
            }
            props.setValue(e.target.value);
            handleResize(e);
          }}
          value={props.value}
          placeholder={props.placeholder} //Hidden in css but required for selectors
        />
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

export default Textarea;
