/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export class ImageUploadService {
    /**
     * @param {?} http
     */
    constructor(http) {
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
    uploadImage(url, image, headers, partName = 'image', customFormData, withCredentials) {
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        /** @type {?} */
        const formData = new FormData();
        if (customFormData) {
            for (const key of Object.keys(customFormData)) {
                formData.append(key, customFormData[key]);
            }
        }
        formData.append(partName, image);
        return this.http.post(url, formData, { withCredentials, headers, observe: 'response' });
    }
}
ImageUploadService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ImageUploadService.ctorParameters = () => [
    { type: HttpClient }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImageUploadService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtdXBsb2FkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9iYjJzLWltYWdlLXVwbG9hZC8iLCJzb3VyY2VzIjpbImxpYi9pbWFnZS11cGxvYWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBNkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFDN0IsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUNwQyxDQUFDOzs7Ozs7Ozs7O0lBRU0sV0FBVyxDQUFDLEdBQVcsRUFDWCxLQUFXLEVBQ1gsT0FBNkQsRUFDN0QsV0FBbUIsT0FBTyxFQUMxQixjQUFvRCxFQUNwRCxlQUF5QjtRQUMxQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3ZFOztjQUVLLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUUvQixJQUFJLGNBQWMsRUFBRTtZQUNsQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzdDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7UUFFRCxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7OztZQTFCRixVQUFVOzs7O1lBSkYsVUFBVTs7Ozs7OztJQU1MLGtDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbWFnZVVwbG9hZFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWRJbWFnZSh1cmw6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgIGltYWdlOiBGaWxlLFxuICAgICAgICAgICAgICAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzIHwgeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW10gfSxcbiAgICAgICAgICAgICAgICAgICAgIHBhcnROYW1lOiBzdHJpbmcgPSAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRm9ybURhdGE/OiB7IFtoZWFkZXI6IHN0cmluZ106IHN0cmluZyB8IEJsb2IgfSxcbiAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+PiB7XG4gICAgaWYgKCF1cmwgfHwgdXJsID09PSAnJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcmwgaXMgbm90IHNldCEgUGxlYXNlIHNldCBpdCBiZWZvcmUgZG9pbmcgcXVlcmllcycpO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICBpZiAoY3VzdG9tRm9ybURhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGN1c3RvbUZvcm1EYXRhKSkge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBjdXN0b21Gb3JtRGF0YVtrZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocGFydE5hbWUsIGltYWdlKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGZvcm1EYXRhLCB7IHdpdGhDcmVkZW50aWFscywgaGVhZGVycywgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KTtcbiAgfVxufVxuIl19