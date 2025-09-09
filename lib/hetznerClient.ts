import type { Action, ApiListResponse, ApiResponse } from '~/types/HetznerCloudApi/Generic';
import type { CloudServer, Image } from '~/types/HetznerCloudApi/CloudServer';
import type { CloudServerCreationArguments, ImageCreationArguments } from '~/types/HetznerCloudApi/CloudServerManagement';

const runtimeConfig = useRuntimeConfig();

class HetznerClient {
  apiKey: string;
  baseUrl: string;

  constructor() {
    this.apiKey = runtimeConfig.hetznerApi;
    this.baseUrl = 'https://api.hetzner.cloud/v1';
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Hetzner API error: ${response.status}`);
    }

    return response.json();
  }

  // Actions
  async getAction(actionId: number): Promise<ApiResponse<Action>> {
    return this.request(`/actions/${actionId}`);
  }

  // Servers
  async listServers(): Promise<ApiListResponse<CloudServer>> {
    return this.request('/servers');
  }

  async createServer(creationCfg: CloudServerCreationArguments): Promise<ApiResponse<CloudServer>> {
    return this.request('/servers', {
      method: 'POST',
      body: JSON.stringify(creationCfg),
    });
  }

  async getServer(serverId: number): Promise<ApiResponse<CloudServer>> {
    return this.request(`/servers/${serverId}`);
  }

  async deleteServer(serverId: number): Promise<ApiResponse<Action>> {
    return this.request(`/servers/${serverId}`, { method: 'DELETE' });
  }

  async powerOnServer(serverId: number): Promise<ApiResponse<Action>> {
    return this.request(`/servers/${serverId}/actions/poweron`, {
      method: 'POST',
    });
  }

  async powerOffServer(serverId: number): Promise<ApiResponse<Action>> {
    return this.request(`/servers/${serverId}/actions/shutdown`, {
      method: 'POST',
    });
  }

  async createSnapshot(serverId: number, creationCfg: ImageCreationArguments): Promise<{
    image: Image
    action: Action
  }> {
    return this.request(`/servers/${serverId}/actions/create_image`, {
      method: 'POST',
      body: JSON.stringify(creationCfg),
    });
  }

  async getServerActions(serverId: number): Promise<ApiListResponse<Action>> {
    return this.request(`/servers/${serverId}/actions?sort=started:desc`);
  }

  // Snapshots
  async listSnapshots(): Promise<ApiListResponse<Image>> {
    return this.request('/images?type=snapshot&sort=created:desc');
  }

  async getSnapshot(snapshotId: number): Promise<ApiResponse<Image>> {
    return this.request(`/images/${snapshotId}`);
  }

  async deleteSnapshot(snapshotId: number): Promise<ApiResponse<Action>> {
    return this.request(`/images/${snapshotId}`, { method: 'DELETE' });
  }
}

export default HetznerClient;
