import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import PaginationControls from "./PaginationControls";
import { Add, Edit, View } from "./Add_Edit_View";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import axiosPublicURL from "../views/hooks/AxiosHook";
import { FaSearch, FaTimes } from "react-icons/fa";
import CollapseComponent from "./CollapseComponent";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


const ReusableDataTable = (
    { apiUrl, columns, deleteApi,
        hasFilter = false,
        hasSearch = false,
        filterFields = []
    }
) => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRows, setFilteredRows] = useState([]); // Filtered rows for search

    const [filters, setFilters] = useState({});

    const getToken = () => Cookies.get("token");


    // Fetch data from API
    const fetchData = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const response = await axiosPublicURL().post(
                `${apiUrl}?page=${page}&per_page=${pageSize}`,
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${getToken()}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const data = response.data?.data || [];
            const meta = response.data?.meta || {};
            const lastPage = Math.ceil(meta.total / pageSize);
            // console.log(Math.ceil(meta.total / pageSize)); // how many pages 
            const total = meta.total || data.length;



            setTotalPages(lastPage);
            setCurrentPage(currentPage);
            setRows(data);
            setFilteredRows(data); // Initialize filtered rows
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, apiUrl, pageSize]);

    // Handle page size change
    const handlePageSizeChange = (event) => {
        const newPageSize = parseInt(event.target.value, 10);
        setPageSize(newPageSize); // Update page size
        setCurrentPage(1); // Reset to first page
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Handle filter changes
    const handleFilterChange = (column, value) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [column]: value };
            applyFilters(newFilters);
            return newFilters;
        });
    };
    // Apply filters based on the selected values
    const applyFilters = (newFilters) => {
        let filteredData = rows;

        for (const column in newFilters) {
            const value = newFilters[column];
            if (value) {
                filteredData = filteredData.filter(row => {
                    const cellValue = row[column]?.toString().toLowerCase();
                    return cellValue && cellValue.includes(value.toLowerCase());
                });
            }
        }

        setFilteredRows(filteredData);
    };

    // Handle search query change
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            /*   rows.filter((row) => ...): Loops through each row in the rows array and keeps only the rows that match the condition inside the filter() function.
      Object.values(row): Converts the row object into an array of its values (e.g., for { id: 1, name: 'John' }, it becomes [1, 'John']).
      .some((value) => ...): Checks if any value in the row matches the search query.
      value.toString().toLowerCase().includes(query):
      .includes(query): Checks if the value contains the search query. */

            const filtered = rows.filter((row) =>
                Object.values(row).some(
                    (value) =>
                        value &&
                        value.toString().toLowerCase().includes(query)
                )
            );
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows); // Reset to original rows if search query is empty
        }
    };

    // delete data
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublicURL()
                    .post(
                        `api/${deleteApi}/delete/`,
                        { id }, // Send the id in the body
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        }
                    )
                    .then(() => {
                        fetchData();
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting the record:", error);
                        Swal.fire(
                            "Error!",
                            error.response?.data?.message || "Failed to delete the record.",
                            "error"
                        );
                    });
            }
        });
    };

    // Add a custom action column
    const actionColumn = {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
            <>
                <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(params.row.id)}
                >
                    <DeleteIcon style={{ color: "#E53270" }} />
                </IconButton>
                {/* edit component */}
                <Edit EditParam={params.row.id} />

                {/* edit view */}
                <View veiwParam={params.row.id} />
            </>
        ),
    };

    // Clear the search query
    const handleClearSearch = () => {
        setSearchQuery(""); // Clear the search query
        setFilteredRows(rows); // Reset to original rows when cleared
    };



    const [open1, setOpen1] = useState(false);

    return (
        <div className="container mx-auto mt-5">
            {/* Render Filters only if hasFilter is true */}
            {hasFilter && filterFields.length > 0 && (
                <CollapseComponent op={open1}
                    columns={columns} filters={filters} handleFilterChange={handleFilterChange} />
            )}


            <div className="flex justify-between mx-auto mb-4">

                {/* Page Size Dropdown */}
                <div>
                    <label htmlFor="pageSize" className="mr-2">
                        Page Size:
                    </label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="px-2 py-1 border border-gray-300 rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>


                {/* Render Search Bar only if hasSearch is true */}
                {hasSearch && (
                    <div className="relative flex items-center">
                        {/* Filter Icon */}
                        <div className="absolute inset-y-0 flex items-center left-3">
                          
                            <div  >
                                {
                                    hasFilter && (

                                        open1 ? <FilterAltOffIcon
                                            onClick={() => setOpen1(!open1)} className="text-gray-500" />
                                            :
                                            <FilterAltIcon onClick={() => setOpen1(!open1)} className="text-gray-500" />
                                    )
                                }

                            </div>
                        </div>

                        {/* Input Field */}
                        <input
                            id="search"
                            autoComplete="off"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ textAlign: 'center' }}
                            placeholder=" Search ..."
                            className="w-64 px-3 py-2 pr-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* Search/Clear Icons */}
                        <div className="absolute inset-y-0 flex items-center right-3">
                            {searchQuery ? (
                                <FaTimes
                                    onClick={handleClearSearch}
                                    className="text-gray-500 cursor-pointer"
                                />
                            ) : (
                                <FaSearch className="text-gray-500" />
                            )}
                        </div>
                    </div>
                )}


            </div>
            <div className="mb-3">
                <Add />
            </div>
            {/* Data Grid */}
            <div style={{ width: "100%" }}>
                <DataGrid
                    rows={filteredRows} // Use filtered rows for display
                    columns={[...columns, actionColumn]}
                    loading={loading}
                    pagination={false}
                    hideFooter
                    disableSelectionOnClick
                    getRowHeight={() => 70} // Increase row height to fit content
                    getRowClassName={(params) =>
                        `row-${params.row.id % 2 === 0 ? "even" : "odd"}`
                    }
                    sx={{
                        // Styles for even and odd rows
                        "& .row-even": {
                            backgroundColor: "#f9f9f9", // Light grey for even rows
                        },
                        "& .row-odd": {
                            backgroundColor: "#ffffff", // White for odd rows
                        },
                        "& .MuiDataGrid-columnHeader": {
                            fontSize: "19px",
                            color: "black",
                        },
                        "& .MuiDataGrid-cell": {
                            fontSize: "16px",
                            color: "#776b7f",
                        },
                    }}
                />
            </div>
            {/* Pagination Controls */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageS={pageSize}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ReusableDataTable;


