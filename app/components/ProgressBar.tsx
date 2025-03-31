interface props {
  label?: string;
  state: number;
}
const ProgressBar: React.FC<props> = ({ label, state }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-sky-600 bg-sky-200">
            {label ? label : "Task in progress"}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-sky-600">
            {state}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-sky-200">
        <div
          style={{ width: `${state}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-sky-500"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
