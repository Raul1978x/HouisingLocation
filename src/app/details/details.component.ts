import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id'])
    this.HousingService.getHousingLocationById(housingLocationId).then(
      housingLocation => {
        this.housingLocation = housingLocation
      });
  }
// constructor() {
//     const housingLocationId = Number(this.route.snapshot.params['id'])
//     this.HousingService.getHousingLocationById(housingLocationId).subscribe(
//       housingLocation => {
//         this.housingLocation = housingLocation
//         console.log(housingLocation);
        
//       });
//   }
  


  submitApplication() {
    this.HousingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  };
}
