
import "react-bubble-ui/dist/index.css";
import DappBubble from "../components/dapps/DappBubble";
// import "./myComponent.css";
import { Dapp } from "components/dapps/types";

interface Props {
	  dapps: Dapp[];
}
const BubbleSection = ({dapps}:Props) =>{
	const options = {
		size: 300,
		minSize: 220,
		gutter: 20,
		provideProps: true,
		numCols: 5,
		fringeWidth: 160,
		yRadius: 130,
		xRadius: 220,
		cornerRadius: 50,
		showGuides: false,
		compact: true,
		gravitation: 4
	}

	const children = dapps.map((dapp:Dapp, i:number) => {
		return (

			<DappBubble {...dapp}  key={i} />
		);
	});

	// return (<BubbleUI options={options} className="myBubbleUI bg-blue">
	// 	{children}
	// </BubbleUI>)

return (<div className="myBubbleUI bg-blue">
{children}
</div>)
};

export default BubbleSection;