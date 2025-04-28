// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { BiBadgeCheck } from 'react-icons/bi';
// import { FaEye, FaCamera } from 'react-icons/fa';
// import axios from 'axios';
// import swal from 'sweetalert';
// import { Alert, AlertTitle, Grid, Drawer, Button, Typography, Box, Card, CardContent, Avatar, Chip } from '@mui/material';
// import Webcam from 'react-webcam';

// const LoginPage = () => {
//   const [profileDetails, setProfileDetails] = useState(null);
//   const [isWebcamOpen, setIsWebcamOpen] = useState(true);
//   const [profiles, setProfiles] = useState(null);
//   const webcamRef = useRef(null);
//   const [open, setOpen] = useState(false);
//   const [recognitionLogs, setRecognitionLogs] = useState([]);

//   const sendWhatsAppMessage = async () => {
//     try {
//         const response = await fetch("https://your-ngrok-url/send-message", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 mobile: "+263786040494", // Fixed number to send the notification to
//                 message: "A new profile has been successfully detected!",
//                 status: "success"
//             }),
//         });

//         const result = await response.json();
//         if (result.success) {
//             console.log("✅ WhatsApp message sent successfully!");
//         } else {
//             console.error("❌ Failed to send WhatsApp message:", result.error);
//         }
//     } catch (error) {
//         console.error("🚨 Error sending WhatsApp message:", error);
//     }
// };


//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:3061/mongo/profiles/getAllProfiles")
//       .then((response) => {
//         setProfiles(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // Get recognition logs
//   useEffect(() => {
//     // You can replace this with your actual API call to get logs
//     // This is a placeholder to simulate logs
//     const fetchLogs = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await axios.get("http://127.0.0.1:3061/mongo/detections/getAll");
//         setRecognitionLogs(response.data);
//       } catch (error) {
//         console.error("Error fetching logs:", error);
//         // Fallback mock data if API fails
//         setRecognitionLogs([]);
//       }
//     };

//     fetchLogs();
//     // Set up a polling interval to refresh logs
//     const interval = setInterval(fetchLogs, 30000); // refresh every 30 seconds
    
//     return () => clearInterval(interval);
//   }, []);

//   const userProfile = profiles?.find((xet) => xet.profileId === profileDetails);
//   const faceNotFound = () => {
//     swal({
//       title: 'No Match For This Face',
//       text: 'Please try again.',
//       icon: 'error'
//     });
//   };

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === 'Enter') {
//         faceNotFound();
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []);

//   const sendDetection = (detectionData) => {
//     axios
//       .post('http://127.0.0.1:3061/mongo/detections/create', detectionData)
//       .then((response) => {
//         console.log('Detection data sent', response);
//         // Add the new detection to logs
//         const newLog = {
//           ...detectionData,
//           timestamp: new Date().toISOString(),
//           status: 'success'
//         };
//         setRecognitionLogs(prev => [newLog, ...prev]);
//       })
//       .catch((error) => {
//         console.error('Error sending detection data', error);
//       });
//   };

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       fetch(imageSrc)
//         .then((res) => res.blob())
//         .then((blob) => {
//           const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
//           const formData = new FormData();
//           formData.append('image', file);
//           axios
//             .post("http://127.0.0.1:8808/upload", formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data'
//               }
//             })
//             .then((response) => {
//               // Check if there's a valid profile_id in the response
//               if (response?.data?.profile_id) {
//                 const profile = response.data.profile_id;
//                 console.log(response);
//                 setProfileDetails(profile);
                
//                 // Add successful detection to logs
//                 const matchedProfile = profiles?.find(p => p.profileId === profile);
//                 if (matchedProfile) {
//                   const newLog = {
//                     firstName: matchedProfile.firstName || '',
//                     lastName: matchedProfile.lastName || '',
//                     timestamp: new Date().toISOString(),
//                     status: 'success'
//                   };
//                   setRecognitionLogs(prev => [newLog, ...prev]);

//                   sendWhatsAppMessage();
//                 }
                
//                 swal({
//                   title: 'Profile Detected',
//                   text: 'Check the result.',
//                   icon: 'info'
//                 });
//               } else {
//                 // No valid profile found in response
//                 setProfileDetails(null);
                
