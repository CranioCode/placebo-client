import "./Loader.scss";

const Loader = ({ message }) => {
  return (
    <div className="absolute top-0 h-full w-full flex flex-col justify-center items-center">
      <div className="loading h-0 w-0 p-8 border-[10px] border-solid border-tertiary border-r-gray-100 rounded-[50px]"></div>
      <h1 className="text-4xl select-none">{message || "Loading"}</h1>
    </div>
  );
};

export default Loader;
