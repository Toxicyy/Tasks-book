export type Category = {
    src: string;
    nightSrc: string
    title: string;
    id: number;
    isActive: boolean;
    isInitial: boolean;
  };

  export type CategoryId = number;

  export type CategoryState = {
    categories: Category[]
  }