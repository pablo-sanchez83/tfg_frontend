import axios from "axios";
import { AuthResponse } from "@/lib/interfaces";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./login.module.css";

export default function Login() {
    const baseUrl = "http://localhost:8000/api/";
    const [isSignUp, setIsSignUp] = useState(false);
    const [countryCode, setCountryCode] = useState("34");

    const phoneRegex = /\d{7,10}$/;

    const signUpSchema = z.object({
        username: z.string().min(5, { message: "Mínimo 5 caracteres" }).max(50, { message: "Máximo 50 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        tel: z.string().regex(phoneRegex, { message: "Teléfono inválido" }),
        password: z.string().max(50),
        confirm_password: z.string().max(50),
        rol: z.number(),
    }).refine(data => data.password === data.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            tel: "",
            password: "",
            confirm_password: "",
            rol: 2
        },
    });

    function onSignUp(values: z.infer<typeof signUpSchema>) {
        const formattedValues = {
            ...values,
            tel: `${countryCode}-${values.tel}`
        };

        axios.post<AuthResponse>(
            baseUrl + "register",
            formattedValues
        )
            .then((res) => {
                if (res.data.token) {
                    toast.success("¡Creación del usuario exitosa!");
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                toast.error("¡Creación del usuario fallida!");
                console.log(err)
            });
    }

    const loginSchema = z.object({
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().max(50, { message: "Máximo 50 caracteres" }),
    });

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLogin = (values: z.infer<typeof loginSchema>) => {
        axios.post<AuthResponse>(
            baseUrl + "login",
            values
        )
            .then((res) => {
                if (res.data.token) {
                    toast.success("¡Inicio de sesión exitoso!");
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                toast.error("¡Inicio de sesión fallido!");
                console.log(err)
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="w-screen max-h-screen mt-10 grid place-items-center">
                <div className={`${styles.container} ${isSignUp ? styles.active : ""}`}>
                    <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                        <Form {...signUpForm}>
                            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="flex flex-col gap-4 items-center justify-center py-2 h-full">
                                <h1>Crear Cuenta</h1>
                                <FormField
                                    control={signUpForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.username && (
                                                <p className="text-red-500">{signUpForm.formState.errors.username.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.email && (
                                                <p className="text-red-500">{signUpForm.formState.errors.email.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-1 items-center">
                                    <Select defaultValue={"34"} onValueChange={setCountryCode}>
                                        <SelectTrigger className="w-1/3 p-3 mr-1 button-telephone">
                                            <SelectValue placeholder="Select a country code" />
                                        </SelectTrigger>
                                        <SelectContent className="w-1/3 p-0 button-telephone">
                                            <SelectItem value="44" data-countrycode="GB">(+44)</SelectItem>
                                            <SelectItem value="1" data-countrycode="US">(+1)</SelectItem>
                                            <SelectItem value="213" data-countrycode="DZ">(+213)</SelectItem>
                                            <SelectItem value="376" data-countrycode="AD">(+376)</SelectItem>
                                            <SelectItem value="244" data-countrycode="AO">(+244)</SelectItem>
                                            <SelectItem value="1264" data-countrycode="AI">(+1264)</SelectItem>
                                            <SelectItem value="1268" data-countrycode="AG">(+1268)</SelectItem>
                                            <SelectItem value="54" data-countrycode="AR">(+54)</SelectItem>
                                            <SelectItem value="374" data-countrycode="AM">(+374)</SelectItem>
                                            <SelectItem value="297" data-countrycode="AW">(+297)</SelectItem>
                                            <SelectItem value="61" data-countrycode="AU">(+61)</SelectItem>
                                            <SelectItem value="43" data-countrycode="AT">(+43)</SelectItem>
                                            <SelectItem value="994" data-countrycode="AZ">(+994)</SelectItem>
                                            <SelectItem value="1242" data-countrycode="BS">(+1242)</SelectItem>
                                            <SelectItem value="973" data-countrycode="BH">(+973)</SelectItem>
                                            <SelectItem value="880" data-countrycode="BD">(+880)</SelectItem>
                                            <SelectItem value="1246" data-countrycode="BB">(+1246)</SelectItem>
                                            <SelectItem value="375" data-countrycode="BY">(+375)</SelectItem>
                                            <SelectItem value="32" data-countrycode="BE">(+32)</SelectItem>
                                            <SelectItem value="501" data-countrycode="BZ">(+501)</SelectItem>
                                            <SelectItem value="229" data-countrycode="BJ">(+229)</SelectItem>
                                            <SelectItem value="1441" data-countrycode="BM">(+1441)</SelectItem>
                                            <SelectItem value="975" data-countrycode="BT">(+975)</SelectItem>
                                            <SelectItem value="591" data-countrycode="BO">(+591)</SelectItem>
                                            <SelectItem value="387" data-countrycode="BA">(+387)</SelectItem>
                                            <SelectItem value="267" data-countrycode="BW">(+267)</SelectItem>
                                            <SelectItem value="55" data-countrycode="BR">(+55)</SelectItem>
                                            <SelectItem value="673" data-countrycode="BN">(+673)</SelectItem>
                                            <SelectItem value="359" data-countrycode="BG">(+359)</SelectItem>
                                            <SelectItem value="226" data-countrycode="BF">(+226)</SelectItem>
                                            <SelectItem value="257" data-countrycode="BI">(+257)</SelectItem>
                                            <SelectItem value="855" data-countrycode="KH">(+855)</SelectItem>
                                            <SelectItem value="237" data-countrycode="CM">(+237)</SelectItem>
                                            <SelectItem value="1" data-countrycode="CA">(+1)</SelectItem>
                                            <SelectItem value="238" data-countrycode="CV">(+238)</SelectItem>
                                            <SelectItem value="1345" data-countrycode="KY">(+1345)</SelectItem>
                                            <SelectItem value="236" data-countrycode="CF">(+236)</SelectItem>
                                            <SelectItem value="56" data-countrycode="CL">(+56)</SelectItem>
                                            <SelectItem value="86" data-countrycode="CN">(+86)</SelectItem>
                                            <SelectItem value="57" data-countrycode="CO">(+57)</SelectItem>
                                            <SelectItem value="269" data-countrycode="KM">(+269)</SelectItem>
                                            <SelectItem value="242" data-countrycode="CG">(+242)</SelectItem>
                                            <SelectItem value="682" data-countrycode="CK">(+682)</SelectItem>
                                            <SelectItem value="506" data-countrycode="CR">(+506)</SelectItem>
                                            <SelectItem value="385" data-countrycode="HR">(+385)</SelectItem>
                                            <SelectItem value="53" data-countrycode="CU">(+53)</SelectItem>
                                            <SelectItem value="90392" data-countrycode="CY">(+90392)</SelectItem>
                                            <SelectItem value="357" data-countrycode="CY">(+357)</SelectItem>
                                            <SelectItem value="42" data-countrycode="CZ">(+42)</SelectItem>
                                            <SelectItem value="45" data-countrycode="DK">(+45)</SelectItem>
                                            <SelectItem value="253" data-countrycode="DJ">(+253)</SelectItem>
                                            <SelectItem value="1809" data-countrycode="DM">(+1809)</SelectItem>
                                            <SelectItem value="1809" data-countrycode="DO">(+1809)</SelectItem>
                                            <SelectItem value="593" data-countrycode="EC">(+593)</SelectItem>
                                            <SelectItem value="20" data-countrycode="EG">(+20)</SelectItem>
                                            <SelectItem value="503" data-countrycode="SV">(+503)</SelectItem>
                                            <SelectItem value="240" data-countrycode="GQ">(+240)</SelectItem>
                                            <SelectItem value="291" data-countrycode="ER">(+291)</SelectItem>
                                            <SelectItem value="372" data-countrycode="EE">(+372)</SelectItem>
                                            <SelectItem value="251" data-countrycode="ET">(+251)</SelectItem>
                                            <SelectItem value="500" data-countrycode="FK">(+500)</SelectItem>
                                            <SelectItem value="298" data-countrycode="FO">(+298)</SelectItem>
                                            <SelectItem value="679" data-countrycode="FJ">(+679)</SelectItem>
                                            <SelectItem value="358" data-countrycode="FI">(+358)</SelectItem>
                                            <SelectItem value="33" data-countrycode="FR">(+33)</SelectItem>
                                            <SelectItem value="594" data-countrycode="GF">(+594)</SelectItem>
                                            <SelectItem value="689" data-countrycode="PF">(+689)</SelectItem>
                                            <SelectItem value="241" data-countrycode="GA">(+241)</SelectItem>
                                            <SelectItem value="220" data-countrycode="GM">(+220)</SelectItem>
                                            <SelectItem value="7880" data-countrycode="GE">(+7880)</SelectItem>
                                            <SelectItem value="49" data-countrycode="DE">(+49)</SelectItem>
                                            <SelectItem value="233" data-countrycode="GH">(+233)</SelectItem>
                                            <SelectItem value="350" data-countrycode="GI">(+350)</SelectItem>
                                            <SelectItem value="30" data-countrycode="GR">(+30)</SelectItem>
                                            <SelectItem value="299" data-countrycode="GL">(+299)</SelectItem>
                                            <SelectItem value="1473" data-countrycode="GD">(+1473)</SelectItem>
                                            <SelectItem value="590" data-countrycode="GP">(+590)</SelectItem>
                                            <SelectItem value="671" data-countrycode="GU">(+671)</SelectItem>
                                            <SelectItem value="502" data-countrycode="GT">(+502)</SelectItem>
                                            <SelectItem value="224" data-countrycode="GN">(+224)</SelectItem>
                                            <SelectItem value="245" data-countrycode="GW">(+245)</SelectItem>
                                            <SelectItem value="592" data-countrycode="GY">(+592)</SelectItem>
                                            <SelectItem value="509" data-countrycode="HT">(+509)</SelectItem>
                                            <SelectItem value="504" data-countrycode="HN">(+504)</SelectItem>
                                            <SelectItem value="852" data-countrycode="HK">(+852)</SelectItem>
                                            <SelectItem value="36" data-countrycode="HU">(+36)</SelectItem>
                                            <SelectItem value="354" data-countrycode="IS">(+354)</SelectItem>
                                            <SelectItem value="91" data-countrycode="IN">(+91)</SelectItem>
                                            <SelectItem value="62" data-countrycode="ID">(+62)</SelectItem>
                                            <SelectItem value="98" data-countrycode="IR">(+98)</SelectItem>
                                            <SelectItem value="964" data-countrycode="IQ">(+964)</SelectItem>
                                            <SelectItem value="353" data-countrycode="IE">(+353)</SelectItem>
                                            <SelectItem value="972" data-countrycode="IL">(+972)</SelectItem>
                                            <SelectItem value="39" data-countrycode="IT">(+39)</SelectItem>
                                            <SelectItem value="1876" data-countrycode="JM">(+1876)</SelectItem>
                                            <SelectItem value="81" data-countrycode="JP">(+81)</SelectItem>
                                            <SelectItem value="962" data-countrycode="JO">(+962)</SelectItem>
                                            <SelectItem value="7" data-countrycode="KZ">(+7)</SelectItem>
                                            <SelectItem value="254" data-countrycode="KE">(+254)</SelectItem>
                                            <SelectItem value="686" data-countrycode="KI">(+686)</SelectItem>
                                            <SelectItem value="850" data-countrycode="KP">(+850)</SelectItem>
                                            <SelectItem value="82" data-countrycode="KR">(+82)</SelectItem>
                                            <SelectItem value="965" data-countrycode="KW">(+965)</SelectItem>
                                            <SelectItem value="996" data-countrycode="KG">(+996)</SelectItem>
                                            <SelectItem value="856" data-countrycode="LA">(+856)</SelectItem>
                                            <SelectItem value="371" data-countrycode="LV">(+371)</SelectItem>
                                            <SelectItem value="961" data-countrycode="LB">(+961)</SelectItem>
                                            <SelectItem value="266" data-countrycode="LS">(+266)</SelectItem>
                                            <SelectItem value="231" data-countrycode="LR">(+231)</SelectItem>
                                            <SelectItem value="218" data-countrycode="LY">(+218)</SelectItem>
                                            <SelectItem value="417" data-countrycode="LI">(+417)</SelectItem>
                                            <SelectItem value="370" data-countrycode="LT">(+370)</SelectItem>
                                            <SelectItem value="352" data-countrycode="LU">(+352)</SelectItem>
                                            <SelectItem value="853" data-countrycode="MO">(+853)</SelectItem>
                                            <SelectItem value="389" data-countrycode="MK">(+389)</SelectItem>
                                            <SelectItem value="261" data-countrycode="MG">(+261)</SelectItem>
                                            <SelectItem value="265" data-countrycode="MW">(+265)</SelectItem>
                                            <SelectItem value="60" data-countrycode="MY">(+60)</SelectItem>
                                            <SelectItem value="960" data-countrycode="MV">(+960)</SelectItem>
                                            <SelectItem value="223" data-countrycode="ML">(+223)</SelectItem>
                                            <SelectItem value="356" data-countrycode="MT">(+356)</SelectItem>
                                            <SelectItem value="692" data-countrycode="MH">(+692)</SelectItem>
                                            <SelectItem value="596" data-countrycode="MQ">(+596)</SelectItem>
                                            <SelectItem value="222" data-countrycode="MR">(+222)</SelectItem>
                                            <SelectItem value="230" data-countrycode="MU">(+230)</SelectItem>
                                            <SelectItem value="262" data-countrycode="YT">(+262)</SelectItem>
                                            <SelectItem value="52" data-countrycode="MX">(+52)</SelectItem>
                                            <SelectItem value="691" data-countrycode="FM">(+691)</SelectItem>
                                            <SelectItem value="373" data-countrycode="MD">(+373)</SelectItem>
                                            <SelectItem value="377" data-countrycode="MC">(+377)</SelectItem>
                                            <SelectItem value="976" data-countrycode="MN">(+976)</SelectItem>
                                            <SelectItem value="1664" data-countrycode="MS">(+1664)</SelectItem>
                                            <SelectItem value="212" data-countrycode="MA">(+212)</SelectItem>
                                            <SelectItem value="258" data-countrycode="MZ">(+258)</SelectItem>
                                            <SelectItem value="95" data-countrycode="MN">(+95)</SelectItem>
                                            <SelectItem value="264" data-countrycode="NA">(+264)</SelectItem>
                                            <SelectItem value="977" data-countrycode="NP">(+977)</SelectItem>
                                            <SelectItem value="31" data-countrycode="NL">(+31)</SelectItem>
                                            <SelectItem value="687" data-countrycode="NC">(+687)</SelectItem>
                                            <SelectItem value="64" data-countrycode="NZ">(+64)</SelectItem>
                                            <SelectItem value="505" data-countrycode="NI">(+505)</SelectItem>
                                            <SelectItem value="227" data-countrycode="NE">(+227)</SelectItem>
                                            <SelectItem value="234" data-countrycode="NG">(+234)</SelectItem>
                                            <SelectItem value="683" data-countrycode="NU">(+683)</SelectItem>
                                            <SelectItem value="672" data-countrycode="NF">(+672)</SelectItem>
                                            <SelectItem value="670" data-countrycode="NP">(+670)</SelectItem>
                                            <SelectItem value="47" data-countrycode="NO">(+47)</SelectItem>
                                            <SelectItem value="968" data-countrycode="OM">(+968)</SelectItem>
                                            <SelectItem value="680" data-countrycode="PW">(+680)</SelectItem>
                                            <SelectItem value="507" data-countrycode="PA">(+507)</SelectItem>
                                            <SelectItem value="675" data-countrycode="PG">(+675)</SelectItem>
                                            <SelectItem value="595" data-countrycode="PY">(+595)</SelectItem>
                                            <SelectItem value="51" data-countrycode="PE">(+51)</SelectItem>
                                            <SelectItem value="63" data-countrycode="PH">(+63)</SelectItem>
                                            <SelectItem value="48" data-countrycode="PL">(+48)</SelectItem>
                                            <SelectItem value="351" data-countrycode="PT">(+351)</SelectItem>
                                            <SelectItem value="1787" data-countrycode="PR">(+1787)</SelectItem>
                                            <SelectItem value="974" data-countrycode="QA">(+974)</SelectItem>
                                            <SelectItem value="262" data-countrycode="RE">(+262)</SelectItem>
                                            <SelectItem value="40" data-countrycode="RO">(+40)</SelectItem>
                                            <SelectItem value="7" data-countrycode="RU">(+7)</SelectItem>
                                            <SelectItem value="250" data-countrycode="RW">(+250)</SelectItem>
                                            <SelectItem value="378" data-countrycode="SM">(+378)</SelectItem>
                                            <SelectItem value="239" data-countrycode="ST">(+239)</SelectItem>
                                            <SelectItem value="966" data-countrycode="SA">(+966)</SelectItem>
                                            <SelectItem value="221" data-countrycode="SN">(+221)</SelectItem>
                                            <SelectItem value="381" data-countrycode="CS">(+381)</SelectItem>
                                            <SelectItem value="248" data-countrycode="SC">(+248)</SelectItem>
                                            <SelectItem value="232" data-countrycode="SL">(+232)</SelectItem>
                                            <SelectItem value="65" data-countrycode="SG">(+65)</SelectItem>
                                            <SelectItem value="421" data-countrycode="SK">(+421)</SelectItem>
                                            <SelectItem value="386" data-countrycode="SI">(+386)</SelectItem>
                                            <SelectItem value="677" data-countrycode="SB">(+677)</SelectItem>
                                            <SelectItem value="252" data-countrycode="SO">(+252)</SelectItem>
                                            <SelectItem value="27" data-countrycode="ZA">(+27)</SelectItem>
                                            <SelectItem value="34" data-countrycode="ES">(+34)</SelectItem>
                                            <SelectItem value="94" data-countrycode="LK">(+94)</SelectItem>
                                            <SelectItem value="290" data-countrycode="SH">(+290)</SelectItem>
                                            <SelectItem value="1869" data-countrycode="KN">(+1869)</SelectItem>
                                            <SelectItem value="1758" data-countrycode="SC">(+1758)</SelectItem>
                                            <SelectItem value="249" data-countrycode="SD">(+249)</SelectItem>
                                            <SelectItem value="597" data-countrycode="SR">(+597)</SelectItem>
                                            <SelectItem value="268" data-countrycode="SZ">(+268)</SelectItem>
                                            <SelectItem value="46" data-countrycode="SE">(+46)</SelectItem>
                                            <SelectItem value="41" data-countrycode="CH">(+41)</SelectItem>
                                            <SelectItem value="963" data-countrycode="SI">(+963)</SelectItem>
                                            <SelectItem value="886" data-countrycode="TW">(+886)</SelectItem>
                                            <SelectItem value="7" data-countrycode="TJ">(+7)</SelectItem>
                                            <SelectItem value="66" data-countrycode="TH">(+66)</SelectItem>
                                            <SelectItem value="228" data-countrycode="TG">(+228)</SelectItem>
                                            <SelectItem value="676" data-countrycode="TO">(+676)</SelectItem>
                                            <SelectItem value="1868" data-countrycode="TT">(+1868)</SelectItem>
                                            <SelectItem value="216" data-countrycode="TN">(+216)</SelectItem>
                                            <SelectItem value="90" data-countrycode="TR">(+90)</SelectItem>
                                            <SelectItem value="7" data-countrycode="TM">(+7)</SelectItem>
                                            <SelectItem value="993" data-countrycode="TM">(+993)</SelectItem>
                                            <SelectItem value="1649" data-countrycode="TC">(+1649)</SelectItem>
                                            <SelectItem value="688" data-countrycode="TV">(+688)</SelectItem>
                                            <SelectItem value="256" data-countrycode="UG">(+256)</SelectItem>
                                            <SelectItem value="380" data-countrycode="UA">(+380)</SelectItem>
                                            <SelectItem value="971" data-countrycode="AE">(+971)</SelectItem>
                                            <SelectItem value="598" data-countrycode="UY">(+598)</SelectItem>
                                            <SelectItem value="7" data-countrycode="UZ">(+7)</SelectItem>
                                            <SelectItem value="678" data-countrycode="VU">(+678)</SelectItem>
                                            <SelectItem value="379" data-countrycode="VA">(+379)</SelectItem>
                                            <SelectItem value="58" data-countrycode="VE">(+58)</SelectItem>
                                            <SelectItem value="84" data-countrycode="VN">(+84)</SelectItem>
                                            <SelectItem value="84" data-countrycode="VG">(+1284)</SelectItem>
                                            <SelectItem value="84" data-countrycode="VI">(+1340)</SelectItem>
                                            <SelectItem value="681" data-countrycode="WF">(+681)</SelectItem>
                                            <SelectItem value="969" data-countrycode="YE">(+969)</SelectItem>
                                            <SelectItem value="967" data-countrycode="YE">(+967)</SelectItem>
                                            <SelectItem value="260" data-countrycode="ZM">(+260)</SelectItem>
                                            <SelectItem value="263" data-countrycode="ZW">(+263)</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormField
                                        control={signUpForm.control}
                                        name="tel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input className="w-2/3" placeholder="Teléfono" {...field} />
                                                </FormControl>
                                                {signUpForm.formState.errors.tel && (
                                                    <p className="text-red-500">{signUpForm.formState.errors.tel.message}</p>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={signUpForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.password && (
                                                <p className="text-red-500">{signUpForm.formState.errors.password.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirmar Contraseña" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.confirm_password && (
                                                <p className="text-red-500">{signUpForm.formState.errors.confirm_password.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-1/2 self-center bg-[#E67E22] hover:bg-transparent hover:text-black hover:border-[#E67E22] border">Registrarse</Button>
                            </form>
                        </Form>
                    </div>
                    <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(onLogin)} className="flex flex-col gap-4">
                                <h1>Iniciar Sesión</h1>
                                <FormField
                                    control={loginForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            {loginForm.formState.errors.email && (
                                                <p className="text-red-500">{loginForm.formState.errors.email.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={loginForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            {loginForm.formState.errors.password && (
                                                <p className="text-red-500">{loginForm.formState.errors.password.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <a href="#">¿Olvidaste tu contraseña?</a>
                                <Button type="submit" className="w-1/2 self-center bg-transparent text-black border-[#E67E22] border hover:bg-[#E67E22] hover:text-white hover:border-none">Iniciar Sesión</Button>
                            </form>
                        </Form>
                    </div>
                    <div className={styles['toggle-container']}>
                        <div className={styles.toggle}>
                            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                                <h1>¡Bienvenido de Nuevo!</h1>
                                <p>Ingresa tus datos personales para usar todas las funciones del sitio</p>
                                <Button className={isSignUp ? '' : 'hidden'} onClick={() => setIsSignUp(false)}>Iniciar Sesión</Button>
                            </div>
                            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                                <h1>¡Hola, Amigo!</h1>
                                <p>Regístrate con tus datos personales para usar todas las funciones del sitio</p>
                                <Button className={isSignUp ? 'hidden' : ''} onClick={() => setIsSignUp(true)}>Registrarse</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
