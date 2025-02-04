import React from 'react';

interface AdminCardProps {
  name: string;
  role: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ name, role }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-bold">{name}</h3>
      <p>{role}</p>
    </div>
  );
};

export default AdminCard;
