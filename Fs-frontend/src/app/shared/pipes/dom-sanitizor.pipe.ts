import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'sanatize',
    pure: true
})

export class SanatizerPipe implements PipeTransform {

    constructor(private _DomSanitizationService: DomSanitizer) { }

    transform(url: any): SafeUrl {
        if (!url) {
            return;
        }
        else {
            url = url.replace("\"", '');
            url = url.replace("\"", '');
            console.log("sanitisdsssss", url,this._DomSanitizationService.bypassSecurityTrustUrl(url))
           return this._DomSanitizationService.bypassSecurityTrustUrl(url);
        }
    }
}