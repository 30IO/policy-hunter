import { describe, expect, it } from 'vitest'
import { useStore } from './useStore'

describe('useStore', () => {
  it('should have initial state', () => {
    const store = useStore.getState()
    expect(store.theme).toBe('light')
    expect(store.user).toBeNull()
    expect(store.favorites).toEqual([])
    expect(store.history).toEqual([])
    expect(store.compareList).toEqual([])
    expect(store.toast).toBeNull()
    expect(store.policies).toHaveLength(55)
  })

  it('should toggle theme', () => {
    const store = useStore.getState()
    expect(store.theme).toBe('light')
    store.toggleTheme()
    expect(useStore.getState().theme).toBe('dark')
    store.toggleTheme()
    expect(useStore.getState().theme).toBe('light')
  })

  it('should login and logout user', () => {
    const userData = { id: 1, name: 'Test User', email: 'test@example.com' }
    const store = useStore.getState()
    store.login(userData)
    expect(useStore.getState().user).toEqual(userData)
    store.logout()
    expect(useStore.getState().user).toBeNull()
  })

  it('should toggle favorite', () => {
    const store = useStore.getState()
    store.toggleFavorite(1)
    expect(useStore.getState().favorites).toEqual([1])
    store.toggleFavorite(1)
    expect(useStore.getState().favorites).toEqual([])
  })

  it('should check if policy is favorite', () => {
    const store = useStore.getState()
    store.toggleFavorite(2)
    expect(store.isFavorite(2)).toBe(true)
    expect(store.isFavorite(3)).toBe(false)
  })

  it('should add to history', () => {
    const store = useStore.getState()
    const item = { id: 1, title: 'Test Policy' }
    store.addToHistory(item)
    expect(useStore.getState().history).toEqual([item])
  })

  it('should limit history to 20 items', () => {
    const store = useStore.getState()
    for (let i = 0; i < 25; i++) {
      store.addToHistory({ id: i, title: `Policy ${i}` })
    }
    expect(useStore.getState().history).toHaveLength(20)
  })

  it('should toggle compare', () => {
    const store = useStore.getState()
    store.toggleCompare(1)
    expect(useStore.getState().compareList).toEqual([1])
    store.toggleCompare(1)
    expect(useStore.getState().compareList).toEqual([])
  })

  it('should limit compare list to 3 items', () => {
    const store = useStore.getState()
    store.toggleCompare(1)
    store.toggleCompare(2)
    store.toggleCompare(3)
    store.toggleCompare(4)
    expect(useStore.getState().compareList).toHaveLength(3)
  })

  it('should clear compare list', () => {
    const store = useStore.getState()
    store.toggleCompare(1)
    store.clearCompare()
    expect(useStore.getState().compareList).toEqual([])
  })

  it('should show and hide toast', () => {
    const store = useStore.getState()
    store.showToast('Test message', 'success')
    expect(useStore.getState().toast).toEqual({ message: 'Test message', type: 'success' })
    store.hideToast()
    expect(useStore.getState().toast).toBeNull()
  })

  it('should set search filters', () => {
    const store = useStore.getState()
    const filters = { keyword: 'test', region: '北京', industry: '科技' }
    store.setSearchFilters(filters)
    expect(useStore.getState().searchFilters).toEqual(filters)
  })

  it('should set filtered policies', () => {
    const store = useStore.getState()
    const policies = [{ id: 1, title: 'Test' }]
    store.setFilteredPolicies(policies)
    expect(useStore.getState().filteredPolicies).toEqual(policies)
  })
})
