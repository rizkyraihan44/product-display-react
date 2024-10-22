import { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

interface Product {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    category: string;
    rating: number;
}
const MainContent = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
        useFilter();

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            const url = keyword
                ? `https://dummyjson.com/products/search?q=${keyword}`
                : `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
                      (currentPage - 1) * itemsPerPage
                  }`;

            try {
                const response = await axios.get<{ products: Product[] }>(url);
                setProducts(response.data.products);
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
            }
        };
        fetchProducts();
    }, [currentPage, keyword]);

    const getFilteredProducts = () => {
        return products
            .filter((product) => {
                if (selectedCategory && product.category !== selectedCategory)
                    return false;
                if (minPrice !== undefined && product.price < minPrice)
                    return false;
                if (maxPrice !== undefined && product.price > maxPrice)
                    return false;
                if (
                    searchQuery &&
                    !product.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
                    return false;
                return true;
            })
            .sort((a, b) => {
                switch (filter) {
                    case 'cheap':
                        return a.price - b.price;
                    case 'expensive':
                        return b.price - a.price;
                    case 'popular':
                        return b.rating - a.rating;
                    default:
                        return 0;
                }
            });
    };

    const filteredProducts = getFilteredProducts();

    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    const getPaginationButtons = () => {
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );
    };

    return (
        <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
            <div className='mb-5'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className='relative mb-5 mt-5'>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className='border px-4 py-2 rounded-full flex items-center'
                        >
                            <Tally3 className='mr-2 ' />
                            {filter === 'all'
                                ? 'Filter'
                                : filter.charAt(0).toLowerCase() +
                                  filter.slice(1)}
                        </button>
                        {dropdownOpen && (
                            <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                                {['cheap', 'expensive', 'popular'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => {
                                            setFilter(f);
                                            setDropdownOpen(false);
                                        }}
                                        className='block px-4 py-2 w-full text-left hover:bg-gray-200 '
                                    >
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {filteredProducts.map((product) => (
                        <BookCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.thumbnail}
                            price={product.price}
                        />
                    ))}
                </div>
                <div className='flex flex-col sm:flex-row justify-between items-center mt-5'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='border px-4 py-2 rounded-full'
                    >
                        Previous
                    </button>
                    <div className='flex flex-wrap justify-center'>
                        {getPaginationButtons().map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`border px-4 py-2 mx-1 rounded-full ${
                                    page === currentPage
                                        ? 'bg-black text-white'
                                        : ''
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='border px-4 py-2 rounded-full'
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainContent;
