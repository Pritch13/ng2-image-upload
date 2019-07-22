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
                    template: "<div fileDrop\n     [accept]=\"supportedExtensions\"\n     (fileOver)=\"onFileOver($event)\"\n     (fileDrop)=\"onFileChange($event)\"\n     [ngClass]=\"cssClass\"\n     [ngClass]=\"{'img-ul-file-is-over': fileOver}\"\n     [ngStyle]=\"style?.layout\">\n  <!-- <div class=\"img-ul-file-upload img-ul-hr-inline-group\">\n    <label *ngIf=\"fileCounter != max\"\n           class=\"img-ul-upload img-ul-button\"\n           [ngStyle]=\"style?.selectButton\"\n           [ngClass]=\"{'img-ul-disabled': disabled}\">\n      <span [innerText]=\"buttonCaption\"></span>\n      <input type=\"file\"\n             [disabled]=\"disabled\"\n             [accept]=\"supportedExtensions\"\n             multiple\n             (change)=\"onFileChange(input.files)\">\n    </label>\n    <button *ngIf=\"fileCounter > 0\"\n            [disabled]=\"disabled\"\n            class=\"img-ul-clear img-ul-button\"\n            (click)=\"deleteAll()\"\n            [ngStyle]=\"style?.clearButton\"\n            [innerText]=\"clearButtonCaption\">\n    </button>\n    <label *ngIf=\"fileCounter != max\"\n           class=\"img-ul-drag-box-msg\">\n      {{dropBoxMessage}}\n      <input type=\"file\"\n             [disabled]=\"disabled\"\n             [accept]=\"supportedExtensions\"\n             multiple\n             (change)=\"onFileChange(input.files)\"\n             #input>\n    </label>\n    <div *ngIf=\"!dropBoxClickable\"\n         class=\"img-ul-drag-box-msg\"\n         [innerText]=\"dropBoxMessage\"></div>\n\n  </div> -->\n  <p class=\"img-ul-file-too-large\"\n     *ngIf=\"showFileTooLargeMessage\"\n     [innerText]=\"fileTooLargeMessage\"></p>\n\n  <div *ngIf=\"preview\"\n       class=\"img-ul-container img-ul-hr-inline-group\"\n       [ngStyle]=\"style?.previewPanel\">\n    <div class=\"img-ul-image\"\n         *ngFor=\"let file of files\"\n         (click)=\"previewFileClicked(file)\"\n         [ngStyle]=\"{'background-image': 'url('+ file.src +')'}\">\n      <div *ngIf=\"file.pending\"\n           class=\"img-ul-loading-overlay\">\n        <div class=\"img-ul-spinning-circle\"></div>\n      </div>\n      <div *ngIf=\"!file.pending\"\n           [ngClass]=\"{'img-ul-disabled': disabled}\"\n           class=\"img-ul-x-mark\"\n           (click)=\"deleteFile(file)\">\n        <span class=\"img-ul-close\"></span>\n      </div>\n    </div>\n  </div>\n</div>",
                    styles: [".img-ul{--active-color:#3C9;--common-radius:3px;background-color:#f8f8f8;border-radius:var(--common-radius);border:1px dashed #d0d0d0;font-family:sans-serif;position:relative;color:#9b9b9b}.img-ul-file-is-over{border:var(--active-color) solid}.img-ul-hr-inline-group:after{clear:both;content:\"\";display:table}.img-ul-file-upload{padding:16px}.img-ul-drag-box-msg{display:inline-block;font-weight:600;margin-left:12px;padding-top:14px}label.img-ul-button input[type=file]{display:none;position:fixed;top:-99999px}.img-ul-clear{background-color:red}.img-ul-clear:disabled{background-color:#ff6464;cursor:default}.img-ul-upload{color:red!important;background-color:var(--active-color)}.img-ul-button{-moz-box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);-webkit-box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);border:none;box-shadow:2px 2px 4px 0 rgba(148,148,148,.6);color:#fff;cursor:pointer;display:inline-block;float:left;font-size:1.25em;font-weight:500;padding:10px;text-transform:uppercase}.img-ul-button:active span{display:block;position:relative;top:1px}.img-ul-container{background-color:#fdfdfd;padding:0 10px}.img-ul-image{background:center center/contain no-repeat;display:inline-block;float:left;height:86px;margin:6px;position:relative;width:86px}.img-ul-x-mark{background-color:#000;border-radius:2px;color:#fff;cursor:pointer;float:right;height:20px;margin:2px;opacity:.7;text-align:center;width:20px}.img-ul-close{height:20px;opacity:.7;padding-right:3px;position:relative;width:20px}.img-ul-x-mark:hover .img-ul-close{opacity:1}.img-ul-close:after,.img-ul-close:before{background-color:#fff;border-radius:2px;content:'';height:15px;position:absolute;top:0;width:2px}.img-ul-close:before{transform:rotate(45deg)}.img-ul-close:after{transform:rotate(-45deg)}.img-ul-x-mark.img-ul-disabled{display:none}.img-ul-loading-overlay{background-color:#000;bottom:0;left:0;opacity:.7;position:absolute;right:0;top:0}.img-ul-spinning-circle{height:30px;width:30px;margin:auto;position:absolute;top:0;left:0;bottom:0;right:0;border-radius:50%;border:3px solid rgba(255,255,255,0);border-top:3px solid #fff;border-right:3px solid #fff;-webkit-animation:2s cubic-bezier(.085,.625,.855,.36) infinite spinner;animation:2s cubic-bezier(.085,.625,.855,.36) infinite spinner}.img-ul-file-too-large{color:red;padding:0 15px}.img-ul-upload.img-ul-disabled{background-color:#86e9c9;cursor:default}.img-ul-upload.img-ul-disabled:active span{top:0}@-webkit-keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes spinner{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtdXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2JiMnMtaW1hZ2UtdXBsb2FkLyIsInNvdXJjZXMiOlsibGliL2ltYWdlLXVwbG9hZC9pbWFnZS11cGxvYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFJN0Q7SUFxQ0UsOEJBQW9CLFlBQWdDO1FBQXBELGlCQUNDO1FBRG1CLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtRQS9CcEQsVUFBSyxHQUFpQixFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQiw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFFdkIsaUJBQVk7Ozs7UUFBMkUsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLEVBQVIsQ0FBUSxFQUFDO1FBQzVHLGtCQUFhLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDVixhQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLHVCQUFrQixHQUFHLE9BQU8sQ0FBQztRQUM3QixtQkFBYyxHQUFHLHdCQUF3QixDQUFDO1FBRzFDLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFFVixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBS2Ysb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBcUUsRUFBRSxDQUFDO1FBQ3BGLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQ3pDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDakQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQ2hELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUlsRCx3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUF3RGhDLGVBQVU7Ozs7UUFBRyxVQUFDLE1BQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxFQUF0QixDQUFzQixFQUFDO0lBckRoRCxDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM3QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsOENBQThDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6SztRQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxRQUFRLEdBQUcsR0FBRyxFQUFkLENBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVILENBQUM7Ozs7SUFFRCx3Q0FBUzs7O0lBQVQ7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7O0lBRUQseUNBQVU7Ozs7SUFBVixVQUFXLElBQWdCOztZQUNuQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELGlEQUFrQjs7OztJQUFsQixVQUFtQixJQUFnQjtRQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELDBDQUFXOzs7O0lBQVgsVUFBWSxPQUFPO1FBQ2pCLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwyQ0FBWTs7OztJQUFaLFVBQWEsS0FBZTtRQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTzs7WUFFcEIsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVc7O1lBQzVDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBRXRGLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxXQUFXLElBQUksZ0JBQWdCLENBQUM7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7Ozs7SUFJTyx5Q0FBVTs7Ozs7O0lBQWxCLFVBQW1CLFFBQTJCLEVBQUUsVUFBc0I7UUFDcEUsVUFBVSxDQUFDLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUM7UUFDbEUsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsSUFBSSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7O0lBRU8sbURBQW9COzs7O0lBQTVCO1FBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDNUMsSUFBSSxHQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOztnQkFFbkMsUUFBUSxTQUFNOztnQkFDaEIsSUFBSSxTQUFNOztnQkFDVixPQUFPLFNBQVE7WUFFakIsSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFO2dCQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDbkIsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7Ozs7O0lBRWEsMENBQVc7Ozs7OztJQUF6QixVQUEwQixLQUFlLEVBQUUsZ0JBQXdCOzs7Ozs7OzRDQUN4RCxDQUFDOzs7Ozt3Q0FDRixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzt3Q0FFckIsSUFBSSxPQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQUssV0FBVyxFQUFFOzRDQUNwRCxPQUFLLFdBQVcsRUFBRSxDQUFDOzRDQUNuQixPQUFLLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzs0Q0FDM0MsT0FBSyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7NENBQ3BDLE9BQUssa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzt5Q0FFckM7d0NBRTBDLHFCQUFNLE9BQUssWUFBWSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsR0FBRyxFQUFFLE9BQUssR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFBOzt3Q0FBbkcsa0JBQWtCLEdBQW1CLFNBQThEO3dDQUV6RyxJQUFJLGtCQUFrQixDQUFDLEtBQUssRUFBRTs0Q0FDNUIsT0FBSyxXQUFXLEVBQUUsQ0FBQzs0Q0FDbkIsT0FBSyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7O3lDQUU1Qzt3Q0FFSyxHQUFHLEdBQUcsbUJBQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBb0I7d0NBQzdELEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7d0NBRXhELE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTt3Q0FDL0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU07Ozs7d0NBQUUsVUFBQyxLQUFVOztnREFDbkMsVUFBVSxHQUFlLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQzs0Q0FDM0YsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NENBQzVCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO3dDQUN6RixDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7d0NBQ1YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O3dCQTVCdkMsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQTtzREFBM0IsQ0FBQzs7Ozs7d0JBQTRCLENBQUMsRUFBRSxDQUFBOzs7Ozs7S0E4QjFDOzs7Ozs7OztJQUVPLCtDQUFnQjs7Ozs7OztJQUF4QixVQUF5QixVQUFzQixFQUFFLEdBQWMsRUFBRSxVQUFvQztRQUFyRyxpQkFnQkM7UUFoQmdELG9CQUFBLEVBQUEsTUFBTSxJQUFJLENBQUMsR0FBRztRQUM3RCxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRTFCLElBQUksQ0FBQyxZQUFZO2lCQUNkLFdBQVcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ2hHLFNBQVM7Ozs7WUFDUixVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxFQUFyQyxDQUFxQzs7OztZQUNqRCxVQUFBLEtBQUs7Z0JBQ0gsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUFDLENBQUM7U0FDUjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOztnQkEvS0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4Qiw0MEVBQTRDOztpQkFFN0M7Ozs7Z0JBUlEsa0JBQWtCOzs7K0JBZXhCLEtBQUs7Z0NBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUssU0FBQyxPQUFPO3FDQUNiLEtBQUs7aUNBQ0wsS0FBSztzQ0FDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLO3NDQUNMLEtBQUssU0FBQyxZQUFZO3NCQUNsQixLQUFLO2tDQUNMLEtBQUs7Z0NBQ0wsS0FBSzswQkFDTCxNQUFNO3FDQUNOLE1BQU07aUNBQ04sTUFBTTtpQ0FDTixNQUFNOytCQUVOLFNBQVMsU0FBQyxPQUFPOztJQStJcEIsMkJBQUM7Q0FBQSxBQWhMRCxJQWdMQztTQTNLWSxvQkFBb0I7OztJQUMvQixxQ0FBeUI7O0lBQ3pCLDJDQUFnQjs7SUFDaEIsd0NBQWlCOztJQUNqQix1REFBZ0M7O0lBRWhDLDRDQUFxSDs7SUFDckgsNkNBQXlDOztJQUN6Qyx3Q0FBMEI7O0lBQzFCLHdDQUFvQzs7SUFDcEMsa0RBQXNDOztJQUN0Qyw4Q0FBbUQ7O0lBQ25ELG1EQUFxQzs7SUFDckMsdUNBQXNFOztJQUN0RSxtQ0FBbUI7O0lBQ25CLDJDQUE2Qjs7SUFDN0IsdUNBQXdCOztJQUN4Qix3Q0FBMEI7O0lBQzFCLHFDQUFzQjs7SUFDdEIsbURBQW1EOztJQUNuRCxtQ0FBcUI7O0lBQ3JCLCtDQUFpQzs7SUFDakMsNkNBQThGOztJQUM5Rix1Q0FBbUQ7O0lBQ25ELGtEQUEyRDs7SUFDM0QsOENBQTBEOztJQUMxRCw4Q0FBMEQ7Ozs7O0lBRTFELDRDQUNpQzs7Ozs7SUFDakMsbURBQWdDOztJQXdEaEMsMENBQWdEOzs7OztJQXREcEMsNENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWxlSG9sZGVyIH0gZnJvbSAnLi4vZmlsZS1ob2xkZXInO1xuaW1wb3J0IHsgSW1hZ2VVcGxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vaW1hZ2UtdXBsb2FkLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9zdHlsZSc7XG5pbXBvcnQgeyBVcGxvYWRNZXRhZGF0YSB9IGZyb20gJy4uL3VwbG9hZC1tZXRhZGF0YSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ltYWdlLXVwbG9hZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbWFnZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pbWFnZS11cGxvYWQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBmaWxlczogRmlsZUhvbGRlcltdID0gW107XG4gIGZpbGVDb3VudGVyID0gMDtcbiAgZmlsZU92ZXIgPSBmYWxzZTtcbiAgc2hvd0ZpbGVUb29MYXJnZU1lc3NhZ2UgPSBmYWxzZTtcblxuICBASW5wdXQoKSBiZWZvcmVVcGxvYWQ6IChtZXRhZGF0YTogVXBsb2FkTWV0YWRhdGEpID0+IFVwbG9hZE1ldGFkYXRhIHwgUHJvbWlzZTxVcGxvYWRNZXRhZGF0YT4gPSBtZXRhZGF0YSA9PiBtZXRhZGF0YTtcbiAgQElucHV0KCkgYnV0dG9uQ2FwdGlvbiA9ICdTZWxlY3QgSW1hZ2VzJztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCdjbGFzcycpIGNzc0NsYXNzID0gJ2ltZy11bCc7XG4gIEBJbnB1dCgpIGNsZWFyQnV0dG9uQ2FwdGlvbiA9ICdDbGVhcic7XG4gIEBJbnB1dCgpIGRyb3BCb3hNZXNzYWdlID0gJ0Ryb3AgeW91ciBpbWFnZXMgaGVyZSEnO1xuICBASW5wdXQoKSBmaWxlVG9vTGFyZ2VNZXNzYWdlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcnM6IEh0dHBIZWFkZXJzIHwgeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfTtcbiAgQElucHV0KCkgbWF4ID0gMTAwO1xuICBASW5wdXQoKSBtYXhGaWxlU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBwcmV2aWV3ID0gdHJ1ZTtcbiAgQElucHV0KCkgcGFydE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgc3R5bGU6IFN0eWxlO1xuICBASW5wdXQoJ2V4dGVuc2lvbnMnKSBzdXBwb3J0ZWRFeHRlbnNpb25zOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICBASW5wdXQoKSB1cGxvYWRlZEZpbGVzOiBzdHJpbmdbXSB8IEFycmF5PHsgdXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGJsb2I/OiBCbG9iIH0+ID0gW107XG4gIEBPdXRwdXQoKSByZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlSG9sZGVyPigpO1xuICBAT3V0cHV0KCkgdXBsb2FkU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgdXBsb2FkRmluaXNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVIb2xkZXI+KCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUhvbGRlcj4oKTtcblxuICBAVmlld0NoaWxkKCdpbnB1dCcpXG4gIHByaXZhdGUgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcml2YXRlIHBlbmRpbmdGaWxlc0NvdW50ZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW1hZ2VTZXJ2aWNlOiBJbWFnZVVwbG9hZFNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5maWxlVG9vTGFyZ2VNZXNzYWdlKSB7XG4gICAgICB0aGlzLmZpbGVUb29MYXJnZU1lc3NhZ2UgPSAnQW4gaW1hZ2Ugd2FzIHRvbyBsYXJnZSBhbmQgd2FzIG5vdCB1cGxvYWRlZC4nICsgKHRoaXMubWF4RmlsZVNpemUgPyAoJyBUaGUgbWF4aW11bSBmaWxlIHNpemUgaXMgJyArIHRoaXMubWF4RmlsZVNpemUgLyAxMDI0KSArICdLaUIuJyA6ICcnKTtcbiAgICB9XG4gICAgdGhpcy5zdXBwb3J0ZWRFeHRlbnNpb25zID0gdGhpcy5zdXBwb3J0ZWRFeHRlbnNpb25zID8gdGhpcy5zdXBwb3J0ZWRFeHRlbnNpb25zLm1hcCgoZXh0KSA9PiAnaW1hZ2UvJyArIGV4dCkgOiBbJ2ltYWdlLyonXTtcbiAgfVxuXG4gIGRlbGV0ZUFsbCgpIHtcbiAgICB0aGlzLmZpbGVzLmZvckVhY2goZiA9PiB0aGlzLnJlbW92ZWQuZW1pdChmKSk7XG4gICAgdGhpcy5maWxlcyA9IFtdO1xuICAgIHRoaXMuZmlsZUNvdW50ZXIgPSAwO1xuICAgIGlmICh0aGlzLmlucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUZpbGUoZmlsZTogRmlsZUhvbGRlcik6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maWxlcy5pbmRleE9mKGZpbGUpO1xuICAgIHRoaXMuZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLmZpbGVDb3VudGVyLS07XG4gICAgaWYgKHRoaXMuaW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlZC5lbWl0KGZpbGUpO1xuICB9XG5cbiAgcHJldmlld0ZpbGVDbGlja2VkKGZpbGU6IEZpbGVIb2xkZXIpIHtcbiAgICB0aGlzLnByZXZpZXdDbGlja2VkLmVtaXQoZmlsZSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMudXBsb2FkZWRGaWxlcyAmJiBjaGFuZ2VzLnVwbG9hZGVkRmlsZXMuY3VycmVudFZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucHJvY2Vzc1VwbG9hZGVkRmlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbGVDaGFuZ2UoZmlsZXM6IEZpbGVMaXN0KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcblxuICAgIGNvbnN0IHJlbWFpbmluZ1Nsb3RzID0gdGhpcy5tYXggLSB0aGlzLmZpbGVDb3VudGVyO1xuICAgIGNvbnN0IGZpbGVzVG9VcGxvYWROdW0gPSBmaWxlcy5sZW5ndGggPiByZW1haW5pbmdTbG90cyA/IHJlbWFpbmluZ1Nsb3RzIDogZmlsZXMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMudXJsICYmIGZpbGVzVG9VcGxvYWROdW0gIT09IDApIHtcbiAgICAgIHRoaXMudXBsb2FkU3RhdGVDaGFuZ2VkLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5maWxlQ291bnRlciArPSBmaWxlc1RvVXBsb2FkTnVtO1xuICAgIHRoaXMuc2hvd0ZpbGVUb29MYXJnZU1lc3NhZ2UgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZEZpbGVzKGZpbGVzLCBmaWxlc1RvVXBsb2FkTnVtKTtcbiAgfVxuXG4gIG9uRmlsZU92ZXIgPSAoaXNPdmVyKSA9PiB0aGlzLmZpbGVPdmVyID0gaXNPdmVyO1xuXG4gIHByaXZhdGUgb25SZXNwb25zZShyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4sIGZpbGVIb2xkZXI6IEZpbGVIb2xkZXIpIHtcbiAgICBmaWxlSG9sZGVyLnNlcnZlclJlc3BvbnNlID0geyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UgfTtcbiAgICBmaWxlSG9sZGVyLnBlbmRpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMudXBsb2FkRmluaXNoZWQuZW1pdChmaWxlSG9sZGVyKTtcblxuICAgIGlmICgtLXRoaXMucGVuZGluZ0ZpbGVzQ291bnRlciA9PT0gMCkge1xuICAgICAgdGhpcy51cGxvYWRTdGF0ZUNoYW5nZWQuZW1pdChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzVXBsb2FkZWRGaWxlcygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXBsb2FkZWRGaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZGF0YTogYW55ID0gdGhpcy51cGxvYWRlZEZpbGVzW2ldO1xuXG4gICAgICBsZXQgZmlsZUJsb2I6IEJsb2IsXG4gICAgICAgIGZpbGU6IEZpbGUsXG4gICAgICAgIGZpbGVVcmw6IHN0cmluZztcblxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgZmlsZVVybCA9IGRhdGEudXJsO1xuICAgICAgICBmaWxlQmxvYiA9IChkYXRhLmJsb2IpID8gZGF0YS5ibG9iIDogbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgZmlsZSA9IG5ldyBGaWxlKFtmaWxlQmxvYl0sIGRhdGEuZmlsZU5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZVVybCA9IGRhdGE7XG4gICAgICAgIGZpbGVCbG9iID0gbmV3IEJsb2IoW2ZpbGVVcmxdKTtcbiAgICAgICAgZmlsZSA9IG5ldyBGaWxlKFtmaWxlQmxvYl0sIGZpbGVVcmwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZpbGVzLnB1c2gobmV3IEZpbGVIb2xkZXIoZmlsZVVybCwgZmlsZSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXBsb2FkRmlsZXMoZmlsZXM6IEZpbGVMaXN0LCBmaWxlc1RvVXBsb2FkTnVtOiBudW1iZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9VcGxvYWROdW07IGkrKykge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzW2ldO1xuXG4gICAgICBpZiAodGhpcy5tYXhGaWxlU2l6ZSAmJiBmaWxlLnNpemUgPiB0aGlzLm1heEZpbGVTaXplKSB7XG4gICAgICAgIHRoaXMuZmlsZUNvdW50ZXItLTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLnNob3dGaWxlVG9vTGFyZ2VNZXNzYWdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGxvYWRTdGF0ZUNoYW5nZWQuZW1pdChmYWxzZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiZWZvcmVVcGxvYWRSZXN1bHQ6IFVwbG9hZE1ldGFkYXRhID0gYXdhaXQgdGhpcy5iZWZvcmVVcGxvYWQoeyBmaWxlLCB1cmw6IHRoaXMudXJsLCBhYm9ydDogZmFsc2UgfSk7XG5cbiAgICAgIGlmIChiZWZvcmVVcGxvYWRSZXN1bHQuYWJvcnQpIHtcbiAgICAgICAgdGhpcy5maWxlQ291bnRlci0tO1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgaW1nLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJlZm9yZVVwbG9hZFJlc3VsdC5maWxlKTtcblxuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIHJlYWRlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUhvbGRlcjogRmlsZUhvbGRlciA9IG5ldyBGaWxlSG9sZGVyKGV2ZW50LnRhcmdldC5yZXN1bHQsIGJlZm9yZVVwbG9hZFJlc3VsdC5maWxlKTtcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVIb2xkZXIpO1xuICAgICAgICB0aGlzLnVwbG9hZFNpbmdsZUZpbGUoZmlsZUhvbGRlciwgYmVmb3JlVXBsb2FkUmVzdWx0LnVybCwgYmVmb3JlVXBsb2FkUmVzdWx0LmZvcm1EYXRhKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJlZm9yZVVwbG9hZFJlc3VsdC5maWxlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwbG9hZFNpbmdsZUZpbGUoZmlsZUhvbGRlcjogRmlsZUhvbGRlciwgdXJsID0gdGhpcy51cmwsIGN1c3RvbUZvcm0/OiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHRoaXMucGVuZGluZ0ZpbGVzQ291bnRlcisrO1xuICAgICAgZmlsZUhvbGRlci5wZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgdGhpcy5pbWFnZVNlcnZpY2VcbiAgICAgICAgLnVwbG9hZEltYWdlKHVybCwgZmlsZUhvbGRlci5maWxlLCB0aGlzLmhlYWRlcnMsIHRoaXMucGFydE5hbWUsIGN1c3RvbUZvcm0sIHRoaXMud2l0aENyZWRlbnRpYWxzKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIHJlc3BvbnNlID0+IHRoaXMub25SZXNwb25zZShyZXNwb25zZSwgZmlsZUhvbGRlciksXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblJlc3BvbnNlKGVycm9yLCBmaWxlSG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRmlsZShmaWxlSG9sZGVyKTtcbiAgICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cGxvYWRGaW5pc2hlZC5lbWl0KGZpbGVIb2xkZXIpO1xuICAgIH1cbiAgfVxufVxuIl19