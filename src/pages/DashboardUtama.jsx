import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './../pageSection/footer';
import GetStarted from './../pageSection/getStartedUtama';
import NavBarDashboard from './../pageSection/navbarDashboard';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Kalau token tidak ada, redirect ke login
      navigate('/Loginpage');
    }
  }, [navigate]);

  return (
    <div>
      <NavBarDashboard />
      <GetStarted />
      <Footer />
    </div>
  );
}