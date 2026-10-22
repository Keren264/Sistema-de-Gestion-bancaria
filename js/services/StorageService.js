

export const STORAGE_KEYS = {
  USUARIOS: 'usuarios',
  CUENTAS: 'cuentas',
  MOVIMIENTOS: 'movimientos',
  SESION: 'sesion',
};

class StorageService {
  guardar(clave, valor) {
    const valorJSON = JSON.stringify(valor);
    localStorage.setItem(clave, valorJSON);
  }

  obtener(clave, valorPordefecto = null) {
    const valor = localStorage.getItem(clave);

    if (valor === null) {
      return valorPordefecto;
    }
    try {
      return JSON.parse(valor);
    } catch (error) {
      console.log(
        `No fue posible leer la clave ${clave} de LocalStorage `,
        error,
      );
      return valorPordefecto;
    }
  }
  eliminar(clave) {
    localStorage.removeItem(clave);
  }

  limpiar() {
    localStorage.clear();
  }
}

export const storageService = new StorageService();
