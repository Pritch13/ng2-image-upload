/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
var FileDropDirective = /** @class */ (function () {
    function FileDropDirective() {
        this.fileOver = new EventEmitter();
        this.fileDrop = new EventEmitter();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.getDataTransfer = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    /**
     * @private
     * @param {?} types
     * @return {?}
     */
    FileDropDirective.hasFiles = /**
     * @private
     * @param {?} types
     * @return {?}
     */
    function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        if (types.contains) {
            return types.contains('Files');
        }
        return false;
    };
    /**
     * @private
     * @param {?} rule
     * @param {?} candidate
     * @return {?}
     */
    FileDropDirective.matchRule = /**
     * @private
     * @param {?} rule
     * @param {?} candidate
     * @return {?}
     */
    function (rule, candidate) {
        return new RegExp('^' + rule.split('*').join('.*') + '$').test(candidate);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var dataTransfer = FileDropDirective.getDataTransfer(event);
        if (!FileDropDirective.hasFiles(dataTransfer.types)) {
            return;
        }
        event.preventDefault();
        /** @type {?} */
        var files = this.filterFiles(dataTransfer.files);
        event.preventDefault();
        this.fileOver.emit(false);
        this.fileDrop.emit(files);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.fileOver.emit(false);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var dataTransfer = FileDropDirective.getDataTransfer(event);
        if (!FileDropDirective.hasFiles(dataTransfer.types)) {
            return;
        }
        dataTransfer.dropEffect = 'copy';
        event.preventDefault();
        this.fileOver.emit(true);
    };
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    FileDropDirective.prototype.filterFiles = /**
     * @private
     * @param {?} files
     * @return {?}
     */
    function (files) {
        if (!this.accept || this.accept.length === 0) {
            return files;
        }
        /** @type {?} */
        var acceptedFiles = [];
        for (var i = 0; i < files.length; i++) {
            for (var j = 0; j < this.accept.length; j++) {
                if (FileDropDirective.matchRule(this.accept[j], files[i].type)) {
                    acceptedFiles.push(files[i]);
                    break;
                }
            }
        }
        return acceptedFiles;
    };
    FileDropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fileDrop]'
                },] }
    ];
    FileDropDirective.propDecorators = {
        accept: [{ type: Input }],
        fileOver: [{ type: Output }],
        fileDrop: [{ type: Output }],
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }]
    };
    return FileDropDirective;
}());
export { FileDropDirective };
if (false) {
    /** @type {?} */
    FileDropDirective.prototype.accept;
    /** @type {?} */
    FileDropDirective.prototype.fileOver;
    /** @type {?} */
    FileDropDirective.prototype.fileDrop;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2JiMnMtaW1hZ2UtdXBsb2FkLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGO0lBQUE7UUFLWSxhQUFRLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDOUQsYUFBUSxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO0lBK0U1RSxDQUFDOzs7Ozs7SUE3RWdCLGlDQUFlOzs7OztJQUE5QixVQUErQixLQUFVO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDcEYsQ0FBQzs7Ozs7O0lBRWMsMEJBQVE7Ozs7O0lBQXZCLFVBQXdCLEtBQVU7UUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7OztJQUVjLDJCQUFTOzs7Ozs7SUFBeEIsVUFBeUIsSUFBWSxFQUFFLFNBQWlCO1FBQ3RELE9BQU8sSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs7OztJQUdELGtDQUFNOzs7O0lBRE4sVUFDTyxLQUFVOztZQUNULFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBRTdELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25ELE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7WUFFakIsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVsRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFHRCx1Q0FBVzs7OztJQURYLFVBQ1ksS0FBSztRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBR0Qsc0NBQVU7Ozs7SUFEVixVQUNXLEtBQVU7O1lBQ2IsWUFBWSxHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFFN0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkQsT0FBTztTQUNSO1FBRUQsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7OztJQUVPLHVDQUFXOzs7OztJQUFuQixVQUFvQixLQUFlO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkOztZQUVLLGFBQWEsR0FBVyxFQUFFO1FBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzlELGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE1BQU07aUJBQ1A7YUFDRjtTQUNGO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7Z0JBcEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozt5QkFFRSxLQUFLOzJCQUNMLE1BQU07MkJBQ04sTUFBTTt5QkEwQk4sWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs4QkFpQi9CLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7NkJBS3BDLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBK0J0Qyx3QkFBQztDQUFBLEFBckZELElBcUZDO1NBbEZZLGlCQUFpQjs7O0lBQzVCLG1DQUEwQjs7SUFDMUIscUNBQXdFOztJQUN4RSxxQ0FBMEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmaWxlRHJvcF0nXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVEcm9wRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgYWNjZXB0OiBzdHJpbmdbXTtcbiAgQE91dHB1dCgpIGZpbGVPdmVyOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBmaWxlRHJvcDogRXZlbnRFbWl0dGVyPEZpbGVMaXN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUxpc3Q+KCk7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0RGF0YVRyYW5zZmVyKGV2ZW50OiBhbnkpOiBEYXRhVHJhbnNmZXIge1xuICAgIHJldHVybiBldmVudC5kYXRhVHJhbnNmZXIgPyBldmVudC5kYXRhVHJhbnNmZXIgOiBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGhhc0ZpbGVzKHR5cGVzOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXR5cGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVzLmluZGV4T2YpIHtcbiAgICAgIHJldHVybiB0eXBlcy5pbmRleE9mKCdGaWxlcycpICE9PSAtMTtcbiAgICB9XG5cbiAgICBpZiAodHlwZXMuY29udGFpbnMpIHtcbiAgICAgIHJldHVybiB0eXBlcy5jb250YWlucygnRmlsZXMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBtYXRjaFJ1bGUocnVsZTogc3RyaW5nLCBjYW5kaWRhdGU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJ1bGUuc3BsaXQoJyonKS5qb2luKCcuKicpICsgJyQnKS50ZXN0KGNhbmRpZGF0ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgb25Ecm9wKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBkYXRhVHJhbnNmZXIgPSBGaWxlRHJvcERpcmVjdGl2ZS5nZXREYXRhVHJhbnNmZXIoZXZlbnQpO1xuXG4gICAgaWYgKCFGaWxlRHJvcERpcmVjdGl2ZS5oYXNGaWxlcyhkYXRhVHJhbnNmZXIudHlwZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5maWx0ZXJGaWxlcyhkYXRhVHJhbnNmZXIuZmlsZXMpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpO1xuICAgIHRoaXMuZmlsZURyb3AuZW1pdChmaWxlcyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBvbkRyYWdMZWF2ZShldmVudCkge1xuICAgIHRoaXMuZmlsZU92ZXIuZW1pdChmYWxzZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ092ZXIoZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IGRhdGFUcmFuc2ZlciA9IEZpbGVEcm9wRGlyZWN0aXZlLmdldERhdGFUcmFuc2ZlcihldmVudCk7XG5cbiAgICBpZiAoIUZpbGVEcm9wRGlyZWN0aXZlLmhhc0ZpbGVzKGRhdGFUcmFuc2Zlci50eXBlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuZmlsZU92ZXIuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZmlsdGVyRmlsZXMoZmlsZXM6IEZpbGVMaXN0KTogYW55IHtcbiAgICBpZiAoIXRoaXMuYWNjZXB0IHx8IHRoaXMuYWNjZXB0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZpbGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGFjY2VwdGVkRmlsZXM6IEZpbGVbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmFjY2VwdC5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoRmlsZURyb3BEaXJlY3RpdmUubWF0Y2hSdWxlKHRoaXMuYWNjZXB0W2pdLCBmaWxlc1tpXS50eXBlKSkge1xuICAgICAgICAgIGFjY2VwdGVkRmlsZXMucHVzaChmaWxlc1tpXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWNjZXB0ZWRGaWxlcztcbiAgfVxufVxuIl19