console.log('Sistema de Gestión Bancaria - v0.1.0');

import { validarCampoObligatorio, validarMonto } from './utils/validators.js';
import { generarId } from './utils/helpers.js';
import {
  formatCurrency,
  formatDate,
  formatAccountNumber,
} from './utils/formatters.js';


import { Usuario } from './models/Usuario.js';
import { Cuenta } from './models/Cuenta.js';
import { Movimiento } from './models/Movimiento.js';
import { Banco } from './models/Banco.js';

import { STORAGE_KEYS, storageService } from './services/StorageService.js';

console.log('Sistema de gstion bancaria -v0.2.0');
console.log('Campo obligatorio : ', validarCampoObligatorio('Banco digital'));
console.log('Monto valido: ', validarMonto(1000));
console.log('ID generado: ', generarId());
console.log('Monto formateado: ', formatCurrency(1500));
console.log('Fecha formateada: ', formatDate(new Date()));
console.log('Numero de cuenta: ', formatAccountNumber('123456789012'));
function guardarBanco(banco) {
 
  storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);

  storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);

  storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);

  
}

function cargarBanco() {

  const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);

  const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);

  const movimientosGuardados = storageService.obtener(
    STORAGE_KEYS.MOVIMIENTOS,
    [],
  );

  const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));

  const cuentas = cuentasGuardadas.map((cuenta) => new Cuenta(cuenta));

  const movimientos = movimientosGuardados.map(
    (movimeinto) => new Movimiento(movimeinto),
  );
  return new Banco({
    usuarios,
    cuentas,
    movimientos,
  });
}

const bancoDemo = cargarBanco();

if (bancoDemo.usuarios.length === 0) {
  const usuarioDemo = new Usuario({
    nombre: 'Juan Suarez',
    email: 'juan@correo.com',
    telefono: '5512345678',
    password: '123456',
  });

  bancoDemo.agregarUsuario(usuarioDemo);

  const cuentaDemo = new Cuenta({
    numeroCuenta: '123456789012',
    usuarioId: usuarioDemo.id,
  });

  bancoDemo.agregarCuenta(cuentaDemo);

  bancoDemo.realizarDeposito({
    cuentaId: cuentaDemo.id,
    monto: 1000,
    descripcion: 'Deposito para las cocas',
  });

  guardarBanco(bancoDemo);
  console.log('Datos iniciales guardados');
}

console.log('Bsnco recuperado: ', bancoDemo);

console.log('Usuarios almacenados: ', bancoDemo.usuarios);

console.log('Cuentas almacenadas: ', bancoDemo.cuentas);
console.log('Movimientos almacenados: ', bancoDemo.movimientos);

const cuentaPrincipal = bancoDemo.cuentas[0] || null;

if (cuentaPrincipal) {
  console.log('Saldo persistido: ', formatCurrency(cuentaPrincipal.saldo));

  console.log(
    '¿La cuenta recuperada sigue siendo una instancia de Cuenta?',
    cuentaPrincipal instanceof Cuenta,
  );
}
