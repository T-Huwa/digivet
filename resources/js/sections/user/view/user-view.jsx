import { useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

//import { users } from "@/_mock/user";

import Iconify from "@/Components/iconify";
import Scrollbar from "@/Components/scrollbar";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import { Paper } from "@mui/material";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Add } from "@mui/icons-material";

// ----------------------------------------------------------------------

export default function UserPage({ users }) {
    //console.log(users);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState("name");

    const [filterName, setFilterName] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === "asc";
        if (id !== "") {
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Container>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
            >
                <Typography variant="h4">Users</Typography>

                <PrimaryButton>
                    <Link href="/register">
                        {/* <Iconify icon="eva:plus-fill" /> */}
                        <Add />
                    </Link>
                </PrimaryButton>
            </Stack>
            <Paper elevation={4}>
                <Card>
                    <UserTableToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ overflow: "unset" }}>
                            <Table sx={{ minWidth: 800 }}>
                                <UserTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    rowCount={users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleSort}
                                    onSelectAllClick={handleSelectAllClick}
                                    headLabel={[
                                        { id: "name", label: "Name" },
                                        { id: "email", label: "Email" },
                                        { id: "role", label: "Role" },
                                        { id: "phone", label: "Phone Number" },
                                        {
                                            id: "isVerified",
                                            label: "Verified",
                                            align: "center",
                                        },
                                        { id: "area", label: "Area" },
                                        { id: "" },
                                    ]}
                                />
                                <TableBody>
                                    {dataFiltered
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row) => (
                                            <UserTableRow
                                                id={row.id}
                                                key={row.id}
                                                name={row.name}
                                                role={row.role}
                                                phone={row.phone}
                                                email={row.email}
                                                area_name={
                                                    row.area_name +
                                                    ", " +
                                                    row.district_name
                                                }
                                                avatarUrl={
                                                    row.profile_photo_url
                                                }
                                                isVerified={
                                                    row.email_verified_at
                                                }
                                                selected={
                                                    selected.indexOf(
                                                        row.name
                                                    ) !== -1
                                                }
                                                handleClick={(event) =>
                                                    handleClick(event, row.name)
                                                }
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={77}
                                        emptyRows={emptyRows(
                                            page,
                                            rowsPerPage,
                                            users.length
                                        )}
                                    />

                                    {notFound && (
                                        <TableNoData query={filterName} />
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        page={page}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Paper>
        </Container>
    );
}
