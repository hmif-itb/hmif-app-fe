import { api } from '~/api/client';
import { PushSubscription } from '~/api/generated';

// TODO: remove alert
export async function setupNotification() {
  if (typeof Notification !== 'undefined') {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_KEY,
        });
        const json = subscription.toJSON();
        if (
          typeof json.endpoint === 'string' &&
          typeof json.keys === 'object'
        ) {
          await api.push.registerPush({
            requestBody: json as PushSubscription,
          });
        }
        alert('Subscribed to push notif');
        return subscription;
      }
    } catch (e) {
      console.log(e);
      alert('Failed to subscribe to push notif');
    }
  } else {
    alert('Notification not supported');
  }
}
