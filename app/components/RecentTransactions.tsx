import { Transaction } from '@/type';
import React, { useEffect, useState, FC } from 'react';
import { getTransactions } from '../actions';
import EmptyState from './EmptyState';
import TransactionComponent from './TransactionComponent';

// Affiche les transactions récentes
const RecentTransactions: FC<{ email: string }> = ({ email }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Récupère les transactions
  const fetchData = async () => {
    try {
      if (email) {
        const txs = await getTransactions(email, 10);
        if (txs) setTransactions(txs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email) fetchData();
  }, [email]);

  return (
    <div className="w-full border-2 border-accent mt-4 p-4 rounded-3xl">
      {transactions.length === 0 ? (
        <EmptyState message="Aucune Transaction pour le moment" IconComponent="CaptionsOff" />
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">10 dernières transactions</h2>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <TransactionComponent key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
