"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Paper,
} from "@mui/material"
import {
  CameraAlt,
  CloudDownload,
  AccessTime,
  People,
  HowToReg,
  PersonOff,
  FilterList,
  Print,
  Search,
} from "@mui/icons-material"

export default function AttendanceAnalyticsDashboard() {
  const [period, setPeriod] = useState("week")
  const [department, setDepartment] = useState("all")
  const [activeTab, setActiveTab] = useState(0)

  // Sample data - replace with your API calls
  const summaryData = {
    totalEmployees: 148,
    presentToday: 134,
    lateToday: 7,
    absentToday: 7,
    attendanceRate: 90.5,
  }

  const dailyAttendanceData = [
    { name: "Mon", present: 142, absent: 6, late: 5, attendanceRate: 95.9 },
    { name: "Tue", present: 140, absent: 8, late: 6, attendanceRate: 94.6 },
    { name: "Wed", present: 138, absent: 10, late: 8, attendanceRate: 93.2 },
    { name: "Thu", present: 134, absent: 14, late: 7, attendanceRate: 90.5 },
    { name: "Fri", present: 130, absent: 18, late: 10, attendanceRate: 87.8 },
  ]

  const departmentData = [
    { name: "Engineering", attendanceRate: 95, present: 48, total: 50 },
    { name: "Sales", attendanceRate: 89, present: 32, total: 36 },
    { name: "Marketing", attendanceRate: 92, present: 22, total: 24 },
    { name: "HR", attendanceRate: 100, present: 8, total: 8 },
    { name: "Finance", attendanceRate: 83, present: 15, total: 18 },
    { name: "Operations", attendanceRate: 92, present: 11, total: 12 },
  ]

  const checkInTimeData = [
    { time: "8:00-8:30", count: 34 },
    { time: "8:30-9:00", count: 67 },
    { time: "9:00-9:30", count: 29 },
    { time: "9:30-10:00", count: 8 },
    { time: "After 10:00", count: 3 },
  ]

  const pieData = [
    { name: "Present", value: 134, color: "#4caf50" },
    { name: "Late", value: 7, color: "#ff9800" },
    { name: "Absent", value: 7, color: "#f44336" },
  ]

  const attendanceRecords = [
    {
      id: 1,
      name: "John Doe",
      initials: "JD",
      department: "Engineering",
      checkIn: "08:45",
      checkOut: "17:30",
      status: "present",
      hours: 8.75,
    },
    {
      id: 2,
      name: "Jane Smith",
      initials: "JS",
      department: "Marketing",
      checkIn: "09:05",
      checkOut: "18:15",
      status: "late",
      hours: 9.17,
    },
    {
      id: 3,
      name: "Robert Johnson",
      initials: "RJ",
      department: "HR",
      checkIn: "08:30",
      checkOut: "17:45",
      status: "present",
      hours: 9.25,
    },
    {
      id: 4,
      name: "Emily Davis",
      initials: "ED",
      department: "Sales",
      checkIn: "--:--",
      checkOut: "--:--",
      status: "absent",
      hours: 0,
    },
    {
      id: 5,
      name: "Michael Brown",
      initials: "MB",
      department: "Engineering",
      checkIn: "08:15",
      checkOut: "17:00",
      status: "present",
      hours: 8.75,
    },
    {
      id: 6,
      name: "Sarah Wilson",
      initials: "SW",
      department: "Finance",
      checkIn: "09:20",
      checkOut: "18:30",
      status: "late",
      hours: 9.17,
    },
    {
      id: 7,
      name: "David Miller",
      initials: "DM",
      department: "Operations",
      checkIn: "08:55",
      checkOut: "17:45",
      status: "present",
      hours: 8.83,
    },
    {
      id: 8,
      name: "Amanda Garcia",
      initials: "AG",
      department: "Sales",
      checkIn: "08:30",
      checkOut: "17:15",
      status: "present",
      hours: 8.75,
    },
  ]

  const exportReport = () => {
    alert("Exporting report...")
    // Implement export functionality
  }

  const printReport = () => {
    alert("Printing report...")
    // Implement print functionality
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const getStatusChipColor = (status) => {
    switch (status) {
      case "present":
        return { bg: "#e8f5e9", color: "#2e7d32" }
      case "late":
        return { bg: "#fff8e1", color: "#f57f17" }
      case "absent":
        return { bg: "#ffebee", color: "#c62828" }
      default:
        return { bg: "#e0e0e0", color: "#616161" }
    }
  }

  const getProgressBarColor = (rate) => {
    if (rate >= 95) return "#4caf50" // Green
    if (rate >= 90) return "#4caf50" // Green
    if (rate >= 85) return "#ffb300" // Amber
    return "#f44336" // Red
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
     
      
      {/* Main Content */}
      <Box >
        {/* Filters */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" component="h2" fontWeight="medium">
            Attendance Analytics Dashboard
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="period-select-label">Period</InputLabel>
              <Select
                labelId="period-select-label"
                value={period}
                label="Period"
                onChange={(e) => setPeriod(e.target.value)}
                size="small"
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="department-select-label">Department</InputLabel>
              <Select
                labelId="department-select-label"
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
                size="small"
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="finance">Finance</MenuItem>
                <MenuItem value="operations">Operations</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
            <Button variant="contained" startIcon={<CloudDownload />} onClick={exportReport}>
              Export Report
            </Button>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
            <Button variant="outlined" startIcon={<Print />} onClick={printReport}>
              Print
            </Button>
              </FormControl>
            <Button variant="outlined" startIcon={<FilterList />} size="small">
              More Filters
            </Button>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Employees
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                      {summaryData.totalEmployees}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1976d2", width: 40, height: 40 }}>
                    <People />
                  </Avatar>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Registered in system
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Present Today
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                      {summaryData.presentToday}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", width: 40, height: 40 }}>
                    <HowToReg />
                  </Avatar>
                </Box>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  {((summaryData.presentToday / summaryData.totalEmployees) * 100).toFixed(1)}% attendance rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Late Today
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                      {summaryData.lateToday}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "#fff8e1", color: "#f57f17", width: 40, height: 40 }}>
                    <AccessTime />
                  </Avatar>
                </Box>
                <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                  {((summaryData.lateToday / summaryData.totalEmployees) * 100).toFixed(1)}% of total employees
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Absent Today
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
                      {summaryData.absentToday}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "#ffebee", color: "#c62828", width: 40, height: 40 }}>
                    <PersonOff />
                  </Avatar>
                </Box>
                <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
                  {((summaryData.absentToday / summaryData.totalEmployees) * 100).toFixed(1)}% of total employees
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tab label="Overview" />
            <Tab label="Departments" />
            <Tab label="Individual Records" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ mb: 4 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Daily Attendance Chart */}
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Daily Attendance Trends
                    </Typography>
                    <Box sx={{ height: 320 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyAttendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="present" name="Present" fill="#4caf50" />
                          <Bar yAxisId="left" dataKey="late" name="Late" fill="#ff9800" />
                          <Bar yAxisId="left" dataKey="absent" name="Absent" fill="#f44336" />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="attendanceRate"
                            name="Attendance Rate (%)"
                            stroke="#2196f3"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Attendance Distribution */}
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Today's Attendance Overview
                    </Typography>
                    <Box sx={{ height: 320, display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: "80%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} employees`, ""]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Check-in Time Distribution */}
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Check-in Time Distribution
                    </Typography>
                    <Box sx={{ height: 320 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={checkInTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Employees" fill="#2196f3" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Weekly Performance */}
              <Grid item xs={12} lg={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Weekly Performance
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {departmentData.slice(0, 4).map((dept) => (
                        <Box key={dept.name} sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <Typography variant="body2" fontWeight="medium">
                              {dept.name}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {dept.attendanceRate}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={dept.attendanceRate}
                            sx={{
                              height: 8,
                              borderRadius: 1,
                              bgcolor: "#e0e0e0",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: getProgressBarColor(dept.attendanceRate),
                              },
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                            {dept.present} of {dept.total} present
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Department Attendance Performance
                </Typography>
                <Box sx={{ mt: 4 }}>
                  {departmentData.map((dept) => (
                    <Box key={dept.name} sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="body1" fontWeight="medium">
                          {dept.name}
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {dept.attendanceRate}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={dept.attendanceRate}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: getProgressBarColor(dept.attendanceRate),
                            borderRadius: 5,
                          },
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {dept.present} of {dept.total} employees present
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Paper sx={{ borderRadius: 1, overflow: "hidden" }}>
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Today's Individual Records</Typography>
                <TextField
                  placeholder="Search employees..."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 250 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", color: "#666" }}>EMPLOYEE</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#666" }}>DEPARTMENT</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#666" }}>CHECK-IN</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#666" }}>CHECK-OUT</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#666" }}>STATUS</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#666" }}>HOURS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceRecords.map((record) => {
                      const statusColors = {
                        present: { bg: "#e8f5e9", color: "#2e7d32" },
                        late: { bg: "#fff8e1", color: "#f57f17" },
                        absent: { bg: "#ffebee", color: "#c62828" },
                      }
                      const statusColor = statusColors[record.status]

                      return (
                        <TableRow key={record.id} sx={{ "&:hover": { bgcolor: "#f9f9f9" } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                sx={{
                                  bgcolor: "#f5f5f5",
                                  color: "#666",
                                  mr: 2,
                                  width: 36,
                                  height: 36,
                                  fontSize: "0.875rem",
                                }}
                              >
                                {record.initials}
                              </Avatar>
                              <Typography variant="body2" fontWeight="medium">
                                {record.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{record.department}</TableCell>
                          <TableCell>{record.checkIn}</TableCell>
                          <TableCell>{record.checkOut}</TableCell>
                          <TableCell>
                            <Chip
                              label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              size="small"
                              sx={{
                                bgcolor: statusColor.bg,
                                color: statusColor.color,
                                fontWeight: 500,
                                borderRadius: "16px",
                                fontSize: "0.75rem",
                              }}
                            />
                          </TableCell>
                          <TableCell>{record.hours.toFixed(2)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing 1 to 8 of 148 results
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined" sx={{ minWidth: 30 }}>
                    &lt;
                  </Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 30 }}>
                    1
                  </Button>
                  <Button size="small" variant="contained" sx={{ minWidth: 30 }}>
                    2
                  </Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 30 }}>
                    3
                  </Button>
                  <Button size="small" variant="outlined" disabled sx={{ minWidth: 30 }}>
                    ...
                  </Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 30 }}>
                    15
                  </Button>
                  <Button size="small" variant="outlined" sx={{ minWidth: 30 }}>
                    &gt;
                  </Button>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  )
}
