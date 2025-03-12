'use client';

import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';


export default function Home() {



  useEffect(() => {
    // Request permission on mount
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = async () => {
    if (Notification.permission !== 'granted') {
      alert('Please allow notifications');
      return;
    }

    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification('Hello from Next.js!', {
        body: 'You clicked the notification button!',
        icon: '/icons/icon-192x192.png',
      });
    }
  };
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNotification = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white flex flex-col items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-md mx-auto bg-[#1a1a2e]/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/20">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-8 text-purple-300">
          Hola!
        </h1>

        {/* Notification Icon with Rings */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          {/* Outer rings */}
          <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
          <div className="absolute inset-[15%] border-2 border-white/5 rounded-full"></div>
          <div className="absolute inset-[30%] border-2 border-white/5 rounded-full"></div>
          
          {/* Animation rings */}
          <div className={`absolute inset-[20%] bg-purple-600/20 rounded-full ${
            isAnimating ? 'animate-ping' : ''
          }`}></div>
          <div className={`absolute inset-[20%] bg-purple-600/40 rounded-full ${
            isAnimating ? 'animate-pulse' : ''
          } scale-90`}></div>
          
          {/* Center bell container */}
          <div className="absolute inset-[20%] bg-purple-900 rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-purple-300" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-white">
            Lorem Ipsum...
          </h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => { handleNotification(); sendNotification(); }}
          
          className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 
                   rounded-xl text-white font-semibold transition-all 
                   duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                   shadow-lg hover:shadow-purple-500/25"
        >
        
          Send Notification
        </button>
      </div>
    </main>
  );
}