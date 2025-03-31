import ProsConsItem from "./ProsConsItem";
const ProsCons = (props) => {
  const pro = props.data;
  if (!pro?.pros?.length) {
    return null;
  }
  if (!pro?.cons?.length) {
    return null;
  }
  return (
    <div
      id="ProsCons"
      className="flex flex-col bg-slate-100 dark:text-black m-2 p-6 rounded-2xl md:flex-row md:justify-start font-normal scroll-mt-40"
    >
      <div className="md:mx-10">
        <b className="text-3xl font-semibold my-4">Pros</b>
        <ul className="text-justify list-disc md:space-x-0 space-y-4 ">
          <ProsConsItem data={pro.pros} />
        </ul>
      </div>
      <div className="md:mx-20">
        <b className="text-3xl font-semibold my-4">Cons</b>
        <ul className="text-justify list-disc md:space-x-0 space-y-4 ">
          <ProsConsItem data={pro.cons} />
        </ul>
      </div>
    </div>
  );
};
export default ProsCons;
