import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DonorEditForm from "../../../components/donor/DonorEditForm";
import DonorNavigation from "../../../components/layout/DonorNavigation";

function DonorEditPage(props) {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the donor's info from the backend when the component mounts
    fetch(`http://localhost:8080/api/donor/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDonor(data);
        setIsLoading(false);
      });
  }, [id]);

  const handleSave = (updatedDonor) => {
    // Send the updated donor info to the backend and redirect to the donor's profile page
    fetch(`http://localhost:8080/api/donor/${id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDonor),
    })
      .then((response) => response.json())
      .then((data) => {
        setDonor(data);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DonorNavigation />
      <h1>Edit Donor Information</h1>
      <DonorEditForm donor={donor} onSave={handleSave} />
    </div>
  );
}

export default DonorEditPage;
