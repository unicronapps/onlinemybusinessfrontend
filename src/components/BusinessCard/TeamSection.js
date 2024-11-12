import React, { useState } from "react";
import { FaPlus, FaInstagram, FaFacebook } from "react-icons/fa";
import PersonModal from "./PersonModal";

const TeamSection = () => {
  const [team, setTeam] = useState([
    {
      type: "Owners",
      people: [
        {
          name: "Riya Manhotra",
          position: "Chairman and CEO",
          description: "Has 6+ years of experience in the makeup industry",
          image:
            "https://upjourney.com/wp-content/uploads/2019/07/how-to-become-a-makeup-artist.jpg",
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
          image:
            "https://upload.wikimedia.org/wikipedia/commons/8/85/Sneha_at_Un_Samayal_Arayil_Press_Meet.jpg",
          socialLinks: { instagram: "#", facebook: "#" },
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeamType, setCurrentTeamType] = useState(null);
  const [editingPersonIndex, setEditingPersonIndex] = useState(null);

  const openModalForNewPerson = (typeIndex) => {
    setCurrentTeamType(typeIndex);
    setEditingPersonIndex(null);
    setIsModalOpen(true);
  };

  const openModalForEditPerson = (typeIndex, personIndex) => {
    setCurrentTeamType(typeIndex);
    setEditingPersonIndex(personIndex);
    setIsModalOpen(true);
  };

  const handleSavePerson = (newPerson) => {
    const updatedTeam = [...team];
    if (editingPersonIndex !== null) {
      updatedTeam[currentTeamType].people[editingPersonIndex] = newPerson;
    } else {
      updatedTeam[currentTeamType].people.push(newPerson);
    }
    setTeam(updatedTeam);
  };

  const handleDeletePerson = () => {
    const updatedTeam = [...team];
    updatedTeam[currentTeamType].people.splice(editingPersonIndex, 1);
    setTeam(updatedTeam);
    setIsModalOpen(false);
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Team</h1>
      {team.map((type, typeIndex) => (
        <div key={typeIndex} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{type.type}</h2>
            <button
              onClick={() => openModalForNewPerson(typeIndex)}
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
            >
              <FaPlus />
              <span className="text-sm">Add Person</span>
            </button>
          </div>
          <div className="space-y-4">
            {type.people.map((person, personIndex) => (
              <div
                key={personIndex}
                className="flex items-start bg-gray-50 p-3 rounded-lg shadow-sm"
                onClick={() => openModalForEditPerson(typeIndex, personIndex)}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.position}</p>
                  {person.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {person.description}
                    </p>
                  )}
                  <div className="flex space-x-4 mt-2">
                    <a
                      href={person.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={person.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      <FaFacebook />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <PersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePerson}
        onDelete={handleDeletePerson}
        person={
          editingPersonIndex !== null
            ? team[currentTeamType].people[editingPersonIndex]
            : null
        }
      />
    </div>
  );
};

export default TeamSection;
