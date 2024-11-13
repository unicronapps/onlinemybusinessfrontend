// components/EditBusinessCard.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import BusinessCard from "./BusinessCard";

const EditBusinessCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [businessCardData, setBusinessCardData] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessCard = async () => {
      setLoading(true);
      let docRef = doc(db, "businessCards", id);

      try {
        // Try fetching from live collection first
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          // If not found in live, try in drafts
          docRef = doc(db, "businessCardsDraft", id);
          docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setIsDraft(true);
          }
        }
        if (docSnap.exists()) {
          setBusinessCardData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
          navigate("/"); // Redirect if not found
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessCard();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    const collectionName = isDraft ? "businessCardsDraft" : "businessCards";
    const docRef = doc(db, collectionName, id);

    try {
      console.log(updatedData);
      await updateDoc(docRef, updatedData);
      navigate(`/view/${id}`);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  if (loading) {
    return <p>Loading business card details...</p>;
  }
  console.log(businessCardData);
  return (
    <>
      {businessCardData ? (
        <BusinessCard
          businessData={businessCardData}
          isDraft={isDraft}
          onSave={handleUpdate}
          isEditable={true}
        />
      ) : (
        <p>No data found.</p>
      )}
    </>
  );
};

export default EditBusinessCard;
