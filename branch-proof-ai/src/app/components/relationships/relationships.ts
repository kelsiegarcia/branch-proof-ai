import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RelationshipsService } from '../../services/relationships';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationships.html',
  styleUrl: './relationships.css',
  standalone: false
})
export class Relationships implements OnInit {
  relationships: any[] = [];
  newRelationshipName: string = '';

  editingRelationshipId: string | null = null;
  editRelationshipName: string = '';

  constructor(
    private relationshipService: RelationshipsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Relationship ngOnInit fired');
    this.loadRelationships();
  }

  loadRelationships(): void {
    console.log('loadRelationships called');

    this.relationshipService.getRelationships().subscribe({
      next: (data) => {
        console.log('Relationships loaded:', data);
        this.relationships = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading relationships:', error);
      }
    });
  }

  addRelationship(): void {
    if (!this.newRelationshipName.trim()) return;

    const newRelationship = {
      name: this.newRelationshipName
    };

    this.relationshipService.addRelationship(newRelationship).subscribe({
      next: () => {
        this.newRelationshipName = '';
        this.loadRelationships();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error adding relationship:', error);
      }
    });
  }

  deleteRelationship(id: string): void {
    this.relationshipService.deleteRelationship(id).subscribe({
      next: () => {
        this.loadRelationships();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error deleting relationship:', error);
      }
    });
  }

  startEdit(relationship: any): void {
    this.editingRelationshipId = relationship.id;
    this.editRelationshipName = relationship.name;
  }

  cancelEdit(): void {
    this.editingRelationshipId = null;
    this.editRelationshipName = '';
  }

  saveEdit(id: string): void {
    if (!this.editRelationshipName.trim()) return;

    const updatedRelationship = {
      name: this.editRelationshipName
    };

    this.relationshipService.updateRelationship(id, updatedRelationship).subscribe({
      next: () => {
        this.editingRelationshipId = null;
        this.editRelationshipName = '';
        this.loadRelationships();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error updating relationship:', error);
      }
    });
  }
}