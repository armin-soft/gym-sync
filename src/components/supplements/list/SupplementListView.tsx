
import React from 'react';
import { Supplement } from '@/types/supplement';

interface SupplementListViewProps {
  supplements: Supplement[];
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
}

export const SupplementListView: React.FC<SupplementListViewProps> = ({
  supplements,
  onEditSupplement,
  onDeleteSupplement
}) => {
  return (
    <div className="space-y-2">
      {supplements.map(supplement => (
        <div key={supplement.id} className="border p-3 rounded flex justify-between items-center">
          <div>
            <h4 className="font-medium">{supplement.name}</h4>
            <p className="text-sm text-gray-500">{supplement.category}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onEditSupplement(supplement)} 
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button 
              onClick={() => onDeleteSupplement(supplement.id)} 
              className="p-1 hover:bg-gray-100 rounded text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
