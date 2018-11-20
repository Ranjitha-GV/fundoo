import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { environment } from '../../../environments/environment';
import { SearchService } from '../../core/services/data/search.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
    selector: 'app-crop-image',
    templateUrl: './crop-image.component.html',
    styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {
    private croppedImage = '';
    private image2 = localStorage.getItem('imageUrl');
    private img = environment.apiUrl + this.image2;
    constructor(
        public dialogRefPic: MatDialogRef<FundooNotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public httpService: UsersService,
        public dataService: SearchService) { }

    ngOnInit() {
    }
/**Emitting event for image crop */
    imageCropped(event: any) {
        this.croppedImage = event.file;
    }
   
/**Hitting API to upload profile image */
    onUpload() {
        const uploadData = new FormData();
        uploadData.append('file', this.croppedImage);
        this.httpService.httpAddImage(uploadData).subscribe(res => {
            this.img = environment.apiUrl + res['status'].imageUrl;
            localStorage.setItem("imageUrl", res['status'].imageUrl);
            this.dialogRefPic.close()
            this.dataService.changeMsg(true);
        }, error => {
        })
    }
}