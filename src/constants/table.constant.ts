import type { TTableHeader } from '../types/table'

export const InventoryTableHeader: TTableHeader[] = [
  { text: 'Name', value: 'nama_barang' },
  { text: 'Supplier', value: 'supplier' },
  { text: 'Buy Date', value: 'tgl_pembelian' },
  { text: 'Serial Number', value: 'nomor_seri' },
  { text: 'Quantity', value: 'jumlah' },
  { text: 'Ownership', value: 'kepemilikan' },
  { text: 'Status', value: 'status' },
]

export const AdminLoaningTableHeader: TTableHeader[] = [
  {text: 'ID', value: 'id_peminjaman'},
  { text: 'Name', value: 'name' },
  { text: 'Item', value: 'item' },
  { text: 'Description', value: 'ket' },
  { text: 'Ownership', value: 'kepemilikan' },
  { text: 'Quantity', value: 'qty' },
  { text: 'Loan Date', value: 'tgl_pinjam' },
  { text: 'Duration', value: 'durasi_pinjam' },
  { text: 'Return Date', value: 'tgl_kembali' },
  { text: 'Status', value: 'status' },
]

export const LoaningTableHeader: TTableHeader[] = [
  { text: 'Item', value: 'item' },
  { text: 'Description', value: 'ket' },
  { text: 'Ownership', value: 'kepemilikan' },
  { text: 'Quantity', value: 'qty' },
  { text: 'Loan Date', value: 'tgl_pinjam' },
  { text: 'Duration', value: 'durasi_pinjam' },
  { text: 'Return Date', value: 'tgl_kembali' },
  { text: 'Status', value: 'status' },
]

export const UserTableHeader: TTableHeader[] = [
  { text: 'Name', value: 'nama' },
  { text: 'Email', value: 'email' },
  { text: 'Phone', value: 'telepon' },
  { text: 'NIK', value: 'nik' },
  { text: 'Division', value: 'divisi' },
  { text: 'Company', value: 'perusahaan' },
  { text: 'Role', value: 'is_admin' },
]