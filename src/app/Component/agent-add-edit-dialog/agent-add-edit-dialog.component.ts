import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AgentService } from '../../Services/agent.service';
import { agentDataModel } from '../../DataModels/agentData.model';

@Component({
  selector: 'app-agent-add-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './agent-add-edit-dialog.component.html',
  styleUrl: './agent-add-edit-dialog.component.css',
})
export class AgentAddEditDialogComponent implements OnInit {
  title = 'New Agent';

  communityControl = new FormControl();

  agentAddEditForm = new FormGroup({
    businessName: new FormControl(''),
    address: new FormControl(''),
    community: new FormControl(''),
    district: new FormControl(''),
  });

  communityOptions: string[] = [
    'Belize City',
    'Bermudian Landing',
    'Biscayne',
    'Bomba',
    'Boston',
    'Burrell Boom',
    'Caye Caulker',
    'Corozalito',
    'Crooked Tree',
    'Double Head Cabbage',
    'Flowers Bank',
    'Freetown Sibun',
    'Gales Point',
    'Gardenia',
    'Gracie Rock',
    'Hattieville',
    'Isabella Bank',
    'La Democracia',
    'Ladyville',
    'Lemonal',
    "Lord's Bank",
    'Lucky Strike',
    'Mahogany Heights',
    'Maskall',
    'May Pen',
    'Mile 25 Village',
    'Rancho Dolores',
    'Rock Stone Pond',
    'San Pedro',
    'Sandhill',
    'Santana',
    'Scotland Halfmoon',
    "St. Ann's",
    "St. George's Caye",
    "St. Paul's Bank",
    'Western Paradise/West Lake/8 Miles',
    'Willows Bank',
    'Armenia',
    'Belmopan',
    'Benque Viejo del Carmen',
    'San Ignacio',
    'Santa Elena',
    'Arenal',
    'Lower Barton Creek',
    'Billy White',
    'Blackman Eddy',
    'Branch Mouth',
    'Buena Vista',
    'Bullet Tree Falls',
    'Calla Creek',
    'Camalote',
    'Central farm',
    'Cotton Tree',
    'Cristo Rey',
    'Duck Run I',
    'Duck Run II',
    'Duck Run III',
    'Esperanza',
    'Franks Eddy',
    'Georgeville',
    'La Gracia',
    'Los Tambos',
    'More Tomorrow',
    'Ontario',
    'Paslow Falls/Plant',
    'Roaring Creek',
    'Ringtail Village',
    'San Antonio',
    'San Jose Succotz',
    'San Marcos',
    'Santa Familia',
    'Santa Marta',
    'Santa Rosa',
    'Santa Teresita',
    'Selena',
    'Seven Miles',
    'Spanish Lookout',
    'Springfield',
    'St. Matthews',
    'Teakettle',
    'Unitedville',
    'Upper Barton Creek',
    'Valley of Peace',
    'Yalbac',
    'Corozal Town',
    'Altamira',
    'Buena Vista',
    'Calcutta',
    'Caledonia',
    'Carolina',
    'Chan Chen',
    'Chunox',
    'Concepción',
    'Consejo',
    'Copper Bank',
    'Cristo Rey',
    'Estrella',
    'Libertad',
    'Little Belize',
    'Louisville',
    'Paraiso',
    'Patchakan',
    'Progresso',
    'Ranchito',
    'San Andrés',
    'San Antonio',
    'San Joaquín',
    'San Narciso',
    'San Pedro',
    'San Román',
    'San Víctor',
    'Santa Clara',
    'Sarteneja',
    'Xaibe',
    'Yo Chen',
    'Orange Walk Town',
    'August Pine Ridge',
    'Blue Creek',
    'Carmelita',
    'Chan Chich',
    'Chan Pine Ridge',
    'Cuatro Leguas',
    'Douglas',
    'Fire Burn',
    'Guinea Grass',
    'Indian Church',
    'Indian Creek',
    'Indian Hill Estate',
    'Petville',
    'Richmond Hill',
    'San Antonio',
    'San Carlos',
    'San Estevan',
    'San Felipe',
    'San José',
    'San José Palmar',
    'San Juan',
    'San Lorenzo',
    'San Lázaro',
    'San Luis',
    'San Pablo',
    'San Román',
    'Santa Cruz',
    'Santa Marta',
    'Shipyard',
    'Sylvestre Camp',
    'Tower Hill',
    'Tres Leguas',
    'Trial Farm',
    'Trinidad',
    'Yo Creek',
    'Dangriga',
    'Alta Vista',
    'Cow Pen',
    'George Town',
    'Hope Creek',
    'Hopkins',
    'Hummingbird Community',
    'Independence',
    'Kendall',
    'Mango Creek',
    'Maya Beach',
    'Maya Center',
    'Maya Mopan',
    'Middlesex',
    'Mullins River',
    'Placencia',
    'Pomona',
    'Red Bank',
    'Riversdale',
    'San Juan',
    'San Román',
    'Santa Cruz',
    'Santa Rosa',
    'Sarawee',
    'Seine Bight',
    'Silk Grass',
    'Sittee River',
    'South Stann Creek',
    'Steadfast',
    'Valley Community',
    'Punta Gorda',
    'Aguacate',
    'Barranco',
    'Bella Vista',
    'Big Falls',
    'Bladden',
    'Blue Creek',
    'Boom Creek',
    'Cattle Landing',
    'Conejo',
    'Corazon',
    'Crique Jute',
    'Crique Largo',
    'Crique Sarco',
    'Crique Trosa',
    'Dolores',
    'Dump',
    'Elridge',
    'Forest Home',
    'Golden Stream',
    'Graham Creek',
    'Hicattee',
    'Hicattee Southern Highway',
    'Indian Creek',
    'Jacinto/Westmoreland',
    'Jalacte',
    'Jordan',
    'Laguna',
    'Mabilha',
    'Mafredi',
    'Mango Walk',
    'Medina Bank',
    'Midway',
    'Monkey River',
    'Moody Hill',
    'Na Luum Ca',
    'New Road Area',
    'Otoxha',
    'Pinehill',
    'Pueblo Viejo',
    'Punta Negra',
    'San Antonio',
    'San Benito Poite',
    'San Felipe',
    'San Jose',
    'San Isidro',
    'San Lucas',
    'San Marcos',
    'San Miguel',
    'San Pablo',
    'San Pedro',
    'San Vicente',
    'Santa Ana',
    'Santa Cruz',
    'Santa Elena',
    'Santa Teresa',
    'Silver Creek',
    'Sunday Wood',
    'Swasey',
    'Tambran',
    'Trio',
    'Wilson Road',
    'Yemeri Grove',
  ];
  filteredOptions!: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AgentAddEditDialogComponent>,
    private agentSerive: AgentService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.communityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.communityOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  cancel() {
    this.dialogRef.close();
  }
  save() {
    if (this.agentAddEditForm.valid) {
      const newAgent = { ...this.agentAddEditForm.value } as agentDataModel;
      newAgent.status = 'active';

      console.log(newAgent);

      this.agentSerive
        .addAgent(newAgent)
        .pipe(
          tap((item) => {
            this.agentAddEditForm.reset();
            this.dialogRef.close();
          })
        )
        .subscribe();
    }
  }
}