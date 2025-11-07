import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ProductCard = ({ product, onAddToCart, className = "" }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer",
        "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
        "border border-gray-100",
        className
      )}
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {product.featured && (
          <Badge 
            variant="accent" 
            className="absolute top-3 left-3 bg-gradient-to-r from-accent to-yellow-500"
          >
            Featured
          </Badge>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur-sm text-primary hover:bg-white border border-white/20"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-medium text-primary group-hover:text-accent transition-colors duration-200 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
          
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <ApperIcon name="Palette" className="w-3 h-3" />
            <span>{product.colors.length} colors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;