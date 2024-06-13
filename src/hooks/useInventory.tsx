import { useEffect, useState } from 'react'
import {
  deleteInventoryItem,
  getAllInventories,
  storeInventoryItem,
  updateInventoryItem,
} from '../services/inventoryService'
import { TInventory } from '../types/inventory'

export const useInventory = () => {
  const [inventories, setInventories] = useState<TInventory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInventories = async () => {
    try {
      const inventoriesData = await getAllInventories()
      setInventories(inventoriesData)
    } catch (err) {
      setError('Error fetching inventories')
    } finally {
      setLoading(false)
    }
  }

  const addInventoryItem = async (newItem: TInventory) => {
    try {
      await storeInventoryItem(newItem)
      fetchInventories()
      // Assuming success, update state to reflect the new inventory item
      // setInventories(prevInventories => [...prevInventories, newItem])
    } catch (err) {
      setError('Failed adding inventory item')
    }
  }

  const editInventoryItem = async (id: number, updatedItem: TInventory) => {
    try {
      await updateInventoryItem(id, updatedItem)
      fetchInventories()
    } catch (err) {
      setError('Failed updating inventory item')
    }
  }

  const removeInventoryItem = async (id: number) => {
    try {
      await deleteInventoryItem(id)
      fetchInventories()
    } catch (err) {
      setError('Failed deleting inventory item')
      throw err
    }
  }

  useEffect(() => {
    fetchInventories()
  }, [])

  return {
    inventories,
    loading,
    error,
    fetchInventories,
    addInventoryItem,
    editInventoryItem,
    removeInventoryItem,
  }
}