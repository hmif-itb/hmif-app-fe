export type FilterProps = {
  filter: {
    unread: boolean;
    category: string;
    sort: string;
  };
  setFilter: (data: {
    unread?: boolean;
    category?: string;
    sort?: string;
  }) => void;
  handleCloseDrawer?: () => void;
  isMobile?: boolean;
};
