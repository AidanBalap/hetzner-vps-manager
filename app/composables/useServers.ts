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

  return {
    fetchServers,
    fetchSnapshots,
  };
};
