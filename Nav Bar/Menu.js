const Menu = [
  {
    heading: "Sellers Place",
    translate: "sidebar.heading.HEADER"
  },
  {
    name: "Profile",
    icon: "fa-1x mr-2 far fa-user",
    path: "/admin/profile/dashboard"
  },
  {
    name: "Venues",
    icon: "fa-1x mr-2 far fa-building",
    path: "/admin/venues/dashboard"
  },
  {
    name: "Promoters",
    icon: "fa-1x mr-2 fas fa-broadcast-tower",
    path: "/admin/promoters/dashboard",
    submenu: [
      {
        name: "Events",
        path: "/admin/promoters/events"
      },
      {
        name: "Venues",
        path: "/admin/promoters/venues"
      },
      {
        name: "Public Profile",
        path: "/admin/promoters/profile"
      },
      {
        name: "Vendors",
        path: "/admin/promoters/vendors"
      },
      {
        name: "Calendar",
        path: "/admin/promoters/calendar"
      },
      {
        name: "Payments",
        path: "/admin/promoters/payments"
      },
    ]
  },
  {
    name: "Vendors",
    icon: "icon-briefcase",
    path: "/admin/vendors/dashboard",
    submenu: [
      {
        name: "Promoters",
        path: "/admin/vendors/promoters",
      },
      {
        name: "Events",
        path: "/admin/vendors/events",
      },
      {
        name: "Calendar",
        path: "/admin/vendors/calendar"
      },
    ]
  },
  {
    name: "Events",
    icon: "icon-calendar",
    path: "/admin/events/dashboard"
  },
  {
    name: "Businesses",
    icon: "icon-notebook",
    path: "/admin/businesses/dashboard"
  },
  {
    name: "Admin",
    icon: "fa-1x icon-settings mr-2",
    path: "/admin/sys/dashboard",
    submenu: [
      {
        name: "Venues",
        path: "/admin/sys/venues",
      },
      {
        name: "Users",
        path: "/admin/sys/users",
      },
      {
        name: "Messages",
        path: "/admin/sys/messages",
      }
    ]
  },
];

export default Menu;
