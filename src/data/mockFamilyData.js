export const MOCK_FAMILY_MEMBERS = [
  {
    id: 'fam-tushi',
    name: 'Tushi',
    relationship: 'Daughter',
    phoneNumber: '01711000001',
    avatar: 'T',
    type: 'sharing_with', // Karim is sharing his data with Tushi
    status: 'Active',
    permissions: {
      medicineList: true, // locked on
      intakeHistory: true,
      stockHistory: true,
    },
    notifications: {
      medicineTime: true,
      missedDose: true,
      lowStock: true,
    }
  },
  {
    id: 'fam-fahim',
    name: 'Fahim Uddin',
    relationship: 'Brother',
    phoneNumber: '01811000002',
    avatar: 'F',
    type: 'shared_with_me', // Fahim is sharing his data with Karim
    status: 'Active',
    notifications: { // Karim's preferences for Fahim's data
      medicineTime: false,
      missedDose: false,
      lowStock: false,
    },
    medicines: [
      {
        id: 'med-f1',
        name: 'Metformin',
        strength: '500',
        unit: 'mg',
        timeCategories: ['Morning', 'Evening'],
        times: ['08:00', '20:00'],
        intakeAdvice: 'After meal',
        stock: 5,
        lowStockThreshold: 10,
        type: 'Tablet',
      },
      {
        id: 'med-f2',
        name: 'Amlodipine',
        strength: '5',
        unit: 'mg',
        timeCategories: ['Morning'],
        times: ['08:00'],
        intakeAdvice: 'After meal',
        stock: 20,
        lowStockThreshold: 10,
        type: 'Tablet',
      }
    ],
    takenMap: {
      '2026-05-10': { 
        'med-f1_08:00': { taken: false, skipped: true, timestamp: new Date().toISOString() },
        'med-f2_08:00': { taken: true, skipped: false, timestamp: new Date().toISOString() }
      }
    }
  }
];
