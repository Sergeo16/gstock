import { ChartData } from '@/type';
import React, { useEffect, useState, FC, useCallback } from 'react';
import { getProductCategoryDistribution } from '../actions';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle, BarChart, LabelList, Cell } from 'recharts';
import EmptyState from './EmptyState';

// Diagramme des catégories de produits
const CategoryChart: FC<{ email: string }> = ({ email }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const COLORS = { default: '#37cdbe' };

  // Récupère les stats de catégories
  const fetchStats = useCallback(async () => {
    try {
      if (email) {
        const data = await getProductCategoryDistribution(email);
        if (data) setData(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [email]);

  useEffect(() => {
    if (email) fetchStats();
  }, [email, fetchStats]);

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        barCategoryGap={"10"}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fill: 'white', fontWeight: 'bold' }}
        />
        <YAxis hide />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={30}>
          <LabelList fill="black" dataKey="value" position="insideCenter" style={{ fontSize: '20px', fontWeight: 'bold' }} />
          {data.map((entry, index) => (
            <Cell key={`cell-`} fill={COLORS.default} cursor="default" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  if (data.length === 0) {
    return (
      <div className="w-full border-2 border-accent mt-4 p-4 rounded-3xl">
        <h2 className="text-xl font-bold mb-4">5 catégories avec le plus de produits</h2>
        <EmptyState message="Aucune catégorie pour le moment" IconComponent="Group" />
      </div>
    );
  }

  return (
    <div className="w-full border-2 border-accent mt-4 p-4 rounded-3xl">
      <h2 className="text-xl text-center font-bold mb-4">Le top 5 des catégories de produits</h2>
      {renderChart()}
    </div>
  );
};

export default CategoryChart;


