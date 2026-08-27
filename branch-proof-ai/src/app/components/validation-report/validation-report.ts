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
  people: any[] = [];
  relationships: any[] = [];
  records: any[] = [];
  peopleCount: number = 0;
  relationshipsCount: number = 0;
  recordsCount: number = 0;
  evidenceStrength: string = '';
  aiAnalysis: string = '';
  isFallbackAnalysis: boolean = false;
  loadingAnalysis: boolean = false;
  selectedPersonOne: string = '';
  selectedPersonTwo: string = '';
  selectedRelationship: string = '';
  evidenceNotes: string = '';

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
        this.people = people;
        this.peopleCount = people.length;
        this.setFormDefaults();
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
        this.relationships = relationships;
        this.relationshipsCount = relationships.length;
        this.setFormDefaults();
        this.updateEvidenceStrength();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading relationships:', error);
      }
    });

    this.recordsService.getRecords().subscribe({
      next: (records: any[]) => {
        this.records = records;
        this.recordsCount = records.length;
        this.setFormDefaults();
        this.updateEvidenceStrength();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading records:', error);
      }
    });
  }

  setFormDefaults(): void {
    if (!this.selectedPersonOne && this.people[0]) {
      this.selectedPersonOne = this.people[0].name;
    }

    if (!this.selectedPersonTwo && this.people[1]) {
      this.selectedPersonTwo = this.people[1].name;
    }

    if (!this.selectedRelationship && this.relationships[0]) {
      this.selectedRelationship = this.relationships[0].name;
    }

    if (!this.evidenceNotes && this.records.length > 0) {
      this.evidenceNotes = this.records
        .map((record) => `${record.title}: ${record.description} (person: ${record.person})`)
        .join('\n');
    }
  }

  get canGenerateAnalysis(): boolean {
    return Boolean(
      this.selectedPersonOne &&
      this.selectedPersonTwo &&
      this.selectedPersonOne !== this.selectedPersonTwo &&
      this.selectedRelationship
    );
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
    if (!this.canGenerateAnalysis) {
      return;
    }

    this.loadingAnalysis = true;
    this.aiAnalysis = '';
    this.isFallbackAnalysis = false;

    const payload = {
      personOne: this.selectedPersonOne,
      personTwo: this.selectedPersonTwo,
      relationship: this.selectedRelationship,
      evidence: this.evidenceNotes || 'No supporting records have been entered.',
    };

    this.validationService.analyzeRelationship(payload).subscribe({
      next: (response: any) => {
        this.aiAnalysis = response.analysis;
        this.isFallbackAnalysis = response.fallback === true;
        this.loadingAnalysis = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('AI analysis error:', error);
        this.aiAnalysis = 'Unable to generate the analysis. Please confirm that the API is running and try again.';
        this.isFallbackAnalysis = false;
        this.loadingAnalysis = false;
        this.cdr.markForCheck();
      }
    });
  }
}
