// types.ts
export interface Style {
  styleName: string;
  productImage: string;
  additionalImages?: string[];
  price: number;
  inStock: boolean; // Ensure this is always a boolean, not optional
  description?: string; // Made optional
  dimensions?: string; // Add dimensions as an optional property
}

export interface Product {
  id: string;
  itemName: string;
  itemImage: string;
  price: number;
  inStock: boolean; // This should also be non-optional
  productDescription: string;
  productDescription2?: string;
  dimensions?: string; // Product level dimensions
  category: string;
  additionalImages?: string[];

  styles: {
    default: Style; // Make default style required
    style1?: Style; // Make additional styles optional
    style2?: Style;
    style3?: Style;
    additionalStyles?: Style[]; // Optional additional styles
  };
}

export interface User {
  username: string;

  role: string; // Add the role property
}

export interface UserContextType {

  user: { username: string } | null;

  setUser: (user: { username: string } | null) => void;

}

