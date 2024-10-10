export type FilterProps = {
  filter: {
    unread: boolean;
    excludeCategories: string[];
    sort: string;
  };
  setFilter: (data: {
    unread?: boolean;
    excludeCategories?: string[];
    sort?: string;
  }) => void;
  handleCloseDrawer?: () => void;
  isMobile?: boolean;
};
