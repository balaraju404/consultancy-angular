import { Injectable } from "@angular/core";

@Injectable({
 providedIn: 'root'
})

export class Constants {
 // public static readonly API_URL = 'http://localhost:3000/';
 public static readonly API_URL = 'https://consultancy-node.vercel.app/';

 // localstorage keys
 public static readonly LS_USERDATA_KEY = 'userdata';
 public static readonly LS_TOKEN_KEY = 'token';

 // urls
 public static readonly USER_URL = Constants.API_URL + 'user';
 public static readonly LOGIN_URL = Constants.API_URL + 'login';
 public static readonly LOGIN_WITH_PWD_URL = Constants.LOGIN_URL + '/password';

 // regex values
 static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 static readonly MOBILE_REGEX = /^\d{10}$/;
 static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
 static readonly ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;
 static readonly ALPHABET_REGEX = /^[a-zA-Z]+$/;
 static readonly NUMBER_REGEX = /^\d+$/;
 static readonly POSITIVE_NUMBER_REGEX = /^\d+$/;
 static readonly POSITIVE_INT_REGEX = /^\d+$/;
 static readonly DATE_REGEX = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
 static readonly DATE_DMY_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
 static readonly TIME_REGEX = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}(0?[0-9]|1[012]):(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|1[0-9]|2[0-9])$/;
 static readonly DATE_TIME_REGEX = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}(0?[0-9]|1[012]):(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|1[0-9]|2[0-9])$/;
 static readonly IP_REGEX = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

}