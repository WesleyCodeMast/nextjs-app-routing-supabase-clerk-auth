const Casino = (props) => {
  return (
    <span className="flex flex-col items-center space-y-2 md:space-y-6 border-x-2 border-b-2 border-gray-300 shadow-md mx-2 my-4 rounded-xl md:m-6 p-6">
      {props.icon}
      <p className="text-xl font-medium">{props.title}</p>
    </span>
  );
};

export default Casino;
