import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const StyledModal = ({ open, onClose, title, message, backgroundColor, borderColor }) => {

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle
            sx={{
            backgroundColor: backgroundColor,
            borderBottom: `1px dotted ${borderColor}`,
            padding: 1,
            }}
        >
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Typography variant="body1" sx={{ padding: 2, marginBottom: -2 }}>
                {message}
            </Typography>
        </DialogContent>
        </Dialog>
    );
    };

export default StyledModal;
