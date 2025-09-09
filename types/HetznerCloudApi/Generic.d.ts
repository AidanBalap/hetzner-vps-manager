export interface ApiListResponse<T> {
  meta: {
    pagination: Pagination
  }
  images?: T[]
  servers?: T[]
  actions?: T[]
  volumes?: T[]
  locations?: T[]
  types?: T[]
  isos?: T[]
  firewalls?: T[]
  networks?: T[]
  load_balancers?: T[]
  certificates?: T[]
  ssh_keys?: T[]
  backups?: T[]
  snapshots?: T[]
  datacenters?: T[]
  primary_ips?: T[]
  reserved_ips?: T[]
}

export interface ApiResponse<T> {
  [key: string]: T
}

export interface Action {
  id: number
  command: string
  status: 'running' | 'success' | 'error'
  progress: number
  started: string // ISO date string
  finished?: string // ISO date string
  resources?: Array<{ id: number, type: string }>
  error?: Error
}

export interface Error {
  code: string
  message: string
  details?: Record<string, string>
}

export interface Pagination {
  page: number
  per_page: number
  previous_page?: number
  next_page?: number
  last_page: number
  total_entries: number
}

export interface Labels {
  [key: string]: string
}
