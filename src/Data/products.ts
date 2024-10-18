import { Product } from "../types";

// If you want to define specific keys, create an enum or type for styles
export const styleKeys = {
  default: 'default',
  style1: 'style1',
  style2: 'style2',
  style3: 'style3',
} as const;


export const products:Product[] = [
  {
    itemName: "Usha Glow Shimmer Spray",
    productDescription: "A complete set of high-quality makeup essentials.",
    itemImage:
      "/assets/products/Images/F288F213-4892-42E6-B4FD-D23266E11375.JPG",
    price: 70.0,
    id: 3,
    category: "makeup",
    inStock: true,
    styles: {
      default: {
        productImage:
          "/assets/products/Images/F288F213-4892-42E6-B4FD-D23266E11375.JPG",
        additionalImages: [
          "/assets/products/Images/28C9613C-3F26-4AD9-BADF-FF0F9FCE53D8.JPG",
          "/assets/products/Images/5A8023F8-C71A-4C60-854C-D38B3A7240BB.JPG",
        ],
inStock: true,
        styleName: "USHA Glow Shimmer Spray",
        description: "A complete set of high-quality makeup essentials.",
        price: 70.0,
      },
      // "style1": {
      //     "productImage": "https://example.com/luxury_makeup.jpg",
      //     "styleName": "Luxury Set",
      //     "description": "A premium luxury set of makeup for special occasions.",
      //     "price": 90.00
      // }
    },
  },
  {
    itemName: "Marble Wallpaper",
    itemImage:
      "/assets/products/Images/gold_white_marble/Screenshot_20240917_072414_Chrome.jpg",
    productDescription: "Gold & white Waterproof And Oil Proof Pvc Self-adhesive Kitchen Accessories Drawer/shelf Liner, Table/countertop Protection Sticker, Household Chalkboard Sticker, Marble Wallpaper.",
    dimensions: '17.5" x 10ft',
    inStock: true,
    additionalImages: [
      "/assets/products/Images/gold_white_marble/Screenshot_20240917_072404_Chrome.jpg",
      "/assets/products/Images/gold_white_marble/Screenshot_20240917_072423_Chrome.jpg",
      "/assets/products/Images/gold_white_marble/Screenshot_20241008_180004_Chrome.jpg",
      "/assets/products/Images/gold_white_marble/Screenshot_20241008_180100_Chrome.jpg",
      "/assets/products/Images/gold_white_marble/Screenshot_20241008_180109_Chrome.jpg",
      "/assets/products/Images/gold_white_marble/Screenshot_20241008_180142_Chrome.jpg",
    ],
    styles: {
      style1: {
        productImage:
          "/assets/products/Images/gold_white_marble/Screenshot_20240917_072414_Chrome.jpg",
        styleName: "Gold & White Marble Wallpaper",
        additionalImages: [
          "/assets/products/Images/gold_white_marble/Screenshot_20240917_072404_Chrome.jpg",
          "/assets/products/Images/gold_white_marble/Screenshot_20240917_072423_Chrome.jpg",
          "/assets/products/Images/gold_white_marble/Screenshot_20241008_180004_Chrome.jpg",
          "/assets/products/Images/gold_white_marble/Screenshot_20241008_180100_Chrome.jpg",
          "/assets/products/Images/gold_white_marble/Screenshot_20241008_180109_Chrome.jpg",
          "/assets/products/Images/gold_white_marble/Screenshot_20241008_180142_Chrome.jpg",
        ],
        inStock: true,
        description:
          "Gold & white Waterproof And Oil Proof Pvc Self-adhesive Kitchen Accessories Drawer/shelf Liner, Table/countertop Protection Sticker, Household Chalkboard Sticker, Marble Wallpaper.",
        price: 150.0,
      },
      style2: {
        productImage:
        "/assets/products/Images/black_white_marble/Screenshot_20241008_180605_Chrome.jpg",
        styleName: "Black & White Marble",
        description: "Black & white Waterproof And Oil Proof Pvc Self-adhesive Kitchen Accessories Drawer/shelf Liner, Table/countertop Protection Sticker, Household Chalkboard Sticker, Marble Wallpaper.",
        additionalImages: [
            "/assets/products/Images/black_white_marble/Screenshot_20241011_193237_Chrome.jpg",
            "/assets/products/Images/black_white_marble/Screenshot_20241011_193248_Chrome.jpg",
            "/assets/products/Images/black_white_marble/Screenshot_20241008_180124_Chrome.jpg",
            "/assets/products/Images/black_white_marble/Screenshot_20241008_180142_Chrome.jpg",
             "/assets/products/Images/black_white_marble/Screenshot_20241008_180109_Chrome.jpg",
        ],
       inStock: true,
        price: 150.0,
      },
      style3:{
        productImage:"/assets/products/Images/blue_marble/Screenshot_20240820_140252_Chrome.jpg",
        styleName: "Blue Marble",
        description: "Dark Blue And Gold Marbling Waterproof And Oil Proof Pvc Self-adhesive Kitchen Accessories Drawer/shelf Liner, Table/countertop Protection Sticker, Household Chalkboard Sticker, Marble Wallpaper.",
        additionalImages: [
          "/assets/products/Images/blue_marble/Screenshot_20240820_140304_Chrome.jpg",
          "/assets/products/Images/blue_marble/Screenshot_20240820_140329_Chrome.jpg",
          "/assets/products/Images/blue_marble/Screenshot_20241008_180025_Chrome.jpg",
          "/assets/products/Images/blue_marble/Screenshot_20241008_180100_Chrome.jpg",
          "/assets/products/Images/blue_marble/Screenshot_20241008_180109_Chrome.jpg",
          "/assets/products/Images/blue_marble/Screenshot_20241008_180142_Chrome.jpg",
        ],
        inStock: true,
        price: 150.0,
      },
      default:{
        productImage: "/assets/products/Images/teal_gold_marble/Screenshot_20241011_091417_Chrome.jpg",
        styleName: "Teal & Gold Marble Wallpaper",
        description: "Teal & Gold Waterproof And Oil Proof Pvc Self-adhesive Kitchen Accessories Drawer/shelf Liner...",
        dimensions: '17.5" x 10ft', // Add dimensions here
        inStock: true,
        additionalImages: [
          "/assets/products/Images/teal_gold_marble/Screenshot_20241008_180844_Chrome.jpg",
          "/assets/products/Images/teal_gold_marble/Screenshot_20241011_091459_Chrome.jpg",
          "/assets/products/Images/teal_gold_marble/Screenshot_20241011_091508_Chrome.jpg",
          "/assets/products/Images/teal_gold_marble/Screenshot_20241008_180100_Chrome.jpg",
          "/assets/products/Images/teal_gold_marble/Screenshot_20241008_180109_Chrome.jpg",
         
        ],
        price: 150.0,
      },
    },
    price: 150.0,
    id: 16,
    category: "household",
  },
  {
    itemName:"Dramatic Black Eyelash",
    productDescription:"Dramatic black eyelashes, perfect for a night out.",
    itemImage:"/assets/products/Images/black_lash/Screenshot_20240820_142237_Chrome.jpg",
    inStock:true,
    price:100.0,
    additionalImages:[
      "assets/products/Images/black_lash/Screenshot_20240820_142216_Chrome",
      "assets/products/Images/black_lash/Screenshot_20240820_142228_Chrome",
      "assets/products/Images/black_lash/Screenshot_20240820_142246_Chrome",
      "assets/products/Images/black_lash/Screenshot_20240820_142256_Chrome",
    ],
    id:17,
    category:"accessories",
    styles:{
      default:{
        productImage:"/assets/products/Images/black_lash/Screenshot_20240820_142237_Chrome.jpg",
        styleName:"Dramatic Black Eyelash",
        description:"Dramatic black eyelashes, perfect for a night out.",
        price:100.0,
        inStock:true,
        additionalImages:[
          "assets/products/Images/black_lash/Screenshot_20240820_142216_Chrome.jpg",
          "assets/products/Images/black_lash/Screenshot_20240820_142228_Chrome.jpg",
          "assets/products/Images/black_lash/Screenshot_20240820_142246_Chrome.jpg",
          "assets/products/Images/black_lash/Screenshot_20240820_142256_Chrome.jpg",
        ]
      },
    },
  }
//   {
//     itemName: "Chamleon Eye Liner",
//     itemImage:
//       "/assets/products/Images/AF7E3C37-679D-48F7-8EB6-CC6E1F8A18FB 2.JPG",
//     inStock: false,
//     price: 100.0,
//     productDescription:
//       "Chameleon green and yellow, waterproof,long lasting,fine tip eyeliner",
//     id: 17,
//     category: "makeup",
//   },
];
