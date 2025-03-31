import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface Props {
  options: any;
  defaultValue: boolean;
  select: (softs: any) => void;
}

const SingleSelect: React.FC<Props> = ({ options, defaultValue, select }) => {
  // const [selectOptions, setSelectOptions] = useState<any[]>(options);
  return (
    <Select
      value={defaultValue}
      onChange={(params: any) => {
        select(params);
      }}
      closeMenuOnSelect={true}
      className="w-48"
      components={animatedComponents}
      options={options}
    />
  );
};

export default SingleSelect;
