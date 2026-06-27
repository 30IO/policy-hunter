import { create } from 'zustand'
import { initialPolicies, regions, industries } from '../data/policies'

export const useStore = create((set, get) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
  
  policies: initialPolicies,
  
  favorites: [],
  toggleFavorite: (policyId) => set((state) => ({
    favorites: state.favorites.includes(policyId)
      ? state.favorites.filter(id => id !== policyId)
      : [...state.favorites, policyId]
  })),
  isFavorite: (policyId) => get().favorites.includes(policyId),
  
  history: [],
  addToHistory: (item) => set((state) => ({
    history: [item, ...state.history].slice(0, 20)
  })),
  
  compareList: [],
  toggleCompare: (policyId) => set((state) => ({
    compareList: state.compareList.includes(policyId)
      ? state.compareList.filter(id => id !== policyId)
      : [...state.compareList, policyId].slice(0, 3)
  })),
  clearCompare: () => set({ compareList: [] }),
  
  searchFilters: {
    keyword: '',
    region: '',
    industry: '',
    minAmount: '',
    maxAmount: ''
  },
  setSearchFilters: (filters) => set({ searchFilters: filters }),
  
  filteredPolicies: [],
  setFilteredPolicies: (policies) => set({ filteredPolicies: policies }),
  
  toast: null,
  showToast: (message, type = 'success') => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null })
}))

export { regions, industries }
