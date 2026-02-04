/**
 * ==========================================
 * SERVICIO DE DATOS MAESTROS
 * ==========================================
 * Gestiona la recuperación de catálogos y listas auxiliares desde el backend.
 * Centraliza el acceso a tablas como Roles, Centros Educativos y Títulos.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
    id: number;
    nombreGrupo: string;
    permisos: string;
}

export interface CentroEducativo {
    id: number;
    nombreCentro: string;
    sufijoEmail?: string;
}

export interface Titulo {
    id: number;
    nombreTitulo: string;
}

@Injectable({
    providedIn: 'root'
})
export class MasterDataService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(`${this.apiUrl}/roles`);
    }

    getCentros(): Observable<CentroEducativo[]> {
        return this.http.get<CentroEducativo[]>(`${this.apiUrl}/centros`);
    }

    getTitulos(): Observable<Titulo[]> {
        return this.http.get<Titulo[]>(`${this.apiUrl}/titulos`);
    }

    createCentro(data: { nombreCentro: string; sufijoEmail?: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/centros`, data);
    }

    updateCentro(id: number, data: { nombreCentro: string; sufijoEmail?: string }): Observable<any> {
        return this.http.put(`${this.apiUrl}/centros/${id}`, data);
    }

    deleteCentro(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/centros/${id}`);
    }
}