//                 // Add failed detection to logs
//                 const newLog = {
//                   firstName: 'Unknown',
//                   lastName: '',
//                   timestamp: new Date().toISOString(),
//                   status: 'failed'
//                 };
//                 setRecognitionLogs(prev => [newLog, ...prev]);
                
//                 swal({
//                   title: 'No Match For This Face',
//                   text: 'Please try again.',
//                   icon: 'error'
//                 });
//               }
//             })
//             .catch((error) => {
//               console.error(error);
              
//               // Add failed detection to logs
//               const newLog = {
//                 firstName: 'Unknown',
//                 lastName: '',
//                 timestamp: new Date().toISOString(),
//                 status: 'failed'
//               };
//               setRecognitionLogs(prev => [newLog, ...prev]);
              
//               swal({
//                 title: 'No Match For This Face',
//                 text: 'Please try again.',
//                 icon: 'error'
//               });
//             });
//         });
//     }
//   }, [webcamRef, profiles]);

//   const showDrawer = () => {
//     setOpen(true);
//     const userProfile = profiles?.find((xet) => xet.profileId === profileDetails);
//     if (userProfile) {
//       const detectionData = {
//         profileId: userProfile.profileId,
//         firstName: userProfile.firstName,
//         lastName: userProfile.lastName,
//         email: userProfile.email
//       };
//       sendDetection(detectionData);
//     }
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   // Format time to display in logs
//   const formatTime = (timestamp) => {
//     if (!timestamp) return '';
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <Grid container spacing={2} style={{ height: '100vh', padding: '16px' }}>
//       <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
//         <Card style={{ flex: 1 }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               Facial Recognition
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mb: 2 }}>
//               Scan employee face for attendance
//             </Typography>
            
//             {isWebcamOpen && (
//               <div style={{ marginTop: '16px', position: 'relative', backgroundColor: '#f5f5f5', borderRadius: '4px', padding: '16px' }}>
//                 {!webcamRef.current?.getScreenshot() && (
//                   <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 1 }}>
//                     <FaCamera size={40} color="#757575" />
                    
//                   </div>
//                 )}
//                 <Webcam
//                   audio={false}
//                   ref={webcamRef}
//                   screenshotFormat="image/jpeg"
//                   style={{ width: '100%', borderRadius: '4px' }}
//                 />
//               </div>
//             )}
            
//             <Button 
//               variant="contained" 
//               color="primary" 
//               fullWidth
//               onClick={capture} 
//               style={{ marginTop: '16px' }}
//               startIcon={<FaCamera />}
//             >
//               Start Recognition
//             </Button>
            
//             <Button 
//               variant="outlined" 
//               color="primary" 
//               onClick={showDrawer}
//               sx={{ mt: 2, display: profileDetails ? 'flex' : 'none' }}
//             >
//               {profileDetails === null ? <BiBadgeCheck size={20} /> : <FaEye size={20} />}
//               {' '}View Profile Details
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
//         <Card>
//           <CardContent  style={{ flex: 1 }}>
//             <Typography variant="h5" gutterBottom>
//               Recognition Logs
//             </Typography>
//             <Typography variant="subtitle1" sx={{ mb: 2 }}>
//               Recent facial recognition attempts
//             </Typography>
            
//             {recognitionLogs.length === 0 ? (
//               <Typography variant="body2" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
//                 No recognition logs available
//               </Typography>
//             ) : (
//               <Box>
//                 {recognitionLogs.slice(0, 5).map((log, index) => (
//                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                     <Avatar sx={{ mr: 2 }}>
//                       {log.firstName?.[0] || '?'}
//                     </Avatar>
//                     <Box sx={{ flexGrow: 1 }}>
//                       <Typography variant="subtitle2">
//                         {log.firstName === 'Unknown' ? 'Unknown' : `${log.firstName} ${log.lastName || ''}`}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
//                       {formatTime(log.timestamp)}
//                     </Typography>
//                     <Chip 
//                       label={log.status === 'success' ? 'Success' : 'Failed'} 
//                       color={log.status === 'success' ? 'success' : 'error'}
//                       size="small"
//                       variant="outlined"
//                     />
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </Grid> */}
//       <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
//   <Card style={{ flex: 1 }}>
//     <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//       <Typography variant="h5" gutterBottom>
//         Recognition Logs
//       </Typography>
//       <Typography variant="subtitle1" sx={{ mb: 2 }}>
//         Recent facial recognition attempts
//       </Typography>
      
