export interface MenuNode {
    idgrupo_nav: number;
    name: string;
    children?: MenuNode[];
  }
  export interface AccionNode {
    idgrupoaccion: number;
    name: string;
    children?: AccionNode[];
  }
  