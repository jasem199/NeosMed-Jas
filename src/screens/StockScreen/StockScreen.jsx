import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import StockCard from '../../components/Stock/StockCard';
import RefillSheet from '../../components/Stock/RefillSheet';
import StockActionSheet from '../../components/Stock/StockActionSheet';
import ConfirmModal from '../../components/common/ConfirmModal';
import './StockScreen.css';

export default function StockScreen() {
  const { medicines, refillMedicine, deleteMedicine, archiveMedicine } = useApp();
  
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'past'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refill Sheet State
  const [isRefillOpen, setIsRefillOpen] = useState(false);
  const [selectedMedForRefill, setSelectedMedForRefill] = useState(null);

  // Action Sheet State
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedMedForAction, setSelectedMedForAction] = useState(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [medToDelete, setMedToDelete] = useState(null);

  const filteredMedicines = useMemo(() => {
    const list = medicines.filter(med => {
      // 1. Filter by status
      const medStatus = med.status || 'active'; // fallback for mock data
      if (medStatus !== activeTab) return false;
      
      // 2. Filter by search query
      if (searchQuery) {
        return med.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      return true;
    });

    // Sort: Low stock always on top, ordered by remaining days (least days remaining first)
    return [...list].sort((a, b) => {
      const isLowA = a.stock <= a.lowStockThreshold;
      const isLowB = b.stock <= b.lowStockThreshold;

      if (isLowA && !isLowB) return -1;
      if (!isLowA && isLowB) return 1;

      const daysA = a.stock && a.frequency ? Math.floor(a.stock / a.frequency) : 999999;
      const daysB = b.stock && b.frequency ? Math.floor(b.stock / b.frequency) : 999999;

      return daysA - daysB;
    });
  }, [medicines, activeTab, searchQuery]);

  const handleRefillClick = (med) => {
    setSelectedMedForRefill(med);
    setIsRefillOpen(true);
  };

  const handleConfirmRefill = (id, amount) => {
    refillMedicine(id, amount);
  };

  const handleOpenOptions = (med) => {
    setSelectedMedForAction(med);
    setIsActionSheetOpen(true);
  };

  const handleEdit = (med) => {
    // In a real app, this would navigate to the Edit Screen or open an edit sheet.
    alert(`Edit feature for ${med?.name} coming soon!`);
  };

  const handleArchive = (id) => {
    archiveMedicine(id);
  };

  const handleDeleteClick = (med) => {
    setMedToDelete(med);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (medToDelete) {
      deleteMedicine(medToDelete.id);
      setIsDeleteModalOpen(false);
      setMedToDelete(null);
    }
  };

  return (
    <div className="stockScreen">
      <div className="stockScreen-header">
        <div className="stockScreen-tabs">
          <button 
            className={`stockScreen-tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Current
          </button>
          <button 
            className={`stockScreen-tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Archived
          </button>
        </div>

        <div className="stockScreen-searchBox">
          <i className="ri-search-line stockScreen-searchIcon"></i>
          <input 
            type="text" 
            placeholder="Search medicine..." 
            className="stockScreen-searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="stockScreen-clearSearch" onClick={() => setSearchQuery('')}>
              <i className="ri-close-circle-fill"></i>
            </button>
          )}
        </div>
      </div>

      <div className="stockScreen-content">
        {filteredMedicines.length > 0 ? (
          <div className="stockScreen-list">
            {filteredMedicines.map(med => (
              <StockCard 
                key={med.id} 
                med={med} 
                onEdit={handleOpenOptions}
              />
            ))}
          </div>
        ) : (
          <div className="stockScreen-empty">
            <div className="stockScreen-emptyIcon">
              <i className="ri-inbox-line"></i>
            </div>
            <p className="stockScreen-emptyText">
              {searchQuery 
                ? 'No medicines found matching your search.' 
                : `No ${activeTab} medicines available.`}
            </p>
          </div>
        )}
      </div>

      <RefillSheet 
        isOpen={isRefillOpen}
        onClose={() => setIsRefillOpen(false)}
        medicine={selectedMedForRefill}
        onConfirm={handleConfirmRefill}
      />

      <StockActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        medicine={selectedMedForAction}
        onRefill={handleRefillClick}
        onEdit={handleEdit}
        onArchive={handleArchive}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Medicine"
        message={medToDelete ? `Are you sure you want to delete ${medToDelete.name}? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDestructive={true}
      />
    </div>
  );
}
