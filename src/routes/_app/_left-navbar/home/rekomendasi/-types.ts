export type FilterRekomendasiProps = {
    filter: {
      category: string[];
    };
    setFilter: (data: {
        category?: string[];
    }) => void;
    handleCloseDrawer?: () => void;
    isMobile?: boolean;
  };
  