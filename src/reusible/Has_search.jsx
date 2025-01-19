
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { FaSearch, FaTimes } from "react-icons/fa";
import axiosPublicURL from "../views/hooks/AxiosHook"; 
import PaginationControls from "./PaginationControls"; 
import CollapseComponent from "./CollapseComponent";

const ReusableDataTable = ({ 
    apiUrl, 
    columns, 
    deleteApi, 
    hasFilter = false, 
    hasSearch = false, 
    filterFields = [] 
}) => {
    // States
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [filteredRows, setFilteredRows] = useState([]); // Filtered rows for search
    const [filters, setFilters] = useState({}); // State for filters

    const getToken = () => Cookies.get("token");

    // Fetch data from the API
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

            setTotalPages(lastPage);
            setCurrentPage(page);
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
    

    // Apply Filters
    const applyFilters = (newFilters) => {
        let filteredData = rows;

        for (const column in newFilters) {
            const value = newFilters[column];
            if (value) {
                filteredData = filteredData.filter((row) => {
                    const cellValue = row[column]?.toString().toLowerCase();
                    return cellValue && cellValue.includes(value.toLowerCase());
                });
            }
        }

        setFilteredRows(filteredData);
    };

    // Handle Filter Changes
    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, [column]: value };
            applyFilters(newFilters);
            return newFilters;
        });
    };

    // Handle Search
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            const searchedRows = rows.filter((row) =>
                Object.values(row).some(
                    (value) =>
                        value &&
                        value.toString().toLowerCase().includes(query)
                )
            );
            setFilteredRows(searchedRows);
        } else {
            setFilteredRows(rows);
        }
    };

    // Clear Search
    const handleClearSearch = () => {
        setSearchQuery("");
        setFilteredRows(rows);
    };

    const actionColumn = {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
            <div className="flex gap-2">
                <button
                    onClick={() => handleEdit(params.row.id)}
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(params.row.id)}
                    className="px-2 py-1 text-white bg-red-500 rounded"
                >
                    Delete
                </button>
            </div>
        ),
    };

    const handleEdit = (id) => {
        console.log("Edit row with ID:", id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axiosPublicURL().delete(`${deleteApi}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                },
            });
            console.log("Delete response:", response);
            fetchData(currentPage, pageSize); // Refresh data after deletion
        } catch (error) {
            console.error("Error deleting row:", error);
        }
    };

    return (
        <div className="container mx-auto mt-5">
            {/* Render Filters only if hasFilter is true */}
            {hasFilter && filterFields.length > 0 && (
                <CollapseComponent
                    columns={columns}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    filterFields={filterFields}
                />
            )}

            {/* Render Search Bar only if hasSearch is true */}
            {hasSearch && (
                <div className="flex justify-between mx-auto mb-4">
                    <div className="relative flex items-center">
                        <input
                            id="search"
                            autoComplete="off"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ textAlign: "center" }}
                            placeholder=" Search ..."
                            className="w-64 px-3 py-2 pr-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
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
                </div>
            )}

            <div style={{ width: "100%" }}>
                <DataGrid
                    rows={filteredRows}
                    columns={[...columns, actionColumn]}
                    loading={loading}
                    pagination={false}
                    hideFooter
                    disableSelectionOnClick
                    getRowHeight={() => 70}
                    sx={{
                        "& .row-even": {
                            backgroundColor: "#f9f9f9",
                        },
                        "& .row-odd": {
                            backgroundColor: "#ffffff",
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

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ReusableDataTable;
