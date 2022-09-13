// import { useState } from "react";



// interface TabsProps {
//     color:string;
//     tabs: any[];
//     tab_items: any[]

// }


// const Tabs = ({ color,tabs,tab_items }:TabsProps) => {
//   const [openTab, setOpenTab] = useState(tab_items[0].id);


//   const Tab = (tab:any)=>{return(
//     <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
//               <a
//                 className={
//                   "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//                   (openTab === tab.id
//                     ? "text-white bg-" + color + "-600"
//                     : "text-" + color + "-600 bg-white")
//                 }
//                 onClick={e => {
//                   e.preventDefault();
//                   setOpenTab(2);
//                 }}
//                 data-toggle="tab"
//                 role="tablist"
//               >
//                  {tab.name}
//               </a>
//             </li>
//   )}

//   return (
//     <>
//       <div className="flex flex-wrap">
//         <div className="w-full">
//           <ul
//             className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
//             role="tablist"
//           >
//             {tabs.map((tab:any)=>{
//               return Tab(tab)
//             })}
            
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export function TabView() {
//   return (
//     <>
//       return <Tabs color="pink" tab_items={tabs} tab_names={tabs.map((tab:any)=>tab.name)} />;
//     </>
//   );
// }
