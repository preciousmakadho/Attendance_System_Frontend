// import React, { useState } from 'react';
// import { 
//   Grid, 
//   Paper, 
//   TextField, 
//   Button, 
//   Typography, 
//   Box, 
//   MenuItem, 
//   Select, 
//   InputLabel, 
//   FormControl,
//   Avatar,
//   IconButton
// } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';
// import axios from 'axios';
// import swal from 'sweetalert';

// const AddEmployee = () => {
//   const [employee, setEmployee] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     department: '',
//     position: '',
//     profileId: '',
//     phone: '',
//     image: null
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const departments = [
//     'Engineering',
//     'Marketing',
//     'HR',
//     'Finance',
//     'Operations',
//     'Sales'
//   ];

//   const positions = {
//     'Engineering': ['Frontend Developer', 'Backend Developer', 'Senior Developer', 'Team Lead'],
//     'Marketing': ['Marketing Manager', 'Content Specialist', 'SEO Analyst'],
//     'HR': ['HR Specialist', 'Recruiter', 'HR Manager'],
//     'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager'],
//     'Operations': ['Operations Manager', 'Logistics Coordinator'],
//     'Sales': ['Sales Representative', 'Sales Manager']
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEmployee(prev => ({
//         ...prev,
//         image: file
//       }));

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // First upload the image if exists
//       let imageUrl = '';
//       if (employee.image) {
//         const imageFormData = new FormData();
//         imageFormData.append('image', employee.image);

//         const uploadResponse = await axios.post(
//           'http://127.0.0.1:8808/upload', 
//           imageFormData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         );
//         imageUrl = uploadResponse.data.imageUrl;
//       }

//       // Prepare employee data
//       const employeeData = {
//         firstName: employee.firstName,
//         lastName: employee.lastName,
//         email: employee.email,
//         department: employee.department,
//         position: employee.position,
//         profileId: employee.profileId || generateProfileId(),
//         phone: employee.phone,
//         imageUrl: imageUrl,
//         status: 'Active',
//         createdAt: new Date().toISOString()
//       };

//       // Save to your MongoDB
//       const response = await axios.post(
//         'http://127.0.0.1:3061/mongo/profiles/create', 
//         employeeData
//       );

//       swal({
//         title: 'Success!',
//         text: 'Employee added successfully',
//         icon: 'success'
//       });

//       // Reset form
//       setEmployee({
//         firstName: '',
//         lastName: '',
//         email: '',
//         department: '',
//         position: '',
//         profileId: '',
//         phone: '',
//         image: null
//       });
//       setPreviewImage(null);

//     } catch (error) {
//       console.error('Error adding employee:', error);
//       swal({
//         title: 'Error',
//         text: 'Failed to add employee. Please try again.',
//         icon: 'error'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateProfileId = () => {
//     return 'EMP-' + Math.random().toString(36).substr(2, 8).toUpperCase();
//   };

//   return (
//     <Grid container justifyContent="center" style={{ padding: '20px' }}>
//       <Grid item xs={12} md={8}>
//         <Paper elevation={3} style={{ padding: '20px' }}>
//           <Typography variant="h5" gutterBottom>
//             Add New Employee
//           </Typography>
          
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               {/* Left Column - Employee Image */}
//               <Grid item xs={12} md={4}>
//                 <Box display="flex" flexDirection="column" alignItems="center">
//                   <Avatar
//                     src={previewImage || '/default-avatar.png'}
//                     sx={{ width: 150, height: 150, mb: 2 }}
//                   />
//                   <input
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     id="employee-image"
//                     type="file"
//                     onChange={handleImageChange}
//                   />
//                   <label htmlFor="employee-image">
//                     <Button
//                       variant="outlined"
//                       component="span"
//                       startIcon={<PhotoCamera />}
//                     >
//                       Upload Photo
//                     </Button>
//                   </label>
//                 </Box>
//               </Grid>

//               {/* Right Column - Employee Details */}
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="First Name"
//                       name="firstName"
//                       value={employee.firstName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Last Name"
//                       name="lastName"
//                       value={employee.lastName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       name="email"
//                       type="email"
//                       value={employee.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>Department</InputLabel>
//                       <Select
//                         name="department"
//                         value={employee.department}
//                         onChange={handleChange}
//                         label="Department"
//                         required
//                       >
//                         {departments.map(dept => (
//                           <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>Position</InputLabel>
//                       <Select
//                         name="position"
//                         value={employee.position}
//                         onChange={handleChange}
//                         label="Position"
//                         required
//                         disabled={!employee.department}
//                       >
//                         {employee.department && 
//                           positions[employee.department].map(pos => (
//                             <MenuItem key={pos} value={pos}>{pos}</MenuItem>
//                           ))
//                         }
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Profile ID"
//                       name="profileId"
//                       value={employee.profileId}
//                       onChange={handleChange}
//                       placeholder="Leave blank to auto-generate"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Phone Number"
//                       name="phone"
//                       value={employee.phone}
//                       onChange={handleChange}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>

//               {/* Submit Button */}
//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end">
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={loading}
//                   >
//                     {loading ? 'Adding...' : 'Add Employee'}
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default AddEmployee;
import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { PhotoCamera, Add } from '@mui/icons-material';
import axios from 'axios';
import swal from 'sweetalert';

const EmployeesPage = () => {
  // State for employees list
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  
  // State for new employee form
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    profileId: '',
    phone: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const departments = [
    'Engineering',
    'Marketing',
    'HR',
    'Finance',
    'Business',
    'Sales'
  ];

  const positions = {
    'Engineering': ['Frontend Developer', 'Backend Developer', 'Senior Developer', 'Team Lead'],
    'Marketing': ['Marketing Manager', 'Content Specialist', 'SEO Analyst'],
    'HR': ['HR Specialist', 'Recruiter', 'HR Manager'],
    'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager'],
    'Operations': ['Operations Manager', 'Logistics Coordinator'],
    'Sales': ['Sales Representative', 'Sales Manager'],
    'Business': ['Business Analyst']
  };

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3061/mongo/profiles/getAllProfiles');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        swal({
          title: 'Error',
          text: 'Failed to load employees',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // First upload the image if exists
      let imageUrl = '';
      if (employee.image) {
        const imageFormData = new FormData();
        imageFormData.append('image', employee.image);

        const uploadResponse = await axios.post(
          'http://127.0.0.1:8808/upload', 
          imageFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        imageUrl = uploadResponse.data.imageUrl;
      }

      // Prepare employee data
      const employeeData = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        profileId: employee.profileId || generateProfileId(),
        phone: employee.phone,
        imageUrl: imageUrl,
        status: 'Active',
        createdAt: new Date().toISOString()
      };

      // Save to your MongoDB
      const response = await axios.post(
        'http://127.0.0.1:3061/mongo/profiles/create', 
        employeeData
      );

      // Add the new employee to the list
      setEmployees(prev => [response.data, ...prev]);

      swal({
        title: 'Success!',
        text: 'Employee added successfully',
        icon: 'success'
      });

      // Reset form and close modal
      handleCloseModal();
    } catch (error) {
      console.error('Error adding employee:', error);
      swal({
        title: 'Error',
        text: 'Failed to add employee. Please try again.',
        icon: 'error'
      });
    } finally {
      setFormLoading(false);
    }
  };

  const generateProfileId = () => {
    return 'EMP-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmployee({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      profileId: '',
      phone: '',
      image: null
    });
    setPreviewImage(null);
  };

  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Employee Management</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Add Employee
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Profile ID</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <TableRow key={emp._id}>
                      <TableCell>
                        <Avatar src={emp.imageUrl || '/default-avatar.png'} />
                      </TableCell>
                      <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.position}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.profileId}</TableCell>
                      <TableCell>
                        <Box 
                          component="span" 
                          sx={{
                            p: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: emp.status === 'Active' ? 'success.light' : 'error.light',
                            color: emp.status === 'Active' ? 'success.dark' : 'error.dark'
                          }}
                        >
                          {emp.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No employees found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>

      {/* Add Employee Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} style={{ marginTop: '8px' }}>
              {/* Left Column - Employee Image */}
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    src={previewImage || '/default-avatar.png'}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="employee-image"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="employee-image">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Photo
                    </Button>
                  </label>
                </Box>
              </Grid>

              {/* Right Column - Employee Details */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={employee.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={employee.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={employee.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Department</InputLabel>
                      <Select
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        label="Department"
                        required
                      >
                        {departments.map(dept => (
                          <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Position</InputLabel>
                      <Select
                        name="position"
                        value={employee.position}
                        onChange={handleChange}
                        label="Position"
                        required
                        disabled={!employee.department}
                      >
                        {employee.department && 
                          positions[employee.department].map(pos => (
                            <MenuItem key={pos} value={pos}>{pos}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Profile ID"
                      name="profileId"
                      value={employee.profileId}
                      onChange={handleChange}
                      placeholder="Leave blank to auto-generate"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={employee.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} disabled={formLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={formLoading}
          >
            {formLoading ? <CircularProgress size={24} /> : 'Add Employee'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EmployeesPage;