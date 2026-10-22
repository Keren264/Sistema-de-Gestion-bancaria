

export function validarCampoObligatorio(valor) {

  return (
    // El valor no debe ser undefined
    valor !== undefined && valor !== null && String(valor).trim() !== ''
  );
}

export function validarMonto(monto) {
  const montoNumerico = Number(monto);

  return Number.isFinite(montoNumerico) && montoNumerico > 0;
}
