export interface Project {
    id?: number;
    nombre: string;
    descripcion: string;
    imgPortada: string; // Basado en el campo del ERD
    urlGitHub?: string;
    urlProyecto?: string;
    modulo?: string;    // Relación con tabla MODULO
    autor?: string;     // Relación con tabla USUARIO
}
