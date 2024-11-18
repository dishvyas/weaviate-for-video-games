import React from 'react';

interface ResultCardProps {
  title: string;
  description: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, description }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  );
};

export default ResultCard;