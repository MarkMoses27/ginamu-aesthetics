"use client";
import { useEffect, useState, type FormEvent } from "react";
const categories = ["Facials & skin care", "Body treatments & massage", "Sauna & steam bath", "Brows & lashes", "Nail care", "Waxing", "Help me choose"];
export default function ContactBooking() {
  const [today, setToday] = useState("");
  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en", { timeZone: "Africa/Nairobi", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
    const part = (type: string) => parts.find(item => item.type === type)?.value;
    setToday(`${part("year")}-${part("month")}-${part("day")}`);
  }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) || "").trim();
    const nameInput = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    nameInput.setCustomValidity("");
    if (!value("name")) {
      nameInput.setCustomValidity("Please enter your name.");
      nameInput.reportValidity();
      return;
    }
    const dateInput = event.currentTarget.elements.namedItem("date") as HTMLInputElement;
    dateInput.setCustomValidity("");
    if (value("date") && new Date(`${value("date")}T12:00:00Z`).getUTCDay() === 0) {
      dateInput.setCustomValidity("Ginamu is closed on Sundays. Please choose Monday to Saturday.");
      dateInput.reportValidity();
      return;
    }
    const lines = [`Hi Ginamu Aesthetics, my name is ${value("name")}.`, `I'd like to enquire about: ${value("treatment")}.`];
    if (value("date")) lines.push(`Preferred date: ${value("date")}.`);
    if (value("time")) lines.push(`Preferred time: ${value("time")}.`);
    if (value("message")) lines.push(value("message"));
    lines.push("Please confirm availability and help me plan my visit.");
    window.location.assign(`https://wa.me/254743364717?text=${encodeURIComponent(lines.join("\n"))}`);
  };
  return <div className="contactBookingCard"><p className="contactEyebrow">Appointment enquiry</p><h3>Tell us what you have in mind.</h3><p>Share your preferences, then send your enquiry on WhatsApp.</p>
    <p className="contactBookingHours">Mon–Sat · 7:30 AM–6:30 PM <span>Sunday closed</span></p>
    <form onSubmit={submit} className="contactBookingForm">
      <div className="contactField"><label htmlFor="booking-name">Your name <span aria-hidden="true">*</span></label><input id="booking-name" name="name" autoComplete="given-name" required maxLength={80} onChange={event => event.currentTarget.setCustomValidity("")} placeholder="Your first name" /></div>
      <div className="contactField"><label htmlFor="booking-treatment">Treatment interest <span aria-hidden="true">*</span></label><select id="booking-treatment" name="treatment" required defaultValue=""><option value="" disabled>Choose a treatment category</option>{categories.map(category => <option key={category}>{category}</option>)}</select></div>
      <div className="contactFormPair"><div className="contactField"><label htmlFor="booking-date">Preferred date <small>(optional)</small></label><input id="booking-date" name="date" type="date" min={today || undefined} onChange={event => event.currentTarget.setCustomValidity("")} /></div><div className="contactField"><label htmlFor="booking-time">Preferred time <small>(optional)</small></label><select id="booking-time" name="time" defaultValue=""><option value="">No preference</option><option>Morning</option><option>Afternoon</option></select></div></div>
      <div className="contactField"><label htmlFor="booking-message">Anything else? <small>(optional)</small></label><textarea id="booking-message" name="message" rows={3} maxLength={1000} placeholder="Tell us which service you’re interested in, or ask a question." /></div>
      <button type="submit">Continue on WhatsApp <span aria-hidden="true">↗</span></button><p className="contactFormNote">Your preferred date is an enquiry. Availability is confirmed by our team.</p>
    </form>
  </div>;
}
