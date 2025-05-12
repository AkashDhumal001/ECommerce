const ProductCard = ({ name, description, price, category, image }) => {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-indigo-600 font-bold">₹{price.toFixed(2)}</span>
            <span className="text-xs text-white bg-indigo-500 rounded-full px-2 py-1">
              {category}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  