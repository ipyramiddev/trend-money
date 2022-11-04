// import TeamBox from "../components/TeamBox";
export default function TeamSection(props: any) {
  return (
    <div className="bg-team-img bg-auto bg-no-repeat bg-center text-center">
      <p className="text-4xl m-3 p-3"> Team 🤓</p>
      <div className="flex content-center justify-center">
        {/* {props.team.map((member: any, index: number) => {
          return <TeamBox {...member} key={index} />;
        })} */}
      </div>
    </div>
  );
}
