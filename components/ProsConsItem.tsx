let i = 1;
const ProItem = (props) => {
  const pro = props.data;
  return (
    <>
      {pro.map((d, index) => (
        <li key={index}>
          <span className="font-medium">{d.title}:</span> {d.content}
        </li>
      ))}
    </>
  );
};
export default ProItem;
