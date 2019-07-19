/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileHolder } from '../file-holder';
import { ImageUploadService } from '../image-upload.service';
var ImageUploadComponent = /** @class */ (function () {
    function ImageUploadComponent(imageService) {
        var _this = this;
        this.imageService = imageService;
        this.files = [];
        this.fileCounter = 0;
        this.fileOver = false;
        this.showFileTooLargeMessage = false;
        this.beforeUpload = (/**
         * @param {?} metadata
         * @return {?}
         */
        function (metadata) { return metadata; });
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
        function (isOver) { return _this.fileOver = isOver; });
    }
    /**
     * @return {?}
     */
    ImageUploadComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.fileTooLargeMessage) {
            this.fileTooLargeMessage = 'An image was too large and was not uploaded.' + (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'KiB.' : '');
        }
        this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map((/**
         * @param {?} ext
         * @return {?}
         */
        function (ext) { return 'image/' + ext; })) : ['image/*'];
    };
    /**
     * @return {?}
     */
    ImageUploadComponent.prototype.deleteAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.files.forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return _this.removed.emit(f); }));
        this.files = [];
        this.fileCounter = 0;
        if (this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ImageUploadComponent.prototype.deleteFile = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var index = this.files.indexOf(file);
        this.files.splice(index, 1);
        this.fileCounter--;
        if (this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
        this.removed.emit(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    ImageUploadComponent.prototype.previewFileClicked = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        this.previewClicked.emit(file);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ImageUploadComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.uploadedFiles && changes.uploadedFiles.currentValue.length > 0) {
            this.processUploadedFiles();
        }
    };
    /**
     * @param {?} files
     * @return {?}
     */
    ImageUploadComponent.prototype.onFileChange = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        if (this.disabled)
            return;
        /** @type {?} */
        var remainingSlots = this.max - this.fileCounter;
        /** @type {?} */
        var filesToUploadNum = files.length > remainingSlots ? remainingSlots : files.length;
        if (this.url && filesToUploadNum !== 0) {
            this.uploadStateChanged.emit(true);
        }
        this.fileCounter += filesToUploadNum;
        this.showFileTooLargeMessage = false;
        this.uploadFiles(files, filesToUploadNum);
    };
    /**
     * @private
     * @param {?} response
     * @param {?} fileHolder
     * @return {?}
     */
    ImageUploadComponent.prototype.onResponse = /**
     * @private
     * @param {?} response
     * @param {?} fileHolder
     * @return {?}
     */
    function (response, fileHolder) {
        fileHolder.serverResponse = { status: response.status, response: response };
        fileHolder.pending = false;
        this.uploadFinished.emit(fileHolder);
        if (--this.pendingFilesCounter === 0) {
            this.uploadStateChanged.emit(false);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageUploadComponent.prototype.processUploadedFiles = /**
     * @private
     * @return {?}
     */
    function () {
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            /** @type {?} */
            var data = this.uploadedFiles[i];
            /** @type {?} */
            var fileBlob = void 0;
            /** @type {?} */
            var file = void 0;
            /** @type {?} */
            var fileUrl = void 0;
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
    };
    /**
     * @private
     * @param {?} files
     * @param {?} filesToUploadNum
     * @return {?}
     */
    ImageUploadComponent.prototype.uploadFiles = /**
     * @private
     * @param {?} files
     * @param {?} filesToUploadNum
     * @return {?}
     */
    function (files, filesToUploadNum) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, i;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var file, beforeUploadResult, img, reader;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        file = files[i];
                                        if (this_1.maxFileSize && file.size > this_1.maxFileSize) {
                                            this_1.fileCounter--;
                                            this_1.inputElement.nativeElement.value = '';
                                            this_1.showFileTooLargeMessage = true;
                                            this_1.uploadStateChanged.emit(false);
                                            return [2 /*return*/, "continue"];
                                        }
                                        return [4 /*yield*/, this_1.beforeUpload({ file: file, url: this_1.url, abort: false })];
                                    case 1:
                                        beforeUploadResult = _a.sent();
                                        if (beforeUploadResult.abort) {
                                            this_1.fileCounter--;
                                            this_1.inputElement.nativeElement.value = '';
                                            return [2 /*return*/, "continue"];
                                        }
                                        img = (/** @type {?} */ (document.createElement('img')));
                                        img.src = window.URL.createObjectURL(beforeUploadResult.file);
                                        reader = new FileReader();
                                        reader.addEventListener('load', (/**
                                         * @param {?} event
                                         * @return {?}
                                         */
                                        function (event) {
                                            /** @type {?} */
                                            var fileHolder = new FileHolder(event.target.result, beforeUploadResult.file);
                                            _this.files.push(fileHolder);
                                            _this.uploadSingleFile(fileHolder, beforeUploadResult.url, beforeUploadResult.formData);
                                        }), false);
                                        reader.readAsDataURL(beforeUploadResult.file);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < filesToUploadNum)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} fileHolder
     * @param {?=} url
     * @param {?=} customForm
     * @return {?}
     */
    ImageUploadComponent.prototype.uploadSingleFile = /**
     * @private
     * @param {?} fileHolder
     * @param {?=} url
     * @param {?=} customForm
     * @return {?}
     */
    function (fileHolder, url, customForm) {
        var _this = this;
        if (url === void 0) { url = this.url; }
        if (url) {
            this.pendingFilesCounter++;
            fileHolder.pending = true;
            this.imageService
                .uploadImage(url, fileHolder.file, this.headers, this.partName, customForm, this.withCredentials)
                .subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) { return _this.onResponse(response, fileHolder); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.onResponse(error, fileHolder);
                _this.deleteFile(fileHolder);
            }));
        }
        else {
            this.uploadFinished.emit(fileHolder);
        }
    };
    ImageUploadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'image-upload',
                    template: "<div\n     fileDrop\n     [accept]=\"supportedExtensions\"\n     (fileOver)=\"onFileOver($event)\"\n     (fileDrop)=\"onFileChange($event)\"\n     [ngClass]=\"cssClass\"\n     [ngClass]=\"{'img-ul-file-is-over': fileOver}\"     \n     [ngStyle]=\"style?.layout\"\n>\n  <div class=\"img-ul-file-upload img-ul-hr-inline-group\">    \n    <label *ngIf=\"fileCounter != max\"\n      class=\"img-ul-upload img-ul-button\" \n      [ngStyle]=\"style?.selectButton\"\n      [ngClass]=\"{'img-ul-disabled': disabled}\">\n      <span [innerText]=\"buttonCaption\"></span>\n      <input\n        type=\"file\"\n        [disabled]=\"disabled\"\n        [accept]=\"supportedExtensions\"\n        [multiple]=\"max > 1\"\n        (change)=\"onFileChange(input.files)\"\n        #input>\n    </label>\n    <button *ngIf=\"fileCounter > 0\"\n      [disabled]=\"disabled\"\n      class=\"img-ul-clear img-ul-button\" \n      (click)=\"deleteAll()\" \n      [ngStyle]=\"style?.clearButton\"\n      [innerText]=\"clearButtonCaption\">\n    </button>\n    <div class=\"img-ul-drag-box-msg\" [innerText]=\"dropBoxMessage\"></div>\n  </div>\n\n  <p class=\"img-ul-file-too-large\" *ngIf=\"showFileTooLargeMessage\" [innerText]=\"fileTooLargeMessage\"></p>\n\n  <div *ngIf=\"preview\" class=\"img-ul-container img-ul-hr-inline-group\" [ngStyle]=\"style?.previewPanel\">\n    <div\n      class=\"img-ul-image\"\n      *ngFor=\"let file of files\"\n      (click)=\"previewFileClicked(file)\"\n      [ngStyle]=\"{'background-image': 'url('+ file.src +')'}\"\n    >\n      <div *ngIf=\"file.pending\" class=\"img-ul-loading-overlay\">\n        <div class=\"img-ul-spinning-circle\"></div>\n      </div>\n      <div *ngIf=\"!file.pending\" \n        [ngClass]=\"{'img-ul-disabled': disabled}\" \n        class=\"img-ul-x-mark\" \n        (click)=\"deleteFile(file)\">\n        <span class=\"img-ul-close\"></span>\n      </div>\n    </div>\n  </div>\n</div>",
                    styles: [".img-ul{--active-color:#3C9;--common-radius:3px;background-color:#f8f8f8;border-radius:var(--common-radius);border:1px dashed #d0d0d0;font-family:sans-serif;position:relative;color:#9b9b9b}.img-ul-file-is-over{border:var(--active-color) solid}.img-ul-hr-inline-group:after{clear:both;content:\"\";display:table}.img-ul-file-upload{padding:16px}.img-ul-drag-box-msg{display:inline-block;font-weight:600;margin-left:12px;padding-top:14px}label.img-ul-button input[type=file]{display:none;position:fixed;top:-99999px}.img-ul-clear{background-color:red}.img-ul-clear:disabled{background-color:#ff6464;cursor:default}.img-ul-upload{background-color:var(--active-color)}.img-ul-button{-moz-box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);-webkit-box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);border:none;box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);color:#fff;cursor:pointer;display:inline-block;float:left;font-size:1.25em;font-weight:500;padding:10px;text-transform:uppercase}.img-ul-button:active span{display:block;position:relative;top:1px}.img-ul-container{background-color:#fdfdfd;padding:0 10px}.img-ul-image{background:center center/contain no-repeat;display:inline-block;float:left;height:86px;margin:6px;position:relative;width:86px}.img-ul-x-mark{background-color:#000;border-radius:2px;color:#fff;cursor:pointer;float:right;height:20px;margin:2px;opacity:.7;text-align:center;width:20px}.img-ul-close{height:20px;opacity:.7;padding-right:3px;position:relative;width:20px}.img-ul-x-mark:hover .img-ul-close{opacity:1}.img-ul-close:after,.img-ul-close:before{background-color:#fff;border-radius:2px;content:'';height:15px;position:absolute;top:0;width:2px}.img-ul-close:before{transform:rotate(45deg)}.img-ul-close:after{transform:rotate(-45deg)}.img-ul-x-mark.img-ul-disabled{display:none}.img-ul-loading-overlay{background-color:#000;bottom:0;left:0;opacity:.7;position:absolute;right:0;top:0}.img-ul-spinning-circle{height:30px;width:30px;margin:auto;position:absolute;top:0;left:0;bottom:0;right:0;border-radius:50%;border:3px solid rgba(255,255,255,0);border-top:3px solid #fff;border-right:3px solid #fff;-webkit-animation:2s cubic-bezier(.085,.625,.855,.36) infinite spinner;animation:2s cubic-bezier(.085,.625,.855,.36) infinite spinner}.img-ul-file-too-large{color:red;padding:0 15px}.img-ul-upload.img-ul-disabled{background-color:#86e9c9;cursor:default}.img-ul-upload.img-ul-disabled:active span{top:0}@-webkit-keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}"]
                }] }
    ];
    /** @nocollapse */
    ImageUploadComponent.ctorParameters = function () { return [
        { type: ImageUploadService }
    ]; };
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
    return ImageUploadComponent;
}());
export { ImageUploadComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWltYWdlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS11cGxvYWQvaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSTdEO0lBcUNFLDhCQUFvQixZQUFnQztRQUFwRCxpQkFDQztRQURtQixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUEvQnBELFVBQUssR0FBaUIsRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGlCQUFZOzs7O1FBQTJFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxFQUFSLENBQVEsRUFBQztRQUM1RyxrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ1YsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQix1QkFBa0IsR0FBRyxPQUFPLENBQUM7UUFDN0IsbUJBQWMsR0FBRyx3QkFBd0IsQ0FBQztRQUcxQyxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBRVYsWUFBTyxHQUFHLElBQUksQ0FBQztRQUtmLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGtCQUFhLEdBQXFFLEVBQUUsQ0FBQztRQUNwRixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUN6Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVyxD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Q0FBZ0I7O0lBQ2hCLHdDQUFpQjs7SUFDakIsdURBQWdDOztJQUVoQyw0Q0FBcUg7O0lBQ3JILDZDQUF5Qzs7SUFDekMsd0NBQTBCOztJQUMxQix3Q0FBb0M7O0lBQ3BDLGtEQUFzQzs7SUFDdEMsOENBQW1EOztJQUNuRCxtREFBcUM7O0lBQ3JDLHVDQUFzRTs7SUFDdEUsbUNBQW1COztJQUNuQiwyQ0FBNkI7O0lBQzdCLHVDQUF3Qjs7SUFDeEIsd0NBQTBCOztJQUMxQixxQ0FBc0I7O0lBQ3RCLG1EQUFtRDs7SUFDbkQsbUNBQXFCOztJQUNyQiwrQ0FBaUM7O0lBQ2pDLDZDQUE4Rjs7SUFDOUYsdUNBQW1EOztJQUNuRCxrREFBMkQ7O0lBQzNELDhDQUEwRDs7SUFDMUQsOENBQTBEOzs7OztJQUUxRCw0Q0FDaUM7Ozs7O0lBQ2pDLG1EQUFnQzs7SUF3RGhDLDBDQUFnRDs7Ozs7SUF0RHBDLDRDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsZUhvbGRlciB9IGZyb20gJy4uL2ZpbGUtaG9sZGVyJztcbmltcG9ydCB7IEltYWdlVXBsb2FkU2VydmljZSB9IGZyb20gJy4uL2ltYWdlLXVwbG9hZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vc3R5bGUnO1xuaW1wb3J0IHsgVXBsb2FkTWV0YWRhdGEgfSBmcm9tICcuLi91cGxvYWQtbWV0YWRhdGEnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbWFnZS11cGxvYWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgZmlsZXM6IEZpbGVIb2xkZXJbXSA9IFtdO1xuICBmaWxlQ291bnRlciA9IDA7XG4gIGZpbGVPdmVyID0gZmFsc2U7XG4gIHNob3dGaWxlVG9vTGFyZ2VNZXNzYWdlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgYmVmb3JlVXBsb2FkOiAobWV0YWRhdGE6IFVwbG9hZE1ldGFkYXRhKSA9PiBVcGxvYWRNZXRhZGF0YSB8IFByb21pc2U8VXBsb2FkTWV0YWRhdGE+ID0gbWV0YWRhdGEgPT4gbWV0YWRhdGE7XG4gIEBJbnB1dCgpIGJ1dHRvbkNhcHRpb24gPSAnU2VsZWN0IEltYWdlcyc7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgnY2xhc3MnKSBjc3NDbGFzcyA9ICdpbWctdWwnO1xuICBASW5wdXQoKSBjbGVhckJ1dHRvbkNhcHRpb24gPSAnQ2xlYXInO1xuICBASW5wdXQoKSBkcm9wQm94TWVzc2FnZSA9ICdEcm9wIHlvdXIgaW1hZ2VzIGhlcmUhJztcbiAgQElucHV0KCkgZmlsZVRvb0xhcmdlTWVzc2FnZTogc3RyaW5nO1xuICBASW5wdXQoKSBoZWFkZXJzOiBIdHRwSGVhZGVycyB8IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdIH07XG4gIEBJbnB1dCgpIG1heCA9IDEwMDtcbiAgQElucHV0KCkgbWF4RmlsZVNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgcHJldmlldyA9IHRydWU7XG4gIEBJbnB1dCgpIHBhcnROYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0eWxlOiBTdHlsZTtcbiAgQElucHV0KCdleHRlbnNpb25zJykgc3VwcG9ydGVkRXh0ZW5zaW9uczogc3RyaW5nW107XG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSB3aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgQElucHV0KCkgdXBsb2FkZWRGaWxlczogc3RyaW5nW10gfCBBcnJheTx7IHVybDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nLCBibG9iPzogQmxvYiB9PiA9IFtdO1xuICBAT3V0cHV0KCkgcmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUhvbGRlcj4oKTtcbiAgQE91dHB1dCgpIHVwbG9hZFN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHVwbG9hZEZpbmlzaGVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlSG9sZGVyPigpO1xuICBAT3V0cHV0KCkgcHJldmlld0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVIb2xkZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXQnKVxuICBwcml2YXRlIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBwZW5kaW5nRmlsZXNDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGltYWdlU2VydmljZTogSW1hZ2VVcGxvYWRTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZmlsZVRvb0xhcmdlTWVzc2FnZSkge1xuICAgICAgdGhpcy5maWxlVG9vTGFyZ2VNZXNzYWdlID0gJ0FuIGltYWdlIHdhcyB0b28gbGFyZ2UgYW5kIHdhcyBub3QgdXBsb2FkZWQuJyArICh0aGlzLm1heEZpbGVTaXplID8gKCcgVGhlIG1heGltdW0gZmlsZSBzaXplIGlzICcgKyB0aGlzLm1heEZpbGVTaXplIC8gMTAyNCkgKyAnS2lCLicgOiAnJyk7XG4gICAgfVxuICAgIHRoaXMuc3VwcG9ydGVkRXh0ZW5zaW9ucyA9IHRoaXMuc3VwcG9ydGVkRXh0ZW5zaW9ucyA/IHRoaXMuc3VwcG9ydGVkRXh0ZW5zaW9ucy5tYXAoKGV4dCkgPT4gJ2ltYWdlLycgKyBleHQpIDogWydpbWFnZS8qJ107XG4gIH1cblxuICBkZWxldGVBbGwoKSB7XG4gICAgdGhpcy5maWxlcy5mb3JFYWNoKGYgPT4gdGhpcy5yZW1vdmVkLmVtaXQoZikpO1xuICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICB0aGlzLmZpbGVDb3VudGVyID0gMDtcbiAgICBpZiAodGhpcy5pbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxuICBkZWxldGVGaWxlKGZpbGU6IEZpbGVIb2xkZXIpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmlsZXMuaW5kZXhPZihmaWxlKTtcbiAgICB0aGlzLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5maWxlQ291bnRlci0tO1xuICAgIGlmICh0aGlzLmlucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZWQuZW1pdChmaWxlKTtcbiAgfVxuXG4gIHByZXZpZXdGaWxlQ2xpY2tlZChmaWxlOiBGaWxlSG9sZGVyKSB7XG4gICAgdGhpcy5wcmV2aWV3Q2xpY2tlZC5lbWl0KGZpbGUpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnVwbG9hZGVkRmlsZXMgJiYgY2hhbmdlcy51cGxvYWRlZEZpbGVzLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnByb2Nlc3NVcGxvYWRlZEZpbGVzKCk7XG4gICAgfVxuICB9XG5cbiAgb25GaWxlQ2hhbmdlKGZpbGVzOiBGaWxlTGlzdCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICBjb25zdCByZW1haW5pbmdTbG90cyA9IHRoaXMubWF4IC0gdGhpcy5maWxlQ291bnRlcjtcbiAgICBjb25zdCBmaWxlc1RvVXBsb2FkTnVtID0gZmlsZXMubGVuZ3RoID4gcmVtYWluaW5nU2xvdHMgPyByZW1haW5pbmdTbG90cyA6IGZpbGVzLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLnVybCAmJiBmaWxlc1RvVXBsb2FkTnVtICE9PSAwKSB7XG4gICAgICB0aGlzLnVwbG9hZFN0YXRlQ2hhbmdlZC5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuZmlsZUNvdW50ZXIgKz0gZmlsZXNUb1VwbG9hZE51bTtcbiAgICB0aGlzLnNob3dGaWxlVG9vTGFyZ2VNZXNzYWdlID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRGaWxlcyhmaWxlcywgZmlsZXNUb1VwbG9hZE51bSk7XG4gIH1cblxuICBvbkZpbGVPdmVyID0gKGlzT3ZlcikgPT4gdGhpcy5maWxlT3ZlciA9IGlzT3ZlcjtcblxuICBwcml2YXRlIG9uUmVzcG9uc2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+LCBmaWxlSG9sZGVyOiBGaWxlSG9sZGVyKSB7XG4gICAgZmlsZUhvbGRlci5zZXJ2ZXJSZXNwb25zZSA9IHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlIH07XG4gICAgZmlsZUhvbGRlci5wZW5kaW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLnVwbG9hZEZpbmlzaGVkLmVtaXQoZmlsZUhvbGRlcik7XG5cbiAgICBpZiAoLS10aGlzLnBlbmRpbmdGaWxlc0NvdW50ZXIgPT09IDApIHtcbiAgICAgIHRoaXMudXBsb2FkU3RhdGVDaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc1VwbG9hZGVkRmlsZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnVwbG9hZGVkRmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHRoaXMudXBsb2FkZWRGaWxlc1tpXTtcblxuICAgICAgbGV0IGZpbGVCbG9iOiBCbG9iLFxuICAgICAgICBmaWxlOiBGaWxlLFxuICAgICAgICBmaWxlVXJsOiBzdHJpbmc7XG5cbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGZpbGVVcmwgPSBkYXRhLnVybDtcbiAgICAgICAgZmlsZUJsb2IgPSAoZGF0YS5ibG9iKSA/IGRhdGEuYmxvYiA6IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgIGZpbGUgPSBuZXcgRmlsZShbZmlsZUJsb2JdLCBkYXRhLmZpbGVOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGVVcmwgPSBkYXRhO1xuICAgICAgICBmaWxlQmxvYiA9IG5ldyBCbG9iKFtmaWxlVXJsXSk7XG4gICAgICAgIGZpbGUgPSBuZXcgRmlsZShbZmlsZUJsb2JdLCBmaWxlVXJsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maWxlcy5wdXNoKG5ldyBGaWxlSG9sZGVyKGZpbGVVcmwsIGZpbGUpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVwbG9hZEZpbGVzKGZpbGVzOiBGaWxlTGlzdCwgZmlsZXNUb1VwbG9hZE51bTogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlc1RvVXBsb2FkTnVtOyBpKyspIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBmaWxlc1tpXTtcblxuICAgICAgaWYgKHRoaXMubWF4RmlsZVNpemUgJiYgZmlsZS5zaXplID4gdGhpcy5tYXhGaWxlU2l6ZSkge1xuICAgICAgICB0aGlzLmZpbGVDb3VudGVyLS07XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5zaG93RmlsZVRvb0xhcmdlTWVzc2FnZSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBsb2FkU3RhdGVDaGFuZ2VkLmVtaXQoZmFsc2UpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmVmb3JlVXBsb2FkUmVzdWx0OiBVcGxvYWRNZXRhZGF0YSA9IGF3YWl0IHRoaXMuYmVmb3JlVXBsb2FkKHsgZmlsZSwgdXJsOiB0aGlzLnVybCwgYWJvcnQ6IGZhbHNlIH0pO1xuXG4gICAgICBpZiAoYmVmb3JlVXBsb2FkUmVzdWx0LmFib3J0KSB7XG4gICAgICAgIHRoaXMuZmlsZUNvdW50ZXItLTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJykgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgIGltZy5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChiZWZvcmVVcGxvYWRSZXN1bHQuZmlsZSk7XG5cbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVIb2xkZXI6IEZpbGVIb2xkZXIgPSBuZXcgRmlsZUhvbGRlcihldmVudC50YXJnZXQucmVzdWx0LCBiZWZvcmVVcGxvYWRSZXN1bHQuZmlsZSk7XG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlSG9sZGVyKTtcbiAgICAgICAgdGhpcy51cGxvYWRTaW5nbGVGaWxlKGZpbGVIb2xkZXIsIGJlZm9yZVVwbG9hZFJlc3VsdC51cmwsIGJlZm9yZVVwbG9hZFJlc3VsdC5mb3JtRGF0YSk7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChiZWZvcmVVcGxvYWRSZXN1bHQuZmlsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGxvYWRTaW5nbGVGaWxlKGZpbGVIb2xkZXI6IEZpbGVIb2xkZXIsIHVybCA9IHRoaXMudXJsLCBjdXN0b21Gb3JtPzogeyBbbmFtZTogc3RyaW5nXTogYW55IH0pIHtcbiAgICBpZiAodXJsKSB7XG4gICAgICB0aGlzLnBlbmRpbmdGaWxlc0NvdW50ZXIrKztcbiAgICAgIGZpbGVIb2xkZXIucGVuZGluZyA9IHRydWU7XG5cbiAgICAgIHRoaXMuaW1hZ2VTZXJ2aWNlXG4gICAgICAgIC51cGxvYWRJbWFnZSh1cmwsIGZpbGVIb2xkZXIuZmlsZSwgdGhpcy5oZWFkZXJzLCB0aGlzLnBhcnROYW1lLCBjdXN0b21Gb3JtLCB0aGlzLndpdGhDcmVkZW50aWFscylcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICByZXNwb25zZSA9PiB0aGlzLm9uUmVzcG9uc2UocmVzcG9uc2UsIGZpbGVIb2xkZXIpLFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMub25SZXNwb25zZShlcnJvciwgZmlsZUhvbGRlcik7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoZmlsZUhvbGRlcik7XG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBsb2FkRmluaXNoZWQuZW1pdChmaWxlSG9sZGVyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==