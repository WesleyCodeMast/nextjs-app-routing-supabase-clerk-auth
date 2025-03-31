import React from "react";
import { FaAngleDown } from "react-icons/fa";
import Collapse from "./Collapse";
const Faq = (props: any) => {
  const faq = props.data;
  return (
    <div id="faq" className="scroll-mt-40">
      <b className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
        Frequently asked questions
      </b>

      {faq?.map(function (d, id) {
        const data = { d, id };
        return (
          <React.Fragment key={id}>
            <hr className="border-sky-700 dark:border-white" />
            <Collapse
              down={<FaAngleDown className="mx-4 text-lg font-thin" />}
              data={data.d}
            />
          </React.Fragment>
        );
      })}
      <hr className="border-sky-700 dark:border-white my-7"></hr>
    </div>
  );
};
export default Faq;
