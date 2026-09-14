import { useState } from 'react';
import { Phone, MapPin, Mail, Send, Clock, MessageCircle, CheckCircle, User } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

export default function Contact() {
  const reveal = useReveal();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.phone.trim()) e.phone = 'رقم الهاتف مطلوب';
    else if (!/^01[0-2,5]\d{8}$/.test(form.phone.trim())) e.phone = 'رقم هاتف مصري غير صحيح';
    if (!form.message.trim()) e.message = 'الرسالة مطلوبة';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const message = `*رسالة جديدة من موقع بن شغف*\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالرسالة: ${form.message}`;
    window.open(buildWhatsAppUrl(message), '_blank');
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">تواصل معنا</span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-coffee-900 sm:text-5xl">نحب نسمع منك</h1>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
            <span className="h-px w-2 bg-gold-400/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
          </div>
          <p className="mx-auto mt-5 max-w-lg text-base text-coffee-500">
            عندك سؤال أو استفسار؟ راسلنا — كل رسالة بتوصلنا على واتساب مباشرة
          </p>
        </div>

        <div ref={reveal.ref} className={`mt-12 grid gap-8 lg:grid-cols-5 reveal ${reveal.visible ? 'visible' : ''}`}>
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-3">
            {[
              { Icon: Phone, title: 'الهاتف / واتساب', value: WHATSAPP_DISPLAY, href: `tel:${WHATSAPP_DISPLAY}`, color: 'bg-success-50 text-success-600' },
              { Icon: Mail, title: 'البريد الإلكتروني', value: 'info@shaghaf.coffee', href: 'mailto:info@shaghaf.coffee', color: 'bg-gold-50 text-gold-600' },
              { Icon: MapPin, title: 'العنوان', value: 'القاهرة — شحن لكل المحافظات', color: 'bg-coffee-50 text-coffee-600' },
              { Icon: Clock, title: 'مواعيد العمل', value: 'السبت - الخميس: 9 ص - 10 م', color: 'bg-error-50 text-error-600' },
            ].map(({ Icon, title, value, href, color }) => (
              <a
                key={title}
                href={href || undefined}
                className={`group flex items-center gap-4 rounded-2xl bg-white p-5 card-luxury transition-all duration-500 ease-luxury hover:card-luxury-hover hover:-translate-y-0.5 ${href ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color} transition-transform duration-500 ease-luxury group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-coffee-400">{title}</div>
                  <div className="text-base font-extrabold text-coffee-900" dir={title.includes('هاتف') ? 'ltr' : undefined}>{value}</div>
                </div>
              </a>
            ))}

            {/* WhatsApp button */}
            <a
              href={buildWhatsAppUrl('مرحباً، أرغب في الاستفسار عن منتجاتكم')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-success-500 to-success-600 p-5 text-white shadow-luxury-sm transition-all duration-500 ease-luxury hover:shadow-luxury hover:-translate-y-0.5"
            >
              <MessageCircle className="h-6 w-6 transition-transform duration-500 ease-luxury group-hover:scale-110" />
              <span className="text-base font-extrabold">محادثة واتساب مباشرة</span>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="noise-overlay relative rounded-3xl bg-white p-8 card-luxury sm:p-10">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[3rem] rounded-tr-3xl bg-gold-400/5" />

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-50 animate-scale-in">
                    <CheckCircle className="h-12 w-12 text-success-600" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-coffee-900">تم إرسال رسالتك!</h3>
                  <p className="mt-3 max-w-xs text-sm text-coffee-500">فتحنا لك محادثة واتساب. سنتواصل معك في أقرب وقت.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <h2 className="text-xl font-extrabold text-coffee-900">أرسل لنا رسالة</h2>

                  <div>
                    <label className="label-field"><User className="h-3.5 w-3.5 text-gold-600" /> الاسم الكامل</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اكتب اسمك" className={`input-field ${errors.name ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                    {errors.name && <p className="mt-1 text-xs text-error-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="label-field"><Phone className="h-3.5 w-3.5 text-gold-600" /> رقم الهاتف</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" dir="ltr" className={`input-field text-right ${errors.phone ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                    {errors.phone && <p className="mt-1 text-xs text-error-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="label-field"><MessageCircle className="h-3.5 w-3.5 text-gold-600" /> رسالتك</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="اكتب رسالتك هنا..." rows={5} className={`input-field resize-none ${errors.message ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                    {errors.message && <p className="mt-1 text-xs text-error-500">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-gold w-full group">
                    إرسال عبر واتساب
                    <Send className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
