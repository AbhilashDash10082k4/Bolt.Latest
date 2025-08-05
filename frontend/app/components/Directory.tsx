
// import { useState } from "react";
// import { FileFolderSystem } from "../lib/types";
// const Directory = ({ files }: {files: FileFolderSystem}) => {
//     const [isExpanded, toggleExpanded] = useState(false);

//     if (files.type === 'folder') {
//         return (
//             <div className="w-full ml-[25px] mt-[20px]">
//                 <h2 className="cursor-pointer text-white" onClick={() => toggleExpanded(!isExpanded)}>{files.name}</h2><br />
//                 {
//                     isExpanded && files.items.map((item) =>
//                         <div key={item.name}>
//                             <Directory files={item} />
//                         </div> 
//                     )
//                 }
//             </div>
//         )
//     }
//     return (
//         <>
//             <h3 className="m-0 p-0 ml-[25px] text-white">{files.name}</h3><br />
//         </>
//     );
// };

// export default Directory;
