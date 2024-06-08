import Axios from '../api/axios'
import type { TInventory } from '../types/inventory'

export const getAllInventories = async (): Promise<TInventory[]> => {
  const response = await Axios.get<TInventory[]>('/barang')
  return response.data
}

export const getInventoryItemById = async (id: number): Promise<TInventory> => {
  const response = await Axios.get<TInventory>(`/barang/${id}`)
  return response.data
}

export const storeInventoryItem = async (data: TInventory): Promise<void> => {
  await Axios.post<TInventory>('/barang', data)
}

export const updateInventoryItem = async (id: number, data: TInventory): Promise<void> => {
  await Axios.put<TInventory>(`/barang/${id}`, data)
}

export const deleteInventoryItem = async (id: number): Promise<void> => {
  await Axios.delete(`/barang/${id}`)
}
