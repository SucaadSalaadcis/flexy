// import React from 'react'
// import Reusible_data_table from '../../reusible/Reusble_dataTable';

// export default function Get_user() {

//     const Columns = [
//         { field: 'id', headerName: 'ID', width: 400 },
//         { field: 'fullname', headerName: 'Fullname', width: 400 },
//     ];

//     return (
//         <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

//             <div class="container-fluid">
//                 <div class="row">
//                     <h1 className="text-2xl font-medium text-center text-[#A41AF4]">User Data Table</h1>
//                     {/* content page */}
//                     <Reusible_data_table
//                         apiUrl="api/users/get"
//                         columns={Columns}
//                         deleteApi={ 'users'}
//                     />
//                 </div>
//             </div>
//         </main>
//     )
// }



// import React from 'react';
// import Reusible_data_table from '../../reusible/Reusble_dataTable';

// export default function Get_user() {
//     const Columns = [
//         { field: 'id', headerName: 'ID', width: 400 },
//         { field: 'fullname', headerName: 'Fullname', width: 400 },
//     ];

//     return (
//         <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="mb-4">
//                         <h1 className="text-2xl font-medium text-center text-[#A41AF4]">User Data Table</h1>
//                     </div>
//                     {/* Content page */}
//                     <Reusible_data_table
//                         apiUrl="api/users/get"
//                         columns={Columns}
//                         deleteApi="/api/data"
//                         hasFilter={true}
//                         hasSearch={true}

//                     filterFields={[
//                         { name: "name", label: "Name" },
//                         { name: "email", label: "Email" },
//                         { name: "role", label: "Role" },
//                     ]}
//                     />
//                 </div>
//             </div>
//         </main>
//     );
// }

import React from 'react';
import Reusible_data_table from '../../reusible/Reusble_dataTable';

export default function Get_user() {
    const Columns = [
        { field: 'id', headerName: 'ID', width: 400 },
        { field: 'fullname', headerName: 'Fullname', width: 400 },
    ];

    // Transform Columns to match the expected structure for filterFields
    const filterFields = Columns.map(column => ({
        name: column.field,
        label: column.headerName,
    }));

    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
            <div className="container-fluid">
                <div className="row">
                    <div className="mb-4">
                        <h1 className="text-2xl font-medium text-center text-[#A41AF4]">User Data Table</h1>
                    </div>
                    {/* Content page */}
                    <Reusible_data_table
                        apiUrl="api/users/get"
                        columns={Columns}
                        deleteApi="/api/data"
                        hasSearch={true}
                        hasFilter={true}
                        filterFields={Columns}
                    />
                </div>
            </div>
        </main>
    );
}
