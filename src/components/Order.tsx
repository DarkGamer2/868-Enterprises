interface orderProps{
accountName:string,
products:Array<string>,
date:string
}
const Order = (props:orderProps) => {
  return (
    <div>
    <h1>Order</h1>
    <h2>Ordered On: {props.date}</h2>
    <h4>Items Ordered: </h4>
    <p>{props.products}</p>
    </div>
  )
}

export default Order