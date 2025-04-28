// // import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import { useEffect, useState } from 'react';
// // import './styles.css';

// // const Register = () => {
// //   const [detections, setDetections] = useState([]);
// // console.log(detections)
// //   // Fetch the detections data from the API
// //   useEffect(() => {
// //     fetch('http://127.0.0.1:3061/mongo/detections/getAllDetections')
// //       .then(response => response.json())
// //       .then(data => setDetections(data))
// //       .catch(error => console.error('Error fetching detections:', error));
// //   }, []);

// //   return (
// //     <Grid container style={{ height: '100vh', padding: '20px' }}>
// //       <Grid item xs={12} style={{ height: '100%' }}>
// //         <TableContainer component={Paper}>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>First Name</TableCell>
// //                 <TableCell>Last Name</TableCell>
// //                 <TableCell>Email</TableCell>
// //                 <TableCell>Profile ID</TableCell>
// //                 <TableCell>Created At</TableCell>
// //                 <TableCell> At</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {detections.map((detection) => (
// //                 <TableRow key={detection._id}>
// //                   <TableCell>{detection.firstName}</TableCell>
// //                   <TableCell>{detection.lastName}</TableCell>
// //                   <TableCell>{detection.email}</TableCell>
// //                   <TableCell>{detection.profileId}</TableCell>
// //                   <TableCell>{new Date(detection.createdAt).toLocaleString()}</TableCell>
// //                   <TableCell>{new Date(detection.updatedAt).toLocaleString()}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // export default Register;

// import { 
//   Grid, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper,
//   TextField,
//   MenuItem,
//   InputAdornment,
//   Typography,
//   Pagination,
//   Box,
//   Chip
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useEffect, useState } from 'react';
// import './styles.css';

// const Register = () => {
//   const [detections, setDetections] = useState([]);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('All Departments');
//   const [dateFilter, setDateFilter] = useState('');
//   const rowsPerPage = 5;

//   // Format time helper function - now showing more detailed time
//   const formatTime = (date) => {
//     if (!date) return '--:-- --';
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//   };

//   // Format date helper function
//   const formatDate = (date) => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-GB'); // dd/mm/yyyy format
//   };

//   // Fetch data with polling
//   useEffect(() => {
//     const fetchData = () => {
//       fetch('http://127.0.0.1:3061/mongo/detections/getAllDetections')
//         .then(response => response.json())
//         .then(data => {
//           // Process detection data to determine status and check-in/out
//           const processedData = data.map(detection => {
//             const detectionTime = new Date(detection.timestamp || detection.createdAt);
//             const hours = detectionTime.getHours();
            
//             // Determine if this is check-in or check-out (after 5 PM is checkout)
//             const isCheckOut = hours >= 17; // 5 PM
            
//             return {
//               ...detection,
//               status: detection.status || (isCheckOut ? 'Checked Out' : 'Present'),
//               checkIn: isCheckOut ? '--:-- --' : formatTime(detectionTime),
//               checkOut: isCheckOut ? formatTime(detectionTime) : '--:-- --',
//               formattedDate: formatDate(detectionTime),
//               timestamp: detectionTime, // Keep the actual date object for sorting
//               dateTime: detectionTime.toISOString() // For filtering and sorting
//             };
//           });
          
//           // Sort data with today's logs first, then by time (newest first)
//           const sortedData = processedData.sort((a, b) => {
//             const today = new Date();
//             const isAToday = a.timestamp && a.timestamp.toDateString() === today.toDateString();
//             const isBToday = b.timestamp && b.timestamp.toDateString() === today.toDateString();
            
//             // First, sort by whether the date is today
//             if (isAToday && !isBToday) return -1;
//             if (!isAToday && isBToday) return 1;
            
//             // If both or neither are today, sort by date (newest first)
//             return b.timestamp - a.timestamp;
//           });
          
//           setDetections(sortedData);
//           console.log("Data fetched successfully:", sortedData.length, "records");
//         })
//         .catch(error => console.error('Error fetching detections:', error));
//     };
    
//     fetchData(); // Initial fetch
    
//     // Set up interval to fetch data every 5 seconds for more responsive updates
//     const intervalId = setInterval(fetchData, 5000);
    
//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const filteredDetections = detections.filter(detection => {
//     // Filter by search term (name or ID)
//     const matchesSearch = 
//       `${detection.firstName} ${detection.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       detection.profileId?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Filter by department
//     const matchesDepartment = 
//       departmentFilter === 'All Departments' || 
//       detection.department === departmentFilter;
    
//     // Filter by date
//     const matchesDate = 
//       !dateFilter || 
//       (detection.formattedDate === dateFilter);
    
//     return matchesSearch && matchesDepartment && matchesDate;
//   });

//   const paginatedDetections = filteredDetections.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // Helper function to highlight today's records
//   const isToday = (dateStr) => {
//     if (!dateStr) return false;
//     const today = new Date();
//     return formatDate(today) === dateStr;
//   };

//   return (
//     <Grid container style={{ height: '100vh', padding: '20px' }}>
//       <Grid item xs={12} style={{ marginBottom: '20px' }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" component="div">
//             Employee Attendance
//           </Typography>
//           <Box display="flex" gap={2}>
//             <TextField
//               placeholder="Search by name or ID..."
//               size="small"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               select
//               size="small"
//               value={departmentFilter}
//               onChange={(e) => setDepartmentFilter(e.target.value)}
//               label="DEPARTMENT"
//             >
//               <MenuItem value="All Departments">All Departments</MenuItem>
//               <MenuItem value="Engineering">Engineering</MenuItem>
//               <MenuItem value="Marketing">Marketing</MenuItem>
//               <MenuItem value="HR">HR</MenuItem>
//               <MenuItem value="Finance">Finance</MenuItem>
//             </TextField>
//             <TextField
//               size="small"
//               label="Date"
//               placeholder="dd/mm/yyyy"
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Box>
//         </Box>
//       </Grid>
      
