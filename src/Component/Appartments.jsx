import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appartments = () => {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination & Search States
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const itemsPerPage = 6;

    useEffect(() => {
        const getBuildings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/buildings");
                setBuildings(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        getBuildings();
    }, []);

   
    const filteredBuildings = buildings.filter(apt => {
        const rent = parseInt(apt.rent);
        const min = minPrice === '' ? 0 : parseInt(minPrice);
        const max = maxPrice === '' ? Infinity : parseInt(maxPrice);
        return rent >= min && rent <= max;
    });

    
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = filteredBuildings.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div className="text-white text-center py-20">Loading Data...</div>;

    return (
        <div className="min-h-screen bg-[#020314] text-white p-10">
            
            {/* --- Search Section --- */}
            <div className="max-w-4xl mx-auto mb-12 bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center">Search by Rent Range</h3>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <input 
                        type="number" 
                        placeholder="Min Rent" 
                        className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl outline-none focus:border-indigo-500 w-full"
                        value={minPrice}
                        onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                    />
                    <span className="text-gray-500">to</span>
                    <input 
                        type="number" 
                        placeholder="Max Rent" 
                        className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl outline-none focus:border-indigo-500 w-full"
                        value={maxPrice}
                        onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                    />
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-10 text-center">Available Apartments: {filteredBuildings.length}</h2>
            
            {/* --- Grid Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {currentItems.length > 0 ? (
                    currentItems.map((apt) => (
                        <div key={apt._id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-indigo-500/50 transition-all flex flex-col shadow-2xl">
                            <img src={apt.image} alt="apt" className="w-full h-48 object-cover rounded-2xl mb-4" />
                            <h3 className="text-xl font-bold">Apt No: {apt.apartmentNo}</h3>
                            <p className="text-gray-400">Floor: {apt.floorNo} | Block: {apt.blockName}</p>
                            <p className="text-indigo-400 font-bold text-xl mt-2 flex-grow">Rent: ${apt.rent}</p>
                            
                            <button className='mt-6 border-2 border-indigo-500/30 hover:bg-indigo-600 hover:border-indigo-600 rounded-xl w-full h-[54px] font-bold transition-all active:scale-95'>
                                Agreement Button
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-red-400 text-xl font-medium">No apartments found in this rent range!</p>
                    </div>
                )}
            </div>

            {/* --- Pagination Controls --- */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-5 py-2 rounded-xl font-bold border-2 transition-all ${currentPage === i + 1 ? 'bg-indigo-600 border-indigo-600' : 'border-white/10 hover:bg-white/10'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Appartments;