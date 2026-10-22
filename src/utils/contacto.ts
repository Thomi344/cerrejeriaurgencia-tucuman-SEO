// src/utils/contacto.ts

// Teléfono del negocio tal como está en el .env (Ej: +5493810000000)
export const telefono: string = import.meta.env.PUBLIC_TELEPHONE || '+5493810000000';

// Versión para enlaces tel: (sin espacios ni guiones, conserva el "+")
export const telefonoTel = telefono.replace(/[^\d+]/g, '');

// wa.me necesita solo dígitos
const telefonoWhatsapp = telefono.replace(/\D/g, '');

export const urlWhatsapp = (mensaje: string) =>
    `https://wa.me/${telefonoWhatsapp}?text=${encodeURIComponent(mensaje)}`;
