import { Component, OnInit } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';
import { CommonService } from 'src/app/core/Services/common.service';
import { ResidenceService } from 'src/app/core/Services/residence.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent implements OnInit {
  searchAddress: string = '';
  favorites: Residence[] = [];
  showLocations: { [key: number]: boolean } = {};
  showFavorites: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  listResidences: Residence[] = [];

  constructor(
    private commonService: CommonService,
    private residenceService: ResidenceService
  ) { }

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe(
      (data) => {
        this.listResidences = data;
      },
      (error) => {
        console.error('Error fetching residences:', error);
      }
    );
  }
  

  loadResidences(): void {
    this.isLoading = true;
    this.residenceService.getResidences().subscribe({
      next: (residences) => {
        this.listResidences = residences;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur de chargement des données';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get filteredResidences() {
    return this.listResidences.filter(residence =>
      residence.address.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }

  countSimilarAddresses(): number {
    return this.commonService.getSameValueOf(
      this.listResidences,
      'address',
      this.searchAddress
    );
  }

  toggleLocation(residence: Residence) {
    if (residence.address.toLowerCase() === 'inconnu') {
      alert(`L'adresse de ${residence.name} est inconnue.`);
    } else {
      this.showLocations[residence.id] = !this.showLocations[residence.id];
    }
  }

  toggleFavorite(residence: Residence) {
    this.favorites = this.isFavorite(residence) ?
      this.favorites.filter(fav => fav.id !== residence.id) :
      [...this.favorites, residence];
  }

  isFavorite(residence: Residence): boolean {
    return this.favorites.some(fav => fav.id === residence.id);
  }

  toggleFavoritesView() {
    this.showFavorites = !this.showFavorites;
  }
  
  trackById(index: number, residence: Residence): number {
    return residence.id; // Suppose que chaque résidence a un "id" unique
  }
}