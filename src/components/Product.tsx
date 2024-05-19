interface productProps {
  productName: string;
  productPrice: string;
  productImage: string;
}
const Product = (props: productProps) => {
    return (
      <div className="flex flex-col items-center">
        <img src={props.productImage} className="h-20 mb-2 rounde-md mt-2" alt={props.productName} />
        <div className="text-center">
          <h1 className="text-lg font-bold">{props.productName}</h1>
          <p className="text-sm text-gray-600">$ {props.productPrice}</p>
          <button className="mt-2 px-3 py-2 bg-blue-600 rounded-md text-white">Add To Cart</button>
        </div>
      </div>
    );
  };
  

export default Product;
