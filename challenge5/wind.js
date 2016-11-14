// http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
// https://gist.github.com/felipeskroski/8aec22f01dabdbf8fb6b
var direction = function(deg) {
    if (deg > 11.25 && deg < 33.75){
        return "North-northeast";
    } else if (deg>33.75 && deg<56.25){
        return "Northeast";
    } else if (deg>56.25 && deg<78.75){
        return "East-northeast";
    } else if (deg>78.75 && deg<101.25){
        return "East";
    } else if (deg>101.25 && deg<123.75){
        return "East-southeast";
    } else if (deg>123.75 && deg<146.25){
        return "Southeast";
    } else if (deg>146.25 && deg<168.75){
        return "South-southeast";
    } else if (deg>168.75 && deg<191.25){
        return "South";
    } else if (deg>191.25 && deg<213.75){
        return "South-southwest";
    } else if (deg>213.75 && deg<236.25){
        return "Southwest";
    } else if (deg>236.25 && deg<258.75){
        return "West-southwest";
    } else if (deg>258.75 && deg<281.25){
        return "West";
    } else if (deg>281.25 && deg<303.75){
        return "West-northwest";
    } else if (deg>303.75 && deg<326.25){
        return "Northwest";
    } else if (deg>326.25 && deg<348.75){
        return "North-northwest";
    } else{
        return "North"; 
    }
}