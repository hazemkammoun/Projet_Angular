import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/Services/common.service';
import { Apartment } from 'src/app/core/models/apartment';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {
  apartments: Apartment[] = [];
  surfaceSearch: number | null = null; // Surface à rechercher

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.apartments = [
      { apartNum: 101, floorNum: 1, surface: 50, terrace: true, surfaceterrace: 20, category: 'Luxury', ResidenceId: 1 },
      { apartNum: 102, floorNum: 1, surface: 55, terrace: false, surfaceterrace: 0, category: 'Standard', ResidenceId: 1 },
      { apartNum: 201, floorNum: 2, surface: 50, terrace: true, surfaceterrace: 15, category: 'Standard', ResidenceId: 2 }
    ];
  }

  // Compte les appartements avec la surface recherchée
  countSameSurface(): number {
    if (!this.surfaceSearch) return 0;
    return this.commonService.getSameValueOf(
      this.apartments,
      'surface',
      this.surfaceSearch
    );
  }
}