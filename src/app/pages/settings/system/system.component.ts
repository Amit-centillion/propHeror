import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanySettingsService } from 'src/app/modules/auth/services/company-settings/company-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit{
  userData:any;
  public companySystemForm: FormGroup;
  companyId:any;
  companySystemData:any;
  submitted = false;
  CountryList:any = [];
  CurrencyList: any[] = [
    {code:"AFN",text:"Afghanistan Afghanis – AFN"},
    {code:"ALL",text:"Albania Leke – ALL"},
    {code:"DZD",text:"Algeria Dinars – DZD"},
    {code:"ARS",text:"Argentina Pesos – ARS"},
    {code:"AUD",text:"Australia Dollars – AUD"},
    {code:"ATS",text:"Austria Schillings – ATS"},
    {code:"BSD",text:"Bahamas Dollars – BSD"},
    {code:"BHD",text:"Bahrain Dinars – BHD"},
    {code:"BDT",text:"Bangladesh Taka – BDT"},
    {code:"BBD",text:"Barbados Dollars – BBD"},
    {code:"BEF",text:"Belgium Francs – BEF"},
    {code:"BMD",text:"Bermuda Dollars – BMD"},
    {code:"BRL",text:"Brazil Reais – BRL"},
    {code:"BGN",text:"Bulgaria Leva – BGN"},
    {code:"CAD",text:"Canada Dollars – CAD"},
    {code:"XOF",text:"CFA BCEAO Francs – XOF"},
    {code:"XAF",text:"CFA BEAC Francs – XAF"},
    {code:"CLP",text:"Chile Pesos – CLP"},
    {code:"CNY",text:"China Yuan Renminbi – CNY"},
    {code:"COP",text:"Colombia Pesos – COP"},
    {code:"XPF",text:"CFP Francs – XPF"},
    {code:"CRC",text:"Costa Rica Colones – CRC"},
    {code:"HRK",text:"Croatia Kuna – HRK"},
    {code:"CYP",text:"Cyprus Pounds – CYP"},
    {code:"CZK",text:"Czech Republic Koruny – CZK"},
    {code:"DKK",text:"Denmark Kroner – DKK"},
    {code:"DEM",text:"Deutsche (Germany) Marks – DEM"},
    {code:"DOP",text:"Dominican Republic Pesos – DOP"},
    {code:"NLG",text:"Dutch (Netherlands) Guilders - NLG"},
    {code:"XCD",text:"Eastern Caribbean Dollars – XCD"},
    {code:"EGP",text:"Egypt Pounds – EGP"},
    {code:"EEK",text:"Estonia Krooni – EEK"},
    {code:"EUR",text:"Euro – EUR"},
    {code:"FJD",text:"Fiji Dollars – FJD"},
    {code:"FIM",text:"Finland Markkaa – FIM"},
    {code:"FRF",text:"France Francs – FRF"},
    {code:"DEM",text:"Germany Deutsche Marks – DEM"},
    {code:"XAU",text:"Gold Ounces – XAU"},
    {code:"GRD",text:"Greece Drachmae – GRD"},
    {code:"GTQ",text:"Guatemalan Quetzal – GTQ"},
    {code:"NLG",text:"Holland (Netherlands) Guilders – NLG"},
    {code:"HKD",text:"Hong Kong Dollars – HKD"},
    {code:"HUF",text:"Hungary Forint – HUF"},
    {code:"ISK",text:"Iceland Kronur – ISK"},
    {code:"XDR",text:"IMF Special Drawing Right – XDR"},
    {code:"INR",text:"India Rupees – INR"},
    {code:"IDR",text:"Indonesia Rupiahs – IDR"},
    {code:"IRR",text:"Iran Rials – IRR"},
    {code:"IQD",text:"Iraq Dinars – IQD"},
    {code:"IEP",text:"Ireland Pounds – IEP"},
    {code:"ILS",text:"Israel New Shekels – ILS"},
    {code:"ITL",text:"Italy Lire – ITL"},
    {code:"JMD",text:"Jamaica Dollars – JMD"},
    {code:"JPY",text:"Japan Yen – JPY"},
    {code:"JOD",text:"Jordan Dinars – JOD"},
    {code:"KES",text:"Kenya Shillings – KES"},
    {code:"KRW",text:"Korea (South) Won – KRW"},
    {code:"KWD",text:"Kuwait Dinars – KWD"},
    {code:"LBP",text:"Lebanon Pounds – LBP"},
    {code:"LUF",text:"Luxembourg Francs – LUF"},
    {code:"MYR",text:"Malaysia Ringgits – MYR"},
    {code:"MTL",text:"Malta Liri – MTL"},
    {code:"MUR",text:"Mauritius Rupees – MUR"},
    {code:"MXN",text:"Mexico Pesos – MXN"},
    {code:"MAD",text:"Morocco Dirhams – MAD"},
    {code:"NLG",text:"Netherlands Guilders – NLG"},
    {code:"NZD",text:"New Zealand Dollars – NZD"},
    {code:"NOK",text:"Norway Kroner – NOK"},
    {code:"OMR",text:"Oman Rials – OMR"},
    {code:"PKR",text:"Pakistan Rupees – PKR"},
    {code:"XPD",text:"Palladium Ounces – XPD"},
    {code:"PEN",text:"Peru Nuevos Soles – PEN"},
    {code:"PHP",text:"Philippines Pesos – PHP"},
    {code:"XPT",text:"Platinum Ounces – XPT"},
    {code:"PLN",text:"Poland Zlotych – PLN"},
    {code:"PTE",text:"Portugal Escudos – PTE"},
    {code:"QAR",text:"Qatar Riyals – QAR"},
    {code:"RON",text:"Romania New Lei – RON"},
    {code:"ROL",text:"Romania Lei – ROL"},
    {code:"RUB",text:"Russia Rubles – RUB"},
    {code:"SAR",text:"Saudi Arabia Riyals – SAR"},
    {code:"XAG",text:"Silver Ounces – XAG"},
    {code:"SGD",text:"Singapore Dollars – SGD"},
    {code:"SKK",text:"Slovakia Koruny – SKK"},
    {code:"SIT",text:"Slovenia Tolars – SIT"},
    {code:"ZAR",text:"South Africa Rand – ZAR"},
    {code:"KRW",text:"South Korea Won – KRW"},
    {code:"ESP",text:"Spain Pesetas – ESP"},
    {code:"XDR",text:"Special Drawing Rights (IMF) – XDR"},
    {code:"LKR",text:"Sri Lanka Rupees – LKR"},
    {code:"SDD",text:"Sudan Dinars – SDD"},
    {code:"SEK",text:"Sweden Kronor – SEK"},
    {code:"CHF",text:"Switzerland Francs – CHF"},
    {code:"TWD",text:"Taiwan New Dollars – TWD"},
    {code:"THB",text:"Thailand Baht – THB"},
    {code:"TTD",text:"Trinidad and Tobago Dollars – TTD"},
    {code:"TND",text:"Tunisia Dinars – TND"},
    {code:"TRY",text:"Turkey New Lira – TRY"},
    {code:"AED",text:"United Arab Emirates Dirhams – AED"},
    {code:"GBP",text:"United Kingdom Pounds – GBP"},
    {code:"USD",text:"United States Dollars – USD"},
    {code:"VEB",text:"Venezuela Bolivares – VEB"},
    {code:"VND",text:"Vietnam Dong – VND"},
    {code:"ZMK",text:"Zambia Kwacha – ZMK"},
    ];

    timeZoneData = [
      "Africa/Abidjan",
      "Africa/Accra",
      "Africa/Addis_Ababa",
      "Africa/Algiers",
      "Africa/Asmara",
      "Africa/Asmera",
      "Africa/Bamako",
      "Africa/Bangui",
      "Africa/Banjul",
      "Africa/Bissau",
      "Africa/Blantyre",
      "Africa/Brazzaville",
      "Africa/Bujumbura",
      "Africa/Cairo",
      "Africa/Casablanca",
      "Africa/Ceuta",
      "Africa/Conakry",
      "Africa/Dakar",
      "Africa/Dar_es_Salaam",
      "Africa/Djibouti",
      "Africa/Douala",
      "Africa/El_Aaiun",
      "Africa/Freetown",
      "Africa/Gaborone",
      "Africa/Harare",
      "Africa/Johannesburg",
      "Africa/Juba",
      "Africa/Kampala",
      "Africa/Khartoum",
      "Africa/Kigali",
      "Africa/Kinshasa",
      "Africa/Lagos",
      "Africa/Libreville",
      "Africa/Lome",
      "Africa/Luanda",
      "Africa/Lubumbashi",
      "Africa/Lusaka",
      "Africa/Malabo",
      "Africa/Maputo",
      "Africa/Maseru",
      "Africa/Mbabane",
      "Africa/Mogadishu",
      "Africa/Monrovia",
      "Africa/Nairobi",
      "Africa/Ndjamena",
      "Africa/Niamey",
      "Africa/Nouakchott",
      "Africa/Ouagadougou",
      "Africa/Porto-Novo",
      "Africa/Sao_Tome",
      "Africa/Timbuktu",
      "Africa/Tripoli",
      "Africa/Tunis",
      "Africa/Windhoek",
      "America/Adak",
      "America/Anchorage",
      "America/Anguilla",
      "America/Antigua",
      "America/Araguaina",
      "America/Argentina/Buenos_Aires",
      "America/Argentina/Catamarca",
      "America/Argentina/ComodRivadavia",
      "America/Argentina/Cordoba",
      "America/Argentina/Jujuy",
      "America/Argentina/La_Rioja",
      "America/Argentina/Mendoza",
      "America/Argentina/Rio_Gallegos",
      "America/Argentina/Salta",
      "America/Argentina/San_Juan",
      "America/Argentina/San_Luis",
      "America/Argentina/Tucuman",
      "America/Argentina/Ushuaia",
      "America/Aruba",
      "America/Asuncion",
      "America/Atikokan",
      "America/Atka",
      "America/Bahia",
      "America/Bahia_Banderas",
      "America/Barbados",
      "America/Belem",
      "America/Belize",
      "America/Blanc-Sablon",
      "America/Boa_Vista",
      "America/Bogota",
      "America/Boise",
      "America/Buenos_Aires",
      "America/Cambridge_Bay",
      "America/Campo_Grande",
      "America/Cancun",
      "America/Caracas",
      "America/Catamarca",
      "America/Cayenne",
      "America/Cayman",
      "America/Chicago",
      "America/Chihuahua",
      "America/Coral_Harbour",
      "America/Cordoba",
      "America/Costa_Rica",
      "America/Creston",
      "America/Cuiaba",
      "America/Curacao",
      "America/Danmarkshavn",
      "America/Dawson",
      "America/Dawson_Creek",
      "America/Denver",
      "America/Detroit",
      "America/Dominica",
      "America/Edmonton",
      "America/Eirunepe",
      "America/El_Salvador",
      "America/Ensenada",
      "America/Fort_Nelson",
      "America/Fort_Wayne",
      "America/Fortaleza",
      "America/Glace_Bay",
      "America/Godthab",
      "America/Goose_Bay",
      "America/Grand_Turk",
      "America/Grenada",
      "America/Guadeloupe",
      "America/Guatemala",
      "America/Guayaquil",
      "America/Guyana",
      "America/Halifax",
      "America/Havana",
      "America/Hermosillo",
      "America/Indiana/Indianapolis",
      "America/Indiana/Knox",
      "America/Indiana/Marengo",
      "America/Indiana/Petersburg",
      "America/Indiana/Tell_City",
      "America/Indiana/Vevay",
      "America/Indiana/Vincennes",
      "America/Indiana/Winamac",
      "America/Indianapolis",
      "America/Inuvik",
      "America/Iqaluit",
      "America/Jamaica",
      "America/Jujuy",
      "America/Juneau",
      "America/Kentucky/Louisville",
      "America/Kentucky/Monticello",
      "America/Knox_IN",
      "America/Kralendijk",
      "America/La_Paz",
      "America/Lima",
      "America/Los_Angeles",
      "America/Louisville",
      "America/Lower_Princes",
      "America/Maceio",
      "America/Managua",
      "America/Manaus",
      "America/Marigot",
      "America/Martinique",
      "America/Matamoros",
      "America/Mazatlan",
      "America/Mendoza",
      "America/Menominee",
      "America/Merida",
      "America/Metlakatla",
      "America/Mexico_City",
      "America/Miquelon",
      "America/Moncton",
      "America/Monterrey",
      "America/Montevideo",
      "America/Montreal",
      "America/Montserrat",
      "America/Nassau",
      "America/New_York",
      "America/Nipigon",
      "America/Nome",
      "America/Noronha",
      "America/North_Dakota/Beulah",
      "America/North_Dakota/Center",
      "America/North_Dakota/New_Salem",
      "America/Ojinaga",
      "America/Panama",
      "America/Pangnirtung",
      "America/Paramaribo",
      "America/Phoenix",
      "America/Port-au-Prince",
      "America/Port_of_Spain",
      "America/Porto_Acre",
      "America/Porto_Velho",
      "America/Puerto_Rico",
      "America/Punta_Arenas",
      "America/Rainy_River",
      "America/Rankin_Inlet",
      "America/Recife",
      "America/Regina",
      "America/Resolute",
      "America/Rio_Branco",
      "America/Rosario",
      "America/Santa_Isabel",
      "America/Santarem",
      "America/Santiago",
      "America/Santo_Domingo",
      "America/Sao_Paulo",
      "America/Scoresbysund",
      "America/Shiprock",
      "America/Sitka",
      "America/St_Barthelemy",
      "America/St_Johns",
      "America/St_Kitts",
      "America/St_Lucia",
      "America/St_Thomas",
      "America/St_Vincent",
      "America/Swift_Current",
      "America/Tegucigalpa",
      "America/Thule",
      "America/Thunder_Bay",
      "America/Tijuana",
      "America/Toronto",
      "America/Tortola",
      "America/Vancouver",
      "America/Virgin",
      "America/Whitehorse",
      "America/Winnipeg",
      "America/Yakutat",
      "America/Yellowknife",
      "Antarctica/Casey",
      "Antarctica/Davis",
      "Antarctica/DumontDUrville",
      "Antarctica/Macquarie",
      "Antarctica/Mawson",
      "Antarctica/McMurdo",
      "Antarctica/Palmer",
      "Antarctica/Rothera",
      "Antarctica/South_Pole",
      "Antarctica/Syowa",
      "Antarctica/Troll",
      "Antarctica/Vostok",
      "Arctic/Longyearbyen",
      "Asia/Aden",
      "Asia/Almaty",
      "Asia/Amman",
      "Asia/Anadyr",
      "Asia/Aqtau",
      "Asia/Aqtobe",
      "Asia/Ashgabat",
      "Asia/Ashkhabad",
      "Asia/Atyrau",
      "Asia/Baghdad",
      "Asia/Bahrain",
      "Asia/Baku",
      "Asia/Bangkok",
      "Asia/Barnaul",
      "Asia/Beirut",
      "Asia/Bishkek",
      "Asia/Brunei",
      "Asia/Calcutta",
      "Asia/Chita",
      "Asia/Choibalsan",
      "Asia/Chongqing",
      "Asia/Chungking",
      "Asia/Colombo",
      "Asia/Dacca",
      "Asia/Damascus",
      "Asia/Dhaka",
      "Asia/Dili",
      "Asia/Dubai",
      "Asia/Dushanbe",
      "Asia/Famagusta",
      "Asia/Gaza",
      "Asia/Harbin",
      "Asia/Hebron",
      "Asia/Ho_Chi_Minh",
      "Asia/Hong_Kong",
      "Asia/Hovd",
      "Asia/Irkutsk",
      "Asia/Istanbul",
      "Asia/Jakarta",
      "Asia/Jayapura",
      "Asia/Jerusalem",
      "Asia/Kabul",
      "Asia/Kamchatka",
      "Asia/Karachi",
      "Asia/Kashgar",
      "Asia/Kathmandu",
      "Asia/Katmandu",
      "Asia/Khandyga",
      "Asia/Kolkata",
      "Asia/Krasnoyarsk",
      "Asia/Kuala_Lumpur",
      "Asia/Kuching",
      "Asia/Kuwait",
      "Asia/Macao",
      "Asia/Macau",
      "Asia/Magadan",
      "Asia/Makassar",
      "Asia/Manila",
      "Asia/Muscat",
      "Asia/Nicosia",
      "Asia/Novokuznetsk",
      "Asia/Novosibirsk",
      "Asia/Omsk",
      "Asia/Oral",
      "Asia/Phnom_Penh",
      "Asia/Pontianak",
      "Asia/Pyongyang",
      "Asia/Qatar",
      "Asia/Qostanay",
      "Asia/Qyzylorda",
      "Asia/Rangoon",
      "Asia/Riyadh",
      "Asia/Saigon",
      "Asia/Sakhalin",
      "Asia/Samarkand",
      "Asia/Seoul",
      "Asia/Shanghai",
      "Asia/Singapore",
      "Asia/Srednekolymsk",
      "Asia/Taipei",
      "Asia/Tashkent",
      "Asia/Tbilisi",
      "Asia/Tehran",
      "Asia/Tel_Aviv",
      "Asia/Thimbu",
      "Asia/Thimphu",
      "Asia/Tokyo",
      "Asia/Tomsk",
      "Asia/Ujung_Pandang",
      "Asia/Ulaanbaatar",
      "Asia/Ulan_Bator",
      "Asia/Urumqi",
      "Asia/Ust-Nera",
      "Asia/Vientiane",
      "Asia/Vladivostok",
      "Asia/Yakutsk",
      "Asia/Yangon",
      "Asia/Yekaterinburg",
      "Asia/Yerevan",
      "Atlantic/Azores",
      "Atlantic/Bermuda",
      "Atlantic/Canary",
      "Atlantic/Cape_Verde",
      "Atlantic/Faeroe",
      "Atlantic/Faroe",
      "Atlantic/Jan_Mayen",
      "Atlantic/Madeira",
      "Atlantic/Reykjavik",
      "Atlantic/South_Georgia",
      "Atlantic/St_Helena",
      "Atlantic/Stanley",
      "Australia/ACT",
      "Australia/Adelaide",
      "Australia/Brisbane",
      "Australia/Broken_Hill",
      "Australia/Canberra",
      "Australia/Currie",
      "Australia/Darwin",
      "Australia/Eucla",
      "Australia/Hobart",
      "Australia/LHI",
      "Australia/Lindeman",
      "Australia/Lord_Howe",
      "Australia/Melbourne",
      "Australia/NSW",
      "Australia/North",
      "Australia/Perth",
      "Australia/Queensland",
      "Australia/South",
      "Australia/Sydney",
      "Australia/Tasmania",
      "Australia/Victoria",
      "Australia/West",
      "Australia/Yancowinna",
      "Brazil/Acre",
      "Brazil/DeNoronha",
      "Brazil/East",
      "Brazil/West",
      "CET",
      "CST6CDT",
      "Canada/Atlantic",
      "Canada/Central",
      "Canada/Eastern",
      "Canada/Mountain",
      "Canada/Newfoundland",
      "Canada/Pacific",
      "Canada/Saskatchewan",
      "Canada/Yukon",
      "Chile/Continental",
      "Chile/EasterIsland",
      "Cuba",
      "EET",
      "EST",
      "EST5EDT",
      "Egypt",
      "Eire",
      "Etc/GMT",
      "Etc/GMT+0",
      "Etc/GMT+1",
      "Etc/GMT+10",
      "Etc/GMT+11",
      "Etc/GMT+12",
      "Etc/GMT+2",
      "Etc/GMT+3",
      "Etc/GMT+4",
      "Etc/GMT+5",
      "Etc/GMT+6",
      "Etc/GMT+7",
      "Etc/GMT+8",
      "Etc/GMT+9",
      "Etc/GMT-0",
      "Etc/GMT-1",
      "Etc/GMT-10",
      "Etc/GMT-11",
      "Etc/GMT-12",
      "Etc/GMT-13",
      "Etc/GMT-14",
      "Etc/GMT-2",
      "Etc/GMT-3",
      "Etc/GMT-4",
      "Etc/GMT-5",
      "Etc/GMT-6",
      "Etc/GMT-7",
      "Etc/GMT-8",
      "Etc/GMT-9",
      "Etc/GMT0",
      "Etc/Greenwich",
      "Etc/UCT",
      "Etc/UTC",
      "Etc/Universal",
      "Etc/Zulu",
      "Europe/Amsterdam",
      "Europe/Andorra",
      "Europe/Astrakhan",
      "Europe/Athens",
      "Europe/Belfast",
      "Europe/Belgrade",
      "Europe/Berlin",
      "Europe/Bratislava",
      "Europe/Brussels",
      "Europe/Bucharest",
      "Europe/Budapest",
      "Europe/Busingen",
      "Europe/Chisinau",
      "Europe/Copenhagen",
      "Europe/Dublin",
      "Europe/Gibraltar",
      "Europe/Guernsey",
      "Europe/Helsinki",
      "Europe/Isle_of_Man",
      "Europe/Istanbul",
      "Europe/Jersey",
      "Europe/Kaliningrad",
      "Europe/Kiev",
      "Europe/Kirov",
      "Europe/Lisbon",
      "Europe/Ljubljana",
      "Europe/London",
      "Europe/Luxembourg",
      "Europe/Madrid",
      "Europe/Malta",
      "Europe/Mariehamn",
      "Europe/Minsk",
      "Europe/Monaco",
      "Europe/Moscow",
      "Europe/Nicosia",
      "Europe/Oslo",
      "Europe/Paris",
      "Europe/Podgorica",
      "Europe/Prague",
      "Europe/Riga",
      "Europe/Rome",
      "Europe/Samara",
      "Europe/San_Marino",
      "Europe/Sarajevo",
      "Europe/Saratov",
      "Europe/Simferopol",
      "Europe/Skopje",
      "Europe/Sofia",
      "Europe/Stockholm",
      "Europe/Tallinn",
      "Europe/Tirane",
      "Europe/Tiraspol",
      "Europe/Ulyanovsk",
      "Europe/Uzhgorod",
      "Europe/Vaduz",
      "Europe/Vatican",
      "Europe/Vienna",
      "Europe/Vilnius",
      "Europe/Volgograd",
      "Europe/Warsaw",
      "Europe/Zagreb",
      "Europe/Zaporozhye",
      "Europe/Zurich",
      "GB",
      "GB-Eire",
      "GMT",
      "GMT+0",
      "GMT-0",
      "GMT0",
      "Greenwich",
      "HST",
      "Hongkong",
      "Iceland",
      "Indian/Antananarivo",
      "Indian/Chagos",
      "Indian/Christmas",
      "Indian/Cocos",
      "Indian/Comoro",
      "Indian/Kerguelen",
      "Indian/Mahe",
      "Indian/Maldives",
      "Indian/Mauritius",
      "Indian/Mayotte",
      "Indian/Reunion",
      "Iran",
      "Israel",
      "Jamaica",
      "Japan",
      "Kwajalein",
      "Libya",
      "MET",
      "MST",
      "MST7MDT",
      "Mexico/BajaNorte",
      "Mexico/BajaSur",
      "Mexico/General",
      "NZ",
      "NZ-CHAT",
      "Navajo",
      "PRC",
      "PST8PDT",
      "Pacific/Apia",
      "Pacific/Auckland",
      "Pacific/Bougainville",
      "Pacific/Chatham",
      "Pacific/Chuuk",
      "Pacific/Easter",
      "Pacific/Efate",
      "Pacific/Enderbury",
      "Pacific/Fakaofo",
      "Pacific/Fiji",
      "Pacific/Funafuti",
      "Pacific/Galapagos",
      "Pacific/Gambier",
      "Pacific/Guadalcanal",
      "Pacific/Guam",
      "Pacific/Honolulu",
      "Pacific/Johnston",
      "Pacific/Kiritimati",
      "Pacific/Kosrae",
      "Pacific/Kwajalein",
      "Pacific/Majuro",
      "Pacific/Marquesas",
      "Pacific/Midway",
      "Pacific/Nauru",
      "Pacific/Niue",
      "Pacific/Norfolk",
      "Pacific/Noumea",
      "Pacific/Pago_Pago",
      "Pacific/Palau",
      "Pacific/Pitcairn",
      "Pacific/Pohnpei",
      "Pacific/Ponape",
      "Pacific/Port_Moresby",
      "Pacific/Rarotonga",
      "Pacific/Saipan",
      "Pacific/Samoa",
      "Pacific/Tahiti",
      "Pacific/Tarawa",
      "Pacific/Tongatapu",
      "Pacific/Truk",
      "Pacific/Wake",
      "Pacific/Wallis",
      "Pacific/Yap",
      "Poland",
      "Portugal",
      "ROC",
      "ROK",
      "Singapore",
      "Turkey",
      "UCT",
      "US/Alaska",
      "US/Aleutian",
      "US/Arizona",
      "US/Central",
      "US/East-Indiana",
      "US/Eastern",
      "US/Hawaii",
      "US/Indiana-Starke",
      "US/Michigan",
      "US/Mountain",
      "US/Pacific",
      "US/Pacific-New",
      "US/Samoa",
      "UTC",
      "Universal",
      "W-SU",
      "WET",
      "Zulu"
    ];

    measuringUnitList:any[]=[
      {id:1,name:'Square Feet'},{id:2,name:'Square Meter'}
    ]

  constructor(
    private formBuilder: FormBuilder,
    private companySettinsService:CompanySettingsService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.companySystemForm = this.formBuilder.group({
      countryId: new FormControl(null,[Validators.required]),
      currency: new FormControl('', [Validators.required]),
      measuringUnit: new FormControl('', [Validators.required]),
      timezone:  new FormControl('', [Validators.required]),
    });
    var userData = localStorage.getItem('usercred');
    if(userData != null){
      this.userData= JSON.parse(userData);
      }
    this.userData!= null ? this.companyId = this.userData.companyId : this.companyId = 1;
  }

  async ngOnInit(): Promise<void> {
    var country = await this.GetCountry();
    var currencyList = await this.GetCurrencyList();
    var measuringUnit = await this.GetMeasurementUnit();
    var timeZones = await this.GetTimeZonesList();
    this.getCompanyInfo();
  }

  async GetCountry():Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      this.companySettinsService
        .getSystemCountries()
        .subscribe(
          (data: any) => {
            if (data) {
              this.CountryList = data;
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  } 

  async GetTimeZonesList():Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      this.companySettinsService
        .getTimeZoneList()
        .subscribe(
          (data: any) => {
            if (data) {
              this.timeZoneData = data;
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  }

  async GetMeasurementUnit():Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      this.companySettinsService
        .getMeasurementUnits()
        .subscribe(
          (data: any) => {
            if (data) {
              this.measuringUnitList = data;
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  }

  async GetCurrencyList():Promise<any> {
    return new Promise<boolean>((resolve, reject) => {
      this.companySettinsService
        .getCurrencyList()
        .subscribe(
          (data: any) => {
            if (data) {
              this.CurrencyList = data;
              resolve(true);
            } else {
              resolve(false);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  }

  save(){
    this.submitted = true;
    if(this.companySystemForm.valid){
    const body = this.companySystemForm.value;
    this.companyId == null ? body.companyId= 0 : body.companyId = this.companyId;
    this.companySettinsService
    .setCompanySystemSettings(body)
    .subscribe((data: any | undefined) => {
     // this.toastr.success('System added successfully.');
     // this.getCompanyInfo();
     if( data.status === 200){
       this.toastr.success('System updated successfully');
       this.getCompanyInfo();
     }
     else{
       this.toastr.error('Something went wrong...');
     }
    });
  }
  }

  getCompanyInfo(){
    this.companySettinsService
      .getCompanySystemSettings(this.companyId)
      .subscribe((data: any | undefined) => {
        this.companySystemData = data[0];
        if(this.companySystemData){
          this.companySystemForm.controls['currency'].setValue(this.companySystemData.currency);
          this.companySystemForm.controls['measuringUnit'].setValue(this.companySystemData.measuringUnit);
          this.companySystemForm.controls['timezone'].setValue(this.companySystemData.timezone);
          this.companySystemForm.controls['countryId'].setValue(this.companySystemData.countryId);
        }
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.companySystemForm.controls;
  }

}
