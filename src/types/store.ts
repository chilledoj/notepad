export type StoreType = {
  favs: {
    items: {
      [id: string]: {
        id: string;
        title: string;
        subtitle: string;
        url: string;
        tags: string[];
      };
    };
  };
  notes: {
    notesById: {
      [id: string]: {
        id: string;
        title: string;
        rawData: string;
        tags: string[];
      };
    };
    noteList: string[];
  };
};
