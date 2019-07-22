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
                template: "<div fileDrop\n     [accept]=\"supportedExtensions\"\n     (fileOver)=\"onFileOver($event)\"\n     (fileDrop)=\"onFileChange($event)\"\n     [ngClass]=\"cssClass\"\n     [ngClass]=\"{'img-ul-file-is-over': fileOver}\"\n     [ngStyle]=\"style?.layout\">\n  <div class=\"img-ul-file-upload img-ul-hr-inline-group\">\n    <label *ngIf=\"fileCounter != max\"\n           class=\"img-ul-upload img-ul-button\"\n           [ngStyle]=\"style?.selectButton\"\n           [ngClass]=\"{'img-ul-disabled': disabled}\">\n      <span [innerText]=\"buttonCaption\"></span>\n      <input type=\"file\"\n             [disabled]=\"disabled\"\n             [accept]=\"supportedExtensions\"\n             [multiple]=\"max > 1\"\n             (change)=\"onFileChange(input.files)\"\n             #input>\n    </label>\n    <button *ngIf=\"fileCounter > 0\"\n            [disabled]=\"disabled\"\n            class=\"img-ul-clear img-ul-button\"\n            (click)=\"deleteAll()\"\n            [ngStyle]=\"style?.clearButton\"\n            [innerText]=\"clearButtonCaption\">\n    </button>\n    <label *ngIf=\"fileCounter != max\"\n           class=\"img-ul-drag-box-msg\">\n      <span [innerText]=\"dropBoxMessage\"></span>\n      <input type=\"file\"\n             [disabled]=\"disabled\"\n             [accept]=\"supportedExtensions\"\n             [multiple]=\"max > 1\"\n             (change)=\"onFileChange(input.files)\"\n             #input>\n    </label>\n  </div>\n\n  <p class=\"img-ul-file-too-large\"\n     *ngIf=\"showFileTooLargeMessage\"\n     [innerText]=\"fileTooLargeMessage\"></p>\n\n  <div *ngIf=\"preview\"\n       class=\"img-ul-container img-ul-hr-inline-group\"\n       [ngStyle]=\"style?.previewPanel\">\n    <div class=\"img-ul-image\"\n         *ngFor=\"let file of files\"\n         (click)=\"previewFileClicked(file)\"\n         [ngStyle]=\"{'background-image': 'url('+ file.src +')'}\">\n      <div *ngIf=\"file.pending\"\n           class=\"img-ul-loading-overlay\">\n        <div class=\"img-ul-spinning-circle\"></div>\n      </div>\n      <div *ngIf=\"!file.pending\"\n           [ngClass]=\"{'img-ul-disabled': disabled}\"\n           class=\"img-ul-x-mark\"\n           (click)=\"deleteFile(file)\">\n        <span class=\"img-ul-close\"></span>\n      </div>\n    </div>\n  </div>\n</div>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2JiMnMtaW1hZ2UtdXBsb2FkLyIsInNvdXJjZXMiOlsibGliL2ltYWdlLXVwbG9hZC9pbWFnZS11cGxvYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFTN0QsTUFBTSxPQUFPLG9CQUFvQjs7OztJQWdDL0IsWUFBb0IsWUFBZ0M7UUFBaEMsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBL0JwRCxVQUFLLEdBQWlCLEVBQUUsQ0FBQztRQUN6QixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUV2QixpQkFBWTs7OztRQUEyRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQztRQUM1RyxrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ1YsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQix1QkFBa0IsR0FBRyxPQUFPLENBQUM7UUFDN0IsbUJBQWMsR0FBRyx3QkFBd0IsQ0FBQztRQUcxQyxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBRVYsWUFBTyxHQUFHLElBQUksQ0FBQztRQUtmLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGtCQUFhLEdBQXFFLEVBQUUsQ0FBQztRQUNwRixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUN6Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FB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REFBbUQ7O0lBQ25ELG1DQUFxQjs7SUFDckIsK0NBQWlDOztJQUNqQyw2Q0FBOEY7O0lBQzlGLHVDQUFtRDs7SUFDbkQsa0RBQTJEOztJQUMzRCw4Q0FBMEQ7O0lBQzFELDhDQUEwRDs7Ozs7SUFFMUQsNENBQ2lDOzs7OztJQUNqQyxtREFBZ0M7O0lBd0RoQywwQ0FBZ0Q7Ozs7O0lBdERwQyw0Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVIb2xkZXIgfSBmcm9tICcuLi9maWxlLWhvbGRlcic7XG5pbXBvcnQgeyBJbWFnZVVwbG9hZFNlcnZpY2UgfSBmcm9tICcuLi9pbWFnZS11cGxvYWQuc2VydmljZSc7XG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4uL3N0eWxlJztcbmltcG9ydCB7IFVwbG9hZE1ldGFkYXRhIH0gZnJvbSAnLi4vdXBsb2FkLW1ldGFkYXRhJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW1hZ2UtdXBsb2FkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ltYWdlLXVwbG9hZC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VVcGxvYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGZpbGVzOiBGaWxlSG9sZGVyW10gPSBbXTtcbiAgZmlsZUNvdW50ZXIgPSAwO1xuICBmaWxlT3ZlciA9IGZhbHNlO1xuICBzaG93RmlsZVRvb0xhcmdlTWVzc2FnZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGJlZm9yZVVwbG9hZDogKG1ldGFkYXRhOiBVcGxvYWRNZXRhZGF0YSkgPT4gVXBsb2FkTWV0YWRhdGEgfCBQcm9taXNlPFVwbG9hZE1ldGFkYXRhPiA9IG1ldGFkYXRhID0+IG1ldGFkYXRhO1xuICBASW5wdXQoKSBidXR0b25DYXB0aW9uID0gJ1NlbGVjdCBJbWFnZXMnO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoJ2NsYXNzJykgY3NzQ2xhc3MgPSAnaW1nLXVsJztcbiAgQElucHV0KCkgY2xlYXJCdXR0b25DYXB0aW9uID0gJ0NsZWFyJztcbiAgQElucHV0KCkgZHJvcEJveE1lc3NhZ2UgPSAnRHJvcCB5b3VyIGltYWdlcyBoZXJlISc7XG4gIEBJbnB1dCgpIGZpbGVUb29MYXJnZU1lc3NhZ2U6IHN0cmluZztcbiAgQElucHV0KCkgaGVhZGVyczogSHR0cEhlYWRlcnMgfCB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9O1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIG1heEZpbGVTaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIHByZXZpZXcgPSB0cnVlO1xuICBASW5wdXQoKSBwYXJ0TmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBzdHlsZTogU3R5bGU7XG4gIEBJbnB1dCgnZXh0ZW5zaW9ucycpIHN1cHBvcnRlZEV4dGVuc2lvbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSB1cmw6IHN0cmluZztcbiAgQElucHV0KCkgd2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gIEBJbnB1dCgpIHVwbG9hZGVkRmlsZXM6IHN0cmluZ1tdIHwgQXJyYXk8eyB1cmw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZywgYmxvYj86IEJsb2IgfT4gPSBbXTtcbiAgQE91dHB1dCgpIHJlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVIb2xkZXI+KCk7XG4gIEBPdXRwdXQoKSB1cGxvYWRTdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSB1cGxvYWRGaW5pc2hlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUhvbGRlcj4oKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlSG9sZGVyPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0JylcbiAgcHJpdmF0ZSBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHByaXZhdGUgcGVuZGluZ0ZpbGVzQ291bnRlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbWFnZVNlcnZpY2U6IEltYWdlVXBsb2FkU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmZpbGVUb29MYXJnZU1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuZmlsZVRvb0xhcmdlTWVzc2FnZSA9ICdBbiBpbWFnZSB3YXMgdG9vIGxhcmdlIGFuZCB3YXMgbm90IHVwbG9hZGVkLicgKyAodGhpcy5tYXhGaWxlU2l6ZSA/ICgnIFRoZSBtYXhpbXVtIGZpbGUgc2l6ZSBpcyAnICsgdGhpcy5tYXhGaWxlU2l6ZSAvIDEwMjQpICsgJ0tpQi4nIDogJycpO1xuICAgIH1cbiAgICB0aGlzLnN1cHBvcnRlZEV4dGVuc2lvbnMgPSB0aGlzLnN1cHBvcnRlZEV4dGVuc2lvbnMgPyB0aGlzLnN1cHBvcnRlZEV4dGVuc2lvbnMubWFwKChleHQpID0+ICdpbWFnZS8nICsgZXh0KSA6IFsnaW1hZ2UvKiddO1xuICB9XG5cbiAgZGVsZXRlQWxsKCkge1xuICAgIHRoaXMuZmlsZXMuZm9yRWFjaChmID0+IHRoaXMucmVtb3ZlZC5lbWl0KGYpKTtcbiAgICB0aGlzLmZpbGVzID0gW107XG4gICAgdGhpcy5maWxlQ291bnRlciA9IDA7XG4gICAgaWYgKHRoaXMuaW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlRmlsZShmaWxlOiBGaWxlSG9sZGVyKTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmZpbGVzLmluZGV4T2YoZmlsZSk7XG4gICAgdGhpcy5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuZmlsZUNvdW50ZXItLTtcbiAgICBpZiAodGhpcy5pbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVkLmVtaXQoZmlsZSk7XG4gIH1cblxuICBwcmV2aWV3RmlsZUNsaWNrZWQoZmlsZTogRmlsZUhvbGRlcikge1xuICAgIHRoaXMucHJldmlld0NsaWNrZWQuZW1pdChmaWxlKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy51cGxvYWRlZEZpbGVzICYmIGNoYW5nZXMudXBsb2FkZWRGaWxlcy5jdXJyZW50VmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wcm9jZXNzVXBsb2FkZWRGaWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIG9uRmlsZUNoYW5nZShmaWxlczogRmlsZUxpc3QpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVtYWluaW5nU2xvdHMgPSB0aGlzLm1heCAtIHRoaXMuZmlsZUNvdW50ZXI7XG4gICAgY29uc3QgZmlsZXNUb1VwbG9hZE51bSA9IGZpbGVzLmxlbmd0aCA+IHJlbWFpbmluZ1Nsb3RzID8gcmVtYWluaW5nU2xvdHMgOiBmaWxlcy5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy51cmwgJiYgZmlsZXNUb1VwbG9hZE51bSAhPT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRTdGF0ZUNoYW5nZWQuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbGVDb3VudGVyICs9IGZpbGVzVG9VcGxvYWROdW07XG4gICAgdGhpcy5zaG93RmlsZVRvb0xhcmdlTWVzc2FnZSA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkRmlsZXMoZmlsZXMsIGZpbGVzVG9VcGxvYWROdW0pO1xuICB9XG5cbiAgb25GaWxlT3ZlciA9IChpc092ZXIpID0+IHRoaXMuZmlsZU92ZXIgPSBpc092ZXI7XG5cbiAgcHJpdmF0ZSBvblJlc3BvbnNlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55PiwgZmlsZUhvbGRlcjogRmlsZUhvbGRlcikge1xuICAgIGZpbGVIb2xkZXIuc2VydmVyUmVzcG9uc2UgPSB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZSB9O1xuICAgIGZpbGVIb2xkZXIucGVuZGluZyA9IGZhbHNlO1xuXG4gICAgdGhpcy51cGxvYWRGaW5pc2hlZC5lbWl0KGZpbGVIb2xkZXIpO1xuXG4gICAgaWYgKC0tdGhpcy5wZW5kaW5nRmlsZXNDb3VudGVyID09PSAwKSB7XG4gICAgICB0aGlzLnVwbG9hZFN0YXRlQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NVcGxvYWRlZEZpbGVzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51cGxvYWRlZEZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBkYXRhOiBhbnkgPSB0aGlzLnVwbG9hZGVkRmlsZXNbaV07XG5cbiAgICAgIGxldCBmaWxlQmxvYjogQmxvYixcbiAgICAgICAgZmlsZTogRmlsZSxcbiAgICAgICAgZmlsZVVybDogc3RyaW5nO1xuXG4gICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBmaWxlVXJsID0gZGF0YS51cmw7XG4gICAgICAgIGZpbGVCbG9iID0gKGRhdGEuYmxvYikgPyBkYXRhLmJsb2IgOiBuZXcgQmxvYihbZGF0YV0pO1xuICAgICAgICBmaWxlID0gbmV3IEZpbGUoW2ZpbGVCbG9iXSwgZGF0YS5maWxlTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlVXJsID0gZGF0YTtcbiAgICAgICAgZmlsZUJsb2IgPSBuZXcgQmxvYihbZmlsZVVybF0pO1xuICAgICAgICBmaWxlID0gbmV3IEZpbGUoW2ZpbGVCbG9iXSwgZmlsZVVybCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmlsZXMucHVzaChuZXcgRmlsZUhvbGRlcihmaWxlVXJsLCBmaWxlKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB1cGxvYWRGaWxlcyhmaWxlczogRmlsZUxpc3QsIGZpbGVzVG9VcGxvYWROdW06IG51bWJlcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXNUb1VwbG9hZE51bTsgaSsrKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG5cbiAgICAgIGlmICh0aGlzLm1heEZpbGVTaXplICYmIGZpbGUuc2l6ZSA+IHRoaXMubWF4RmlsZVNpemUpIHtcbiAgICAgICAgdGhpcy5maWxlQ291bnRlci0tO1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuc2hvd0ZpbGVUb29MYXJnZU1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwbG9hZFN0YXRlQ2hhbmdlZC5lbWl0KGZhbHNlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJlZm9yZVVwbG9hZFJlc3VsdDogVXBsb2FkTWV0YWRhdGEgPSBhd2FpdCB0aGlzLmJlZm9yZVVwbG9hZCh7IGZpbGUsIHVybDogdGhpcy51cmwsIGFib3J0OiBmYWxzZSB9KTtcblxuICAgICAgaWYgKGJlZm9yZVVwbG9hZFJlc3VsdC5hYm9ydCkge1xuICAgICAgICB0aGlzLmZpbGVDb3VudGVyLS07XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICBpbWcuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmVmb3JlVXBsb2FkUmVzdWx0LmZpbGUpO1xuXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSG9sZGVyOiBGaWxlSG9sZGVyID0gbmV3IEZpbGVIb2xkZXIoZXZlbnQudGFyZ2V0LnJlc3VsdCwgYmVmb3JlVXBsb2FkUmVzdWx0LmZpbGUpO1xuICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZUhvbGRlcik7XG4gICAgICAgIHRoaXMudXBsb2FkU2luZ2xlRmlsZShmaWxlSG9sZGVyLCBiZWZvcmVVcGxvYWRSZXN1bHQudXJsLCBiZWZvcmVVcGxvYWRSZXN1bHQuZm9ybURhdGEpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmVmb3JlVXBsb2FkUmVzdWx0LmZpbGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBsb2FkU2luZ2xlRmlsZShmaWxlSG9sZGVyOiBGaWxlSG9sZGVyLCB1cmwgPSB0aGlzLnVybCwgY3VzdG9tRm9ybT86IHsgW25hbWU6IHN0cmluZ106IGFueSB9KSB7XG4gICAgaWYgKHVybCkge1xuICAgICAgdGhpcy5wZW5kaW5nRmlsZXNDb3VudGVyKys7XG4gICAgICBmaWxlSG9sZGVyLnBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICB0aGlzLmltYWdlU2VydmljZVxuICAgICAgICAudXBsb2FkSW1hZ2UodXJsLCBmaWxlSG9sZGVyLmZpbGUsIHRoaXMuaGVhZGVycywgdGhpcy5wYXJ0TmFtZSwgY3VzdG9tRm9ybSwgdGhpcy53aXRoQ3JlZGVudGlhbHMpXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgcmVzcG9uc2UgPT4gdGhpcy5vblJlc3BvbnNlKHJlc3BvbnNlLCBmaWxlSG9sZGVyKSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUmVzcG9uc2UoZXJyb3IsIGZpbGVIb2xkZXIpO1xuICAgICAgICAgICAgdGhpcy5kZWxldGVGaWxlKGZpbGVIb2xkZXIpO1xuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwbG9hZEZpbmlzaGVkLmVtaXQoZmlsZUhvbGRlcik7XG4gICAgfVxuICB9XG59XG4iXX0=