import Draggable from "react-draggable"
import {useState} from "react"
import {DraggableCore} from 'react-draggable'; // <DraggableCore>

const TabWrapper = ({children}) =>{
        const [location, setLocation] = useState({x: 10, y: 10});

        const handleDrag = (e, ui) => {
          console.log(e, "DATA: ", ui)
            const {d_x, d_y} = (ui.deltaX,ui.deltaY);
            setLocation({x: location.x + d_x, y: location.y + d_y});
        };
          
        return (
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={location}
          position={location}
          bounds="parent"
          grid={[25, 25]}
          scale={1}
          // onStart={(e, data) => console.log('onStart', e, data)}
          // onDrag={(e, data) => handleDrag(e, data)}
          onStop={(e, data) => handleDrag(e, data)}
          >
            <div className="mockup-window handle border-pink  px-6 py-4  mockup-window-outline border-4 shadow-xl  shadow-pink  w-full pt-2 m-3">
                <div className="">{children[0]}</div>
                {/* {children[1]} */}
            </div>
            
            </Draggable>
                )
}

export default TabWrapper;