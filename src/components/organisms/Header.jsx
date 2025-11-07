import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryDropdown from "@/components/molecules/CategoryDropdown";
import CartIcon from "@/components/molecules/CartIcon";
import cartService from "@/services/api/cartService";
import productsService from "@/services/api/productsService";

const Header = ({ onCartClick }) => {
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartCount();
    loadCategories();
  }, []);

  const loadCartCount = async () => {
    try {
      const result = await cartService.getCartItemCount();
      if (result.success) {
        setCartCount(result.data);
      }
    } catch (error) {
      console.error("Error loading cart count:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await productsService.getCategories();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/products");
    }
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    onCartClick();
  };

  const navigation = [
    { name: "Collections", href: "/products" },
    { name: "Sale", href: "/products?sale=true" },
    { name: "About", href: "/about" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Vogue Threads
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <CategoryDropdown categories={categories} />
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <CartIcon count={cartCount} onClick={handleCartClick} />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-primary hover:text-accent transition-colors duration-200"
              >
                <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-30 overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Search */}
            <SearchBar 
              onSearch={handleSearch} 
              className="w-full"
            />

            {/* Mobile Navigation */}
            <nav className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-primary">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-600 hover:text-accent py-2 transition-colors duration-200"
                  >
                    {category}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-600 hover:text-accent py-2 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;