"use client";

import { useForm, ValidationError } from "@formspree/react";
import { FORMSPREE_FORM_ID } from "@/lib/constants";

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-sky/10 text-center space-y-3">
        <h3 className="font-heading text-2xl font-bold text-ocean">
          Nachricht versendet.
        </h3>
        <p className="text-ocean/70">
          Danke. Ich melde mich, sobald die Makrele oben aufsteigt.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-sky/10"
    >
      <div>
        <label
          htmlFor="name"
          className="block font-heading font-semibold text-ocean mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
          placeholder="Dein Name"
        />
        <ValidationError
          field="name"
          prefix="Name"
          errors={state.errors}
          className="text-sm text-red-600 mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-heading font-semibold text-ocean mb-1"
        >
          E-Mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors"
          placeholder="deine@email.de"
        />
        <ValidationError
          field="email"
          prefix="E-Mail"
          errors={state.errors}
          className="text-sm text-red-600 mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-heading font-semibold text-ocean mb-1"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-sky/30 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-colors resize-none"
          placeholder="Deine Nachricht..."
        />
        <ValidationError
          field="message"
          prefix="Nachricht"
          errors={state.errors}
          className="text-sm text-red-600 mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-3 rounded-full bg-fish-gold text-ocean font-heading font-semibold text-lg hover:bg-fish-orange transition-all duration-300 shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {state.submitting ? "Wird gesendet..." : "Nachricht senden"}
      </button>

      <ValidationError
        errors={state.errors}
        className="text-sm text-red-600 text-center"
      />

      <p className="text-xs text-ocean/50 text-center">
        Mit dem Absenden stimmst du der Verarbeitung deiner Angaben zur
        Beantwortung deiner Anfrage zu. Details findest du in unserer{" "}
        <a href="/datenschutz" className="text-sky-deep hover:underline">
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}
