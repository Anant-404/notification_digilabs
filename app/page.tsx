'use client';

import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

async function subscribeUser() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) return existingSubscription;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY!),
      });

      console.log('User is subscribed:', subscription);
      return subscription;
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Home() {
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope);
          subscribeUser();
        })
        .catch((error) =>
          console.error('Service Worker registration failed:', error)
        );
    }
  }, []);

  const sendNotification = async () => {
    if (Notification.permission !== 'granted') {
      alert('Please allow notifications');
      return;
    }

    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification('Hello from Anant!', {
        body: 'You clicked the notification button!',
        icon: '/web-app-manifest-192x192.png',
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
      {/* <div className="w-full max-w-md mx-auto bg-[#1a1a2e] rounded-3xl p-8"> */}
        <h1 className="text-2xl font-bold text-center mb-8 text-purple-300">Hola!</h1>

        <div className="relative w-32 h-32 mx-auto mb-12">
          <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
          <div className="absolute inset-[15%] border-2 border-white/5 rounded-full"></div>
          <div className="absolute inset-[30%] border-2 border-white/5 rounded-full"></div>

          <div
            className={`absolute inset-[20%] bg-purple-600/20 rounded-full ${isAnimating ? 'animate-ping' : ''}`}
          ></div>
          <div
            className={`absolute inset-[20%] bg-purple-600/40 rounded-full ${isAnimating ? 'animate-pulse' : ''} scale-90`}
          ></div>

          <div className="absolute inset-[20%] bg-purple-900 rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-purple-300" />
          </div>
        </div>

        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-white">DiGiLABS_Assignment</h2>
          <p className="text-gray-400">pwa using Nextjs</p>
        </div>

        <button
          onClick={() => {
            handleNotification();
            sendNotification();
          }}
          className="w-full sm:w-90 py-4 px-6 bg-purple-600 hover:bg-purple-700 
           rounded-xl text-white font-semibold transition-all 
           duration-300 transform hover:scale-[1.02] active:scale-[0.98]
           shadow-lg hover:shadow-purple-500/25"
        >
          click me
        </button>
      {/* </div> */}
    </main>
  );
}