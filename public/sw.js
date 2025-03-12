self.addEventListener('install', (event) => {
    console.log('Service Worker installed.');
    self.skipWaiting(); // Forces activation immediately
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
  });
  
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Notification';
    const body = data.body || 'You have a new message.';
    const icon = '/icons/icon-192x192.png';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon,
      })
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  