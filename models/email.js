const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
host: 'mail.privateemail.com',
port: 465,
secure: true,
auth: {
user: 'support@repixel-agency.com',
pass: 'AzzehQatada1985',
},
});

const SendMail = async(to,subject,main_img,header_img,title,paragraph,extra_text,desc)=>{
const mailOptions = {
from: 'support@repixel-agency.com',
to: to,
subject: subject,
html:`
<!DOCTYPE HTML
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>

<style type="text/css">
@media only screen and (min-width: 620px) {
.u-row {
width: 600px !important;
}

.u-row .u-col {
vertical-align: top;
}

.u-row .u-col-50 {
width: 300px !important;
}

.u-row .u-col-100 {
width: 600px !important;
}

}

@media (max-width: 620px) {
.u-row-container {
max-width: 100% !important;
padding-left: 0px !important;
padding-right: 0px !important;
}

.u-row .u-col {
min-width: 320px !important;
max-width: 100% !important;
display: block !important;
}

.u-row {
width: 100% !important;
}

.u-col {
width: 100% !important;
}

.u-col>div {
margin: 0 auto;
}
}

body {
margin: 0;
padding: 0;
}

table,
tr,
td {
vertical-align: top;
border-collapse: collapse;
}

p {
margin: 0;
}

.ie-container table,
.mso-container table {
table-layout: fixed;
}

* {
line-height: inherit;
}

a[x-apple-data-detectors='true'] {
color: inherit !important;
text-decoration: none !important;
}

table,
td {
color: #000000;
}

#u_body a {
color: #ecf0f1;
text-decoration: underline;
}
</style>




<link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">


</head>

<body class="clean-body u_body"
style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">


<table id="u_body"
style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
cellpadding="0" cellspacing="0">
<tbody>
<tr style="vertical-align: top">
<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">




<div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">



<div class="u-col u-col-100"
style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">

<div
style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;"
align="left">

<table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
<tbody>
<tr style="vertical-align: top">
<td
style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
<span>&#160;</span>
</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>


</div>
</div>
</div>


</div>
</div>
</div>





<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">



<div class="u-col u-col-100"
style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">

<div
style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;"
align="left">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding-right: 0px;padding-left: 0px;" align="center">

<img align="center" border="0" src="${main_img}" alt="Image" title="Image"
style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;"
width="168.2" />

</td>
</tr>
</table>

</td>
</tr>
</tbody>
</table>


</div>
</div>
</div>


</div>
</div>
</div>





<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">



<div class="u-col u-col-100"
style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">

<div
style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;"
align="left">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding-right: 0px;padding-left: 0px;" align="center">

<img align="center" border="0" src="${header_img}" alt="Image" title="Image"
style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 10%;max-width: 58px;"
width="58" />

</td>
</tr>
</table>

</td>
</tr>
</tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
align="left">

<div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
<p style="font-size: 14px; line-height: 140%; text-align: center;"><span
style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">${title}</span></p>
</div>

</td>
</tr>
</tbody>
</table>


</div>
</div>
</div>


</div>
</div>
</div>





<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">



<div class="u-col u-col-100"
style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">

<div
style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;"
align="left">

<div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
<p style="font-size: 14px; line-height: 140%;"><span
style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,</span></p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;"><span
style="font-size: 18px; line-height: 25.2px; color: #666666;">${paragraph}</span></p>

</div>

</td>
</tr>
</tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;"
align="left">


<div align="left">

<span href="" target="_blank" class="v-button"
style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
<span style="display:block;padding:15px 40px;line-height:120%;"><span
style="font-size: 18px; line-height: 21.6px;">${extra_text}</span></span>
</span>

</div>

</td>
</tr>
</tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;"
align="left">

<div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
<p style="font-size: 14px; line-height: 140%;"><span
style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span
style="font-size: 16px; line-height: 22.4px;">${desc}</span></em></span><br /><span
style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span
style="font-size: 16px; line-height: 22.4px;">&nbsp;</span></em></span></p>
</div>

</td>
</tr>
</tbody>
</table>


</div>
</div>
</div>


</div>
</div>
</div>





<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #18163a;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">



<div class="u-col u-col-50"
style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">

<div
style="box-sizing: border-box; height: 100%; padding: 20px 20px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;"
align="left">

<div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
<p style="font-size: 14px; line-height: 140%;"><span
style="font-size: 16px; line-height: 22.4px; color: #ecf0f1;">Contact</span></p>
<p style="font-size: 14px; line-height: 140%;"><span
style="font-size: 14px; line-height: 19.6px; color: #ecf0f1;">support@repixel-agency.com</span></p>
</div>

</td>
</tr>
</tbody>
</table>


</div>
</div>
</div>


<div class="u-col u-col-50"
style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">

<div
style="box-sizing: border-box; height: 100%; padding: 0px 0px 0px 20px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:'Lato',sans-serif;"
align="left">

<div align="left">
<div style="display: table; max-width:187px;">




<table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
<tbody>
<tr style="vertical-align: top">
<td align="left" valign="middle"
style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<a href="repixel-agency.com" title="Facebook" target="_blank">
<img src="https://cdn.discordapp.com/attachments/803305331911819284/1199441731444289586/image-4.png?ex=65c28e29&is=65b01929&hm=33e09d325ec165d3cc36717ce13a2a840ac008cb40e83f862adc059efe72d678&" alt="Facebook" title="Facebook" width="32"
style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
</a>
</td>
</tr>
</tbody>
</table>



<table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
<tbody>
<tr style="vertical-align: top">
<td align="left" valign="middle"
style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<a href=" " title="Twitter" target="_blank">
<img src="https://cdn.discordapp.com/attachments/803305331911819284/1199441732232818719/image-3.png?ex=65c28e29&is=65b01929&hm=8e258cb43dadf42dcb802a4fa7cabf9d70b33840fbfb2fd46b0c28c5dd96fcdd&" alt="Twitter" title="Twitter" width="32"
style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
</a>
</td>
</tr>
</tbody>
</table>



<table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
<tbody>
<tr style="vertical-align: top">
<td align="left" valign="middle"
style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<a href=" " title="Instagram" target="_blank">
<img src="https://cdn.discordapp.com/attachments/803305331911819284/1199441731658203237/image-5.png?ex=65c28e29&is=65b01929&hm=4dbca9809644961d306b2bbb063e7c4fb3660fdfcefe41c28538de01c1681ea5&" alt="Instagram" title="Instagram" width="32"
style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
</a>
</td>
</tr>
</tbody>
</table>





</div>
</div>

</td>
</tr>
</tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:'Lato',sans-serif;"
align="left">

<div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
<p style="line-height: 140%; font-size: 14px;"><span
style="font-size: 14px; line-height: 19.6px;"><span
style="color: #ecf0f1; font-size: 14px; line-height: 19.6px;"><span
style="line-height: 19.6px; font-size: 14px;">Repixel-Agency &copy;&nbsp; All Rights
Reserved</span></span></span></p>
</div>

</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

</div>
</div>
</div>





<div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #1c103b;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">

<div class="u-col u-col-100"
style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">
<div
style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;"
align="left">

<table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #1c103b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
<tbody>
<tr style="vertical-align: top">
<td
style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
<span>&#160;</span>
</td>
</tr>
</tbody>
</table>

</td>
</tr>
</tbody>
</table>

</div>
</div>
</div>

</div>
</div>
</div>





<div class="u-row-container" style="padding: 0px;background-color: transparent">
<div class="u-row"
style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
<div
style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100"
style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
<div style="height: 100%;width: 100% !important;">
<div
style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">


<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0"
width="100%" border="0">
<tbody>
<tr>
<td
style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px 30px 20px;font-family:'Lato',sans-serif;"
align="left">

<div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">

</div>

</td>
</tr>
</tbody>
</table>

</div>
</div>
</div>

</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>

</body>

</html>
`
};
try {
await transporter.sendMail(mailOptions);

} catch (error) {
console.error('Error sending email:', error);

}
}


module.exports = SendMail
