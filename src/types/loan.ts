export type TLoan = {
  id_peminjaman?: number
  barang: any
  user: any
  ket: string
  kepemilikan: string
  qty: number | null
  tgl_pinjam: string
  durasi_pinjam: string
  tgl_kembali?: string
  status: number
}

export type TLoanForm = {
  id_peminjaman?: number
  id_barang: number
  id_user: number
  ket: string
  qty: number | null
  tgl_pinjam: string
  durasi_pinjam: string
  tgl_kembali?: string
  status: number
}