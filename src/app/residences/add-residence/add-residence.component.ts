import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm: FormGroup;
  isUpdateMode: boolean = false; 
  residenceId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private residenceService: ResidenceService
  ) {
    this.residenceForm = this.fb.group({
      id: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]+$')]],  // Disabled by default
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: [null, Validators.required],
      status: ['Disponible'],
      apartments: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.residenceId = this.route.snapshot.paramMap.get('id');
    if (this.residenceId) {
      this.isUpdateMode = true;
      this.loadResidenceData(parseInt(this.residenceId));
    }
    
  }

  get apartments(): FormArray {
    return this.residenceForm.get('apartments') as FormArray;
  }

  loadResidenceData(id: number): void {
    const residence = this.residenceService.getResidenceById(id); 
    if (residence) {
      this.residenceForm.patchValue({
        id: residence.id,
        name: residence.name,
        address: residence.address,
        image: residence.image,
        status: residence.status,
      });

      if (residence.apartments) {
        for (let apartment of residence.apartments) {
          this.addApartment(apartment); // Populate apartments
        }
      }
    }
  }

  addApartment(existingApartment?: any): void {
    const newApartment = this.fb.group({
      residenceId: [this.residenceForm.get('id')!.value, Validators.required],
      apartmentNumber: [existingApartment ? existingApartment.apartmentNumber : '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      floorNumber: [existingApartment ? existingApartment.floorNumber : '', [Validators.required, Validators.pattern('^[0-9]+$')]],
      terrace: [existingApartment ? existingApartment.terrace : false],
      surfaceTerrace: [{ value: existingApartment ? existingApartment.surfaceTerrace : '', disabled: true }, Validators.pattern('^[0-9]+$')]
    });

    this.apartments.push(newApartment);

    const terraceControl = newApartment?.get('terrace');
    const surfaceTerraceControl = newApartment?.get('surfaceTerrace');

    if (terraceControl && surfaceTerraceControl) {
      terraceControl.valueChanges.subscribe(terrace => {
        if (terrace) {
          surfaceTerraceControl.enable();
        } else {
          surfaceTerraceControl.disable();
        }
      });
    }
  }

  removeApartment(index: number): void {
    this.apartments.removeAt(index);
  }

  addResidence(): void {
    if (this.residenceForm.valid) {
      if (this.isUpdateMode) {
        console.log('Updating residence:', this.residenceForm.value);
        // Call the service to update the residence
      } else {
        console.log('Adding new residence:', this.residenceForm.value);
        // Call the service to add a new residence
      }

      // Redirect after adding/updating
      this.router.navigate(['/residences']);
    } else {
      alert("Le formulaire contient des erreurs. Veuillez vérifier les champs.");
    }
  }
}
