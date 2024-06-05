import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropsSelectorPrefijo {
  defaultValue: string;
  onValueChange: (value: string) => void;
}

const SelectorPrefijo: FC<PropsSelectorPrefijo> = ({
  defaultValue,
  onValueChange,
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-2/3 p-3 mr-1 button-telephone">
        <SelectValue placeholder="Select a country code" />
      </SelectTrigger>
      <SelectContent className="w-2/3 p-0 button-telephone">
        <SelectItem value="47" data-countryCode="NO">
          Norway (+47)
        </SelectItem>
        <SelectItem value="44" data-countryCode="GB">
          UK (+44)
        </SelectItem>
        <SelectItem value="213" data-countryCode="DZ">
          Algeria (+213)
        </SelectItem>
        <SelectItem value="376" data-countryCode="AD">
          Andorra (+376)
        </SelectItem>
        <SelectItem value="244" data-countryCode="AO">
          Angola (+244)
        </SelectItem>
        <SelectItem value="1264" data-countryCode="AI">
          Anguilla (+1264)
        </SelectItem>
        <SelectItem value="1268" data-countryCode="AG">
          Antigua &amp; Barbuda (+1268)
        </SelectItem>
        <SelectItem value="54" data-countryCode="AR">
          Argentina (+54)
        </SelectItem>
        <SelectItem value="374" data-countryCode="AM">
          Armenia (+374)
        </SelectItem>
        <SelectItem value="297" data-countryCode="AW">
          Aruba (+297)
        </SelectItem>
        <SelectItem value="61" data-countryCode="AU">
          Australia (+61)
        </SelectItem>
        <SelectItem value="43" data-countryCode="AT">
          Austria (+43)
        </SelectItem>
        <SelectItem value="994" data-countryCode="AZ">
          Azerbaijan (+994)
        </SelectItem>
        <SelectItem value="1242" data-countryCode="BS">
          Bahamas (+1242)
        </SelectItem>
        <SelectItem value="973" data-countryCode="BH">
          Bahrain (+973)
        </SelectItem>
        <SelectItem value="880" data-countryCode="BD">
          Bangladesh (+880)
        </SelectItem>
        <SelectItem value="1246" data-countryCode="BB">
          Barbados (+1246)
        </SelectItem>
        <SelectItem value="375" data-countryCode="BY">
          Belarus (+375)
        </SelectItem>
        <SelectItem value="32" data-countryCode="BE">
          Belgium (+32)
        </SelectItem>
        <SelectItem value="501" data-countryCode="BZ">
          Belize (+501)
        </SelectItem>
        <SelectItem value="229" data-countryCode="BJ">
          Benin (+229)
        </SelectItem>
        <SelectItem value="1441" data-countryCode="BM">
          Bermuda (+1441)
        </SelectItem>
        <SelectItem value="975" data-countryCode="BT">
          Bhutan (+975)
        </SelectItem>
        <SelectItem value="591" data-countryCode="BO">
          Bolivia (+591)
        </SelectItem>
        <SelectItem value="387" data-countryCode="BA">
          Bosnia Herzegovina (+387)
        </SelectItem>
        <SelectItem value="267" data-countryCode="BW">
          Botswana (+267)
        </SelectItem>
        <SelectItem value="55" data-countryCode="BR">
          Brazil (+55)
        </SelectItem>
        <SelectItem value="673" data-countryCode="BN">
          Brunei (+673)
        </SelectItem>
        <SelectItem value="359" data-countryCode="BG">
          Bulgaria (+359)
        </SelectItem>
        <SelectItem value="226" data-countryCode="BF">
          Burkina Faso (+226)
        </SelectItem>
        <SelectItem value="257" data-countryCode="BI">
          Burundi (+257)
        </SelectItem>
        <SelectItem value="855" data-countryCode="KH">
          Cambodia (+855)
        </SelectItem>
        <SelectItem value="237" data-countryCode="CM">
          Cameroon (+237)
        </SelectItem>
        <SelectItem value="1" data-countryCode="CA">
          Canada (+1)
        </SelectItem>
        <SelectItem value="238" data-countryCode="CV">
          Cape Verde Islands (+238)
        </SelectItem>
        <SelectItem value="1345" data-countryCode="KY">
          Cayman Islands (+1345)
        </SelectItem>
        <SelectItem value="236" data-countryCode="CF">
          Central African Republic (+236)
        </SelectItem>
        <SelectItem value="56" data-countryCode="CL">
          Chile (+56)
        </SelectItem>
        <SelectItem value="86" data-countryCode="CN">
          China (+86)
        </SelectItem>
        <SelectItem value="57" data-countryCode="CO">
          Colombia (+57)
        </SelectItem>
        <SelectItem value="269" data-countryCode="KM">
          Comoros (+269)
        </SelectItem>
        <SelectItem value="242" data-countryCode="CG">
          Congo (+242)
        </SelectItem>
        <SelectItem value="682" data-countryCode="CK">
          Cook Islands (+682)
        </SelectItem>
        <SelectItem value="506" data-countryCode="CR">
          Costa Rica (+506)
        </SelectItem>
        <SelectItem value="385" data-countryCode="HR">
          Croatia (+385)
        </SelectItem>
        <SelectItem value="53" data-countryCode="CU">
          Cuba (+53)
        </SelectItem>
        <SelectItem value="90392" data-countryCode="CY">
          Cyprus North (+90392)
        </SelectItem>
        <SelectItem value="357" data-countryCode="CY">
          Cyprus South (+357)
        </SelectItem>
        <SelectItem value="42" data-countryCode="CZ">
          Czech Republic (+42)
        </SelectItem>
        <SelectItem value="45" data-countryCode="DK">
          Denmark (+45)
        </SelectItem>
        <SelectItem value="253" data-countryCode="DJ">
          Djibouti (+253)
        </SelectItem>
        <SelectItem value="1809" data-countryCode="DM">
          Dominica (+1809)
        </SelectItem>
        <SelectItem value="1809" data-countryCode="DO">
          Dominican Republic (+1809)
        </SelectItem>
        <SelectItem value="593" data-countryCode="EC">
          Ecuador (+593)
        </SelectItem>
        <SelectItem value="20" data-countryCode="EG">
          Egypt (+20)
        </SelectItem>
        <SelectItem value="503" data-countryCode="SV">
          El Salvador (+503)
        </SelectItem>
        <SelectItem value="240" data-countryCode="GQ">
          Equatorial Guinea (+240)
        </SelectItem>
        <SelectItem value="291" data-countryCode="ER">
          Eritrea (+291)
        </SelectItem>
        <SelectItem value="372" data-countryCode="EE">
          Estonia (+372)
        </SelectItem>
        <SelectItem value="251" data-countryCode="ET">
          Ethiopia (+251)
        </SelectItem>
        <SelectItem value="500" data-countryCode="FK">
          Falkland Islands (+500)
        </SelectItem>
        <SelectItem value="298" data-countryCode="FO">
          Faroe Islands (+298)
        </SelectItem>
        <SelectItem value="679" data-countryCode="FJ">
          Fiji (+679)
        </SelectItem>
        <SelectItem value="358" data-countryCode="FI">
          Finland (+358)
        </SelectItem>
        <SelectItem value="33" data-countryCode="FR">
          France (+33)
        </SelectItem>
        <SelectItem value="594" data-countryCode="GF">
          French Guiana (+594)
        </SelectItem>
        <SelectItem value="689" data-countryCode="PF">
          French Polynesia (+689)
        </SelectItem>
        <SelectItem value="241" data-countryCode="GA">
          Gabon (+241)
        </SelectItem>
        <SelectItem value="220" data-countryCode="GM">
          Gambia (+220)
        </SelectItem>
        <SelectItem value="7880" data-countryCode="GE">
          Georgia (+7880)
        </SelectItem>
        <SelectItem value="49" data-countryCode="DE">
          Germany (+49)
        </SelectItem>
        <SelectItem value="233" data-countryCode="GH">
          Ghana (+233)
        </SelectItem>
        <SelectItem value="350" data-countryCode="GI">
          Gibraltar (+350)
        </SelectItem>
        <SelectItem value="30" data-countryCode="GR">
          Greece (+30)
        </SelectItem>
        <SelectItem value="299" data-countryCode="GL">
          Greenland (+299)
        </SelectItem>
        <SelectItem value="1473" data-countryCode="GD">
          Grenada (+1473)
        </SelectItem>
        <SelectItem value="590" data-countryCode="GP">
          Guadeloupe (+590)
        </SelectItem>
        <SelectItem value="671" data-countryCode="GU">
          Guam (+671)
        </SelectItem>
        <SelectItem value="502" data-countryCode="GT">
          Guatemala (+502)
        </SelectItem>
        <SelectItem value="224" data-countryCode="GN">
          Guinea (+224)
        </SelectItem>
        <SelectItem value="245" data-countryCode="GW">
          Guinea - Bissau (+245)
        </SelectItem>
        <SelectItem value="592" data-countryCode="GY">
          Guyana (+592)
        </SelectItem>
        <SelectItem value="509" data-countryCode="HT">
          Haiti (+509)
        </SelectItem>
        <SelectItem value="504" data-countryCode="HN">
          Honduras (+504)
        </SelectItem>
        <SelectItem value="852" data-countryCode="HK">
          Hong Kong (+852)
        </SelectItem>
        <SelectItem value="36" data-countryCode="HU">
          Hungary (+36)
        </SelectItem>
        <SelectItem value="354" data-countryCode="IS">
          Iceland (+354)
        </SelectItem>
        <SelectItem value="91" data-countryCode="IN">
          India (+91)
        </SelectItem>
        <SelectItem value="62" data-countryCode="ID">
          Indonesia (+62)
        </SelectItem>
        <SelectItem value="98" data-countryCode="IR">
          Iran (+98)
        </SelectItem>
        <SelectItem value="964" data-countryCode="IQ">
          Iraq (+964)
        </SelectItem>
        <SelectItem value="353" data-countryCode="IE">
          Ireland (+353)
        </SelectItem>
        <SelectItem value="972" data-countryCode="IL">
          Israel (+972)
        </SelectItem>
        <SelectItem value="39" data-countryCode="IT">
          Italy (+39)
        </SelectItem>
        <SelectItem value="1876" data-countryCode="JM">
          Jamaica (+1876)
        </SelectItem>
        <SelectItem value="81" data-countryCode="JP">
          Japan (+81)
        </SelectItem>
        <SelectItem value="962" data-countryCode="JO">
          Jordan (+962)
        </SelectItem>
        <SelectItem value="7" data-countryCode="KZ">
          Kazakhstan (+7)
        </SelectItem>
        <SelectItem value="254" data-countryCode="KE">
          Kenya (+254)
        </SelectItem>
        <SelectItem value="686" data-countryCode="KI">
          Kiribati (+686)
        </SelectItem>
        <SelectItem value="850" data-countryCode="KP">
          Korea North (+850)
        </SelectItem>
        <SelectItem value="82" data-countryCode="KR">
          Korea South (+82)
        </SelectItem>
        <SelectItem value="965" data-countryCode="KW">
          Kuwait (+965)
        </SelectItem>
        <SelectItem value="996" data-countryCode="KG">
          Kyrgyzstan (+996)
        </SelectItem>
        <SelectItem value="856" data-countryCode="LA">
          Laos (+856)
        </SelectItem>
        <SelectItem value="371" data-countryCode="LV">
          Latvia (+371)
        </SelectItem>
        <SelectItem value="961" data-countryCode="LB">
          Lebanon (+961)
        </SelectItem>
        <SelectItem value="266" data-countryCode="LS">
          Lesotho (+266)
        </SelectItem>
        <SelectItem value="231" data-countryCode="LR">
          Liberia (+231)
        </SelectItem>
        <SelectItem value="218" data-countryCode="LY">
          Libya (+218)
        </SelectItem>
        <SelectItem value="417" data-countryCode="LI">
          Liechtenstein (+417)
        </SelectItem>
        <SelectItem value="370" data-countryCode="LT">
          Lithuania (+370)
        </SelectItem>
        <SelectItem value="352" data-countryCode="LU">
          Luxembourg (+352)
        </SelectItem>
        <SelectItem value="853" data-countryCode="MO">
          Macao (+853)
        </SelectItem>
        <SelectItem value="389" data-countryCode="MK">
          Macedonia (+389)
        </SelectItem>
        <SelectItem value="261" data-countryCode="MG">
          Madagascar (+261)
        </SelectItem>
        <SelectItem value="265" data-countryCode="MW">
          Malawi (+265)
        </SelectItem>
        <SelectItem value="60" data-countryCode="MY">
          Malaysia (+60)
        </SelectItem>
        <SelectItem value="960" data-countryCode="MV">
          Maldives (+960)
        </SelectItem>
        <SelectItem value="223" data-countryCode="ML">
          Mali (+223)
        </SelectItem>
        <SelectItem value="356" data-countryCode="MT">
          Malta (+356)
        </SelectItem>
        <SelectItem value="692" data-countryCode="MH">
          Marshall Islands (+692)
        </SelectItem>
        <SelectItem value="596" data-countryCode="MQ">
          Martinique (+596)
        </SelectItem>
        <SelectItem value="222" data-countryCode="MR">
          Mauritania (+222)
        </SelectItem>
        <SelectItem value="269" data-countryCode="YT">
          Mayotte (+269)
        </SelectItem>
        <SelectItem value="52" data-countryCode="MX">
          Mexico (+52)
        </SelectItem>
        <SelectItem value="691" data-countryCode="FM">
          Micronesia (+691)
        </SelectItem>
        <SelectItem value="373" data-countryCode="MD">
          Moldova (+373)
        </SelectItem>
        <SelectItem value="377" data-countryCode="MC">
          Monaco (+377)
        </SelectItem>
        <SelectItem value="976" data-countryCode="MN">
          Mongolia (+976)
        </SelectItem>
        <SelectItem value="1664" data-countryCode="MS">
          Montserrat (+1664)
        </SelectItem>
        <SelectItem value="212" data-countryCode="MA">
          Morocco (+212)
        </SelectItem>
        <SelectItem value="258" data-countryCode="MZ">
          Mozambique (+258)
        </SelectItem>
        <SelectItem value="95" data-countryCode="MN">
          Myanmar (+95)
        </SelectItem>
        <SelectItem value="264" data-countryCode="NA">
          Namibia (+264)
        </SelectItem>
        <SelectItem value="674" data-countryCode="NR">
          Nauru (+674)
        </SelectItem>
        <SelectItem value="977" data-countryCode="NP">
          Nepal (+977)
        </SelectItem>
        <SelectItem value="31" data-countryCode="NL">
          Netherlands (+31)
        </SelectItem>
        <SelectItem value="687" data-countryCode="NC">
          New Caledonia (+687)
        </SelectItem>
        <SelectItem value="64" data-countryCode="NZ">
          New Zealand (+64)
        </SelectItem>
        <SelectItem value="505" data-countryCode="NI">
          Nicaragua (+505)
        </SelectItem>
        <SelectItem value="227" data-countryCode="NE">
          Niger (+227)
        </SelectItem>
        <SelectItem value="234" data-countryCode="NG">
          Nigeria (+234)
        </SelectItem>
        <SelectItem value="683" data-countryCode="NU">
          Niue (+683)
        </SelectItem>
        <SelectItem value="672" data-countryCode="NF">
          Norfolk Islands (+672)
        </SelectItem>
        <SelectItem value="670" data-countryCode="NP">
          Northern Marianas (+670)
        </SelectItem>
        <SelectItem value="968" data-countryCode="OM">
          Oman (+968)
        </SelectItem>
        <SelectItem value="680" data-countryCode="PW">
          Palau (+680)
        </SelectItem>
        <SelectItem value="507" data-countryCode="PA">
          Panama (+507)
        </SelectItem>
        <SelectItem value="675" data-countryCode="PG">
          Papua New Guinea (+675)
        </SelectItem>
        <SelectItem value="595" data-countryCode="PY">
          Paraguay (+595)
        </SelectItem>
        <SelectItem value="51" data-countryCode="PE">
          Peru (+51)
        </SelectItem>
        <SelectItem value="63" data-countryCode="PH">
          Philippines (+63)
        </SelectItem>
        <SelectItem value="48" data-countryCode="PL">
          Poland (+48)
        </SelectItem>
        <SelectItem value="351" data-countryCode="PT">
          Portugal (+351)
        </SelectItem>
        <SelectItem value="1787" data-countryCode="PR">
          Puerto Rico (+1787)
        </SelectItem>
        <SelectItem value="974" data-countryCode="QA">
          Qatar (+974)
        </SelectItem>
        <SelectItem value="262" data-countryCode="RE">
          Reunion (+262)
        </SelectItem>
        <SelectItem value="40" data-countryCode="RO">
          Romania (+40)
        </SelectItem>
        <SelectItem value="7" data-countryCode="RU">
          Russia (+7)
        </SelectItem>
        <SelectItem value="250" data-countryCode="RW">
          Rwanda (+250)
        </SelectItem>
        <SelectItem value="378" data-countryCode="SM">
          San Marino (+378)
        </SelectItem>
        <SelectItem value="239" data-countryCode="ST">
          Sao Tome &amp; Principe (+239)
        </SelectItem>
        <SelectItem value="966" data-countryCode="SA">
          Saudi Arabia (+966)
        </SelectItem>
        <SelectItem value="221" data-countryCode="SN">
          Senegal (+221)
        </SelectItem>
        <SelectItem value="381" data-countryCode="CS">
          Serbia (+381)
        </SelectItem>
        <SelectItem value="248" data-countryCode="SC">
          Seychelles (+248)
        </SelectItem>
        <SelectItem value="232" data-countryCode="SL">
          Sierra Leone (+232)
        </SelectItem>
        <SelectItem value="65" data-countryCode="SG">
          Singapore (+65)
        </SelectItem>
        <SelectItem value="421" data-countryCode="SK">
          Slovak Republic (+421)
        </SelectItem>
        <SelectItem value="386" data-countryCode="SI">
          Slovenia (+386)
        </SelectItem>
        <SelectItem value="677" data-countryCode="SB">
          Solomon Islands (+677)
        </SelectItem>
        <SelectItem value="252" data-countryCode="SO">
          Somalia (+252)
        </SelectItem>
        <SelectItem value="27" data-countryCode="ZA">
          South Africa (+27)
        </SelectItem>
        <SelectItem value="34" data-countryCode="ES">
          Spain (+34)
        </SelectItem>
        <SelectItem value="94" data-countryCode="LK">
          Sri Lanka (+94)
        </SelectItem>
        <SelectItem value="290" data-countryCode="SH">
          St. Helena (+290)
        </SelectItem>
        <SelectItem value="1869" data-countryCode="KN">
          St. Kitts (+1869)
        </SelectItem>
        <SelectItem value="1758" data-countryCode="SC">
          St. Lucia (+1758)
        </SelectItem>
        <SelectItem value="249" data-countryCode="SD">
          Sudan (+249)
        </SelectItem>
        <SelectItem value="597" data-countryCode="SR">
          Suriname (+597)
        </SelectItem>
        <SelectItem value="268" data-countryCode="SZ">
          Swaziland (+268)
        </SelectItem>
        <SelectItem value="46" data-countryCode="SE">
          Sweden (+46)
        </SelectItem>
        <SelectItem value="41" data-countryCode="CH">
          Switzerland (+41)
        </SelectItem>
        <SelectItem value="963" data-countryCode="SI">
          Syria (+963)
        </SelectItem>
        <SelectItem value="886" data-countryCode="TW">
          Taiwan (+886)
        </SelectItem>
        <SelectItem value="7" data-countryCode="TJ">
          Tajikstan (+7)
        </SelectItem>
        <SelectItem value="66" data-countryCode="TH">
          Thailand (+66)
        </SelectItem>
        <SelectItem value="228" data-countryCode="TG">
          Togo (+228)
        </SelectItem>
        <SelectItem value="676" data-countryCode="TO">
          Tonga (+676)
        </SelectItem>
        <SelectItem value="1868" data-countryCode="TT">
          Trinidad &amp; Tobago (+1868)
        </SelectItem>
        <SelectItem value="216" data-countryCode="TN">
          Tunisia (+216)
        </SelectItem>
        <SelectItem value="90" data-countryCode="TR">
          Turkey (+90)
        </SelectItem>
        <SelectItem value="7" data-countryCode="TM">
          Turkmenistan (+7)
        </SelectItem>
        <SelectItem value="993" data-countryCode="TM">
          Turkmenistan (+993)
        </SelectItem>
        <SelectItem value="1649" data-countryCode="TC">
          Turks &amp; Caicos Islands (+1649)
        </SelectItem>
        <SelectItem value="688" data-countryCode="TV">
          Tuvalu (+688)
        </SelectItem>
        <SelectItem value="256" data-countryCode="UG">
          Uganda (+256)
        </SelectItem>
        <SelectItem value="380" data-countryCode="UA">
          Ukraine (+380)
        </SelectItem>
        <SelectItem value="971" data-countryCode="AE">
          United Arab Emirates (+971)
        </SelectItem>
        <SelectItem value="598" data-countryCode="UY">
          Uruguay (+598)
        </SelectItem>
        <SelectItem value="7" data-countryCode="UZ">
          Uzbekistan (+7)
        </SelectItem>
        <SelectItem value="678" data-countryCode="VU">
          Vanuatu (+678)
        </SelectItem>
        <SelectItem value="379" data-countryCode="VA">
          Vatican City (+379)
        </SelectItem>
        <SelectItem value="58" data-countryCode="VE">
          Venezuela (+58)
        </SelectItem>
        <SelectItem value="84" data-countryCode="VN">
          Vietnam (+84)
        </SelectItem>
        <SelectItem value="84" data-countryCode="VG">
          Virgin Islands - British (+1284)
        </SelectItem>
        <SelectItem value="84" data-countryCode="VI">
          Virgin Islands - US (+1340)
        </SelectItem>
        <SelectItem value="681" data-countryCode="WF">
          Wallis &amp; Futuna (+681)
        </SelectItem>
        <SelectItem value="969" data-countryCode="YE">
          Yemen (North)(+969)
        </SelectItem>
        <SelectItem value="967" data-countryCode="YE">
          Yemen (South)(+967)
        </SelectItem>
        <SelectItem value="260" data-countryCode="ZM">
          Zambia (+260)
        </SelectItem>
        <SelectItem value="263" data-countryCode="ZW">
          Zimbabwe (+263)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectorPrefijo;
