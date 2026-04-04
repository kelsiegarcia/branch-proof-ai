import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecordsService } from '../../services/records';

@Component({
  selector: 'app-records',
  templateUrl: './records.html',
  styleUrl: './records.css',
  standalone: false
})
export class Records implements OnInit {
  records: any[] = [];
  newRecordTitle: string = '';
  newRecordDescription: string = '';
  newRecordPerson: string = '';

  editingRecordId: string | null = null;
  editRecordTitle: string = '';
  editRecordDescription: string = '';
  editRecordPerson: string = '';

  constructor(
    private recordsService: RecordsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Records ngOnInit fired');
    this.loadRecords();
  }

  loadRecords(): void {
    console.log('loadRecords called');

    this.recordsService.getRecords().subscribe({
      next: (data: any[]) => {
        console.log('Records loaded:', data);
        this.records = data;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading records:', error);
      }
    });
  }

  addRecord(): void {
    if (
      !this.newRecordTitle.trim() ||
      !this.newRecordDescription.trim() ||
      !this.newRecordPerson.trim()) return;

    const newRecord = {
      title: this.newRecordTitle,
      description: this.newRecordDescription,
      person: this.newRecordPerson
    };

    this.recordsService.addRecord(newRecord).subscribe({
      next: () => {
        this.newRecordTitle = '';
        this.newRecordDescription = '';
        this.newRecordPerson = '';
        this.loadRecords();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error adding record:', error);
      }
    });
  }

  deleteRecord(id: string): void {
    this.recordsService.deleteRecord(id).subscribe({
      next: () => {
        this.loadRecords();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error deleting record:', error);
      }
    });
  }

  startEdit(record: any): void {
    this.editingRecordId = record._id;
    this.editRecordTitle = record.title;
    this.editRecordDescription = record.description;
    this.editRecordPerson = record.person;
  }

  cancelEdit() {
    this.editingRecordId = null;
    this.editRecordTitle = '';
    this.editRecordDescription = '';
    this.editRecordPerson = '';
  }

  saveEdit(id: string) {
    if (
      !this.editRecordTitle.trim() ||
      !this.editRecordDescription.trim() ||
      !this.editRecordPerson.trim()
    ) return;

    const updatedRecord = {
      title: this.editRecordTitle,
      description: this.editRecordDescription,
      person: this.editRecordPerson
    };

    this.recordsService.updateRecord(id, updatedRecord).subscribe({
      next: () => {
        this.editingRecordId = null;
        this.editRecordTitle = '';
        this.editRecordDescription = '';
        this.editRecordPerson = '';
        this.loadRecords();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error updating Record:', error);
      }
    });
  }
}