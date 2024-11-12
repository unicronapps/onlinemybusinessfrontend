import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

const BusinessCardsList = () => {
  const [businessCards, setBusinessCards] = useState([]);
  const [draftBusinessCards, setDraftBusinessCards] = useState([]);
  const [filteredBusinessCards, setFilteredBusinessCards] = useState([]);
  const [filteredDraftCards, setFilteredDraftCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchBusinessCards = async () => {
      try {
        // Fetch live business cards
        const cardsCollection = collection(db, "businessCards");
        const cardSnapshot = await getDocs(cardsCollection);
        const cardsData = cardSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBusinessCards(cardsData);
        setFilteredBusinessCards(cardsData);

        // Fetch draft business cards
        const draftCardsCollection = collection(db, "businessCardsDraft");
        const draftCardsSnapshot = await getDocs(draftCardsCollection);
        const draftCardsData = draftCardsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDraftBusinessCards(draftCardsData);
        setFilteredDraftCards(draftCardsData);
      } catch (error) {
        console.error("Error fetching business cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessCards();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filterCards = (cards) =>
      cards.filter(
        (card) =>
          card.businessName.toLowerCase().includes(term) ||
          card.phoneNumber.includes(term)
      );

    setFilteredBusinessCards(filterCards(businessCards));
    setFilteredDraftCards(filterCards(draftBusinessCards));
  };

  if (loading) {
    return <p>Loading business cards...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Business Cards</h1>
        <button onClick={logout} className="text-red-500 text-sm">
          Logout
        </button>
      </div>
      <Link
        to="/create"
        className="block mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-center"
      >
        Create New Business Card
      </Link>
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name or phone number"
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      {/* Live Business Cards Section */}
      <h2 className="text-xl font-semibold mt-4">Live Business Cards</h2>
      {filteredBusinessCards.length === 0 ? (
        <p>No live business cards found.</p>
      ) : (
        <ul>
          {filteredBusinessCards.map((card) => (
            <li
              key={card.id}
              className="mb-4 p-4 border rounded hover:bg-gray-100"
            >
              <h2 className="text-lg font-semibold">
                {card.businessName}{" "}
                <span className="text-green-500">(Live)</span>
              </h2>
              <p className="text-sm text-gray-600">
                {card.category} - {card.subcategory}
              </p>
              <p className="text-sm text-gray-500">Phone: {card.phoneNumber}</p>
              <div className="mt-2 flex space-x-2">
                <Link
                  to={`/view/${card.id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${card.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Draft Business Cards Section */}
      <h2 className="text-xl font-semibold mt-6">Draft Business Cards</h2>
      {filteredDraftCards.length === 0 ? (
        <p>No draft business cards found.</p>
      ) : (
        <ul>
          {filteredDraftCards.map((card) => (
            <li
              key={card.id}
              className="mb-4 p-4 border rounded hover:bg-gray-100"
            >
              <h2 className="text-lg font-semibold">
                {card.businessName}{" "}
                <span className="text-yellow-500">(Draft)</span>
              </h2>
              <p className="text-sm text-gray-600">
                {card.category} - {card.subcategory}
              </p>
              <p className="text-sm text-gray-500">Phone: {card.phoneNumber}</p>
              <div className="mt-2 flex space-x-2">
                <Link
                  to={`/view/${card.id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${card.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusinessCardsList;
