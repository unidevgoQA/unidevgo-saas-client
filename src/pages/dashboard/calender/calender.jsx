import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./calender.css";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });

  const handleDateClick = (selected) => {
    setNewEvent({ ...newEvent, date: selected.dateStr });
    setOpenDialog(true);
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setOpenDialog(false);
    setNewEvent({ title: "", date: "" });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          background: "linear-gradient(#371edc, #170b68)",
          color: "#fff",
          padding: "10px 20px",
          margin: "20px",
          borderRadius: "10px",
        }}
        variant="h4"
      >
        Calender
      </Typography>

      <Box
        sx={{
          margin: "20px",
          padding: "30px",
          backgroundColor: "#f9f9f9",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(55, 30, 220, 0.2)",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventBackgroundColor="#371edc"
          eventBorderColor="#371edc"
          themeSystem="standard"
          contentHeight="auto"
          dayMaxEventRows={true}
        />

        {/* Dialog for Adding Event */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle
            sx={{
              backgroundColor: "#371edc",
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add New Event
          </DialogTitle>
          <DialogContent sx={{ padding: "20px" }}>
            <TextField
              label="Event Title"
              fullWidth
              margin="normal"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <TextField
              label="Event Date"
              fullWidth
              margin="normal"
              value={newEvent.date}
              disabled
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: "10px", justifyContent: "center" }}>
            <Button onClick={handleCloseDialog} className="custom-button">
              Cancel
            </Button>
            <Button onClick={handleAddEvent} className="custom-button">
              Add Event
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Calendar;
