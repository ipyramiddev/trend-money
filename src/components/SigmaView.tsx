// import formatTV

const seam = {
  tvl: "",
};

export default function SigmaView() {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col gap-2">
        <h1>Σ of Seams</h1>
        <p> Tvl: {seam.tvl}</p>
      </div>
    </div>
  );
}
