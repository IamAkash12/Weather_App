import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    
  ],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {
  @Input() initialCityName = 'Mumbai'; //default city name
  @Output() cityNameChanged = new EventEmitter<string>();

  cityName = this.initialCityName;
  data = {
    temp: '',
    feelsLike: '',
    pressure: '',
    humidity: '',
    city: '',
    main: '',
    imageURl: ''
  };

  constructor(private readonly weatherService: WeatherService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.cityName) {
      this.weatherService.fetchData(this.cityName).subscribe({
        next: (data: any) => {
          this.data.temp = data.main.temp;
          this.data.feelsLike = data.main.feels_like;
          this.data.pressure = data.main.pressure;
          this.data.humidity = data.main.humidity;
          this.data.city = data.name;
          this.data.imageURl = data.weather[0].icon;
          this.data.main = data.weather[0].main;
        },
        error: (error) => {
          console.error('Error while fetching', error);
        }
      });
    }
  }

  onCityNameChange() {
    this.cityNameChanged.emit(this.cityName);
    this.loadData();
  }
}