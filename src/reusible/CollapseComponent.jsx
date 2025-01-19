import React from 'react';
import { Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CollapseComponent = ({ columns, filters, handleFilterChange, op }) => {

  return (
    <div style={{ width: '100%', marginBottom: '30px' }}>

      <div style={{ width: '100%' }}>
        <Collapse in={op}>
          <div
            className="card card-body"
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '16px', // Add padding to ensure content doesn't touch edges
            }}
          >
            <div className="row g-3">
              {columns.map((column) => (
                <div key={column.field} className="col-12 col-sm-6 col-md-4"> 
                  <label htmlFor={column.field} className="form-label">
                    {column.headerName}
                  </label>
                  <input
                    type="text"
                    id={column.field}
                    value={filters[column.field] || ""}
                    onChange={(e) => handleFilterChange(column.field, e.target.value)}
                    placeholder={`Filter ${column.headerName}`}
                    className="form-control"
                  />
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default CollapseComponent




// import React, { useState } from "react";
// import { Collapse } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CollapseComponent = ({ columns, filters, handleFilterChange, op }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Handle search input changes
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div style={{ width: "100%", marginBottom: "30px" }}>
//       <div style={{ width: "100%" }}>
//         <Collapse in={op}>
//           <div
//             className="card card-body"
//             style={{
//               width: "100%",
//               textAlign: "left",
//               padding: "16px",
//             }}
//           >
//             <div className="row g-3">
//               {columns.map((column) => (
//                 <div key={column.field} className="col-12 col-sm-6 col-md-4">
//                   <label htmlFor={column.field} className="form-label">
//                     {column.headerName}
//                   </label>
//                   {/* Searchable Dropdown */}
//                   <div>
//                     <input
//                       type="text"
//                       placeholder={`Search ${column.headerName}`}
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                       className="mb-2 form-control"
//                     />
//                     <select
//                       id={column.field}
//                       value={filters[column.field] || ""}
//                       onChange={(e) =>
//                         handleFilterChange(column.field, e.target.value)
//                       }
//                       className="form-select"
//                     >
//                       <option value="">Select {column.headerName}</option>
//                       {column.options
//                         ?.filter((option) =>
//                           option.label.toLowerCase().includes(searchTerm.toLowerCase())
//                         )
//                         .map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Collapse>
//       </div>
//     </div>
//   );
// };

// export default CollapseComponent;



