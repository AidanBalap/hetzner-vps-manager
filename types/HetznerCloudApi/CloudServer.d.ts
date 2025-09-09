export interface CloudServer {
  id: number
  name: string
  status: 'running' | 'initializing' | 'starting' | 'stopping' | 'off' | 'deleting' | 'migrating' | 'rebuilding'
  created: string // ISO 8601 date string
  public_net: {
    ipv4: {
      ip: string
      blocked: boolean
      dns_ptr: string
    }
    ipv6: {
      ip: string
      blocked: boolean
      dns_ptr: string[]
    }
    floating_ips: number[]
  }
  server_type: ServerType
  datacenter: Datacenter
  image: Image
  iso?: Iso | null
  rescue_enabled: boolean
  locked: boolean
  backup_window?: string | null
  outgoing_traffic: number
  ingoing_traffic: number
  included_traffic: number
  protection: {
    delete: boolean
    rebuild: boolean
  }
  labels: Record<string, string>
  volumes: number[]
  private_net: PrivateNet[]
}

export interface ServerType {
  id: number
  name: string
  description: string
  cores: number
  memory: number // GB
  disk: number // GB
  storage_type: 'local' | 'network'
  cpu_type: string
  prices: Price[]
  deprecated: boolean
}

export interface Price {
  location: string
  price_hourly: {
    net: number
    gross: number
  }
  price_monthly: {
    net: number
    gross: number
  }
  included_traffic: number
  price_per_tb_traffic: {
    net: number
    gross: number
  }
}

export interface Datacenter {
  id: number
  name: string
  description: string
  location: Location
}

export interface Location {
  id: number
  name: string
  description: string
  country: string
  city: string
  latitude: number
  longitude: number
  network_zone: string
}

export interface Image {
  id: number
  name: string
  description: string
  type: 'system' | 'snapshot' | 'backup' | 'app'
  status: 'available' | 'creating' | 'unavailable'
  image_size?: number | null
  disk_size: number
  created: string
  created_from?: CreatedFrom | null
  bound_to?: number | null
  os_flavor: string
  os_version: string
  rapid_deploy: boolean
  protection: {
    delete: boolean
  }
  labels: Record<string, string>
}

export interface CreatedFrom {
  id: number
  name: string
}

export interface Iso {
  id: number
  name: string
  description: string
  type: string
  deprecated: boolean
}

export interface PrivateNet {
  network: number
  ip: string
  alias_ips: string[]
  mac_address: string
}
