import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Locales, TramoHorario, User } from "@/lib/interfaces";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format, isBefore, startOfDay } from "date-fns";
import styles from "./reserva.module.css";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import env from "@/lib/env";

const Reserva: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [local, setLocal] = useState<Locales | null>(null);
  const [usuario, setUsuario] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        try {
          const localResponse = await axios.get(env.API_BASE_URL + env.endpoints.local(Number(id)));
          setLocal(localResponse.data);
  
          const userResponse = await axios.get(env.API_BASE_URL + env.endpoints.mi_usuario, {
            headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
          });
          setUsuario(userResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [id]);

  const isDateEnabled = (date: Date): boolean => {
    if (!local || !local.horarios || local.horarios.length === 0) {
      return false;
    }

    const dayOfWeek = date.getDay();
    const dayMap = ["D", "L", "M", "X", "J", "V", "S"];

    return local.horarios.some((horario) => horario.dias[dayMap[dayOfWeek]]);
  };

  const reservaSchema = z
    .object({
      fecha: z
        .date()
        .refine(
          (date) => date instanceof Date && !isNaN(date.getTime()) && isDateEnabled(date) && !isBefore(startOfDay(date), startOfDay(new Date())),
          { message: "Fecha inválida, el local está cerrado o la fecha es anterior a hoy" }
        ),
      hora: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido"),
      num_personas: z.preprocess(
        (val) => Number(val),
        z
          .number()
          .min(1, "Debe haber al menos 1 persona")
          .max(100, "No puede exceder de 100 personas")
      ),
      tramo_horario: z.string(),
    })
    .refine(
      (data) => {
        const tramoSeleccionado = local?.tramos_horarios.find(
          (tramo) => tramo.id === parseInt(data.tramo_horario)
        );
        if (!tramoSeleccionado) return false;

        const [horaInicio, minutoInicio] = tramoSeleccionado.h_inicio.split(":").map(Number);
        const [horaFin, minutoFin] = tramoSeleccionado.h_final.split(":").map(Number);
        const [horaSeleccionada, minutoSeleccionada] = data.hora.split(":").map(Number);

        const inicio = new Date();
        inicio.setHours(horaInicio, minutoInicio, 0);

        const fin = new Date();
        fin.setHours(horaFin, minutoFin, 0);

        const seleccionada = new Date();
        seleccionada.setHours(horaSeleccionada, minutoSeleccionada, 0);

        return seleccionada >= inicio && seleccionada <= fin;
      },
      { message: "La hora seleccionada no está dentro del tramo horario." }
    )
    .refine(
      (data) => {
        const tramoSeleccionado = local?.tramos_horarios.find(
          (tramo) => tramo.id === parseInt(data.tramo_horario)
        );
        if (!tramoSeleccionado) return false;
        return data.num_personas <= tramoSeleccionado.clientes_maximos;
      },
      { message: "El número de personas excede el máximo permitido para el tramo horario seleccionado." }
    );

  type ReservaSchema = z.infer<typeof reservaSchema>;

  const reservaForm = useForm<ReservaSchema>({
    resolver: zodResolver(reservaSchema),
  });

  const onSubmit: SubmitHandler<ReservaSchema> = async (data) => {
    const reservaData = {
      fecha: format(data.fecha, "yyyy-MM-dd"),
      hora: data.hora,
      numero_personas: data.num_personas,
      tramo_horario: Number(data.tramo_horario),
      local: Number(id),
      usuario: usuario?.id,
      estado: 1,
    };

    try {
      await axios.post(
        env.API_BASE_URL + env.endpoints.crear_reserva,
        reservaData,
        {
          headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
        }
      );
      toast.success("Reserva realizada con éxito");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      toast.error("Error al realizar la reserva");
    }
  };

  const handleError = (errors: any) => {
    for (const error of Object.values(errors)) {
      toast.error((error as { message: string }).message);
    }
  };

  return (
    <div className={`${styles.fondo} rounded border border-black m-10 w-full h-full bg-re flex justify-center items-center relative`}>
      <ToastContainer />
      {local ? (
        <section className="border border-white rounded p-10 bg-white shadow-lg shadow-[#000000]">
          <h1 className="text-center text-3xl">{local?.nombre}</h1>
          <Form {...reservaForm}>
            <form
              onSubmit={reservaForm.handleSubmit(onSubmit, handleError)}
              className="min-w-full flex flex-col gap-4 items-center justify-center py-2 h-full"
            >
              <h1><b>Reserva</b></h1>
              <FormField
                control={reservaForm.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem className={styles.inputContainer}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "dd/MM/yyyy", { locale: es }) : <span>Elige una fecha</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-20 w-full p-0 bg-white border border-gray-300 rounded shadow-lg">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => !isDateEnabled(date) || isBefore(startOfDay(date), startOfDay(new Date()))}
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                    {reservaForm.formState.errors.fecha && (
                      <p className="text-red-500">{reservaForm.formState.errors.fecha.message as React.ReactNode}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={reservaForm.control}
                name="tramo_horario"
                render={({ field }) => (
                  <FormItem className={styles.inputContainer}>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="z-10" placeholder="Tramo horario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {local?.tramos_horarios.map(
                          (tramo: TramoHorario, index) => (
                            <SelectItem key={index} value={tramo.id.toString()}>
                              {tramo.nombre} - {tramo.h_inicio} - {tramo.h_final}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    {reservaForm.formState.errors.tramo_horario && (
                      <p className="text-red-500">{reservaForm.formState.errors.tramo_horario.message as React.ReactNode}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={reservaForm.control}
                name="hora"
                render={({ field }) => (
                  <FormItem className={styles.inputContainer}>
                    <FormControl>
                      <Input className="w-full" type="time" placeholder="Hora" {...field} />
                    </FormControl>
                    {reservaForm.formState.errors.hora && (
                      <p className="text-red-500">{reservaForm.formState.errors.hora.message as React.ReactNode}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={reservaForm.control}
                name="num_personas"
                render={({ field }) => (
                  <FormItem className={styles.inputContainer}>
                    <FormControl>
                      <Input type="number" placeholder="Personas" {...field} />
                    </FormControl>
                    {reservaForm.formState.errors.num_personas && (
                      <p className="text-red-500">{reservaForm.formState.errors.num_personas.message as React.ReactNode}</p>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit">Reservar</Button>
            </form>
          </Form>
        </section>
      ) : (
        <LoaderCircle className="animate-spin" width={100} height={100} />
      )}
    </div>
  );
};

export default Reserva;
