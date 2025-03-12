export async function subscribeUser(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator)) return null;
  
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
  
      if (existingSubscription) {
        console.log('Already subscribed:', existingSubscription);
        return existingSubscription;
      }
  
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });
  
      console.log('New subscription:', subscription);
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  }
  