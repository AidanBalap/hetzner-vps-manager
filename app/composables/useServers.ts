import { useApi } from './useApi';
import type { CloudServer, Image } from '~~/types/HetznerCloudApi/CloudServer';

/**
 * Server management composable
 * Provides all server-related operations with consistent error handling
 */
export const useServers = () => {
  const api = useApi();

  /**
   * Fetch all active servers
   */
  const fetchServers = async (): Promise<CloudServer[] | []> => {
    const result: CloudServer[] | null = await api.get(
      '/api/servers',
      'Error al obtener los servidores',
    );
    return result ?? [];
  };

  /**
   * Fetch all snapshots
   */
  const fetchSnapshots = async (): Promise<Image[] | []> => {
    const result: Image[] | null = await api.get(
      '/api/snapshots',
      'Error al obtener los snapshots',
    );
    return result ?? [];
  };

  /**
   * Deploy a new server from a snapshot
   * @param snapshotId - ID of the snapshot to deploy from
   */
  const deploySnapshot = async (snapshotId: number): Promise<CloudServer | null> => {
    const result: CloudServer | null = await api.post(
      `/api/snapshots/${snapshotId}/deploy`,
      'Error al desplegar el snapshot',
    );
    if (result) {
      const { $toast } = useNuxtApp();
      $toast.success(`Servidor ${result.name} creado con éxito`);
    }
    return result;
  };

  return {
    fetchServers,
    fetchSnapshots,
    deploySnapshot,
  };
};
