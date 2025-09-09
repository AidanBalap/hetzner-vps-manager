export interface CloudServerCreationArguments {
  name: string
  server_type: string
  image: string
  location?: string
  datacenter?: string
  start_after_create?: boolean
  placement_group?: number
  ssh_keys?: string[]
  volumes?: number[]
  networks?: number[]
  firewalls?: { firewall: number }[]
  user_data?: string
  labels?: Record<string, string>
  automount?: boolean
  public_net?: {
    enable_ipv4?: boolean
    enable_ipv6?: boolean
    ipv4?: number | null
    ipv6?: number | null
  }
}

export interface ImageCreationArguments {
  description?: string
  type?: 'snapshot' | 'backup'
  labels?: Record<string, string>
}
