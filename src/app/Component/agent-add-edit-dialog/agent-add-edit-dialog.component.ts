import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AgentService } from '../../Services/agent.service';
import { agentDataModel } from '../../DataModels/agentData.model';
import { GlobalService } from '../../Services/global.service';

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
  title = ''; // Title for the dialog
  communityControl = new FormControl(); // FormControl for community input
  agentAddEditForm; // FormGroup for agent add/edit form
  // Array of community options
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
    'Lords Bank',
    'Lucky Strike',
    'Mahogany Heights',
    'Maskall',
    'May Pen',
    'Mile 25 Village',
    'Rancho Dolores',
    'Rock Stone Pond',
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
    'Calcutta',
    'Caledonia',
    'Carolina',
    'Chan Chen',
    'Chunox',
    'Concepción',
    'Consejo',
    'Copper Bank',
    'Estrella',
    'Libertad',
    'Little Belize',
    'Louisville',
    'Paraiso',
    'Patchakan',
    'Progresso',
    'Ranchito',
    'San Andrés',
    'San Joaquín',
    'San Narciso',
    'San Pedro',
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
    'San Benito Poite',
    'San Isidro',
    'San Lucas',
    'San Miguel',
    'San Vicente',
    'Santa Ana',
    'Santa Teresa',
    'Silver Creek',
    'Sunday Wood',
    'Swasey',
    'Tambran',
    'Trio',
    'Wilson Road',
    'Yemeri Grove',
  ];

  filteredOptions!: Observable<string[]>; // Observable for filtered community options
  updateAgentID = ''; // ID of the agent being updated

  constructor(
    public dialogRef: MatDialogRef<AgentAddEditDialogComponent>,
    private agentService: AgentService,
    @Inject(MAT_DIALOG_DATA) agentData: agentDataModel,
    private globalService: GlobalService
  ) {
    this.agentAddEditForm = new FormGroup({
      businessName: new FormControl(
        agentData.businessName,
        Validators.required
      ),
      address: new FormControl(agentData.address, Validators.required),
      community: new FormControl(agentData.community),
      district: new FormControl(agentData.district, Validators.required),
    });
    this.communityControl.setValue(agentData.community);
    this.updateAgentID = agentData.id;
    if (
      this.updateAgentID == '' ||
      this.updateAgentID == undefined ||
      this.updateAgentID == null
    ) {
      this.title = 'New Agent';
    } else {
      this.title = 'Update Agent';
    }
  }

  ngOnInit() {
    // Set up filtered options observable for community input
    this.filteredOptions = this.communityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  // Filter community options based on input value
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.communityOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  // Cancel and close the dialog
  cancel() {
    this.dialogRef.close();
  }
  // Save agent data
  save() {
    if (this.updateAgentID) {
      // Update existing agent
      const updateAgentData = {
        ...this.agentAddEditForm.value,
      } as Partial<agentDataModel>;
      updateAgentData.editedBy = this.globalService.username!;
      if (updateAgentData.community != this.communityControl.value) {
        updateAgentData.community = this.communityControl.value;
      }
      delete updateAgentData.id; // Remove ID field

      // Call service to update agent
      this.agentService
        .updateAgent(this.updateAgentID, updateAgentData)
        .subscribe((val) => {
          this.agentAddEditForm.reset(); // Reset form
          this.dialogRef.close('Success'); // Close dialog with updated data
        });
    } else {
      if (this.agentAddEditForm.valid) {
        // Add new agent
        const newAgent = { ...this.agentAddEditForm.value } as agentDataModel;
        newAgent.status = 'active'; // Set status to active
        newAgent.createdBy = this.globalService.username!;
        newAgent.community = this.communityControl.value; // Set community

        // Call service to add new agent
        this.agentService
          .addAgent(newAgent)
          .pipe(
            tap((agentID) => {
              this.agentAddEditForm.reset(); // Reset form
              this.dialogRef.close('Success'); // Close dialog with new agent ID
            })
          )
          .subscribe();
      }
    }
  }
}
