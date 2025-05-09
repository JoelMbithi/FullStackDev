import React, { useState } from 'react';

const transactions = [
  {
    id: 'TX001',
    customer: 'Alice Kimani',
    amount: 1200,
    date: '2025-05-06',
    status: 'Paid',
  },
  {
    id: 'TX002',
    customer: 'Brian Otieno',
    amount: 800,
    date: '2025-05-07',
    status: 'Failed',
  },
  {
    id: 'TX003',
    customer: 'Cheryl Mutua',
    amount: 560,
    date: '2025-05-08',
    status: 'Paid',
  },
];

const RevenuePage = ({onClose}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalRevenue = transactions
    .filter((t) => t.status === 'Paid')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const paidTransactions = transactions.filter((tx) => tx.status === 'Paid').length;

  return (
    <div className="p-6 fixed inset-0 index-10 bg-gray-100 overflow-scroll">
     <div className='flex flex-row justify-between'>
     <h1 className="text-2xl font-bold text-green-700 mb-4">Revenue Dashboard</h1>
     <p className='bg-red-500 p-2 rounded w-20 h-10 hover:bg-red-600 text-white cursor-pointer' onClick={onClose}>Cancel</p>
     </div>
      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div>
          <label className="block text-sm">Start Date</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">End Date</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Filter
          </button>
        </div>
        <div className="flex items-end ml-auto gap-2">
          <button className="px-4 py-2 border rounded bg-white hover:bg-gray-50 text-sm">
            Export CSV
          </button>
          <button className="px-4 py-2 border rounded bg-white hover:bg-gray-50 text-sm">
            Export PDF
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Today’s Revenue</p>
          <p className="text-lg font-bold text-green-700">KES 1,200</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-lg font-bold text-green-700">KES 2,800</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-lg font-bold text-green-700">KES {totalRevenue}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Transactions</p>
          <p className="text-lg font-bold text-green-700">{paidTransactions}</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <p className="text-sm font-semibold mb-2">Revenue Chart</p>
        <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          (Chart coming soon - Use Recharts, Chart.js or ApexCharts)
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount (KES)</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{tx.id}</td>
                <td className="px-4 py-2">{tx.customer}</td>
                <td className="px-4 py-2">KES {tx.amount}</td>
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      tx.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenuePage;
