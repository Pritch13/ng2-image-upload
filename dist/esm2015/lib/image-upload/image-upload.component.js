/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileHolder } from '../file-holder';
import { ImageUploadService } from '../image-upload.service';
export class ImageUploadComponent {
    /**
     * @param {?} imageService
     */
    constructor(imageService) {
        this.imageService = imageService;
        this.files = [];
        this.fileCounter = 0;
        this.fileOver = false;
        this.showFileTooLargeMessage = false;
        this.beforeUpload = (/**
         * @param {?} metadata
         * @return {?}
         */
        metadata => metadata);
        this.buttonCaption = 'Select Images';
        this.disabled = false;
        this.cssClass = 'img-ul';
        this.clearButtonCaption = 'Clear';
        this.dropBoxMessage = 'Drop your images here!';
        this.max = 100;
        this.preview = true;
        this.withCredentials = false;
        this.uploadedFiles = [];
        this.removed = new EventEmitter();
        this.uploadStateChanged = new EventEmitter();
        this.uploadFinished = new EventEmitter();
        this.previewClicked = new EventEmitter();
        this.pendingFilesCounter = 0;
        this.onFileOver = (/**
         * @param {?} isOver
         * @return {?}
         */
        (isOver) => this.fileOver = isOver);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.fileTooLargeMessage) {
            this.fileTooLargeMessage = 'An image was too large and was not uploaded.' + (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'KiB.' : '');
        }
        this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map((/**
         * @param {?} ext
         * @return {?}
         */
        (ext) => 'image/' + ext)) : ['image/*'];
    }
    /**
     * @return {?}
     */
    deleteAll() {
        this.files.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => this.removed.emit(f)));
        this.files = [];
        this.fileCounter = 0;
        if (this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
    }
    /**
     * @param {?} file
     * @return {?}
     */
    deleteFile(file) {
        /** @type {?} */
        const index = this.files.indexOf(file);
        this.files.splice(index, 1);
        this.fileCounter--;
        if (this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
        this.removed.emit(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    previewFileClicked(file) {
        this.previewClicked.emit(file);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.uploadedFiles && changes.uploadedFiles.currentValue.length > 0) {
            this.processUploadedFiles();
        }
    }
    /**
     * @param {?} files
     * @return {?}
     */
    onFileChange(files) {
        if (this.disabled)
            return;
        /** @type {?} */
        const remainingSlots = this.max - this.fileCounter;
        /** @type {?} */
        const filesToUploadNum = files.length > remainingSlots ? remainingSlots : files.length;
        if (this.url && filesToUploadNum !== 0) {
            this.uploadStateChanged.emit(true);
        }
        this.fileCounter += filesToUploadNum;
        this.showFileTooLargeMessage = false;
        this.uploadFiles(files, filesToUploadNum);
    }
    /**
     * @private
     * @param {?} response
     * @param {?} fileHolder
     * @return {?}
     */
    onResponse(response, fileHolder) {
        fileHolder.serverResponse = { status: response.status, response };
        fileHolder.pending = false;
        this.uploadFinished.emit(fileHolder);
        if (--this.pendingFilesCounter === 0) {
            this.uploadStateChanged.emit(false);
        }
    }
    /**
     * @private
     * @return {?}
     */
    processUploadedFiles() {
        for (let i = 0; i < this.uploadedFiles.length; i++) {
            /** @type {?} */
            const data = this.uploadedFiles[i];
            /** @type {?} */
            let fileBlob;
            /** @type {?} */
            let file;
            /** @type {?} */
            let fileUrl;
            if (data instanceof Object) {
                fileUrl = data.url;
                fileBlob = (data.blob) ? data.blob : new Blob([data]);
                file = new File([fileBlob], data.fileName);
            }
            else {
                fileUrl = data;
                fileBlob = new Blob([fileUrl]);
                file = new File([fileBlob], fileUrl);
            }
            this.files.push(new FileHolder(fileUrl, file));
        }
    }
    /**
     * @private
     * @param {?} files
     * @param {?} filesToUploadNum
     * @return {?}
     */
    uploadFiles(files, filesToUploadNum) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < filesToUploadNum; i++) {
                /** @type {?} */
                const file = files[i];
                if (this.maxFileSize && file.size > this.maxFileSize) {
                    this.fileCounter--;
                    this.inputElement.nativeElement.value = '';
                    this.showFileTooLargeMessage = true;
                    this.uploadStateChanged.emit(false);
                    continue;
                }
                /** @type {?} */
                const beforeUploadResult = yield this.beforeUpload({ file, url: this.url, abort: false });
                if (beforeUploadResult.abort) {
                    this.fileCounter--;
                    this.inputElement.nativeElement.value = '';
                    continue;
                }
                /** @type {?} */
                const img = (/** @type {?} */ (document.createElement('img')));
                img.src = window.URL.createObjectURL(beforeUploadResult.file);
                /** @type {?} */
                const reader = new FileReader();
                reader.addEventListener('load', (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    /** @type {?} */
                    const fileHolder = new FileHolder(event.target.result, beforeUploadResult.file);
                    this.files.push(fileHolder);
                    this.uploadSingleFile(fileHolder, beforeUploadResult.url, beforeUploadResult.formData);
                }), false);
                reader.readAsDataURL(beforeUploadResult.file);
            }
        });
    }
    /**
     * @private
     * @param {?} fileHolder
     * @param {?=} url
     * @param {?=} customForm
     * @return {?}
     */
    uploadSingleFile(fileHolder, url = this.url, customForm) {
        if (url) {
            this.pendingFilesCounter++;
            fileHolder.pending = true;
            this.imageService
                .uploadImage(url, fileHolder.file, this.headers, this.partName, customForm, this.withCredentials)
                .subscribe((/**
             * @param {?} response
             * @return {?}
             */
            response => this.onResponse(response, fileHolder)), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                this.onResponse(error, fileHolder);
                this.deleteFile(fileHolder);
            }));
        }
        else {
            this.uploadFinished.emit(fileHolder);
        }
    }
}
ImageUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'image-upload',
                template: "<div\n     fileDrop\n     [accept]=\"supportedExtensions\"\n     (fileOver)=\"onFileOver($event)\"\n     (fileDrop)=\"onFileChange($event)\"\n     [ngClass]=\"cssClass\"\n     [ngClass]=\"{'img-ul-file-is-over': fileOver}\"     \n     [ngStyle]=\"style?.layout\"\n>\n  <div class=\"img-ul-file-upload img-ul-hr-inline-group\">    \n    <label *ngIf=\"fileCounter != max\"\n      class=\"img-ul-upload img-ul-button\" \n      [ngStyle]=\"style?.selectButton\"\n      [ngClass]=\"{'img-ul-disabled': disabled}\">\n      <span [innerText]=\"buttonCaption\"></span>\n      <input\n        type=\"file\"\n        [disabled]=\"disabled\"\n        [accept]=\"supportedExtensions\"\n        [multiple]=\"max > 1\"\n        (change)=\"onFileChange(input.files)\"\n        #input>\n    </label>\n    <button *ngIf=\"fileCounter > 0\"\n      [disabled]=\"disabled\"\n      class=\"img-ul-clear img-ul-button\" \n      (click)=\"deleteAll()\" \n      [ngStyle]=\"style?.clearButton\"\n      [innerText]=\"clearButtonCaption\">\n    </button>\n    <div class=\"img-ul-drag-box-msg\" [innerText]=\"dropBoxMessage\"></div>\n  </div>\n\n  <p class=\"img-ul-file-too-large\" *ngIf=\"showFileTooLargeMessage\" [innerText]=\"fileTooLargeMessage\"></p>\n\n  <div *ngIf=\"preview\" class=\"img-ul-container img-ul-hr-inline-group\" [ngStyle]=\"style?.previewPanel\">\n    <div\n      class=\"img-ul-image\"\n      *ngFor=\"let file of files\"\n      (click)=\"previewFileClicked(file)\"\n      [ngStyle]=\"{'background-image': 'url('+ file.src +')'}\"\n    >\n      <div *ngIf=\"file.pending\" class=\"img-ul-loading-overlay\">\n        <div class=\"img-ul-spinning-circle\"></div>\n      </div>\n      <div *ngIf=\"!file.pending\" \n        [ngClass]=\"{'img-ul-disabled': disabled}\" \n        class=\"img-ul-x-mark\" \n        (click)=\"deleteFile(file)\">\n        <span class=\"img-ul-close\"></span>\n      </div>\n    </div>\n  </div>\n</div>",
                styles: [".img-ul{--active-color:#3C9;--common-radius:3px;background-color:#f8f8f8;border-radius:var(--common-radius);border:1px dashed #d0d0d0;font-family:sans-serif;position:relative;color:#9b9b9b}.img-ul-file-is-over{border:var(--active-color) solid}.img-ul-hr-inline-group:after{clear:both;content:\"\";display:table}.img-ul-file-upload{padding:16px}.img-ul-drag-box-msg{display:inline-block;font-weight:600;margin-left:12px;padding-top:14px}label.img-ul-button input[type=file]{display:none;position:fixed;top:-99999px}.img-ul-clear{background-color:red}.img-ul-clear:disabled{background-color:#ff6464;cursor:default}.img-ul-upload{background-color:var(--active-color)}.img-ul-button{-moz-box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);-webkit-box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);border:none;box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);color:#fff;cursor:pointer;display:inline-block;float:left;font-size:1.25em;font-weight:500;padding:10px;text-transform:uppercase}.img-ul-button:active span{display:block;position:relative;top:1px}.img-ul-container{background-color:#fdfdfd;padding:0 10px}.img-ul-image{background:center center/contain no-repeat;display:inline-block;float:left;height:86px;margin:6px;position:relative;width:86px}.img-ul-x-mark{background-color:#000;border-radius:2px;color:#fff;cursor:pointer;float:right;height:20px;margin:2px;opacity:.7;text-align:center;width:20px}.img-ul-close{height:20px;opacity:.7;padding-right:3px;position:relative;width:20px}.img-ul-x-mark:hover .img-ul-close{opacity:1}.img-ul-close:after,.img-ul-close:before{background-color:#fff;border-radius:2px;content:'';height:15px;position:absolute;top:0;width:2px}.img-ul-close:before{transform:rotate(45deg)}.img-ul-close:after{transform:rotate(-45deg)}.img-ul-x-mark.img-ul-disabled{display:none}.img-ul-loading-overlay{background-color:#000;bottom:0;left:0;opacity:.7;position:absolute;right:0;top:0}.img-ul-spinning-circle{height:30px;width:30px;margin:auto;position:absolute;top:0;left:0;bottom:0;right:0;border-radius:50%;border:3px solid rgba(255,255,255,0);border-top:3px solid #fff;border-right:3px solid #fff;-webkit-animation:2s cubic-bezier(.085,.625,.855,.36) infinite spinner;animation:2s cubic-bezier(.085,.625,.855,.36) infinite spinner}.img-ul-file-too-large{color:red;padding:0 15px}.img-ul-upload.img-ul-disabled{background-color:#86e9c9;cursor:default}.img-ul-upload.img-ul-disabled:active span{top:0}@-webkit-keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}"]
            }] }
];
/** @nocollapse */
ImageUploadComponent.ctorParameters = () => [
    { type: ImageUploadService }
];
ImageUploadComponent.propDecorators = {
    beforeUpload: [{ type: Input }],
    buttonCaption: [{ type: Input }],
    disabled: [{ type: Input }],
    cssClass: [{ type: Input, args: ['class',] }],
    clearButtonCaption: [{ type: Input }],
    dropBoxMessage: [{ type: Input }],
    fileTooLargeMessage: [{ type: Input }],
    headers: [{ type: Input }],
    max: [{ type: Input }],
    maxFileSize: [{ type: Input }],
    preview: [{ type: Input }],
    partName: [{ type: Input }],
    style: [{ type: Input }],
    supportedExtensions: [{ type: Input, args: ['extensions',] }],
    url: [{ type: Input }],
    withCredentials: [{ type: Input }],
    uploadedFiles: [{ type: Input }],
    removed: [{ type: Output }],
    uploadStateChanged: [{ type: Output }],
    uploadFinished: [{ type: Output }],
    previewClicked: [{ type: Output }],
    inputElement: [{ type: ViewChild, args: ['input',] }]
};
if (false) {
    /** @type {?} */
    ImageUploadComponent.prototype.files;
    /** @type {?} */
    ImageUploadComponent.prototype.fileCounter;
    /** @type {?} */
    ImageUploadComponent.prototype.fileOver;
    /** @type {?} */
    ImageUploadComponent.prototype.showFileTooLargeMessage;
    /** @type {?} */
    ImageUploadComponent.prototype.beforeUpload;
    /** @type {?} */
    ImageUploadComponent.prototype.buttonCaption;
    /** @type {?} */
    ImageUploadComponent.prototype.disabled;
    /** @type {?} */
    ImageUploadComponent.prototype.cssClass;
    /** @type {?} */
    ImageUploadComponent.prototype.clearButtonCaption;
    /** @type {?} */
    ImageUploadComponent.prototype.dropBoxMessage;
    /** @type {?} */
    ImageUploadComponent.prototype.fileTooLargeMessage;
    /** @type {?} */
    ImageUploadComponent.prototype.headers;
    /** @type {?} */
    ImageUploadComponent.prototype.max;
    /** @type {?} */
    ImageUploadComponent.prototype.maxFileSize;
    /** @type {?} */
    ImageUploadComponent.prototype.preview;
    /** @type {?} */
    ImageUploadComponent.prototype.partName;
    /** @type {?} */
    ImageUploadComponent.prototype.style;
    /** @type {?} */
    ImageUploadComponent.prototype.supportedExtensions;
    /** @type {?} */
    ImageUploadComponent.prototype.url;
    /** @type {?} */
    ImageUploadComponent.prototype.withCredentials;
    /** @type {?} */
    ImageUploadComponent.prototype.uploadedFiles;
    /** @type {?} */
    ImageUploadComponent.prototype.removed;
    /** @type {?} */
    ImageUploadComponent.prototype.uploadStateChanged;
    /** @type {?} */
    ImageUploadComponent.prototype.uploadFinished;
    /** @type {?} */
    ImageUploadComponent.prototype.previewClicked;
    /**
     * @type {?}
     * @private
     */
    ImageUploadComponent.prototype.inputElement;
    /**
     * @type {?}
     * @private
     */
    ImageUploadComponent.prototype.pendingFilesCounter;
    /** @type {?} */
    ImageUploadComponent.prototype.onFileOver;
    /**
     * @type {?}
     * @private
     */
    ImageUploadComponent.prototype.imageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWltYWdlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS11cGxvYWQvaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUzdELE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFnQy9CLFlBQW9CLFlBQWdDO1FBQWhDLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQS9CcEQsVUFBSyxHQUFpQixFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQiw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFFdkIsaUJBQVk7Ozs7UUFBMkUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUM7UUFDNUcsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNWLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFDM0IsdUJBQWtCLEdBQUcsT0FBTyxDQUFDO1FBQzdCLG1CQUFjLEdBQUcsd0JBQXdCLENBQUM7UUFHMUMsUUFBRyxHQUFHLEdBQUcsQ0FBQztRQUVWLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFLZixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUFxRSxFQUFFLENBQUM7UUFDcEYsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFDekMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FB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dEIsbURBQW1EOztJQUNuRCxtQ0FBcUI7O0lBQ3JCLCtDQUFpQzs7SUFDakMsNkNBQThGOztJQUM5Rix1Q0FBbUQ7O0lBQ25ELGtEQUEyRDs7SUFDM0QsOENBQTBEOztJQUMxRCw4Q0FBMEQ7Ozs7O0lBRTFELDRDQUNpQzs7Ozs7SUFDakMsbURBQWdDOztJQXdEaEMsMENBQWdEOzs7OztJQXREcEMsNENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWxlSG9sZGVyIH0gZnJvbSAnLi4vZmlsZS1ob2xkZXInO1xuaW1wb3J0IHsgSW1hZ2VVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vaW1hZ2UtdXBsb2FkLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9zdHlsZSc7XG5pbXBvcnQgeyBVcGxvYWRNZXRhZGF0YSB9IGZyb20gJy4uL3VwbG9hZC1tZXRhZGF0YSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ltYWdlLXVwbG9hZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbWFnZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbWFnZS11cGxvYWQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBmaWxlczogRmlsZUhvbGRlcltdID0gW107XG4gIGZpbGVDb3VudGVyID0gMDtcbiAgZmlsZU92ZXIgPSBmYWxzZTtcbiAgc2hvd0ZpbGVUb29MYXJnZU1lc3NhZ2UgPSBmYWxzZTtcblxuICBASW5wdXQoKSBiZWZvcmVVcGxvYWQ6IChtZXRhZGF0YTogVXBsb2FkTWV0YWRhdGEpID0+IFVwbG9hZE1ldGFkYXRhIHwgUHJvbWlzZTxVcGxvYWRNZXRhZGF0YT4gPSBtZXRhZGF0YSA9PiBtZXRhZGF0YTtcbiAgQElucHV0KCkgYnV0dG9uQ2FwdGlvbiA9ICdTZWxlY3QgSW1hZ2VzJztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCdjbGFzcycpIGNzc0NsYXNzID0gJ2ltZy11bCc7XG4gIEBJbnB1dCgpIGNsZWFyQnV0dG9uQ2FwdGlvbiA9ICdDbGVhcic7XG4gIEBJbnB1dCgpIGRyb3BCb3hNZXNzYWdlID0gJ0Ryb3AgeW91ciBpbWFnZXMgaGVyZSEnO1xuICBASW5wdXQoKSBmaWxlVG9vTGFyZ2VNZXNzYWdlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcnM6IEh0dHBIZWFkZXJzIHwgeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcbiAgQElucHV0KCkgbWF4ID0gMTAwO1xuICBASW5wdXQoKSBtYXhGaWxlU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBwcmV2aWV3ID0gdHJ1ZTtcbiAgQElucHV0KCkgcGFydE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGU6IFN0eWxlO1xuICBASW5wdXQoJ2V4dGVuc2lvbnMnKSBzdXBwb3J0ZWRFeHRlbnNpb25zOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICBASW5wdXQoKSB1cGxvYWRlZEZpbGVzOiBzdHJpbmdbXSB8IEFycmF5PHsgdXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGJsb2I/OiBCbG9iIH0+ID0gW107XG4gIEBPdXRwdXQoKSByZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlSG9sZGVyPigpO1xuICBAT3V0cHV0KCkgdXBsb2FkU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgdXBsb2FkRmluaXNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVIb2xkZXI+KCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUhvbGRlcj4oKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dCcpXG4gIHByaXZhdGUgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcml2YXRlIHBlbmRpbmdGaWxlc0NvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW1hZ2VTZXJ2aWNlOiBJbWFnZVVwbG9hZFNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5maWxlVG9vTGFyZ2VNZXNzYWdlKSB7XG4gICAgICB0aGlzLmZpbGVUb29MYXJnZU1lc3NhZ2UgPSAnQW4gaW1hZ2Ugd2FzIHRvbyBsYXJnZSBhbmQgd2FzIG5vdCB1cGxvYWRlZC4nICsgKHRoaXMubWF4RmlsZVNpemUgPyAoJyBUaGUgbWF4aW11bSBmaWxlIHNpemUgaXMgJyArIHRoaXMubWF4RmlsZVNpemUgLyAxMDI0KSArICdLaUIuJyA6ICcnKTtcbiAgICB9XG4gICAgdGhpcy5zdXBwb3J0ZWRFeHRlbnNpb25zID0gdGhpcy5zdXBwb3J0ZWRFeHRlbnNpb25zID8gdGhpcy5zdXBwb3J0ZWRFeHRlbnNpb25zLm1hcCgoZXh0KSA9PiAnaW1hZ2UvJyArIGV4dCkgOiBbJ2ltYWdlLyonXTtcbiAgfVxuXG4gIGRlbGV0ZUFsbCgpIHtcbiAgICB0aGlzLmZpbGVzLmZvckVhY2goZiA9PiB0aGlzLnJlbW92ZWQuZW1pdChmKSk7XG4gICAgdGhpcy5maWxlcyA9IFtdO1xuICAgIHRoaXMuZmlsZUNvdW50ZXIgPSAwO1xuICAgIGlmICh0aGlzLmlucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUZpbGUoZmlsZTogRmlsZUhvbGRlcik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgIHRoaXMuZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmZpbGVDb3VudGVyLS07XG4gICAgaWYgKHRoaXMuaW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlZC5lbWl0KGZpbGUpO1xuICB9XG5cbiAgcHJldmlld0ZpbGVDbGlja2VkKGZpbGU6IEZpbGVIb2xkZXIpIHtcbiAgICB0aGlzLnByZXZpZXdDbGlja2VkLmVtaXQoZmlsZSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudXBsb2FkZWRGaWxlcyAmJiBjaGFuZ2VzLnVwbG9hZGVkRmlsZXMuY3VycmVudFZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucHJvY2Vzc1VwbG9hZGVkRmlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbGVDaGFuZ2UoZmlsZXM6IEZpbGVMaXN0KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHJlbWFpbmluZ1Nsb3RzID0gdGhpcy5tYXggLSB0aGlzLmZpbGVDb3VudGVyO1xuICAgIGNvbnN0IGZpbGVzVG9VcGxvYWROdW0gPSBmaWxlcy5sZW5ndGggPiByZW1haW5pbmdTbG90cyA/IHJlbWFpbmluZ1Nsb3RzIDogZmlsZXMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMudXJsICYmIGZpbGVzVG9VcGxvYWROdW0gIT09IDApIHtcbiAgICAgIHRoaXMudXBsb2FkU3RhdGVDaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5maWxlQ291bnRlciArPSBmaWxlc1RvVXBsb2FkTnVtO1xuICAgIHRoaXMuc2hvd0ZpbGVUb29MYXJnZU1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZEZpbGVzKGZpbGVzLCBmaWxlc1RvVXBsb2FkTnVtKTtcbiAgfVxuXG4gIG9uRmlsZU92ZXIgPSAoaXNPdmVyKSA9PiB0aGlzLmZpbGVPdmVyID0gaXNPdmVyO1xuXG4gIHByaXZhdGUgb25SZXNwb25zZShyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4sIGZpbGVIb2xkZXI6IEZpbGVIb2xkZXIpIHtcbiAgICBmaWxlSG9sZGVyLnNlcnZlclJlc3BvbnNlID0geyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UgfTtcbiAgICBmaWxlSG9sZGVyLnBlbmRpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMudXBsb2FkRmluaXNoZWQuZW1pdChmaWxlSG9sZGVyKTtcblxuICAgIGlmICgtLXRoaXMucGVuZGluZ0ZpbGVzQ291bnRlciA9PT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRTdGF0ZUNoYW5nZWQuZW1pdChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzVXBsb2FkZWRGaWxlcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXBsb2FkZWRGaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZGF0YTogYW55ID0gdGhpcy51cGxvYWRlZEZpbGVzW2ldO1xuXG4gICAgICBsZXQgZmlsZUJsb2I6IEJsb2IsXG4gICAgICAgIGZpbGU6IEZpbGUsXG4gICAgICAgIGZpbGVVcmw6IHN0cmluZztcblxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgZmlsZVVybCA9IGRhdGEudXJsO1xuICAgICAgICBmaWxlQmxvYiA9IChkYXRhLmJsb2IpID8gZGF0YS5ibG9iIDogbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgZmlsZSA9IG5ldyBGaWxlKFtmaWxlQmxvYl0sIGRhdGEuZmlsZU5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZVVybCA9IGRhdGE7XG4gICAgICAgIGZpbGVCbG9iID0gbmV3IEJsb2IoW2ZpbGVVcmxdKTtcbiAgICAgICAgZmlsZSA9IG5ldyBGaWxlKFtmaWxlQmxvYl0sIGZpbGVVcmwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpbGVzLnB1c2gobmV3IEZpbGVIb2xkZXIoZmlsZVVybCwgZmlsZSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXBsb2FkRmlsZXMoZmlsZXM6IEZpbGVMaXN0LCBmaWxlc1RvVXBsb2FkTnVtOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9VcGxvYWROdW07IGkrKykge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzW2ldO1xuXG4gICAgICBpZiAodGhpcy5tYXhGaWxlU2l6ZSAmJiBmaWxlLnNpemUgPiB0aGlzLm1heEZpbGVTaXplKSB7XG4gICAgICAgIHRoaXMuZmlsZUNvdW50ZXItLTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLnNob3dGaWxlVG9vTGFyZ2VNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGxvYWRTdGF0ZUNoYW5nZWQuZW1pdChmYWxzZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiZWZvcmVVcGxvYWRSZXN1bHQ6IFVwbG9hZE1ldGFkYXRhID0gYXdhaXQgdGhpcy5iZWZvcmVVcGxvYWQoeyBmaWxlLCB1cmw6IHRoaXMudXJsLCBhYm9ydDogZmFsc2UgfSk7XG5cbiAgICAgIGlmIChiZWZvcmVVcGxvYWRSZXN1bHQuYWJvcnQpIHtcbiAgICAgICAgdGhpcy5maWxlQ291bnRlci0tO1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgaW1nLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJlZm9yZVVwbG9hZFJlc3VsdC5maWxlKTtcblxuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUhvbGRlcjogRmlsZUhvbGRlciA9IG5ldyBGaWxlSG9sZGVyKGV2ZW50LnRhcmdldC5yZXN1bHQsIGJlZm9yZVVwbG9hZFJlc3VsdC5maWxlKTtcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVIb2xkZXIpO1xuICAgICAgICB0aGlzLnVwbG9hZFNpbmdsZUZpbGUoZmlsZUhvbGRlciwgYmVmb3JlVXBsb2FkUmVzdWx0LnVybCwgYmVmb3JlVXBsb2FkUmVzdWx0LmZvcm1EYXRhKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJlZm9yZVVwbG9hZFJlc3VsdC5maWxlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwbG9hZFNpbmdsZUZpbGUoZmlsZUhvbGRlcjogRmlsZUhvbGRlciwgdXJsID0gdGhpcy51cmwsIGN1c3RvbUZvcm0/OiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHRoaXMucGVuZGluZ0ZpbGVzQ291bnRlcisrO1xuICAgICAgZmlsZUhvbGRlci5wZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgdGhpcy5pbWFnZVNlcnZpY2VcbiAgICAgICAgLnVwbG9hZEltYWdlKHVybCwgZmlsZUhvbGRlci5maWxlLCB0aGlzLmhlYWRlcnMsIHRoaXMucGFydE5hbWUsIGN1c3RvbUZvcm0sIHRoaXMud2l0aENyZWRlbnRpYWxzKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIHJlc3BvbnNlID0+IHRoaXMub25SZXNwb25zZShyZXNwb25zZSwgZmlsZUhvbGRlciksXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblJlc3BvbnNlKGVycm9yLCBmaWxlSG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRmlsZShmaWxlSG9sZGVyKTtcbiAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGxvYWRGaW5pc2hlZC5lbWl0KGZpbGVIb2xkZXIpO1xuICAgIH1cbiAgfVxufVxuIl19