import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RelationshipsService } from '../../services/relationships';
import { RecordsService } from '../../services/records';
import { PeopleService } from '../../services/people';

@Component({
  selector: 'app-validation-report',
  standalone: false,
  templateUrl: './validation-report.html',
  styleUrl: './validation-report.css',
})
export class ValidationReport implements OnInit {
  peopleCount: number = 0;
  relationshipsCount: number = 0;
  recordsCount: number = 0;
  evidenceStrength: string = '';

  constructor(
    private relationshipsService: RelationshipsService,
    private recordsService: RecordsService,
    private peopleService: PeopleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadValidationData();
  }

  loadValidationData(): void {
    this.peopleService.getPeople().subscribe({
      next: (people: any[]) => {
        this.peopleCount = people.length;
        this.updateEvidenceStrength();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading people:', error);
      }
    });

    this.relationshipsService.getRelationships().subscribe({
      next: (relationships: any[]) => {
        this.relationshipsCount = relationships.length;
        this.updateEvidenceStrength();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading relationships:', error);
      }
    });

    this.recordsService.getRecords().subscribe({
      next: (records: any[]) => {
        this.recordsCount = records.length;
        this.updateEvidenceStrength();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading records:', error);
      }
    });
  }

  updateEvidenceStrength(): void {
    if (this.recordsCount >= 3) {
      this.evidenceStrength = 'Strong';
    } else if (this.recordsCount >= 1) {
      this.evidenceStrength = 'Moderate';
    } else {
      this.evidenceStrength = 'Weak';
    }
  }
}