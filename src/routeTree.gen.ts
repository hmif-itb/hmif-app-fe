/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppImport } from './routes/_app'
import { Route as IndexImport } from './routes/index'
import { Route as SocketIndexImport } from './routes/socket/index'
import { Route as AppCalendarImport } from './routes/_app/calendar'
import { Route as AppLeftNavbarImport } from './routes/_app/_left-navbar'
import { Route as AppCalendarIndexImport } from './routes/_app/calendar/index'
import { Route as AppLeftNavbarSettingsImport } from './routes/_app/_left-navbar/settings'
import { Route as AppLeftNavbarTimelineIndexImport } from './routes/_app/_left-navbar/timeline/index'
import { Route as AppLeftNavbarSettingsIndexImport } from './routes/_app/_left-navbar/settings/index'
import { Route as AppLeftNavbarHomeIndexImport } from './routes/_app/_left-navbar/home/index'
import { Route as AppLeftNavbarAddAnnouncementIndexImport } from './routes/_app/_left-navbar/add-announcement/index'
import { Route as AppLeftNavbarSettingsSettingsItemImport } from './routes/_app/_left-navbar/settings/_settings-item'
import { Route as AppLeftNavbarHomeTestimoniImport } from './routes/_app/_left-navbar/home/testimoni'
import { Route as AppLeftNavbarTimelineInfoIdIndexImport } from './routes/_app/_left-navbar/timeline/$infoId/index'
import { Route as AppLeftNavbarHomeTestimoniIndexImport } from './routes/_app/_left-navbar/home/testimoni/index'
import { Route as AppLeftNavbarHomeNimFinderIndexImport } from './routes/_app/_left-navbar/home/nim-finder/index'
import { Route as AppLeftNavbarHomeDingdongIndexImport } from './routes/_app/_left-navbar/home/dingdong/index'
import { Route as AppLeftNavbarHomeCurhatIndexImport } from './routes/_app/_left-navbar/home/curhat/index'
import { Route as AppLeftNavbarHomeCompetitionIndexImport } from './routes/_app/_left-navbar/home/competition/index'
import { Route as AppLeftNavbarSettingsSettingsItemSubscriptionsIndexImport } from './routes/_app/_left-navbar/settings/_settings-item/subscriptions/index'
import { Route as AppLeftNavbarSettingsSettingsItemCreditsIndexImport } from './routes/_app/_left-navbar/settings/_settings-item/credits/index'
import { Route as AppLeftNavbarSettingsSettingsItemCoursesIndexImport } from './routes/_app/_left-navbar/settings/_settings-item/courses/index'
import { Route as AppLeftNavbarHomeTestimoniTypeIndexImport } from './routes/_app/_left-navbar/home/testimoni/$type/index'
import { Route as AppLeftNavbarSettingsSettingsItemCoursesAddIndexImport } from './routes/_app/_left-navbar/settings/_settings-item/courses/add/index'
import { Route as AppLeftNavbarHomeTestimoniTypeSemesterIndexImport } from './routes/_app/_left-navbar/home/testimoni/$type/$semester/index'
import { Route as AppLeftNavbarHomeTestimoniTypeSemesterCourseIdIndexImport } from './routes/_app/_left-navbar/home/testimoni_/$type/$semester/$courseId/index'

// Create Virtual Routes

