import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private readonly _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountryByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}?field=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    if (!alphaCode) return of(null);
    const url = `${this.baseUrl}/alpha/${alphaCode}?field=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryBorderByCodes(codes: string[]): Observable<Country[]> {
    if (!codes || codes.length === 0) return of([]);
    const url = `${this.baseUrl}/alpha?codes=${codes.join(
      ','
    )}&field=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }
}