//       <Box sx={{ flex: 1, overflowY: 'auto', minHeight: '300px' }}>
//         {recognitionLogs.length === 0 ? (
//           <Typography variant="body2" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
//             No recognition logs available
//           </Typography>
//         ) : (
//           <Box>
//             {recognitionLogs.slice(0, 5).map((log, index) => (
//               <Box 
//                 key={index} 
//                 sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   mb: 2,
//                   p: 1, 
//                   borderRadius: 1, 
//                   bgcolor: index === 0 ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
//                 }}
//               >
//                 <Avatar sx={{ mr: 2, bgcolor: log.status === 'success' ? 'success.main' : 'error.main' }}>
//                   {log.firstName?.[0] || '?'}
//                 </Avatar>
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="subtitle2">
//                     {log.firstName === 'Unknown' ? 'Unknown' : `${log.firstName} ${log.lastName || ''}`}
//                   </Typography>
//                   {log.email && (
//                     <Typography variant="body2" color="text.secondary">
//                       {log.email}
//                     </Typography>
//                   )}
//                 </Box>
//                 <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
//                   {formatTime(log.timestamp || log.createdAt)}
//                 </Typography>
//                 <Chip 
//                   label={log.status === 'success' ? 'Success' : 'Failed'} 
//                   color={log.status === 'success' ? 'success' : 'error'}
//                   size="small"
//                   variant="outlined"
//                 />
//               </Box>
//             ))}
//           </Box>
//         )}
//       </Box>
//     </CardContent>
//   </Card>
// </Grid>

//       <Grid item xs={12} md={6}>
//         <Drawer anchor="right" open={open} onClose={onClose}>
//           <div style={{ marginTop: '50px' }}>
//             <Box sx={{ width: 620, padding: 2 }}>
//               <Typography variant="h6">Profile Details</Typography>
//               <Box>
//                 <Alert severity="info">
//                   <AlertTitle>Profile Info</AlertTitle>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="subtitle1">Full Name</Typography>
//                       <Typography>{userProfile?.firstName} {userProfile?.lastName}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="subtitle1">Profile ID</Typography>
//                       <Typography>{userProfile?.profileId}</Typography>
//                     </Grid>
//                     {userProfile?.email && (
//                       <Grid item xs={6}>
//                         <Typography variant="subtitle1">Email</Typography>
//                         <Typography>{userProfile?.email}</Typography>
//                       </Grid>
//                     )}
//                   </Grid>
//                 </Alert>
//               </Box>
//             </Box>
//           </div>
//         </Drawer>
//       </Grid>
//   </Grid>
//   );
// };

