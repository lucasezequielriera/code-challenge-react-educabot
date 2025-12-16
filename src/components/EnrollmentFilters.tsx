import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, TextField, Stack } from "@mui/material";
import type { EnrollmentStatus } from "../types/enrollment";

type Props = {
    currentFilter: EnrollmentStatus | 'all';
    textFilter: string;
    onFilterChange: (filter: EnrollmentStatus | 'all') => void;
    onTextFilterChange: (text: string) => void;
};

export const EnrollmentFilters: React.FC<Props> = ({
    currentFilter,
    textFilter,
    onFilterChange,
    onTextFilterChange,
}) => {
    return (
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            {/* Filtro por texto: busca en nombre o email */}
            <TextField
                label="Search by name or email"
                variant="outlined"
                value={textFilter}
                onChange={(e) => onTextFilterChange(e.target.value)}
                size="small"
                sx={{ minWidth: 200 }}
            />
            
            {/* Filtro por estado */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                    <InputLabel id="status-filter-label">Filter by Status</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        id="status-filter"
                        value={currentFilter}
                        label="Filter by Status"
                        onChange={(e) => onFilterChange(e.target.value as EnrollmentStatus | 'all')}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Stack>
    );
};
