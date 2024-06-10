import CoursesIcon from '~/assets/icons/settings/courses.svg';
import SettingsIcon from '~/assets/icons/settings/settings.svg';
import SubscriptionIcon from '~/assets/icons/settings/subscription.svg';

export const settingsOptions = [
  {
    icon: CoursesIcon,
    title: 'Set Courses',
    href: '/settings/courses',
  },
  {
    icon: SubscriptionIcon,
    title: 'Subscription',
    href: '/settings/subscriptions',
  },
] as const;

export const desktopSettingsOptions = [
  {
    icon: SettingsIcon,
    title: 'Settings',
    href: '/settings',
  },
  ...settingsOptions,
] as const;