// export default LoginPage;
"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { BiBadgeCheck } from "react-icons/bi"
import { FaEye, FaCamera } from "react-icons/fa"
import axios from "axios"
import swal from "sweetalert"
import {
  Alert,
  AlertTitle,
  Grid,
  Drawer,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material"
import Webcam from "react-webcam"

const LoginPage = () => {
  const [profileDetails, setProfileDetails] = useState(null)
  const [isWebcamOpen, setIsWebcamOpen] = useState(true)
  const [profiles, setProfiles] = useState(null)
  const webcamRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [recognitionLogs, setRecognitionLogs] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [debugInfo, setDebugInfo] = useState({})

  // Function to send WhatsApp notification
  const sendWhatsAppMessage = async (employee, isCheckIn) => {
    try {
      const messageType = isCheckIn ? "logged in" : "logged out";
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const message = `${employee.firstName} ${employee.lastName} has ${messageType} successfully at ${timeNow}.`;
  
      const supervisorNumber = '+263780058589'; // Example number
      // const formattedTo = supervisorNumber.startsWith('whatsapp:') ? supervisorNumber : `whatsapp:${supervisorNumber}`;
  
      const response = await axios.post("http://localhost:3061/mongo/whatsapp/api/send-whatsapp", {
        to: supervisorNumber,
        body: message,
      });
  
      if (response.data.success) {
        console.log("✅ WhatsApp message sent successfully!");
      } else {
        console.error("❌ Failed to send WhatsApp message:", response.data.error);
      }
    } catch (error) {
      console.error("🚨 Error sending WhatsApp message:", error);
    }
  };
  const checkAttendanceStatus = async (profileId) => {
    try {
      console.log("Checking attendance status for profile ID:", profileId)
  
      // Format today's date as YYYY-MM-DD for API call
      const today = new Date()
      const todayFormatted = today.toISOString().split("T")[0]
  
      console.log("Today's date (formatted):", todayFormatted)
  
      // Make a direct API call to get today's detections for this profile
      const url = `http://127.0.0.1:3061/mongo/detections/getByProfileIdAndDate/${profileId}/${todayFormatted}`
      console.log("API URL:", url)
  
      const response = await axios.get(url)
      console.log("API Response:", response.data)
  
      // If no detections today, it's a check-in
      if (!response.data || response.data.length === 0) {
        return { 
          isCheckIn: true, 
          previousDetection: null, 
          todayDetections: [],
          scanCount: 0
        }
      }
      
      // Get the latest detection for today
      const latestDetection = response.data[0]
      
      // Check if user already checked out (has both check-in and check-out times)
      const hasCheckedOut = latestDetection.checkOutTime != null
      
      // Determine scan count
      const scanCount = hasCheckedOut ? 2 : 1
      
      return {
        isCheckIn: false,
        isCheckOut: !hasCheckedOut,
        isDone: hasCheckedOut,
        previousDetection: latestDetection,
        todayDetections: response.data,
        scanCount: scanCount
      }
    } catch (error) {
      console.error("Error checking attendance status:", error)
      setDebugInfo({
        error: error.message,
        timestamp: new Date().toISOString(),
      })
      // Default to check-in if there's an error
      return { isCheckIn: true, previousDetection: null, todayDetections: [], scanCount: 0 }
    }
  }
  // Completely rewritten checkAttendanceStatus function with better debugging
  // const checkAttendanceStatus = async (profileId) => {
  //   try {
  //     console.log("Checking attendance status for profile ID:", profileId)

  //     // Format today's date as YYYY-MM-DD for API call
  //     const today = new Date()
  //     const todayFormatted = today.toISOString().split("T")[0]

  //     console.log("Today's date (formatted):", todayFormatted)

  //     // Make a direct API call to get today's detections for this profile
  //     const url = `http://127.0.0.1:3061/mongo/detections/getByProfileIdAndDate/${profileId}/${todayFormatted}`
  //     console.log("API URL:", url)

  //     const response = await axios.get(url)
  //     console.log("API Response:", response.data)

  //     // If we have any detections today for this profile, it's a check-out
  //     const isCheckIn = !response.data || response.data.length === 0

  //     const result = {
  //       isCheckIn,
  //       previousDetection: isCheckIn ? null : response.data[0],
  //       todayDetections: response.data || [],
  //     }

  //     console.log("Attendance check result:", result)

  //     // Update debug info for UI display
  //     setDebugInfo({
  //       profileId,
  //       todayFormatted,
  //       detectionsCount: response.data?.length || 0,
  //       isCheckIn,
  //       timestamp: new Date().toISOString(),
  //     })

  //     return result
  //   } catch (error) {
  //     console.error("Error checking attendance status:", error)
  //     // Show error in UI for debugging
  //     setDebugInfo({
  //       error: error.message,
  //       timestamp: new Date().toISOString(),
  //     })
  //     // Default to check-in if there's an error
  //     return { isCheckIn: true, previousDetection: null, todayDetections: [] }
  //   }
  // }

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3061/mongo/profiles/getAllProfiles")
      .then((response) => {
        setProfiles(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Get recognition logs
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3061/mongo/detections/getAll")

        // Sort logs by timestamp in descending order (newest first)
        const sortedLogs = response.data.sort(
          (a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt),
        )

        // Take only the latest 5 logs
        const latestLogs = sortedLogs.slice(0, 5)

        // Important: Only update if there are actual changes to prevent rerenders
        if (latestLogs.length > 0) {
          setRecognitionLogs(latestLogs)
        }
      } catch (error) {
        console.error("Error fetching logs:", error)
        // Don't clear existing logs if there's an error
      }
    }

    fetchLogs()
    // Reduce polling frequency to avoid clearing logs too often
    const interval = setInterval(fetchLogs, 60000) // refresh every 60 seconds

    return () => clearInterval(interval)
  }, [])

  const userProfile = profiles?.find((xet) => xet.profileId === profileDetails)
  const faceNotFound = () => {
    swal({
      title: "No Match For This Face",
      text: "Please try again.",
      icon: "error",
    })
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        faceNotFound()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  const sendDetection = async (detectionData, isCheckIn) => {
    // Add check-in/check-out status to the detection data
    const updatedData = {
      ...detectionData,
      status: isCheckIn ? "Present" : "Checked Out",
      checkType: isCheckIn ? "in" : "out",
      timestamp: new Date().toISOString(), // Ensure timestamp is set
    }

    console.log("Sending detection data:", updatedData)

    try {
      const response = await axios.post("http://127.0.0.1:3061/mongo/detections/create", updatedData)
      console.log("Detection data sent successfully:", response.data)

      // Add the new detection to logs
      const newLog = {
        ...updatedData,
        timestamp: new Date().toISOString(),
      }

      // Keep only the latest 5 logs when adding a new one
      setRecognitionLogs((prev) => {
        const updatedLogs = [newLog, ...prev]
        return updatedLogs.slice(0, 5)
      })

      // Send WhatsApp notification
      await sendWhatsAppMessage(response.profileID, isCheckIn)

      return response.data
    } catch (error) {
      console.error("Error sending detection data:", error)
      throw error
    }
  }
  // const capture = useCallback(async () => {
  //   if (isProcessing) return // Prevent multiple simultaneous captures
  
  //   setIsProcessing(true)
  //   console.log("Starting face capture and recognition process...")
  
  //   const imageSrc = webcamRef.current?.getScreenshot()
  //   if (imageSrc) {
  //     try {
  //       const blob = await fetch(imageSrc).then((res) => res.blob())
  //       const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" })
  //       const formData = new FormData()
  //       formData.append("image", file)
  
  //       console.log("Sending image to recognition service...")
  //       const response = await axios.post("http://127.0.0.1:8808/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  
  //       console.log("Recognition service response:", response.data)
  
  //       // Check if there's a valid profile_id in the response
  //       if (response?.data?.profile_id) {
  //         const profileId = response.data.profile_id
  //         setProfileDetails(profileId)
  //         console.log("Profile ID recognized:", profileId)
  
  //         // Find the matched profile
  //         const matchedProfile = profiles?.find((p) => p.profileId === profileId)
  //         console.log("Matched profile:", matchedProfile)
  
  //         if (matchedProfile) {
  //           // Check if this is a check-in or check-out or done
  //           console.log("Checking attendance status...")
  //           const attendanceStatus = await checkAttendanceStatus(profileId)
            
  //           const currentTime = new Date().toISOString()
            
  //           // CASE 1: First scan of the day (Check-In)
  //           if (attendanceStatus.isCheckIn) {
  //             console.log("FIRST SCAN: Processing check-in")
              
  //             // Create detection data for check-in
  //             const detectionData = {
  //               profileId: matchedProfile.profileId,
  //               firstName: matchedProfile.firstName,
  //               lastName: matchedProfile.lastName,
  //               email: matchedProfile.email,
  //               department: matchedProfile.department,
  //               position: matchedProfile.position,
  //               checkInTime: currentTime,
  //               checkOutTime: null,
  //               status: "Present",
  //               checkType: "in"
  //             }
              
  //             // Send new detection to backend
  //             await sendDetection(detectionData, true)
              
  //             // Show success message
  //             swal({
  //               title: "Check-In Successful",
  //               text: `${matchedProfile.firstName} ${matchedProfile.lastName} has checked in successfully.`,
  //               icon: "success",
  //             })
  //           } 
  //           // CASE 2: Second scan of the day (Check-Out)
  //           else if (attendanceStatus.isCheckOut) {
  //             console.log("SECOND SCAN: Processing check-out")
              
  //             // Update the existing record with check-out time
  //             const previousDetectionId = attendanceStatus.previousDetection._id
              
  //             // Update detection with check-out time
  //             await axios.patch(`http://127.0.0.1:3061/mongo/detections/update/${previousDetectionId}`, {
  //               checkOutTime: currentTime,
  //               status: "Checked Out",
  //               checkType: "out"
  //             })
              
  //             // Add to recognition logs
  //             const newLog = {
  //               profileId: matchedProfile.profileId,
  //               firstName: matchedProfile.firstName,
  //               lastName: matchedProfile.lastName,
  //               email: matchedProfile.email,
  //               timestamp: currentTime,
  //               status: "Checked Out",
  //               checkType: "out"
  //             }
              
  //             // Keep only the latest 5 logs when adding a new one
  //             setRecognitionLogs((prev) => {
  //               const updatedLogs = [newLog, ...prev]
  //               return updatedLogs.slice(0, 5)
  //             })
              
  //             // Send WhatsApp notification
  //             await sendWhatsAppMessage(matchedProfile, false)
              
  //             // Show success message
  //             swal({
  //               title: "Check-Out Successful",
  //               text: `${matchedProfile.firstName} ${matchedProfile.lastName} has checked out successfully.`,
  //               icon: "success",
  //             })
  //           } 
  //           // CASE 3: Third or more scans (Already Done)
  //           else if (attendanceStatus.isDone) {
  //             console.log("THIRD+ SCAN: Already checked out for today")
              
  //             // Show message that user is done for the day
  //             swal({
  //               title: "Already Processed",
  //               text: `${matchedProfile.firstName} ${matchedProfile.lastName}, you are done for the day. You have already checked in and out today.`,
  //               icon: "info",
  //             })
              
  //             // Add to logs for tracking purposes
  //             const newLog = {
  //               profileId: matchedProfile.profileId,
  //               firstName: matchedProfile.firstName,
  //               lastName: matchedProfile.lastName,
  //               email: matchedProfile.email,
  //               timestamp: currentTime,
  //               status: "Done for today",
  //               checkType: "info"
  //             }
              
  //             // Keep only the latest 5 logs when adding a new one
  //             setRecognitionLogs((prev) => {
  //               const updatedLogs = [newLog, ...prev]
  //               return updatedLogs.slice(0, 5)
  //             })
  //           }
  //         }
  //       } else {
  //         // No valid profile found in response
  //         setProfileDetails(null)
  //         console.log("No profile match found")
  
  //         // Add failed detection to logs
  //         const newLog = {
  //           firstName: "Unknown",
  //           lastName: "",
  //           timestamp: new Date().toISOString(),
  //           status: "failed",
  //         }
  
  //         // Keep only the latest 5 logs when adding a new one
  //         setRecognitionLogs((prev) => {
  //           const updatedLogs = [newLog, ...prev]
  //           return updatedLogs.slice(0, 5)
  //         })
  
  //         swal({
  //           title: "No Match For This Face",
  //           text: "Please try again.",
  //           icon: "error",
  //         })
  //       }
  //     } catch (error) {
  //       console.error("Error in face recognition process:", error)
  
  //       // Add failed detection to logs
  //       const newLog = {
  //         firstName: "Unknown",
  //         lastName: "",
  //         timestamp: new Date().toISOString(),
  //         status: "failed",
  //       }
  
  //       // Keep only the latest 5 logs when adding a new one
  //       setRecognitionLogs((prev) => {
  //         const updatedLogs = [newLog, ...prev]
  //         return updatedLogs.slice(0, 5)
  //       })
  
  //       swal({
  //         title: "Error Processing Face",
  //         text: "Please try again.",
  //         icon: "error",
  //       })
  //     } finally {
  //       setIsProcessing(false)
  //     }
  //   } else {
  //     console.log("No image captured from webcam")
  //     setIsProcessing(false)
  //   }
  // }, [webcamRef, profiles, isProcessing])

// First, let's improve the capture function to properly handle check-in and check-out on the same record
const capture = useCallback(async () => {
  if (isProcessing) return // Prevent multiple simultaneous captures

  setIsProcessing(true)
  console.log("Starting face capture and recognition process...")

  const imageSrc = webcamRef.current?.getScreenshot()
  if (imageSrc) {
    try {
      const blob = await fetch(imageSrc).then((res) => res.blob())
      const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" })
      const formData = new FormData()
      formData.append("image", file)

      console.log("Sending image to recognition service...")
      const response = await axios.post("http://127.0.0.1:8808/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Recognition service response:", response.data)

      // Check if there's a valid profile_id in the response
      if (response?.data?.profile_id) {
        const profileId = response.data.profile_id
        setProfileDetails(profileId)
        console.log("Profile ID recognized:", profileId)

        // Find the matched profile
        const matchedProfile = profiles?.find((p) => p.profileId === profileId)
        console.log("Matched profile:", matchedProfile)

        if (matchedProfile) {
          // Check if this is a check-in or check-out or done
          console.log("Checking attendance status...")
          const attendanceStatus = await checkAttendanceStatus(profileId)
          
          const currentTime = new Date().toISOString()
          
          // CASE 1: First scan of the day (Check-In)
          if (attendanceStatus.isCheckIn) {
            console.log("FIRST SCAN: Processing check-in")
            
            // Create detection data for check-in
            const detectionData = {
              profileId: matchedProfile.profileId,
              firstName: matchedProfile.firstName,
              lastName: matchedProfile.lastName,
              email: matchedProfile.email,
              department: matchedProfile.department,
              position: matchedProfile.position,
              checkInTime: currentTime,
              checkOutTime: null,
              status: "Present",
              checkType: "in",
              date: new Date().toISOString().split('T')[0] // Store date for grouping
            }
            
            // Send new detection to backend
            const createdDetection = await sendDetection(detectionData, true)
            console.log("Check-in record created:", createdDetection)
            
            // Show success message
            swal({
              title: "Check-In Successful",
              text: `${matchedProfile.firstName} ${matchedProfile.lastName} has checked in successfully.`,
              icon: "success",
            })
          } 
          // CASE 2: Second scan of the day (Check-Out)
          else if (attendanceStatus.isCheckOut) {
            console.log("SECOND SCAN: Processing check-out")
            
            // Update the existing record with check-out time
            const previousDetectionId = attendanceStatus.previousDetection._id
            
            try {
              // Update detection with check-out time
              await axios.patch(
                `http://127.0.0.1:3061/mongo/detections/update/${previousDetectionId}`, 
                {
                  checkOutTime: currentTime,
                  status: "Checked Out",
                  checkType: "out"
                }
              )
              
              // Get the updated record with both check-in and check-out times
              const updatedRecord = await axios.get(
                `http://127.0.0.1:3061/mongo/detections/getById/${previousDetectionId}`
              )
              
              console.log("Updated record with check-out time:", updatedRecord.data)
              
              // Update the recognition logs with the complete record
              setRecognitionLogs((prev) => {
                // Remove the previous entry for this employee today
                const filteredLogs = prev.filter(log => 
                  !(log.profileId === matchedProfile.profileId && 
                    new Date(log.timestamp).toDateString() === new Date().toDateString())
                )
                
                // Add the updated record with both times
                return [{
                  ...updatedRecord.data,
                  timestamp: currentTime
                }, ...filteredLogs].slice(0, 5)
              })
              
              // Send WhatsApp notification
              await sendWhatsAppMessage(matchedProfile, false)
              
              // Show success message
              swal({
                title: "Check-Out Successful",
                text: `${matchedProfile.firstName} ${matchedProfile.lastName} has checked out successfully.`,
                icon: "success",
              })
            } catch (error) {
              console.error("Error updating check-out time:", error)
              swal({
                title: "Check-Out Failed",
                text: "There was an error recording your check-out. Please try again.",
                icon: "error",
              })
            }
          } 
          // CASE 3: Third or more scans (Already Done)
          else if (attendanceStatus.isDone) {
            console.log("THIRD+ SCAN: Already checked out for today")
            
            // Show message that user is done for the day
            swal({
              title: "Already Processed",
              text: `${matchedProfile.firstName} ${matchedProfile.lastName}, you are done for the day. You have already checked in and out today.`,
              icon: "info",
            })
            
            // Don't add duplicate logs
          }
        }
      } else {
        // No valid profile found in response
        setProfileDetails(null)
        console.log("No profile match found")

        // Add failed detection to logs
        const newLog = {
          firstName: "Unknown",
          lastName: "",
          timestamp: new Date().toISOString(),
          status: "failed",
        }

        // Keep only the latest 5 logs when adding a new one
        setRecognitionLogs((prev) => {
          const updatedLogs = [newLog, ...prev]
          return updatedLogs.slice(0, 5)
        })

        swal({
          title: "No Match For This Face",
          text: "Please try again.",
          icon: "error",
        })
      }
    } catch (error) {
      console.error("Error in face recognition process:", error)

      // Add failed detection to logs
      const newLog = {
        firstName: "Unknown",
        lastName: "",
        timestamp: new Date().toISOString(),
        status: "failed",
      }

      // Keep only the latest 5 logs when adding a new one
      setRecognitionLogs((prev) => {
        const updatedLogs = [newLog, ...prev]
        return updatedLogs.slice(0, 5)
      })

      swal({
        title: "Error Processing Face",
        text: "Please try again.",
        icon: "error",
      })
    } finally {
      setIsProcessing(false)
    }
  } else {
    console.log("No image captured from webcam")
    setIsProcessing(false)
  }
}, [webcamRef, profiles, isProcessing])
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  // Format time to display in logs
  const formatTime = (timestamp) => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Grid container spacing={2} style={{ height: "100vh", padding: "16px" }}>
      <Grid item xs={12} md={6} style={{ display: "flex", flexDirection: "column" }}>
        <Card style={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Facial Recognition
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Scan employee face for attendance
            </Typography>

            {isWebcamOpen && (
              <div
                style={{
                  marginTop: "16px",
                  position: "relative",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  padding: "16px",
                }}
              >
                {!webcamRef.current?.getScreenshot() && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      zIndex: 1,
                    }}
                  >
                    <FaCamera size={40} color="#757575" />
                  </div>
                )}
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              </div>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={capture}
              style={{ marginTop: "16px" }}
              startIcon={<FaCamera />}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Start Recognition"}
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={showDrawer}
              sx={{ mt: 2, display: profileDetails ? "flex" : "none" }}
            >
              {profileDetails === null ? <BiBadgeCheck size={20} /> : <FaEye size={20} />} View Profile Details
            </Button>

            
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} style={{ display: "flex", flexDirection: "column" }}>
        <Card style={{ flex: 1 }}>
          <CardContent style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" gutterBottom>
              Recognition Logs
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Recent facial recognition attempts
            </Typography>

            <Box sx={{ flex: 1, overflowY: "auto", minHeight: "300px" }}>
              {recognitionLogs.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                  No recognition logs available
                </Typography>
              ) : (
                <Box>
                  {recognitionLogs.map((log, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: index === 0 ? "rgba(0, 0, 0, 0.04)" : "transparent",
                      }}
                    >
                      <Avatar
                        sx={{
                          mr: 2,
                          bgcolor:
                            log.status === "failed"
                              ? "error.main"
                              : log.status === "Checked Out"
                                ? "info.main"
                                : "success.main",
                        }}
                      >
                        {log.firstName?.[0] || "?"}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">
                          {log.firstName === "Unknown" ? "Unknown" : `${log.firstName} ${log.lastName || ""}`}
                        </Typography>
                        {log.email && (
                          <Typography variant="body2" color="text.secondary">
                            {log.email}
                          </Typography>
                        )}
                        {log.status && log.status !== "failed" && (
                          <Typography variant="body2" color="text.secondary">
                            {log.status}
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ mr: 2, color: "text.secondary" }}>
                        {formatTime(log.timestamp || log.createdAt)}
                      </Typography>
                      <Chip
                        label={
                          log.status === "failed" ? "Failed" : log.status === "Checked Out" ? "Check Out" : "Check In"
                        }
                        color={log.status === "failed" ? "error" : log.status === "Checked Out" ? "info" : "success"}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Drawer anchor="right" open={open} onClose={onClose}>
          <div style={{ marginTop: "50px" }}>
            <Box sx={{ width: 620, padding: 2 }}>
              <Typography variant="h6">Profile Details</Typography>
              <Box>
                <Alert severity="info">
                  <AlertTitle>Profile Info</AlertTitle>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Full Name</Typography>
                      <Typography>
                        {userProfile?.firstName} {userProfile?.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">Profile ID</Typography>
                      <Typography>{userProfile?.profileId}</Typography>
                    </Grid>
                    {userProfile?.email && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Email</Typography>
                        <Typography>{userProfile?.email}</Typography>
                      </Grid>
                    )}
                    {userProfile?.department && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Department</Typography>
                        <Typography>{userProfile?.department}</Typography>
                      </Grid>
                    )}
                    {userProfile?.position && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Position</Typography>
                        <Typography>{userProfile?.position}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Alert>
              </Box>
            </Box>
          </div>
        </Drawer>
      </Grid>
    </Grid>
  )
}

export default LoginPage
