import React, { useEffect, useState, memo } from 'react';
import Sidebar from '../components/Sidebar';
import { getEmployee } from '../services/ApiServices';

// Separate skeleton component with fixed structure
const ProfileSkeleton = memo(({ isExpanded }) => (
  <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6 animate-pulse">
    <h2 className="text-xl font-semibold mb-4">
      <div className="h-6 bg-gray-700 rounded w-1/4" />
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400">Employee ID</label>
        <div className="mt-1 h-5 bg-gray-700 rounded w-1/3" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Name</label>
        <div className="mt-1 h-5 bg-gray-700 rounded w-1/2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Position</label>
        <div className="mt-1 h-5 bg-gray-700 rounded w-2/5" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Joining Date</label>
        <div className="mt-1 h-5 bg-gray-700 rounded w-1/4" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400">Email</label>
        <div className="mt-1 h-5 bg-gray-700 rounded w-2/3" />
      </div>
    </div>
    <div className="mt-6">
      <div className="h-10 bg-gray-700 rounded w-1/4" />
      <div className="mt-2 h-4 bg-gray-700 rounded w-3/4" />
    </div>
  </div>
));

// Separate error component
const ErrorDisplay = memo(({ error }) => (
  <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
    <p className="text-red-500">{error.message}</p>
  </div>
));

// Separate profile content component with fixed field structure
const ProfileContent = memo(({ employeeData }) => {
  const fields = [
    { id: 'employeeId', label: 'Employee ID', value: employeeData.id },
    { id: 'name', label: 'Name', value: employeeData.fullname },
    { id: 'position', label: 'Position', value: employeeData.position },
    { 
      id: 'joiningDate', 
      label: 'Joining Date', 
      value: new Date(employeeData.joiningDate).toLocaleDateString() 
    },
    { id: 'email', label: 'Email', value: employeeData.email }
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-400">
              {field.label}
            </label>
            <p className="mt-1 text-sm text-gray-300">{field.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          disabled
          className="px-4 py-2 bg-gray-700 text-gray-500 rounded cursor-not-allowed"
        >
          Contact HR to Update Details
        </button>
        <p className="mt-2 text-sm text-gray-500">
          To update your personal information, please contact the HR department.
        </p>
      </div>
    </div>
  );
});

const ProfilePage = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    let mounted = true;
    const SKELETON_DURATION = 1000;

    const fetchEmployee = async () => {
      try {
        const res = await getEmployee();
        if (!mounted) return;

        if (res.status === 200) {
          setEmployeeData(res.data);
        } else {
          setError(new Error(
            res.status === 404 ? 'Employee not found.' : 'An unexpected error occurred.'
          ));
        }
      } catch (error) {
        if (mounted) {
          setError(error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchEmployee();

    const timer = setTimeout(() => {
      if (mounted) {
        setShowSkeleton(false);
      }
    }, SKELETON_DURATION);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  const mainClassName = `transition-all duration-300 ${
    isExpanded ? 'md:ml-64' : 'md:ml-20'
  }`;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <main className={mainClassName}>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mt-20">
                {error ? 'Error' : 'Employee Profile'}
              </h1>
            </header>
            
            {(loading || showSkeleton) && (
              <ProfileSkeleton isExpanded={isExpanded} />
            )}
            
            {!loading && !showSkeleton && error && (
              <ErrorDisplay error={error} />
            )}
            
            {!loading && !showSkeleton && !error && employeeData && (
              <ProfileContent employeeData={employeeData} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;