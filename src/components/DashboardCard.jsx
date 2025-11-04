import React from 'react';

const DashboardCard = ({ label, value, className = '' }) => (
  <div className={`flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg border border-[#323b67] p-6 ${className}`}>
    <p className="text-base font-medium leading-normal text-white">{label}</p>
    <p className="text-2xl font-bold leading-tight tracking-tight text-white">{value}</p>
  </div>
);

export default DashboardCard;
