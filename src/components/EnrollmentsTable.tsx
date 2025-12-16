import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Stack
} from "@mui/material";
import type { Enrollment } from "../types/enrollment";

type EnrollmentsTableProps = {
    enrollments: Enrollment[];
    onConfirm: (id: string) => void;
    onCancel: (id: string) => void;
};

export const EnrollmentsTable: React.FC<EnrollmentsTableProps> = ({
    enrollments,
    onConfirm,
    onCancel,
}) => {
    if (!enrollments || enrollments.length === 0) {
        return <Typography>No enrollments found.</Typography>;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    return (
        <TableContainer
            component={Paper}
            sx={{ minHeight: 320, width: '100%', overflowX: 'auto' }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="enrollments table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Workshop</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {enrollments.map((enrollment) => (
                        <TableRow
                            key={enrollment.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {enrollment.student_name}
                            </TableCell>
                            <TableCell>{enrollment.email}</TableCell>
                            <TableCell>{enrollment.workshop}</TableCell>
                            <TableCell>
                                <Chip
                                    label={enrollment.status}
                                    color={getStatusColor(enrollment.status) as 'success' | 'warning' | 'error' | 'default'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {enrollment.status === "pending" && (
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="success"
                                            onClick={() => onConfirm(enrollment.id)}
                                        >
                                            Confirm
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            onClick={() => onCancel(enrollment.id)}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
