import { format_large_number } from "../hooks/formatting";
import { AiOutlineInfoCircle } from "react-icons/ai";
export default function Stat(props: any) {
  return (
    <div className=" px-2">
      <p className={`text-xl text-${props.color}`}>
        {props.format ? format_large_number(props.value) : props.value}{" "}
        {props.unit ? props.unit : ""}
      </p>
      <div className="flex flex-row gap-2 text-sm inline opacity-80">
        {props.name}
        {/* <button data-tooltip-target="tooltip-default" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button> */}

        {/* <AiOutlineInfoCircle /> */}
      </div>
    </div>
  );
}
