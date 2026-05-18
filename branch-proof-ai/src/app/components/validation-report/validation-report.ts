import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RelationshipsService } from '../../services/relationships';
import { RecordsService } from '../../services/records';
import { PeopleService } from '../../services/people';
import { ValidationService } from '../../services/validation';


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
  aiAnalysis: string = '';
  loadingAnalysis: boolean = false;

  constructor(
    private relationshipsService: RelationshipsService,
    private recordsService: RecordsService,
    private peopleService: PeopleService,
    private cdr: ChangeDetectorRef,
    private validationService: ValidationService,

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
        // this.generateAiAnalysis();
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

  generateAiAnalysis(): void {
    this.loadingAnalysis = true;

    const payload = {
      personOne: 'Dataset Summary',
      personTwo: 'Relationship Network',
      relationship: 'Genealogy Validation',
      evidence: `People: ${this.peopleCount}, Relationships: ${this.relationshipsCount}, Records: ${this.recordsCount}`,
    };

    this.validationService.analyzeRelationship(payload).subscribe({
      next: (response: any) => {
        this.aiAnalysis = response.analysis;
        this.loadingAnalysis = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('AI analysis error:', error);
        this.aiAnalysis = 'Unable to generate AI analysis.';
        this.loadingAnalysis = false;
        this.cdr.markForCheck();
      }
    });
  }
}