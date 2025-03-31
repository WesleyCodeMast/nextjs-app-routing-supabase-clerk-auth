import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface Props {
  options: any;
  defaultValue: any;
  select: (softs: any) => void;
}

const AnimatedMulti: React.FC<Props> = ({ options, defaultValue, select }) => {
  options.sort((a, b) => {
    const labelA = a.label.toUpperCase();
    const labelB = b.label.toUpperCase();

    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  }); // const [selectOptions, setSelectOptions] = useState<any[]>(options);
  return (
    <Select
      onChange={(params: any) => {
        select(params);
      }}
      value={defaultValue}
      // defaultValue={defaultValue}
      className="w-2/3"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
};

export default AnimatedMulti;
