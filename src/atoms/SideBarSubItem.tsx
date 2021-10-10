//
// import Link from "next/link";
//
// interface SideBarSubItemProps {
//   name : string,
//   path : string,
//   icon? : any,
//   isToggled? : boolean,
//   equalPath?: any
// }
//
// const SideBarSubItem : React.FC<SideBarSubItemProps> = ({ name, path, icon, isToggled }) => {
//   const Icon: any = icon;
//   const equal = true;
//
//   return (
//     <Link href={path}>
//       <a
//         className={` border-r-2 border-gray-800 hover:border-blue-500 hover:text-blue-500 flex flex-row items-center justify-start h-8 ${equal
//           ? "text-blue-700 border-blue-700"
//           : "text-gray-500 border-gray-800"
//           }`}
//       >
//         {Icon ? (
//           <span className={`${isToggled ? "hidden" : ""} inline-flex w-6 items-center md:justify-start h-6 text-lg`}>
//             <Icon />
//           </span>
//         ) : (
//           <span className="inline-flex w-6 items-center justify-center h-6 text-lg " />
//         )}
//
//         <span className={`${!isToggled ? "px-4" : "pl-10"} text-sm font-bold justify-start md:justify-center pl-2 `}>
//           {name}
//         </span>
//       </a>
//     </Link>
//   );
// };
//
// export default SideBarSubItem;
