export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Admin",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Drivers",
      href: "/",
      
    },
    {
      title: "Users",
      href: "/users",
    },
    {
      title: "Routes",
      href: "/routes",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
