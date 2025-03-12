self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
  
    const title = data.title || 'New Notification';
    const options = {
      body: data.body || 'Check it out!',
      icon: '/web-app-manifest-192x192.png',
      badge: '/web-app-manifest-192x192.png',
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  