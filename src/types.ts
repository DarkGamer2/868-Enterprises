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
  image: string; // Changed from itemImage to image
  price: number;
  inStock: boolean;
  productDescription: string;
  productDescription2?: string;
  dimensions?: string;
  category: string;
  additionalImages?: string[];
  styles: {
    default: Style;
    style1?: Style;
    style2?: Style;
    style3?: Style;
    additionalStyles?: Style[];
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

export interface TrackingEvent {
  status: string; // e.g., "Ordered", "Shipped", "Out for delivery", "Delivered"
  date: string;  // Date of the event
  location?: string; // Optional location (if available)
}

interface OrderTracking {
  orderId: string;
  arrivalDate: string;
  currentStatus: string; // Current overall status
  trackingEvents: TrackingEvent[];
  mapLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

