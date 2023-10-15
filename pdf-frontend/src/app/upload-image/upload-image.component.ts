import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

type ImageDetails = { 
  name: string;
  url: string;
  isSelected:boolean;
  rotate:number;
};

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  imageDetailsLength!: number;
  imageDetails: ImageDetails[] = [];
  @ViewChild('fileName')
  fileName!: ElementRef;

  ngOnInit(){
    this.imageDetailsLength=0

  }

  updateArrayLength(newLength: number) {
    // Update the array's length based on the value emitted by the child component
    this.imageDetailsLength = newLength;
  }

  onImageChange(event : Event){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;  
    let currLen = this.imageDetailsLength; 
    for(let fileIndex=0 ;fileIndex < files.length ;fileIndex++){
      const file=files[fileIndex]
      const imageUrl = URL.createObjectURL(file);
      const newImageDetails: ImageDetails = {
        name:file.name,
        url:imageUrl,
        isSelected:true,
        rotate:0,
      };
      this.imageDetails?.push(newImageDetails);
      currLen++;
      
    } 
    this.imageDetailsLength=currLen;
    
  }

  createPDF() {
    console.log("createPdf")
    const pdf = new jsPDF();
    let imageIndex=0;
    let pdfName=this.fileName.nativeElement.value;
    if(pdfName.trim().length == 0){
      alert("File Name cannot be empty");
      return;
    }
    for (const img of this.imageDetails) {
      if(img.isSelected){
        const image = new Image();
        image.src = img.url;
        const orientation = image.width > image.height ? 'landscape' : 'portrait';
  
        const imgWidth = 190; // Adjust as needed
        const imgHeight = 270;
        const rotation = orientation === 'landscape' ? 0 : -90;
        if(orientation == 'landscape'){
          pdf.addImage(img.url, 'JPEG', 10, 10, imgWidth, imgHeight,'','FAST',rotation); // Swap width and height for portrait
        }
        else{
          pdf.addImage(img.url, 'JPEG', 10, -180, imgHeight, imgWidth,'','FAST',rotation); // Swap width and height for portrait
        }
        imageIndex++;
        if(imageIndex != this.imageDetailsLength){
          pdf.addPage();
        }
      }
    }
    pdf.save(pdfName+'.pdf');
  }
}
