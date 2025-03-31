import { CasinoDisplayListContent } from "./list";
import { CasinoDisplayListWrapper } from "./wrapper";

function CasinoDisplayList(props) {
  return (
    <CasinoDisplayListWrapper>
      <CasinoDisplayListContent data={props.data} />
    </CasinoDisplayListWrapper>
  );
}
export default CasinoDisplayList;
