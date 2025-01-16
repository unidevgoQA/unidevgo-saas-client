import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

const WorkProgress = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalWorkHours, setTotalWorkHours] = useState(null);

    const handleStart = () => {
        setLoading(true);
        setTimeout(() => {
            setStatus('Running');
            setLoading(false);
            setTotalWorkHours(null); // Reset work hours when starting
        }, 1000); // Simulate delay
    };

    const handleStop = () => {
        setLoading(true);
        setTimeout(() => {
            setStatus('Stopped');
            setLoading(false);
            setTotalWorkHours(0.0048); // Simulated work hours
        }, 1000); // Simulate delay
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                bgcolor: '#f5f5f5',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '300px',
                    textAlign: 'center',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Work Progress Tracker
                </Typography>

                <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                    Status: <strong>{status || 'Not Started'}</strong>
                </Typography>

                {totalWorkHours !== null && (
                    <Typography variant="body2" color="textSecondary">
                        Total Work Hours: {totalWorkHours.toFixed(4)} hours
                    </Typography>
                )}

                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStart}
                        disabled={status === 'Running' || loading}
                        sx={{ mr: 2 }}
                    >
                        {loading && status === 'Running' ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            'Start'
                        )}
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleStop}
                        disabled={status !== 'Running' || loading}
                    >
                        {loading && status === 'Stopped' ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            'Stop'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default WorkProgress;
