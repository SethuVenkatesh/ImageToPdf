import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {
  @Input()
  imageDetail!: any;
  @Input()
  imageDetailsLength!: number;
  @Output() arrayLengthChange: EventEmitter<number> = new EventEmitter();


  constructor(){

  }
  ngOnInit(){
  }
  onDelete(){
    this.imageDetail.isSelected = !this.imageDetail.isSelected;
    let newLength=this.imageDetailsLength;
    newLength--;
    this.arrayLengthChange.emit(newLength);
  }

  onRotate(){
    let rotateIndex = this.imageDetail.rotate
    if(rotateIndex == 3){
      rotateIndex=0;
    }
    else{
      rotateIndex++;
    }
    this.imageDetail.rotate = rotateIndex;
  }
  
}
