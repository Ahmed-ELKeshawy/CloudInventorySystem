import ProductSummary from "./productSummary";

const productsList = (props)=>{

    // Check if products is falsy or an empty array
  if (!props.products || props.products.length === 0) {
    return <p>No products available.</p>;
  }

    return(
        <div className="grid grid-cols-4 gap-2 justify-center items-center">
            {props.products.map((product) =>(
               <div key={product._id} className="w-1/6">
               <ProductSummary product={product} />
             </div>
            ))}
        </div>

    )
}

export default productsList;