//       <Grid item xs={12} style={{ height: 'calc(100% - 80px)' }}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>DEPARTMENT</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CHECK IN</TableCell>
//                 <TableCell>CHECK OUT</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedDetections.length > 0 ? (
//                 paginatedDetections.map((detection) => (
//                   <TableRow 
//                     key={detection._id}
//                     sx={isToday(detection.formattedDate) ? { backgroundColor: 'rgba(0, 230, 118, 0.08)' } : {}}
//                   >
//                     <TableCell>
//                       <Typography fontWeight="bold">{detection.firstName} {detection.lastName}</Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {detection.position || 'Position not specified'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{detection.department || 'Department not specified'}</TableCell>
//                     <TableCell>
//                       <Typography 
//                         fontWeight={isToday(detection.formattedDate) ? 'bold' : 'normal'}
//                       >
//                         {detection.formattedDate}
//                         {isToday(detection.formattedDate) && 
//                           <Chip 
//                             label="Today" 
//                             color="success" 
//                             size="small" 
//                             variant="outlined" 
//                             sx={{ ml: 1 }}
//                           />
//                         }
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={detection.status} 
//                         color={
//                           detection.status === 'Present' ? 'success' : 
//                           detection.status === 'Checked Out' ? 'primary' : 
//                           'error'
//                         }
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Typography 
//                         color={detection.checkIn !== '--:-- --' ? 'text.primary' : 'text.secondary'}
//                       >
//                         {detection.checkIn}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography 
//                         color={detection.checkOut !== '--:-- --' ? 'text.primary' : 'text.secondary'}
//                       >
//                         {detection.checkOut}
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No attendance records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//         <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//           <Typography variant="body2">
//             Page {page} of {Math.max(1, Math.ceil(filteredDetections.length / rowsPerPage))}
//           </Typography>
//           <Pagination
//             count={Math.max(1, Math.ceil(filteredDetections.length / rowsPerPage))}
//             page={page}
//             onChange={handleChangePage}
//             shape="rounded"
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default Register;q

// AttendanceTable.jsx - Create this as a new component







import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const AttendanceTable = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch attendance records
    const fetchAttendanceRecords = async () => {
      try {
        setLoading(true);
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Get all detections from the API
        const response = await axios.get("http://127.0.0.1:3061/mongo/detections/getAll");
        
        // Process data to ensure one row per employee per day
        const processedRecords = processAttendanceRecords(response.data);
        
        setAttendanceRecords(processedRecords);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
    // Refresh data every minute
    const interval = setInterval(fetchAttendanceRecords, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Process attendance records to ensure one row per employee per day
  const processAttendanceRecords = (records) => {
    // Group records by employee and date
    const groupedRecords = {};
    
    records.forEach(record => {
      // Extract date from timestamp or created date
      const date = record.timestamp ? record.timestamp.split('T')[0] : 
                   record.createdAt ? record.createdAt.split('T')[0] : 
                   record.date;
      
      if (!date) return; // Skip records without date
      
      const key = `${record.profileId}-${date}`;
      
      // If we don't have this employee/date combo yet, or if this record is newer
      if (!groupedRecords[key] || new Date(record.timestamp || record.createdAt) > 
          new Date(groupedRecords[key].timestamp || groupedRecords[key].createdAt)) {
        groupedRecords[key] = record;
      }
    });
    
    // Convert grouped object back to array and sort by date (newest first)
    return Object.values(groupedRecords).sort((a, b) => {
      const dateA = new Date(a.timestamp || a.createdAt);
      const dateB = new Date(b.timestamp || b.createdAt);
      return dateB - dateA;
    });
  };

  // Format time for display (HH:MM:SS)
  const formatTime = (timeString) => {
    if (!timeString) return "---";
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Determine if a date is today
  const isToday = (dateString) => {
    const today = new Date().toDateString();
    const date = new Date(dateString).toDateString();
    return date === today;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="attendance table">
        <TableHead>
          <TableRow>
            <TableCell>EMPLOYEE</TableCell>
            <TableCell>DEPARTMENT</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>CHECK IN</TableCell>
            <TableCell>CHECK OUT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">Loading attendance records...</TableCell>
            </TableRow>
          ) : attendanceRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">No attendance records found</TableCell>
            </TableRow>
          ) : (
            attendanceRecords.map((record) => (
              <TableRow
                key={record._id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: isToday(record.timestamp || record.createdAt) ? 'rgba(76, 175, 80, 0.1)' : 'inherit'
                }}
              >
                <TableCell component="th" scope="row">
                  <Box>
                    <Typography variant="body1">
                      {record.firstName} {record.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {record.position || ""}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{record.department || "N/A"}</TableCell>
                <TableCell>
                  {formatDate(record.timestamp || record.createdAt)}
                  {isToday(record.timestamp || record.createdAt) && (
                    <Chip 
                      label="Today" 
                      size="small" 
                      color="success" 
                      variant="outlined" 
                      sx={{ ml: 1 }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={record.status} 
                    color={record.status === "Checked Out" ? "info" : "success"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{formatTime(record.checkInTime)}</TableCell>
                <TableCell>{formatTime(record.checkOutTime)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;