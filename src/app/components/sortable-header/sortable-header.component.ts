import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnDefinition, SortDirection, SortSate } from '../sortable-header/ColumnDefinition';

@Component({
  selector: '[app-sortable-header]',
  templateUrl: './sortable-header.component.html',
  styleUrls: ['./sortable-header.component.css']
})
export class SortableHeaderComponent implements OnInit {
  
  @Input() columns!: ColumnDefinition[];
  @Input() state!: SortSate;
  @Output() stateChange: EventEmitter<SortSate> = new EventEmitter();


  constructor(){
  }

  ngOnInit(): void {
  }

  onColumnClick(column: ColumnDefinition){
    if(column.isSortable){
      let newSortDir: SortDirection = SortDirection.ASC;

      if(this.state.column.attributeName == column.attributeName){
        if(this.state.sortDirection == SortDirection.ASC){
          newSortDir = SortDirection.DESC
        }
      }

      this.UpdateState(column, newSortDir);
    }
  }

  UpdateState(colDef: ColumnDefinition, sortDir: SortDirection){
    this.state = new SortSate(colDef, sortDir);
    this.stateChange.emit(this.state);
  }

  isAscending(dir: SortDirection){
    return dir === SortDirection.ASC 
  }

  isDescending(dir: SortDirection){
    return dir === SortDirection.DESC 
  }
}
