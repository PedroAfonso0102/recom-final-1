"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { RecomButton } from "@/design-system/components/recom-button";
import { submitContactForm } from "@/lib/actions/lead-actions";
import { siteConfig } from "@/lib/config";

const contactFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  company: z.string().min(2, "Informe a empresa."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().min(10, "Informe um telefone ou WhatsApp."),
  supplierInterest: z.string().optional(),
  processInterest: z.string().optional(),
  itemCode: z.string().optional(),
  message: z.string().min(10, "Conte um pouco mais sobre a sua necessidade."),
  consent: z
    .boolean()
    .refine((value) => value, { message: "Confirme a política de privacidade para continuar." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function ContactField({
  label,
  name,
  error,
  children,
  helper,
  required = false,
}: {
  label: string;
  name: keyof ContactFormValues;
  error?: string;
  children: ReactNode;
  helper?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-3">
      <label htmlFor={name} className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {helper && !error && <p className="text-[12px] leading-relaxed text-muted-foreground/70">{helper}</p>}
      {error && (
        <p className="text-[12px] font-medium text-recom-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      supplierInterest: "",
      processInterest: "",
      itemCode: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    setSubmitError("");

    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("company", values.company);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("supplierInterest", values.supplierInterest || "");
    formData.set("processInterest", values.processInterest || "");
    formData.set("itemCode", values.itemCode || "");
    formData.set("message", values.message);
    formData.set("sourcePage", typeof window !== "undefined" ? window.location.pathname : "/sobre");

    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus("success");
      reset();
      return;
    }

    setStatus("error");
    setSubmitError(result.error || "Ocorreu um erro ao enviar sua mensagem.");
  }

  if (status === "success") {
    return (
      <div
        data-hook="public.contact.form.success"
        className="space-y-6 rounded-xl border border-recom-border bg-recom-gray-50 px-6 py-10 text-center md:px-10"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold uppercase tracking-tight text-recom-graphite">Solicitação enviada</h3>
          <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Obrigado pelo contato. Nossa equipe comercial vai analisar sua solicitação e retornar em breve.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <RecomButton type="button" intent="outline" className="h-11 px-6" onClick={() => setStatus("idle")}>
            Enviar outra mensagem
          </RecomButton>
          <RecomButton asChild intent="primary" className="h-11 px-6">
            <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </RecomButton>
        </div>
      </div>
    );
  }

  return (
    <form data-hook="public.contact.form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <ContactField label="Nome" name="name" error={errors.name?.message} required>
          <input
            id="name"
            type="text"
            placeholder="Nome completo"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.name}
            disabled={status === "loading"}
            {...register("name")}
          />
        </ContactField>

        <ContactField label="Empresa" name="company" error={errors.company?.message} required>
          <input
            id="company"
            type="text"
            placeholder="Nome da sua empresa"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.company}
            disabled={status === "loading"}
            {...register("company")}
          />
        </ContactField>

        <ContactField label="E-mail" name="email" error={errors.email?.message} required>
          <input
            id="email"
            type="email"
            placeholder="exemplo@empresa.com.br"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.email}
            disabled={status === "loading"}
            {...register("email")}
          />
        </ContactField>

        <ContactField label="Telefone / WhatsApp" name="phone" error={errors.phone?.message} required>
          <input
            id="phone"
            type="tel"
            placeholder="(19) 00000-0000"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.phone}
            disabled={status === "loading"}
            {...register("phone")}
          />
        </ContactField>

        <ContactField
          label="Fornecedor de interesse"
          name="supplierInterest"
          error={errors.supplierInterest?.message}
          helper="Se já souber a marca, informe aqui. Ex.: Mitsubishi Materials."
        >
          <input
            id="supplierInterest"
            type="text"
            placeholder="Ex.: Mitsubishi Materials"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.supplierInterest}
            disabled={status === "loading"}
            {...register("supplierInterest")}
          />
        </ContactField>

        <ContactField
          label="Processo / aplicação"
          name="processInterest"
          error={errors.processInterest?.message}
          helper="Ex.: torneamento, fresamento, furação ou uma aplicação específica."
        >
          <input
            id="processInterest"
            type="text"
            placeholder="Ex.: Torneamento"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.processInterest}
            disabled={status === "loading"}
            {...register("processInterest")}
          />
        </ContactField>

        <ContactField
          label="Código ou item desejado"
          name="itemCode"
          error={errors.itemCode?.message}
          helper="Se tiver o código do insert, broca ou acessório, isso ajuda a agilizar o atendimento."
        >
          <input
            id="itemCode"
            type="text"
            placeholder="Ex.: CNMG120408-MA"
            className="flex h-12 w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-2 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.itemCode}
            disabled={status === "loading"}
            {...register("itemCode")}
          />
        </ContactField>

        <div className="md:col-span-2 space-y-3">
          <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Mensagem *
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Descreva sua necessidade, volume, material, máquina ou qualquer detalhe relevante."
            className="flex min-h-[140px] w-full rounded-md border border-recom-border bg-recom-gray-50/60 px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-recom-blue focus:bg-white"
            aria-invalid={!!errors.message}
            disabled={status === "loading"}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-[12px] font-medium text-recom-red" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 rounded-lg border border-recom-border bg-recom-gray-50/60 px-4 py-4 text-[14px] leading-relaxed text-recom-graphite">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-recom-border text-recom-blue focus:ring-recom-blue"
              disabled={status === "loading"}
              {...register("consent")}
            />
            <span>
              Concordo com o uso dos meus dados para retorno comercial da RECOM e li a política de privacidade.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-2 text-[12px] font-medium text-recom-red" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div
          data-hook="public.contact.form.error"
          className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}

      <div className="space-y-4 pt-2">
        <RecomButton
          type="submit"
          size="lg"
          className="h-12 w-full text-[12px] uppercase tracking-[0.18em]"
          disabled={status === "loading"}
          data-hook="public.contact.form.submit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando
            </>
          ) : (
            "Enviar solicitação"
          )}
        </RecomButton>

        <div className="grid gap-3 text-[12px] text-slate-500 sm:grid-cols-3">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 rounded-lg border border-recom-border bg-white px-4 py-3 font-bold uppercase tracking-[0.12em] transition-colors hover:border-recom-blue/20 hover:text-recom-blue"
          >
            <Phone className="h-4 w-4 text-recom-blue" />
            Ligar
          </a>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-recom-border bg-white px-4 py-3 font-bold uppercase tracking-[0.12em] transition-colors hover:border-recom-blue/20 hover:text-recom-blue"
          >
            <MessageCircle className="h-4 w-4 text-recom-blue" />
            WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 rounded-lg border border-recom-border bg-white px-4 py-3 font-bold uppercase tracking-[0.12em] transition-colors hover:border-recom-blue/20 hover:text-recom-blue"
          >
            <Mail className="h-4 w-4 text-recom-blue" />
            E-mail
          </a>
        </div>

        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Atendimento comercial: segunda a sexta, 08:00 às 18:00
        </p>
      </div>
    </form>
  );
}
