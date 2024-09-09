import { api } from '~/api/client';
import { PushSubscription } from '~/api/generated';

let _subs: PushSubscription | null = null;

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
        const json = subscription.toJSON() as PushSubscription;
        if (
          typeof json.endpoint === 'string' &&
          typeof json.keys === 'object'
        ) {
          api.push.registerPush({
            requestBody: json,
          });
        }
        _subs = json;
        return _subs;
      }
    } catch (e) {
      // no permission
      return null;
    }
  } else {
    // not supported
    return null;
  }
}
