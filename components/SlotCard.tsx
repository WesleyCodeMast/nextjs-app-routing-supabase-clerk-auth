const SlotCard = ({ data }) => {
  let progressive = "No";
  let freeSpins = "No";
  let multipliers = "No";
  let bonusRounds = "No";
  let wild = "No";
  let scatter = "No";
  //console.log(data);
  if (data.game_progressive > 0) {
    progressive = "Yes";
  }
  if (data.game_wild_slot > 0) {
    wild = "Yes";
  }
  if (data.game_scatters > 0) {
    scatter = "Yes";
  }
  if (data.game_progressive > 0) {
    progressive = "Yes";
  }
  if (data.game_bonus_multipliers > 0) {
    multipliers = "Yes";
  }
  if (data.game_bonus_round > 0) {
    bonusRounds = "Yes";
  }
  if (data.game_free_spins > 0) {
    freeSpins = "Yes";
  }
  return (
    <div className=" m-2 mb-4 mt-4 rounded-2xl bg-slate-100 p-6 pl-4 pl-8 md:pr-4 lg:pr-8 dark:text-black">
      <div className="grid grid-flow-row gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="mb-4 flex  justify-between">
          <span>{"🟩Reels"}</span>

          <span>{data.game_reels}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"🟧Lines"}</span>
          <span>{data.game_lines}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"💰Bonus Multipliers"}</span>
          <span>{multipliers}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"🪩Wild Symbols"}</span>
          <span>{wild}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"🤙Free Spins"}</span>
          <span>{freeSpins}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"🎉Bonus Rounds"}</span>
          <span>{bonusRounds}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"🃏Scatters"}</span>
          <span>{scatter}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"📈Progressive"}</span>
          <span>{progressive}</span>
        </div>
        <div className="mb-4 flex  justify-between">
          <span>{"🔅Software"}</span>
          <span>{data.software.software_name}</span>
        </div>
      </div>
    </div>
  );
};

export default SlotCard;
