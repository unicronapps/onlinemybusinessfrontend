// RedirectSLink.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import LoadingIndicator from "../components/Loading/LoadingIndicator";

const RedirectSLink = () => {
  const { sid } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectToOriginalLink = async () => {
      try {
        const docRef = doc(db, "s-short-link", sid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { link } = docSnap.data();

          // Increment the visit count
          await updateDoc(docRef, {
            count: increment(1),
          });

          // Redirect to the original link
          window.location.href = link;
        } else {
          setError("Invalid link. Redirect failed.");
        }
      } catch (error) {
        console.error("Error redirecting:", error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    redirectToOriginalLink();
  }, [sid]);

  if (loading) return <LoadingIndicator />;
  if (error) return <p className="text-red-500">{error}</p>;

  return null;
};

export default RedirectSLink;