const LoginIndexLazyImport = createFileRoute('/login/')()

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexLazyRoute = LoginIndexLazyImport.update({
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login/index.lazy').then((d) => d.Route))

const SocketIndexRoute = SocketIndexImport.update({
  path: '/socket/',
  getParentRoute: () => rootRoute,
} as any)

const AppCalendarRoute = AppCalendarImport.update({
  path: '/calendar',
  getParentRoute: () => AppRoute,
} as any)

const AppLeftNavbarRoute = AppLeftNavbarImport.update({
  id: '/_left-navbar',
  getParentRoute: () => AppRoute,
} as any)

const AppCalendarIndexRoute = AppCalendarIndexImport.update({
  path: '/',
  getParentRoute: () => AppCalendarRoute,
} as any)

const AppLeftNavbarSettingsRoute = AppLeftNavbarSettingsImport.update({
  path: '/settings',
  getParentRoute: () => AppLeftNavbarRoute,
} as any)

const AppLeftNavbarTimelineIndexRoute = AppLeftNavbarTimelineIndexImport.update(
  {
    path: '/timeline/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any,
)

const AppLeftNavbarSettingsIndexRoute = AppLeftNavbarSettingsIndexImport.update(
  {
    path: '/',
    getParentRoute: () => AppLeftNavbarSettingsRoute,
  } as any,
)

const AppLeftNavbarHomeIndexRoute = AppLeftNavbarHomeIndexImport.update({
  path: '/home/',
  getParentRoute: () => AppLeftNavbarRoute,
} as any)

const AppLeftNavbarAddAnnouncementIndexRoute =
  AppLeftNavbarAddAnnouncementIndexImport.update({
    path: '/add-announcement/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

const AppLeftNavbarSettingsSettingsItemRoute =
  AppLeftNavbarSettingsSettingsItemImport.update({
    id: '/_settings-item',
    getParentRoute: () => AppLeftNavbarSettingsRoute,
  } as any)

const AppLeftNavbarHomeTestimoniRoute = AppLeftNavbarHomeTestimoniImport.update(
  {
    path: '/home/testimoni',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any,
)

const AppLeftNavbarTimelineInfoIdIndexRoute =
  AppLeftNavbarTimelineInfoIdIndexImport.update({
    path: '/timeline/$infoId/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

const AppLeftNavbarHomeTestimoniIndexRoute =
  AppLeftNavbarHomeTestimoniIndexImport.update({
    path: '/',
    getParentRoute: () => AppLeftNavbarHomeTestimoniRoute,
  } as any)

const AppLeftNavbarHomeNimFinderIndexRoute =
  AppLeftNavbarHomeNimFinderIndexImport.update({
    path: '/home/nim-finder/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

const AppLeftNavbarHomeDingdongIndexRoute =
  AppLeftNavbarHomeDingdongIndexImport.update({
    path: '/home/dingdong/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

const AppLeftNavbarHomeCurhatIndexRoute =
  AppLeftNavbarHomeCurhatIndexImport.update({
    path: '/home/curhat/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

const AppLeftNavbarHomeCompetitionIndexRoute =
  AppLeftNavbarHomeCompetitionIndexImport.update({
    path: '/home/competition/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

const AppLeftNavbarSettingsSettingsItemSubscriptionsIndexRoute =
  AppLeftNavbarSettingsSettingsItemSubscriptionsIndexImport.update({
    path: '/subscriptions/',
    getParentRoute: () => AppLeftNavbarSettingsSettingsItemRoute,
  } as any)

const AppLeftNavbarSettingsSettingsItemCreditsIndexRoute =
  AppLeftNavbarSettingsSettingsItemCreditsIndexImport.update({
    path: '/credits/',
    getParentRoute: () => AppLeftNavbarSettingsSettingsItemRoute,
  } as any)

const AppLeftNavbarSettingsSettingsItemCoursesIndexRoute =
  AppLeftNavbarSettingsSettingsItemCoursesIndexImport.update({
    path: '/courses/',
    getParentRoute: () => AppLeftNavbarSettingsSettingsItemRoute,
  } as any)

const AppLeftNavbarHomeTestimoniTypeIndexRoute =
  AppLeftNavbarHomeTestimoniTypeIndexImport.update({
    path: '/$type/',
    getParentRoute: () => AppLeftNavbarHomeTestimoniRoute,
  } as any)

const AppLeftNavbarSettingsSettingsItemCoursesAddIndexRoute =
  AppLeftNavbarSettingsSettingsItemCoursesAddIndexImport.update({
    path: '/courses/add/',
    getParentRoute: () => AppLeftNavbarSettingsSettingsItemRoute,
  } as any)

const AppLeftNavbarHomeTestimoniTypeSemesterIndexRoute =
  AppLeftNavbarHomeTestimoniTypeSemesterIndexImport.update({
    path: '/$type/$semester/',
    getParentRoute: () => AppLeftNavbarHomeTestimoniRoute,
  } as any)

const AppLeftNavbarHomeTestimoniTypeSemesterCourseIdIndexRoute =
  AppLeftNavbarHomeTestimoniTypeSemesterCourseIdIndexImport.update({
    path: '/home/testimoni/$type/$semester/$courseId/',
    getParentRoute: () => AppLeftNavbarRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_app/_left-navbar': {
      id: '/_app/_left-navbar'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppLeftNavbarImport
      parentRoute: typeof AppImport
    }
    '/_app/calendar': {
      id: '/_app/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof AppCalendarImport
      parentRoute: typeof AppImport
    }
    '/socket/': {
      id: '/socket/'
      path: '/socket'
      fullPath: '/socket'
      preLoaderRoute: typeof SocketIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_app/_left-navbar/settings': {
      id: '/_app/_left-navbar/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AppLeftNavbarSettingsImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/calendar/': {
      id: '/_app/calendar/'
      path: '/'
      fullPath: '/calendar/'
      preLoaderRoute: typeof AppCalendarIndexImport
      parentRoute: typeof AppCalendarImport
    }
    '/_app/_left-navbar/home/testimoni': {
      id: '/_app/_left-navbar/home/testimoni'
      path: '/home/testimoni'
      fullPath: '/home/testimoni'
      preLoaderRoute: typeof AppLeftNavbarHomeTestimoniImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/settings/_settings-item': {
      id: '/_app/_left-navbar/settings/_settings-item'
      path: ''
      fullPath: '/settings'
      preLoaderRoute: typeof AppLeftNavbarSettingsSettingsItemImport
      parentRoute: typeof AppLeftNavbarSettingsImport
    }
    '/_app/_left-navbar/add-announcement/': {
      id: '/_app/_left-navbar/add-announcement/'
      path: '/add-announcement'
      fullPath: '/add-announcement'
      preLoaderRoute: typeof AppLeftNavbarAddAnnouncementIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/': {
      id: '/_app/_left-navbar/home/'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof AppLeftNavbarHomeIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/settings/': {
      id: '/_app/_left-navbar/settings/'
      path: '/'
      fullPath: '/settings/'
      preLoaderRoute: typeof AppLeftNavbarSettingsIndexImport
      parentRoute: typeof AppLeftNavbarSettingsImport
    }
    '/_app/_left-navbar/timeline/': {
      id: '/_app/_left-navbar/timeline/'
      path: '/timeline'
      fullPath: '/timeline'
      preLoaderRoute: typeof AppLeftNavbarTimelineIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/competition/': {
      id: '/_app/_left-navbar/home/competition/'
      path: '/home/competition'
      fullPath: '/home/competition'
      preLoaderRoute: typeof AppLeftNavbarHomeCompetitionIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/curhat/': {
      id: '/_app/_left-navbar/home/curhat/'
      path: '/home/curhat'
      fullPath: '/home/curhat'
      preLoaderRoute: typeof AppLeftNavbarHomeCurhatIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/dingdong/': {
      id: '/_app/_left-navbar/home/dingdong/'
      path: '/home/dingdong'
      fullPath: '/home/dingdong'
      preLoaderRoute: typeof AppLeftNavbarHomeDingdongIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/nim-finder/': {
      id: '/_app/_left-navbar/home/nim-finder/'
      path: '/home/nim-finder'
      fullPath: '/home/nim-finder'
      preLoaderRoute: typeof AppLeftNavbarHomeNimFinderIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/testimoni/': {
      id: '/_app/_left-navbar/home/testimoni/'
      path: '/'
      fullPath: '/home/testimoni/'
      preLoaderRoute: typeof AppLeftNavbarHomeTestimoniIndexImport
      parentRoute: typeof AppLeftNavbarHomeTestimoniImport
    }
    '/_app/_left-navbar/timeline/$infoId/': {
      id: '/_app/_left-navbar/timeline/$infoId/'
      path: '/timeline/$infoId'
      fullPath: '/timeline/$infoId'
      preLoaderRoute: typeof AppLeftNavbarTimelineInfoIdIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
    '/_app/_left-navbar/home/testimoni/$type/': {
      id: '/_app/_left-navbar/home/testimoni/$type/'
      path: '/$type'
      fullPath: '/home/testimoni/$type'
      preLoaderRoute: typeof AppLeftNavbarHomeTestimoniTypeIndexImport
      parentRoute: typeof AppLeftNavbarHomeTestimoniImport
    }
    '/_app/_left-navbar/settings/_settings-item/courses/': {
      id: '/_app/_left-navbar/settings/_settings-item/courses/'
      path: '/courses'
      fullPath: '/settings/courses'
      preLoaderRoute: typeof AppLeftNavbarSettingsSettingsItemCoursesIndexImport
      parentRoute: typeof AppLeftNavbarSettingsSettingsItemImport
    }
    '/_app/_left-navbar/settings/_settings-item/credits/': {
      id: '/_app/_left-navbar/settings/_settings-item/credits/'
      path: '/credits'
      fullPath: '/settings/credits'
      preLoaderRoute: typeof AppLeftNavbarSettingsSettingsItemCreditsIndexImport
      parentRoute: typeof AppLeftNavbarSettingsSettingsItemImport
    }
    '/_app/_left-navbar/settings/_settings-item/subscriptions/': {
      id: '/_app/_left-navbar/settings/_settings-item/subscriptions/'
      path: '/subscriptions'
      fullPath: '/settings/subscriptions'
      preLoaderRoute: typeof AppLeftNavbarSettingsSettingsItemSubscriptionsIndexImport
      parentRoute: typeof AppLeftNavbarSettingsSettingsItemImport
    }
    '/_app/_left-navbar/home/testimoni/$type/$semester/': {
      id: '/_app/_left-navbar/home/testimoni/$type/$semester/'
      path: '/$type/$semester'
      fullPath: '/home/testimoni/$type/$semester'
      preLoaderRoute: typeof AppLeftNavbarHomeTestimoniTypeSemesterIndexImport
      parentRoute: typeof AppLeftNavbarHomeTestimoniImport
    }
    '/_app/_left-navbar/settings/_settings-item/courses/add/': {
      id: '/_app/_left-navbar/settings/_settings-item/courses/add/'
      path: '/courses/add'
      fullPath: '/settings/courses/add'
      preLoaderRoute: typeof AppLeftNavbarSettingsSettingsItemCoursesAddIndexImport
      parentRoute: typeof AppLeftNavbarSettingsSettingsItemImport
    }
    '/_app/_left-navbar/home/testimoni/$type/$semester/$courseId/': {
      id: '/_app/_left-navbar/home/testimoni/$type/$semester/$courseId/'
      path: '/home/testimoni/$type/$semester/$courseId'
      fullPath: '/home/testimoni/$type/$semester/$courseId'
      preLoaderRoute: typeof AppLeftNavbarHomeTestimoniTypeSemesterCourseIdIndexImport
      parentRoute: typeof AppLeftNavbarImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AppRoute: AppRoute.addChildren({
    AppLeftNavbarRoute: AppLeftNavbarRoute.addChildren({
      AppLeftNavbarSettingsRoute: AppLeftNavbarSettingsRoute.addChildren({
        AppLeftNavbarSettingsSettingsItemRoute:
          AppLeftNavbarSettingsSettingsItemRoute.addChildren({
            AppLeftNavbarSettingsSettingsItemCoursesIndexRoute,
            AppLeftNavbarSettingsSettingsItemCreditsIndexRoute,
            AppLeftNavbarSettingsSettingsItemSubscriptionsIndexRoute,
            AppLeftNavbarSettingsSettingsItemCoursesAddIndexRoute,
          }),
        AppLeftNavbarSettingsIndexRoute,
      }),
      AppLeftNavbarHomeTestimoniRoute:
        AppLeftNavbarHomeTestimoniRoute.addChildren({
          AppLeftNavbarHomeTestimoniIndexRoute,
          AppLeftNavbarHomeTestimoniTypeIndexRoute,
          AppLeftNavbarHomeTestimoniTypeSemesterIndexRoute,
        }),
      AppLeftNavbarAddAnnouncementIndexRoute,
      AppLeftNavbarHomeIndexRoute,
      AppLeftNavbarTimelineIndexRoute,
      AppLeftNavbarHomeCompetitionIndexRoute,
      AppLeftNavbarHomeCurhatIndexRoute,
      AppLeftNavbarHomeDingdongIndexRoute,
      AppLeftNavbarHomeNimFinderIndexRoute,
      AppLeftNavbarTimelineInfoIdIndexRoute,
      AppLeftNavbarHomeTestimoniTypeSemesterCourseIdIndexRoute,
    }),
    AppCalendarRoute: AppCalendarRoute.addChildren({ AppCalendarIndexRoute }),
  }),
  SocketIndexRoute,
  LoginIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_app",
        "/socket/",
        "/login/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/_left-navbar",
        "/_app/calendar"
      ]
    },
    "/_app/_left-navbar": {
      "filePath": "_app/_left-navbar.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_left-navbar/settings",
        "/_app/_left-navbar/home/testimoni",
        "/_app/_left-navbar/add-announcement/",
        "/_app/_left-navbar/home/",
        "/_app/_left-navbar/timeline/",
        "/_app/_left-navbar/home/competition/",
        "/_app/_left-navbar/home/curhat/",
        "/_app/_left-navbar/home/dingdong/",
        "/_app/_left-navbar/home/nim-finder/",
        "/_app/_left-navbar/timeline/$infoId/",
        "/_app/_left-navbar/home/testimoni/$type/$semester/$courseId/"
      ]
    },
    "/_app/calendar": {
      "filePath": "_app/calendar.tsx",
      "parent": "/_app",
      "children": [
        "/_app/calendar/"
      ]
    },
    "/socket/": {
      "filePath": "socket/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.lazy.tsx"
    },
    "/_app/_left-navbar/settings": {
      "filePath": "_app/_left-navbar/settings.tsx",
      "parent": "/_app/_left-navbar",
      "children": [
        "/_app/_left-navbar/settings/_settings-item",
        "/_app/_left-navbar/settings/"
      ]
    },
    "/_app/calendar/": {
      "filePath": "_app/calendar/index.tsx",
      "parent": "/_app/calendar"
    },
    "/_app/_left-navbar/home/testimoni": {
      "filePath": "_app/_left-navbar/home/testimoni.tsx",
      "parent": "/_app/_left-navbar",
      "children": [
        "/_app/_left-navbar/home/testimoni/",
        "/_app/_left-navbar/home/testimoni/$type/",
        "/_app/_left-navbar/home/testimoni/$type/$semester/"
      ]
    },
    "/_app/_left-navbar/settings/_settings-item": {
      "filePath": "_app/_left-navbar/settings/_settings-item.tsx",
      "parent": "/_app/_left-navbar/settings",
      "children": [
        "/_app/_left-navbar/settings/_settings-item/courses/",
        "/_app/_left-navbar/settings/_settings-item/credits/",
        "/_app/_left-navbar/settings/_settings-item/subscriptions/",
        "/_app/_left-navbar/settings/_settings-item/courses/add/"
      ]
    },
    "/_app/_left-navbar/add-announcement/": {
      "filePath": "_app/_left-navbar/add-announcement/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/": {
      "filePath": "_app/_left-navbar/home/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/settings/": {
      "filePath": "_app/_left-navbar/settings/index.tsx",
      "parent": "/_app/_left-navbar/settings"
    },
    "/_app/_left-navbar/timeline/": {
      "filePath": "_app/_left-navbar/timeline/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/competition/": {
      "filePath": "_app/_left-navbar/home/competition/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/curhat/": {
      "filePath": "_app/_left-navbar/home/curhat/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/dingdong/": {
      "filePath": "_app/_left-navbar/home/dingdong/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/nim-finder/": {
      "filePath": "_app/_left-navbar/home/nim-finder/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/testimoni/": {
      "filePath": "_app/_left-navbar/home/testimoni/index.tsx",
      "parent": "/_app/_left-navbar/home/testimoni"
    },
    "/_app/_left-navbar/timeline/$infoId/": {
      "filePath": "_app/_left-navbar/timeline/$infoId/index.tsx",
      "parent": "/_app/_left-navbar"
    },
    "/_app/_left-navbar/home/testimoni/$type/": {
      "filePath": "_app/_left-navbar/home/testimoni/$type/index.tsx",
      "parent": "/_app/_left-navbar/home/testimoni"
    },
    "/_app/_left-navbar/settings/_settings-item/courses/": {
      "filePath": "_app/_left-navbar/settings/_settings-item/courses/index.tsx",
      "parent": "/_app/_left-navbar/settings/_settings-item"
    },
    "/_app/_left-navbar/settings/_settings-item/credits/": {
      "filePath": "_app/_left-navbar/settings/_settings-item/credits/index.tsx",
      "parent": "/_app/_left-navbar/settings/_settings-item"
    },
    "/_app/_left-navbar/settings/_settings-item/subscriptions/": {
      "filePath": "_app/_left-navbar/settings/_settings-item/subscriptions/index.tsx",
      "parent": "/_app/_left-navbar/settings/_settings-item"
    },
    "/_app/_left-navbar/home/testimoni/$type/$semester/": {
      "filePath": "_app/_left-navbar/home/testimoni/$type/$semester/index.tsx",
      "parent": "/_app/_left-navbar/home/testimoni"
    },
    "/_app/_left-navbar/settings/_settings-item/courses/add/": {
      "filePath": "_app/_left-navbar/settings/_settings-item/courses/add/index.tsx",
      "parent": "/_app/_left-navbar/settings/_settings-item"
    },
    "/_app/_left-navbar/home/testimoni/$type/$semester/$courseId/": {
      "filePath": "_app/_left-navbar/home/testimoni_/$type/$semester/$courseId/index.tsx",
      "parent": "/_app/_left-navbar"
    }
  }
}
ROUTE_MANIFEST_END */
