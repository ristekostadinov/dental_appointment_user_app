import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Location } from '../../domains/Location';
import { Category} from '../../domains/Category';
import { IHomePageForm } from '../../domains/Forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  homePageForm!: FormGroup<IHomePageForm>;

  locations: Location [] = [] 

  categories: Category []= []

  constructor(
    private _formBuilder: FormBuilder, 
    private _router: Router,
    private _locationService: LocationService,
    private _categoryService: CategoryService
  ) { }
  ngOnInit(): void {
    this.homePageForm = this._formBuilder.nonNullable.group({
      location: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.fetchData();
  }

  fetchData(){
    forkJoin({
      locations: this._locationService.getLocations(),
      categories: this._categoryService.getCategories()
    }).subscribe({
      next: (data) => {
        this.locations = data.locations;
        this.categories = data.categories;
      }
    });
  }

  get location() {
    return this.homePageForm.get('location');
  }

  get category()  {
    return this.homePageForm.get('category');
  }

  onSubmit() {
    if (this.homePageForm.valid && this.location?.value && this.category?.value) {
      const { location, category } = this.homePageForm.value;
      this._router.navigate([`categories/${category}/locations/${location}/services`]);
    }
  }

}
