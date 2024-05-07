const Universities = {
'University of Jordan | JU': 165890,
'University of Science and Technology | JUST': 165891,
'Mutah University': 165892,
'Yarmouk University | YU': 165893,
'Balqa Applied University | BAU': 165894,
'Tafila Technical University | TTU': 165895,
'Hashemite University | HU': 165896,
'Al-Bayt University | AABU': 165897,
'Al-Hussein Bin Talal University | AHU': 165898,
'German Jordanian University | GJU': 165899,
'Al-Ahliyya Amman University': 165900,
'Applied Science Private University | ASU': 165901,
'Amman Arab University | AAU': 165902,
'Irbid National University | INU': 165903,
'Al-Isra University | IU': 165904,
'Jadara University': 165905,
'Jerash University | JPU': 165906,
'Middle East University | MEU': 165907,
'Petra University | UOP': 165908,
'Philadelphia University': 165909,
'Zarqa University | ZU': 165910,
'Princess Sumaya University for Technology | PSUT': 165911,
'Al-Zaytoonah University | ZUJ': 165912,
'World Islamic Sciences University | WISE': 165913,
'Al-Hussein Technical University | HTU': 165914,
'Ajloun National University | ANU': 165915
};


RetuenUniverstyid = (name)=>{
if(Universities[name]){
return Universities[name];
}
return -1;
}


module.exports = {
RetuenUniverstyid,
Universities
}