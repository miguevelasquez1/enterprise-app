import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-put-your-phone',
  templateUrl: './put-your-phone.page.html',
  styleUrls: ['./put-your-phone.page.scss'],
})
export class PutYourPhonePage implements OnInit {
  customPopoverOptions: any = {};

  countryCode = '+57';

  countries = [
    {
      emoji: '🇦🇫',
      code: '+93',
      name: 'Afghanistan',
    },
    {
      emoji: '🇦🇱',
      code: '+355',
      name: 'Albania',
    },
    {
      emoji: '🇩🇿',
      code: '+213',
      name: 'Algeria',
    },
    {
      emoji: '🇦🇸',
      code: '+1 684',
      name: 'American Samoa',
    },
    {
      emoji: '🇦🇩',
      code: '+376',
      name: 'Andorra',
    },
    {
      emoji: '🇦🇴',
      code: '+244',
      name: 'Angola',
    },
    {
      emoji: '🇦🇮',
      code: '+1 264',
      name: 'Anguilla',
    },
    {
      emoji: '🇦🇬',
      code: '+1 268',
      name: 'Antigua and Barbuda',
    },
    {
      emoji: '🇦🇷',
      code: '+54',
      name: 'Argentina',
    },
    {
      emoji: '🇦🇲',
      code: '+374',
      name: 'Armenia',
    },
    {
      emoji: '🇦🇼',
      code: '+297',
      name: 'Aruba',
    },
    {
      emoji: '🇦🇨',
      code: '+247',
      name: 'Ascension',
    },
    {
      emoji: '🇦🇹',
      code: '+61',
      name: 'Australia',
    },
    {
      emoji: '',
      code: '+672',
      name: 'Australian External Territories',
    },
    {
      emoji: '🇦🇹',
      code: '+43',
      name: 'Austria',
    },
    {
      emoji: '🇦🇿',
      code: '+994',
      name: 'Azerbaijan',
    },
    {
      emoji: '🇧🇸',
      code: '+1 242',
      name: 'Bahamas',
    },
    {
      emoji: '🇧🇭',
      code: '+973',
      name: 'Bahrain',
    },
    {
      emoji: '🇧🇩',
      code: '+880',
      name: 'Bangladesh',
    },
    {
      emoji: '🇧🇧',
      code: '+1 246',
      name: 'Barbados',
    },
    {
      emoji: '',
      code: '+1 268',
      name: 'Barbuda',
    },
    {
      emoji: '🇧🇾',
      code: '+375',
      name: 'Belarus',
    },
    {
      emoji: '🇧🇪',
      code: '+32',
      name: 'Belgium',
    },
    {
      emoji: '🇧🇿',
      code: '+501',
      name: 'Belize',
    },
    {
      emoji: '🇧🇯',
      code: '+229',
      name: 'Benin',
    },
    {
      emoji: '🇧🇲',
      code: '+1 441',
      name: 'Bermuda',
    },
    {
      emoji: '🇧🇹',
      code: '+975',
      name: 'Bhutan',
    },
    {
      emoji: '🇧🇴',
      code: '+591',
      name: 'Bolivia',
    },
    {
      emoji: '🇧🇦',
      code: '+387',
      name: 'Bosnia and Herzegovina',
    },
    {
      emoji: '🇧🇼',
      code: '+267',
      name: 'Botswana',
    },
    {
      emoji: '🇧🇷',
      code: '+55',
      name: 'Brazil',
    },
    {
      emoji: '🇮🇴',
      code: '+246',
      name: 'British Indian Ocean Territory',
    },
    {
      emoji: '🇻🇬',
      code: '+1 284',
      name: 'British Virgin Islands',
    },
    {
      emoji: '🇧🇳',
      code: '+673',
      name: 'Brunei',
    },
    {
      emoji: '🇧🇬',
      code: '+359',
      name: 'Bulgaria',
    },
    {
      emoji: '🇧🇫',
      code: '+226',
      name: 'Burkina Faso',
    },
    {
      emoji: '🇧🇮',
      code: '+257',
      name: 'Burundi',
    },
    {
      emoji: '🇰🇭',
      code: '+855',
      name: 'Cambodia',
    },
    {
      emoji: '🇨🇲',
      code: '+237',
      name: 'Cameroon',
    },
    {
      emoji: '🇨🇦',
      code: '+1',
      name: 'Canada',
    },
    {
      emoji: '🇨🇻',
      code: '+238',
      name: 'Cape Verde',
    },
    {
      emoji: '🇰🇾',
      code: '+ 345',
      name: 'Cayman Islands',
    },
    {
      emoji: '🇨🇫',
      code: '+236',
      name: 'Central African Republic',
    },
    {
      emoji: '🇹🇩',
      code: '+235',
      name: 'Chad',
    },
    {
      emoji: '🇨🇱',
      code: '+56',
      name: 'Chile',
    },
    {
      emoji: '🇨🇳',
      code: '+86',
      name: 'China',
    },
    {
      emoji: '🇨🇽',
      code: '+61',
      name: 'Christmas Island',
    },
    {
      emoji: '🇨🇨',
      code: '+61',
      name: 'Cocos-Keeling Islands',
    },
    {
      emoji: '🇨🇴',
      code: '+57',
      name: 'Colombia',
    },
    {
      emoji: '',
      code: '+269',
      name: 'Comoros',
    },
    {
      emoji: '',
      code: '+242',
      name: 'Congo',
    },
    {
      emoji: '',
      code: '+243',
      name: 'Congo, Dem. Rep. of (Zaire)',
    },
    {
      emoji: '',
      code: '+682',
      name: 'Cook Islands',
    },
    {
      emoji: '',
      code: '+506',
      name: 'Costa Rica',
    },
    {
      emoji: '',
      code: '+385',
      name: 'Croatia',
    },
    {
      emoji: '',
      code: '+53',
      name: 'Cuba',
    },
    {
      code: '+599',
      name: 'Curacao',
    },
    {
      code: '+537',
      name: 'Cyprus',
    },
    {
      code: '+420',
      name: 'Czech Republic',
    },
    {
      code: '+45',
      name: 'Denmark',
    },
    {
      code: '+246',
      name: 'Diego Garcia',
    },
    {
      code: '+253',
      name: 'Djibouti',
    },
    {
      code: '+1 767',
      name: 'Dominica',
    },
    {
      code: '+1 809',
      name: 'Dominican Republic',
    },
    {
      code: '+670',
      name: 'East Timor',
    },
    {
      code: '+56',
      name: 'Easter Island',
    },
    {
      code: '+593',
      name: 'Ecuador',
    },
    {
      code: '+20',
      name: 'Egypt',
    },
    {
      code: '+503',
      name: 'El Salvador',
    },
    {
      code: '+240',
      name: 'Equatorial Guinea',
    },
    {
      code: '+291',
      name: 'Eritrea',
    },
    {
      code: '+372',
      name: 'Estonia',
    },
    {
      code: '+251',
      name: 'Ethiopia',
    },
    {
      code: '+500',
      name: 'Falkland Islands',
    },
    {
      code: '+298',
      name: 'Faroe Islands',
    },
    {
      code: '+679',
      name: 'Fiji',
    },
    {
      code: '+358',
      name: 'Finland',
    },
    {
      code: '+33',
      name: 'France',
    },
    {
      code: '+596',
      name: 'French Antilles',
    },
    {
      code: '+594',
      name: 'French Guiana',
    },
    {
      code: '+689',
      name: 'French Polynesia',
    },
    {
      code: '+241',
      name: 'Gabon',
    },
    {
      code: '+220',
      name: 'Gambia',
    },
    {
      code: '+995',
      name: 'Georgia',
    },
    {
      code: '+49',
      name: 'Germany',
    },
    {
      code: '+233',
      name: 'Ghana',
    },
    {
      code: '+350',
      name: 'Gibraltar',
    },
    {
      code: '+30',
      name: 'Greece',
    },
    {
      code: '+299',
      name: 'Greenland',
    },
    {
      code: '+1 473',
      name: 'Grenada',
    },
    {
      code: '+590',
      name: 'Guadeloupe',
    },
    {
      code: '+1 671',
      name: 'Guam',
    },
    {
      code: '+502',
      name: 'Guatemala',
    },
    {
      code: '+224',
      name: 'Guinea',
    },
    {
      code: '+245',
      name: 'Guinea-Bissau',
    },
    {
      code: '+595',
      name: 'Guyana',
    },
    {
      code: '+509',
      name: 'Haiti',
    },
    {
      code: '+504',
      name: 'Honduras',
    },
    {
      code: '+852',
      name: 'Hong Kong SAR China',
    },
    {
      code: '+36',
      name: 'Hungary',
    },
    {
      code: '+354',
      name: 'Iceland',
    },
    {
      code: '+91',
      name: 'India',
    },
    {
      code: '+62',
      name: 'Indonesia',
    },
    {
      code: '+98',
      name: 'Iran',
    },
    {
      code: '+964',
      name: 'Iraq',
    },
    {
      code: '+353',
      name: 'Ireland',
    },
    {
      code: '+972',
      name: 'Israel',
    },
    {
      code: '+39',
      name: 'Italy',
    },
    {
      code: '+225',
      name: 'Ivory Coast',
    },
    {
      code: '+1 876',
      name: 'Jamaica',
    },
    {
      code: '+81',
      name: 'Japan',
    },
    {
      code: '+962',
      name: 'Jordan',
    },
    {
      code: '+7 7',
      name: 'Kazakhstan',
    },
    {
      code: '+254',
      name: 'Kenya',
    },
    {
      code: '+686',
      name: 'Kiribati',
    },
    {
      code: '+965',
      name: 'Kuwait',
    },
    {
      code: '+996',
      name: 'Kyrgyzstan',
    },
    {
      code: '+856',
      name: 'Laos',
    },
    {
      code: '+371',
      name: 'Latvia',
    },
    {
      code: '+961',
      name: 'Lebanon',
    },
    {
      code: '+266',
      name: 'Lesotho',
    },
    {
      code: '+231',
      name: 'Liberia',
    },
    {
      code: '+218',
      name: 'Libya',
    },
    {
      code: '+423',
      name: 'Liechtenstein',
    },
    {
      code: '+370',
      name: 'Lithuania',
    },
    {
      code: '+352',
      name: 'Luxembourg',
    },
    {
      code: '+853',
      name: 'Macau SAR China',
    },
    {
      code: '+389',
      name: 'Macedonia',
    },
    {
      code: '+261',
      name: 'Madagascar',
    },
    {
      code: '+265',
      name: 'Malawi',
    },
    {
      code: '+60',
      name: 'Malaysia',
    },
    {
      code: '+960',
      name: 'Maldives',
    },
    {
      code: '+223',
      name: 'Mali',
    },
    {
      code: '+356',
      name: 'Malta',
    },
    {
      code: '+692',
      name: 'Marshall Islands',
    },
    {
      code: '+596',
      name: 'Martinique',
    },
    {
      code: '+222',
      name: 'Mauritania',
    },
    {
      code: '+230',
      name: 'Mauritius',
    },
    {
      code: '+262',
      name: 'Mayotte',
    },
    {
      code: '+52',
      name: 'Mexico',
    },
    {
      code: '+691',
      name: 'Micronesia',
    },
    {
      code: '+1 808',
      name: 'Midway Island',
    },
    {
      code: '+373',
      name: 'Moldova',
    },
    {
      code: '+377',
      name: 'Monaco',
    },
    {
      code: '+976',
      name: 'Mongolia',
    },
    {
      code: '+382',
      name: 'Montenegro',
    },
    {
      code: '+1664',
      name: 'Montserrat',
    },
    {
      code: '+212',
      name: 'Morocco',
    },
    {
      code: '+95',
      name: 'Myanmar',
    },
    {
      code: '+264',
      name: 'Namibia',
    },
    {
      code: '+674',
      name: 'Nauru',
    },
    {
      code: '+977',
      name: 'Nepal',
    },
    {
      code: '+31',
      name: 'Netherlands',
    },
    {
      code: '+599',
      name: 'Netherlands Antilles',
    },
    {
      code: '+1 869',
      name: 'Nevis',
    },
    {
      code: '+687',
      name: 'New Caledonia',
    },
    {
      code: '+64',
      name: 'New Zealand',
    },
    {
      code: '+505',
      name: 'Nicaragua',
    },
    {
      code: '+227',
      name: 'Niger',
    },
    {
      code: '+234',
      name: 'Nigeria',
    },
    {
      code: '+683',
      name: 'Niue',
    },
    {
      code: '+672',
      name: 'Norfolk Island',
    },
    {
      code: '+850',
      name: 'North Korea',
    },
    {
      code: '+1 670',
      name: 'Northern Mariana Islands',
    },
    {
      code: '+47',
      name: 'Norway',
    },
    {
      code: '+968',
      name: 'Oman',
    },
    {
      code: '+92',
      name: 'Pakistan',
    },
    {
      code: '+680',
      name: 'Palau',
    },
    {
      code: '+970',
      name: 'Palestinian Territory',
    },
    {
      code: '+507',
      name: 'Panama',
    },
    {
      code: '+675',
      name: 'Papua New Guinea',
    },
    {
      code: '+595',
      name: 'Paraguay',
    },
    {
      code: '+51',
      name: 'Peru',
    },
    {
      code: '+63',
      name: 'Philippines',
    },
    {
      code: '+48',
      name: 'Poland',
    },
    {
      code: '+351',
      name: 'Portugal',
    },
    {
      code: '+1 787',
      name: 'Puerto Rico',
    },
    {
      code: '+974',
      name: 'Qatar',
    },
    {
      code: '+262',
      name: 'Reunion',
    },
    {
      code: '+40',
      name: 'Romania',
    },
    {
      code: '+7',
      name: 'Russia',
    },
    {
      code: '+250',
      name: 'Rwanda',
    },
    {
      code: '+685',
      name: 'Samoa',
    },
    {
      code: '+378',
      name: 'San Marino',
    },
    {
      code: '+966',
      name: 'Saudi Arabia',
    },
    {
      code: '+221',
      name: 'Senegal',
    },
    {
      code: '+381',
      name: 'Serbia',
    },
    {
      code: '+248',
      name: 'Seychelles',
    },
    {
      code: '+232',
      name: 'Sierra Leone',
    },
    {
      code: '+65',
      name: 'Singapore',
    },
    {
      code: '+421',
      name: 'Slovakia',
    },
    {
      code: '+386',
      name: 'Slovenia',
    },
    {
      code: '+677',
      name: 'Solomon Islands',
    },
    {
      code: '+27',
      name: 'South Africa',
    },
    {
      code: '+500',
      name: 'South Georgia and the South Sandwich Islands',
    },
    {
      code: '+82',
      name: 'South Korea',
    },
    {
      code: '+34',
      name: 'Spain',
    },
    {
      code: '+94',
      name: 'Sri Lanka',
    },
    {
      code: '+249',
      name: 'Sudan',
    },
    {
      code: '+597',
      name: 'Suriname',
    },
    {
      code: '+268',
      name: 'Swaziland',
    },
    {
      code: '+46',
      name: 'Sweden',
    },
    {
      code: '+41',
      name: 'Switzerland',
    },
    {
      code: '+963',
      name: 'Syria',
    },
    {
      emoji: '',
      code: '+886',
      name: 'Taiwan',
    },
    {
      emoji: '🇹🇯',
      code: '+992',
      name: 'Tajikistan',
    },
    {
      emoji: '🇹🇿',
      code: '+255',
      name: 'Tanzania',
    },
    {
      emoji: '🇹🇭',
      code: '+66',
      name: 'Thailand',
    },
    {
      emoji: '🇹🇱',
      code: '+670',
      name: 'Timor Leste',
    },
    {
      emoji: '🇹🇬',
      code: '+228',
      name: 'Togo',
    },
    {
      emoji: '🇹🇰',
      code: '+690',
      name: 'Tokelau',
    },
    {
      emoji: '🇹🇴',
      code: '+676',
      name: 'Tonga',
    },
    {
      emoji: '🇹🇹',
      code: '+1 868',
      name: 'Trinidad and Tobago',
    },
    {
      emoji: '🇹🇳',
      code: '+216',
      name: 'Tunisia',
    },
    {
      emoji: '🇹🇷',
      code: '+90',
      name: 'Turkey',
    },
    {
      emoji: '🇹🇲',
      code: '+993',
      name: 'Turkmenistan',
    },
    {
      emoji: '🇹🇨',
      code: '+1 649',
      name: 'Turks and Caicos Islands',
    },
    {
      emoji: '🇹🇻',
      code: '+688',
      name: 'Tuvalu',
    },
    {
      emoji: '🇻🇮',
      code: '+1 340',
      name: 'U.S. Virgin Islands',
    },
    {
      emoji: '🇺🇬',
      code: '+256',
      name: 'Uganda',
    },
    {
      emoji: '🇺🇦',
      code: '+380',
      name: 'Ukraine',
    },
    {
      emoji: '🇦🇪',
      code: '+971',
      name: 'United Arab Emirates',
    },
    {
      emoji: '🇬🇧',
      code: '+44',
      name: 'United Kingdom',
    },
    {
      emoji: '🇺🇸',
      code: '+1',
      name: 'United States',
    },
    {
      emoji: '🇺🇾',
      code: '+598',
      name: 'Uruguay',
    },
    {
      emoji: '🇺🇿',
      code: '+998',
      name: 'Uzbekistan',
    },
    {
      emoji: '🇻🇺',
      code: '+678',
      name: 'Vanuatu',
    },
    {
      emoji: '🇻🇪',
      code: '+58',
      name: 'Venezuela',
    },
    {
      emoji: '🇻🇳',
      code: '+84',
      name: 'Vietnam',
    },
    {
      emoji: '',
      code: '+1 808',
      name: 'Wake Island',
    },
    {
      emoji: '🇼🇫',
      code: '+681',
      name: 'Wallis and Futuna',
    },
    {
      emoji: '🇾🇪',
      code: '+967',
      name: 'Yemen',
    },
    {
      emoji: '🇿🇲',
      code: '+260',
      name: 'Zambia',
    },
    {
      emoji: '',
      code: '+255',
      name: 'Zanzibar',
    },
    {
      emoji: '🇿🇼',
      code: '+263',
      name: 'Zimbabwe',
    },
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  testMethod() {
    // const phoneNumber = ' ' + this.authService.authForm.get('phoneNumber').value;
    // this.authService.authForm.get('phoneNumber').setValue(this.countryCode + phoneNumber);
    // console.log(this.authService.authForm.value, 'authForm');
  }
}
