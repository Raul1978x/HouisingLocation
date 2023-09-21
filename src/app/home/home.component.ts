import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  HousingLocationList: HousingLocation[] = [];;
  HousingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
  this.HousingService.getAllHousingLocations().then((HousingLocationList: HousingLocation[]) => {
    this.HousingLocationList = HousingLocationList
    this.filteredLocationList = HousingLocationList;
  })
  }

  // constructor() {
  // this.HousingService.getAllHousingLocations().subscribe((HousingLocationList: HousingLocation[]) => {
  //   this.HousingLocationList = HousingLocationList
  //   this.filteredLocationList = HousingLocationList;
  // })
  // }


  // constructor(private housingService: HousingService) {
  //   this.housingService.getAllHousingLocations().subscribe(
  //     data => {
  //       this.HousingLocationList = data;
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  //  }

   filterResults(text: string) {
    if (!text) this.filteredLocationList = this.HousingLocationList;
    this.filteredLocationList = this.HousingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase().trim())
    );
  }
}