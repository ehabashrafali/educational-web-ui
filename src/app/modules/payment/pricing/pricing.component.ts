import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardComponent } from '@fuse/components/card';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule, 
    NgClass, 
    FuseCardComponent, 
    MatIconModule,
    MatButtonToggle,
    MatButtonToggleGroup,

  ],
})
export class PricingComponent implements OnInit {
    oneToOne: boolean = true;
    pricePerSession: number;
    pricing = {
      "oneToOne": {
        "":"",
        "":"",
        "":"",
      },
      "group": {
        "":"",
        "":"",
        "":"",
      }
    }

    constructor() {}
    
    ngOnInit(): void {

    }

    selectedSessionsChanged(value:any){
      if(value){
        switch(value){
            case '1':
                this.pricePerSession = 9;
                break;
            case '3':
                this.pricePerSession = 8;
                break;
            case '5':
                this.pricePerSession = 7;
                break;
            default:
                break;
        }
      }
    }
}
