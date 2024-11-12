import React, { useState } from "react";
import PersonModal from "./PersonModal";

const TeamSection = () => {
  const [personTypes, setPersonTypes] = useState([
    {
      type: "Owners",
      people: [
        {
          name: "Riya Manhotra",
          position: "Chairman and CEO",
          description: "Have 6+ years of Experience working in makeup industry",
          image: "https://example.com/riya.jpg", // Replace with actual image URLs
          socialLinks: { instagram: "#", facebook: "#" },
        },
      ],
    },
    {
      type: "Employees",
      people: [
        {
          name: "Supriya Mittal",
          position: "Chief Makeup Artist",
          image: "https://example.com/supriya.jpg",
          socialLinks: { instagram: "#", facebook: "#" },
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPersonType, setCurrentPersonType] = useState(null);
  const [editingPersonIndex, setEditingPersonIndex] = useState(null);

  const openModalForNewPerson = (typeIndex) => {
    setCurrentPersonType(typeIndex);
    setEditingPersonIndex(null);
    setIsModalOpen(true);
  };

  const openModalForEditPerson = (typeIndex, personIndex) => {
    setCurrentPersonType(typeIndex);
    setEditingPersonIndex(personIndex);
    setIsModalOpen(true);
  };

  const handleSavePerson = (newPerson) => {
    const updatedTypes = [...personTypes];
    if (editingPersonIndex !== null) {
      // Edit existing person
      updatedTypes[currentPersonType].people[editingPersonIndex] = newPerson;
    } else {
      // Add new person
      updatedTypes[currentPersonType].people.push(newPerson);
    }
    setPersonTypes(updatedTypes);
  };
  const handleDeletePerson = () => {
    const updatedTypes = [...personTypes];
    updatedTypes[currentPersonType].people.splice(editingPersonIndex, 1);
    setPersonTypes(updatedTypes);
    setIsModalOpen(false); // Close modal after deletion
  };
  const addPersonType = () => {
    const newType = prompt(
      "Enter the new person type (e.g., Interns, Freelancers):"
    );
    if (newType) {
      setPersonTypes([...personTypes, { type: newType, people: [] }]);
    }
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-6">Team</h1>
      {personTypes.map((type, typeIndex) => (
        <div key={typeIndex} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{type.type}</h2>
          {type.people.map((person, personIndex) => (
            <div
              key={personIndex}
              className="flex items-start mb-4 bg-red-200"
              onClick={() => openModalForEditPerson(typeIndex, personIndex)}
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-20 h-20 rounded-full object-cover mr-4 mt-2"
              />
              <div>
                <h3 className="font-semibold">{person.name}</h3>
                <p className="text-sm font-medium text-gray-600">
                  {person.position}
                </p>
                {person.description && (
                  <p className="text-sm">{person.description}</p>
                )}
                <div className="flex space-x-2 mt-1">
                  <a
                    href={person.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500"
                  >
                    Instagram
                  </a>
                  <a
                    href={person.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => openModalForNewPerson(typeIndex)}
            className="text-blue-500 text-sm mt-2"
          >
            + Add Person
          </button>
        </div>
      ))}
      <button
        onClick={addPersonType}
        className="text-blue-500 text-sm mt-4 mb-6"
      >
        + Add Person Type
      </button>
      <PersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePerson}
        onDelete={handleDeletePerson}
        person={
          editingPersonIndex !== null
            ? personTypes[currentPersonType].people[editingPersonIndex]
            : null
        }
      />
    </div>
  );
};

export default TeamSection;
