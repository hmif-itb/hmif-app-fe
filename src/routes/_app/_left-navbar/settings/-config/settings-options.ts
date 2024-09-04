import CoursesIcon from '~/assets/icons/settings/courses.svg';
import ProfileIcon from '~/assets/icons/settings/profile.svg';
import StarIcon from '~/assets/icons/settings/star.svg';
import SubscriptionIcon from '~/assets/icons/settings/subscription.svg';

export const settingsOptions = [
  {
    icon: CoursesIcon,
    title: 'Set Courses',
    href: '/settings/courses',
  },
  {
    icon: SubscriptionIcon,
    title: 'Notification',
    href: '/settings/subscriptions',
  },
  {
    icon: StarIcon,
    title: 'Credits',
    href: '/settings/credits',
  },
] as const;

export const desktopSettingsOptions = [
  {
    icon: ProfileIcon,
    title: 'Profile',
    href: '/settings',
  },
  ...settingsOptions,
] as const;
