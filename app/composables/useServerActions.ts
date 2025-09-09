import { useApi } from './useApi';
import type { CloudServer } from '~~/types/HetznerCloudApi/CloudServer';
import type { Action } from '~~/types/HetznerCloudApi/Generic';

/**
 * Server management composable
 * Provides all server-related operations with consistent error handling
 */
export const useServerActions = () => {
  const api = useApi();
  const { $toast } = useNuxtApp();

  /**
   * Fetch a single server by ID
   */
  const fetch = async (id: string | number): Promise<CloudServer | null> => {
    const result: CloudServer | null = await api.get(
      `/api/servers/${id}`,
      'Error al obtener el servidor',
    );
    return result ?? null;
  };

  /**
   * Fetch server actions/history
   */
  const fetchActions = async (id: string | number): Promise<Action[] | []> => {
    const result: Action[] | null = await api.get(
      `/api/servers/${id}/actions`,
      'Error al obtener las acciones',
    );
    return result ?? [];
  };

  /**
   * Start a server
   */
  const start = async (id: string | number): Promise<boolean> => {
    $toast.info('Encendiendo servidor');

    const result = await api.post(
      `/api/servers/${id}/start`,
      undefined,
      'Error al encender el servidor',
    );

    if (result !== null) {
      $toast.success('Server is on');
      return true;
    }
    return false;
  };

  /**
   * Stop a server
   */
  const stop = async (id: string | number): Promise<boolean> => {
    $toast.info('Apagando servidor');

    const result = await api.post(
      `/api/servers/${id}/stop`,
      undefined,
      'Error al apagar el servidor',
    );

    if (result !== null) {
      $toast.success('Server is off');
      return true;
    }
    return false;
  };

  /**
   * Create snapshot and delete server
   */
  const snapshotAndDelete = async (id: string | number): Promise<boolean> => {
    $toast.info('Creando snapshot');

    const result = await api.post(
      `/api/servers/${id}/saveAndDelete`,
      undefined,
      'Error al crear snapshot',
    );

    if (result !== null) {
      $toast.success('Servidor congelado');
      return true;
    }
    return false;
  };

  /**
   * Delete a server
   */
  const deleteServer = async (id: string | number): Promise<boolean> => {
    if (!confirm('¿Estás seguro de que quieres borrar el servidor?')) {
      return false;
    }

    $toast.info('Borrando servidor');

    const result = await api.del(
      `/api/servers/${id}/delete`,
      'Error al borrar el servidor',
    );

    if (result !== null) {
      $toast.success('Servidor eliminado');
      return true;
    }
    return false;
  };

  return {
    fetch,
    fetchActions,
    start,
    stop,
    snapshotAndDelete,
    deleteServer,
  };
};
