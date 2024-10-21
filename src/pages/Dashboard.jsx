import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getEmployee, markAttendance } from '../services/ApiServices';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMarked, setIsMarked] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);

  // Get first name from full name
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  // Fetch employee data from backend
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setIsLoading(true);
        const res = await getEmployee();
        const data = res.data;
        setEmployeeData(data);
        setAttendanceHistory(data.attendanceRecords || []);
        
        // Check if attendance is marked for today using lastAttendance
        const today = new Date().toLocaleDateString('en-GB');
        if (data.lastAttendance && new Date(data.lastAttendance).toLocaleDateString('en-GB') === today) {
          setIsMarked(true);
        }
        
        // Set a timeout to show content after 1 seconds
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch employee data');
        // Set a timeout to show error after 1 seconds
        setTimeout(() => {
          setIsLoading(false);
          setShowContent(true);
        }, 1000);
        console.error('Error fetching employee data:', err);
      }
    };

    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMarkAttendance = async () => {
    try {
      const response = await markAttendance();      

      if (response.status !== 201) {
        throw new Error('Failed to mark attendance');
      }

      // Refresh employee data after marking attendance
      const res = await getEmployee();
      const updatedData = res.data;
      console.log(updatedData);

      setEmployeeData(updatedData);
      setAttendanceHistory(updatedData.attendanceRecords || []);
      console.log(attendanceHistory);

      setIsMarked(true);
      showNotification();
    } catch (err) {
      console.error('Error marking attendance:', err);
      showErrorNotification('Failed to mark attendance');
    }
  };

  const showNotification = (message = 'Attendance marked successfully!', isError = false) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-14 md:top-4 left-12 md:left-[35%] ${
      isError ? 'bg-red-600' : 'bg-green-600'
    } text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-500`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateY(-20px)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  const showErrorNotification = (message) => {
    showNotification(message, true);
  };

  const canMarkAttendance = () => {
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(6, 0, 0);
    const endTime = new Date();
    endTime.setHours(23, 59, 59);

    return now >= startTime && now <= endTime;
    // return true;
  };

  if (isLoading || !showContent) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className={`transition-all duration-300 ${isExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <header className="mb-8">
                <div className="mt-20 h-8 bg-gray-800 rounded w-1/4 animate-pulse"></div>
              </header>
              <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-6 animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded w-1/4 animate-pulse"></div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
                      <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get the first name for display
  const firstName = getFirstName(employeeData?.fullname);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      
      <main className={`transition-all duration-300 ${isExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mt-20">
                Hello, {firstName || 'Employee'}! 👋
              </h1>
            </header>

            <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Attendance Status</h2>
              <p className="text-gray-400 mb-4">Mark your attendance for today</p>
              
              <div className="mb-4">
                <p>Current Time: {formatTime(currentTime)}</p>
              </div>

              {isMarked ? (
                <div className="flex items-center text-green-500">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Attendance Marked for Today</span>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleMarkAttendance}
                    disabled={!canMarkAttendance()}
                    className={`px-4 py-2 rounded transition-colors ${
                      canMarkAttendance() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Mark Attendance
                  </button>
                  {!canMarkAttendance() && (
                    <p className="text-sm text-red-500 mt-2">
                      Attendance can only be marked between 6:00 AM and 11:59 PM
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-2">Attendance History</h2>
              <p className="text-gray-400 mb-4">Your recent attendance records</p>

              {attendanceHistory.length > 0 ? (
                <div className="divide-y divide-gray-700">
                  {attendanceHistory.map((record, index) => (
                    <div 
                      key={index} 
                      className="py-3 flex justify-between items-center"
                    >
                      <span className="text-gray-300">
                        {formatDate(record.date)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        record.status === 'Present' 
                          ? 'bg-green-600 text-green-100' 
                          : 'bg-red-600 text-red-100'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No attendance records found</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;