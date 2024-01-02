import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ListingService } from 'src/app/modules/auth/services/listing.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss'],
})
export class XmlComponent {
  xmlValue: string = `<?xml version="1.0" encoding="utf-8"?><root></root>`;

  xmlData: any;
  xmldata1: any;
  propertyFinderList: any;
  xml: any;
  paramas: any;
  questionSet: any;
  htmlData: any;
  displayData: boolean = false;
  xmlFinal = {
    list: {
      '@': {
        last_update: null,
        listing_count: null,
      },
      property: null,
    },
  };
  xmlDataMessage: any;
  currentUrl: string[];
  constructor(
    private http: HttpClient,
    private listingSevice: ListingService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.paramas = params;
      if (
        this.paramas.cl != undefined &&
        this.paramas.pid != undefined 
        // && this.paramas.acc != undefined
      ) {
        this.GetXMlFeesPropertyFinder(
          this.paramas.cl == undefined ? 0 : params.cl,
          this.paramas.pid == undefined ? 0 : params.pid,
          
        ); // { orderby: "price" }
      }
    });
  }
  GetXMlFeesPropertyFinder(cl: any, pid: any) {
    this.listingSevice
      .GetXMlFeesPropertyFinder(cl, pid)
      .subscribe((data: any | undefined) => {
        this.propertyFinderList = data.result;
        var updatepropertyPricing = data.result.list.property.map((x:any) => ({
          ...x,
          price: x.offering_type == 'RS' || x.offering_type == 'CS' ? x.price[0].price : [{ [x.price[0].name]: x.price[0].price }]
        }))
        if (pid == '1') {
          this.xmlFinal.list['@'].last_update =
            this.propertyFinderList.list.last_update;
          this.xmlFinal.list['@'].listing_count =
            this.propertyFinderList.list.listing_count;
        }
        this.propertyFinderList.list.property = updatepropertyPricing;
        this.xmlData = this.JSONtoXML(this.propertyFinderList);
        console.log('xmlData',this.xmlData)
        let blob = new Blob([this.xmlData], { type: 'text/xml' });
        let url = URL.createObjectURL(blob);
        var element = document.createElement('a');
        element.href = url;
        element.setAttribute('download', 'xmlFeed.xml');
        document.body.appendChild(element);
        element.click();
        // window.open(url, '_target');
        this.displayData = !this.displayData;
        this.cdr.detectChanges();
      });
  }

  JSONtoXML(obj: any) {
    let xml = '';
    for (let prop in obj) {
      if (
        prop != 'last_update' &&
        prop != 'listing_count' &&
        prop != 'url' &&
        prop != 'last_updated' &&
        prop != 'link' &&
        prop != 'watermark' &&
        prop != 'Images' &&
        prop != 'Image'
      ) {
        if (prop == 'list') {
          xml +=
            obj[prop] instanceof Array
              ? ''
              : '<' +
                prop +
                ' last_update="' +
                obj.list.last_update +
                '" listing_count="' +
                obj.list.listing_count +
                '">';
        } else if (prop == 'photos') {
          xml += '<photo>';
          if (obj[prop].length > 0) {
            for (let array1 in obj[prop]) {
              xml +=
                '<url' +
                ' last_update="' +
                obj[prop][array1].last_updated +                
                '">';
              xml += obj[prop][array1].link.toString();
              xml += '</url>';
              console.log('xmlphotos',xml);
            }
          }
          xml += '</photo>';
        } else if (prop == 'floor_plan') {
          xml += '<floor_plan>';
          if (obj[prop].length > 0) {
            for (let array1 in obj[prop]) {
              xml +=
                '<url' +
                ' last_update="' +
                obj[prop][array1].last_updated +
                
                '">';
              xml += obj[prop][array1].link.toString();
              xml += '</url>';
              console.log('xmlflooerplan',xml);
            }
          }
          xml += '</floor_plan>';
        } else if (prop == 'Images') {
          xml += '<Images>';
          if (obj[prop].length > 0) {
            for (let array1 in obj[prop]) {
              xml += '<image>';
              xml += obj[prop][array1].image;
              xml += '</image>';
            }
          }
          xml += '</Images>';
        } else {
          xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
        }
        console.log('xml1', xml);
        if (obj[prop] instanceof Array) {
          for (let array in obj[prop]) {
            if (prop == 'property') {
              if (obj.property.length > 0) {
                xml +=
                  '<' +
                  prop +
                  ' last_update="' +
                  obj[prop][array].last_update +
                  '">';
                xml += this.JSONtoXML(new Object(obj[prop][array]));
                xml += '</' + prop + '>';
              }
            } else {
              if (
                prop != 'photos' &&
                prop != 'url' &&
                prop != 'last_updated' &&
                prop != 'link' &&
                prop != 'watermark' &&
                prop != 'Images' &&
                prop != 'Image' &&
                prop != 'floor_plan'
              ) {
                xml += '<' + prop + '>';
                xml += this.JSONtoXML(new Object(obj[prop][array]));
                xml += '</' + prop + '>';
                console.log('xml1array', xml);
              }
            }
          }
        } else if (
          typeof obj[prop] == 'object' &&
          prop != 'photos' &&
          prop != 'url' &&
          prop != 'last_updated' &&
          prop != 'link' &&
          prop != 'watermark' &&
          prop != 'Images' &&
          prop != 'Image' &&
          prop != 'floor_plan'
        ) {
          xml += this.JSONtoXML(new Object(obj[prop]));
          console.log('xmlElseif', xml);
        } else {
          if (
            prop != 'photos' &&
            prop != 'url' &&
            prop != 'last_updated' &&
            prop != 'link' &&
            prop != 'watermark' &&
            prop != 'Images' &&
            prop != 'Image' &&
            prop != 'floor_plan'
          ) {
            xml += obj[prop];
            console.log('xmlelse', xml);
          }
        }
        xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
        console.log('xml+', xml);
      }
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    console.log('xmlFull', xml);
    return xml;
  }
}
