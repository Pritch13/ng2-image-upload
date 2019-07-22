/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var ImageUploadService = /** @class */ (function () {
    function ImageUploadService(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @param {?} image
     * @param {?=} headers
     * @param {?=} partName
     * @param {?=} customFormData
     * @param {?=} withCredentials
     * @return {?}
     */
    ImageUploadService.prototype.uploadImage = /**
     * @param {?} url
     * @param {?} image
     * @param {?=} headers
     * @param {?=} partName
     * @param {?=} customFormData
     * @param {?=} withCredentials
     * @return {?}
     */
    function (url, image, headers, partName, customFormData, withCredentials) {
        if (partName === void 0) { partName = 'image'; }
        var e_1, _a;
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        /** @type {?} */
        var formData = new FormData();
        if (customFormData) {
            try {
                for (var _b = tslib_1.__values(Object.keys(customFormData)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    formData.append(key, customFormData[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        formData.append(partName, image);
        return this.http.post(url, formData, { withCredentials: withCredentials, headers: headers, observe: 'response' });
    };
    ImageUploadService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ImageUploadService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return ImageUploadService;
}());
export { ImageUploadService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImageUploadService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtdXBsb2FkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9iYjJzLWltYWdlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS11cGxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQTZCLE1BQU0sc0JBQXNCLENBQUM7QUFDN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQztJQUVFLDRCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQ3BDLENBQUM7Ozs7Ozs7Ozs7SUFFTSx3Q0FBVzs7Ozs7Ozs7O0lBQWxCLFVBQW1CLEdBQVcsRUFDWCxLQUFXLEVBQ1gsT0FBNkQsRUFDN0QsUUFBMEIsRUFDMUIsY0FBb0QsRUFDcEQsZUFBeUI7UUFGekIseUJBQUEsRUFBQSxrQkFBMEI7O1FBRzNDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7U0FDdkU7O1lBRUssUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFO1FBRS9CLElBQUksY0FBYyxFQUFFOztnQkFDbEIsS0FBa0IsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7b0JBQTFDLElBQU0sR0FBRyxXQUFBO29CQUNaLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMzQzs7Ozs7Ozs7O1NBQ0Y7UUFFRCxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxlQUFlLGlCQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQzs7Z0JBMUJGLFVBQVU7Ozs7Z0JBSkYsVUFBVTs7SUErQm5CLHlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0ExQlksa0JBQWtCOzs7Ozs7SUFDakIsa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEltYWdlVXBsb2FkU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICB9XG5cbiAgcHVibGljIHVwbG9hZEltYWdlKHVybDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IEZpbGUsXG4gICAgICAgICAgICAgICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9LFxuICAgICAgICAgICAgICAgICAgICAgcGFydE5hbWU6IHN0cmluZyA9ICdpbWFnZScsXG4gICAgICAgICAgICAgICAgICAgICBjdXN0b21Gb3JtRGF0YT86IHsgW2hlYWRlcjogc3RyaW5nXTogc3RyaW5nIHwgQmxvYiB9LFxuICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICBpZiAoIXVybCB8fCB1cmwgPT09ICcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VybCBpcyBub3Qgc2V0ISBQbGVhc2Ugc2V0IGl0IGJlZm9yZSBkb2luZyBxdWVyaWVzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgIGlmIChjdXN0b21Gb3JtRGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VzdG9tRm9ybURhdGEpKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGN1c3RvbUZvcm1EYXRhW2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChwYXJ0TmFtZSwgaW1hZ2UpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHsgd2l0aENyZWRlbnRpYWxzLCBoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnIH0pO1xuICB9XG59XG4iXX0=