
import "react-bubble-ui/dist/index.css";
import DappBubble from "../components/dapps/DappBubble";
// import "./myComponent.css";

import { Dapp } from "components/dapps/types";

interface Props {
	dapps: Dapp[];
}
const BubbleSection = ({ dapps }: Props) => {
	const children = dapps.map((dapp: Dapp, i: number) => {
		return (
			<DappBubble {...dapp} key={i} />
		);
	});

	return (<div className="">
		<div className="">
			<div className="flex flex-row gap-2 scrollable">
		{children}
		</div>
		</div>
	</div>)
};

export default BubbleSection;