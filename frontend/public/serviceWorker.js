// service-worker.js
self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: 'icon.png',
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  