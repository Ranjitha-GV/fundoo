import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { HttpService } from '../../core/services/http/http.service';
import { environment } from '../../../environments/environment';
import { SearchService } from '../../core/services/data/search.service';

@Component({
    selector: 'app-crop-image',
    templateUrl: './crop-image.component.html',
    styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {
    public croppedImage: any = '';
    imageChangedEvent: any = '';
    constructor(
        public dialogRefPic: MatDialogRef<FundooNotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private httpService: HttpService,
        private dataService: SearchService) { }

    ngOnInit() {
    }
    imageCropped(event: any) {
        this.croppedImage = event.file;
    }
    public image2 = localStorage.getItem('imageUrl');
    img = environment.apiUrl + this.image2;
    onUpload() {
        var token = localStorage.getItem('token');
        const uploadData = new FormData();
        uploadData.append('file', this.croppedImage);
        this.httpService.httpAddImage('/user/uploadProfileImage', uploadData, token).subscribe(res => {
            this.img = environment.apiUrl + res['status'].imageUrl;
            localStorage.setItem("imageUrl", res['status'].imageUrl);
            this.dialogRefPic.close()
            this.dataService.changeMsg(true);
        }, error => {
        })
    }
}