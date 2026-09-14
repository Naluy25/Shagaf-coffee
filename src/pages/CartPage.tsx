import { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Send, CheckCircle, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, buildWhatsAppUrl, WHATSAPP_DISPLAY } from '@/lib/whatsapp';
import type { Page } from '@/components/Header';

type CheckoutStep = 'cart' | 'details' | 'success';

interface CartPageProps {
  onNavigate?: (page: Page) => void;
  onOpenProduct?: (id: string) => void;
}

export default function CartPage({ onNavigate, onOpenProduct }: CartPageProps) {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.phone.trim()) e.phone = 'رقم الهاتف مطلوب';
    else if (!/^01[0-2,5]\d{8}$/.test(form.phone.trim())) e.phone = 'رقم هاتف مصري غير صحيح';
    if (!form.address.trim()) e.address = 'العنوان مطلوب';
    if (!form.city.trim()) e.city = 'المدينة مطلوبة';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validate()) return;
    const orderLines = items.map((i, idx) => `${idx + 1}. ${i.product.name}\n   الكمية: ${i.quantity} × ${formatPrice(i.product.price)} = ${formatPrice(i.product.price * i.quantity)}`);
    const message = `*طلب جديد — بن شغف*\n\n*تفاصيل العميل*\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالعنوان: ${form.address}\nالمدينة: ${form.city}\n${form.notes ? `ملاحظات: ${form.notes}\n` : ''}\n*تفاصيل الطلب*\n${orderLines.join('\n')}\n\n*الإجمالي: ${formatPrice(totalPrice)}*\n\nشكراً لطلبك — سنتواصل معك للتأكيد`;
    window.open(buildWhatsAppUrl(message), '_blank');
    setStep('success');
    clearCart();
    setForm({ name: '', phone: '', address: '', city: '', notes: '' });
  };

  const empty = items.length === 0;

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      <div className="container-xl pt-28">
        {/* ── Header bar ── */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate?.('store')}
            className="group inline-flex items-center gap-2 text-sm font-bold text-coffee-500 transition-colors duration-300 hover:text-coffee-900"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            متابعة التسوّق
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-gold-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-600">بن شغف</span>
          </div>
        </div>

        {/* ── Title ── */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-coffee-900 sm:text-4xl">
            {step === 'cart' && 'سلة المشتريات'}
            {step === 'details' && 'بيانات الطلب'}
            {step === 'success' && 'تم الطلب'}
          </h1>
          <p className="mt-3 text-sm text-coffee-500">
            {step === 'cart' && (empty ? 'سلتك فارغة حالياً' : `لديك ${totalItems} ${totalItems === 1 ? 'منتج' : 'منتجات'} في السلة`)}
            {step === 'details' && 'أكمل بياناتك لإتمام طلبك بنجاح'}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
            <span className="h-px w-2 bg-gold-400/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
          </div>
        </div>

        {step === 'success' ? (
          /* ── SUCCESS ── */
          <div className="mx-auto mt-14 max-w-lg rounded-[2rem] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success-50 animate-scale-in">
              <CheckCircle className="h-14 w-14 text-success-600" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-coffee-900">تم إرسال طلبك!</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-coffee-500">
              تم إرسال تفاصيل طلبك عبر واتساب. سنتواصل معك قريباً لتأكيد الطلب وتحديد الشحن.
            </p>
            <button onClick={() => onNavigate?.('store')} className="btn-gold mt-8 group">
              متابعة التسوّق
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
            </button>
          </div>
        ) : empty ? (
          /* ── EMPTY CART ── */
          <div className="mx-auto mt-14 max-w-lg text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-cream-100">
              <ShoppingBag className="h-12 w-12 text-coffee-300" />
            </div>
            <h2 className="mt-6 text-xl font-extrabold text-coffee-800">سلتك فارغة</h2>
            <p className="mt-2 text-sm text-coffee-500">اكتشف أجود أنواع البن اليمني وابدأ طلبك</p>
            <button onClick={() => onNavigate?.('store')} className="btn-gold mt-8 group">
              تصفّح المتجر
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
            </button>
          </div>
        ) : step === 'cart' ? (
          /* ── CART LIST ── */
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <div key={item.product.id} className="group flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-coffee-100/50 transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center">
                  <button
                    onClick={() => onOpenProduct?.(item.product.id)}
                    className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-cream-100 sm:w-24"
                  >
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </button>

                  <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-coffee-900">{item.product.name}</h4>
                      <span className="mt-0.5 block text-xs text-coffee-400">{item.product.weight} — {formatPrice(item.product.price)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <div className="flex items-center rounded-full bg-cream-50 ring-1 ring-coffee-100">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-coffee-500 transition-colors duration-300 hover:bg-cream-100 hover:text-coffee-800" aria-label="تقليل">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-base font-black text-coffee-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center rounded-full text-coffee-500 transition-colors duration-300 hover:bg-cream-100 hover:text-coffee-800" aria-label="زيادة">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-coffee-900">{formatPrice(item.product.price * item.quantity)}</span>
                        <button onClick={() => removeItem(item.product.id)} className="text-coffee-300 transition-colors duration-300 hover:text-error-500" aria-label="حذف">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 1 && (
                <button onClick={clearCart} className="w-full rounded-2xl border border-coffee-200/70 py-3 text-sm font-bold text-coffee-400 transition-all duration-300 hover:bg-coffee-50 hover:text-error-600">
                  تفريغ السلة بالكامل
                </button>
              )}
            </div>

            {/* Summary */}
            <div className="h-fit rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-coffee-100/50 lg:sticky lg:top-28">
              <h3 className="text-lg font-extrabold text-coffee-900">ملخص الطلب</h3>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm text-coffee-600">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-coffee-100/80 pt-4">
                <div className="flex justify-between text-sm text-coffee-500">
                  <span>المجموع الفرعي</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-coffee-500">
                  <span>الشحن</span>
                  <span className="font-bold text-success-600">يُحدد بعد التواصل</span>
                </div>
                <div className="flex justify-between border-t border-coffee-100/80 pt-3">
                  <span className="text-base font-extrabold text-coffee-900">الإجمالي</span>
                  <span className="text-xl font-black text-coffee-900">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button onClick={() => setStep('details')} className="btn-gold mt-6 w-full group">
                إتمام الطلب
                <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        ) : (
          /* ── DETAILS ── */
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-coffee-100/50 lg:col-span-2">
              <button onClick={() => setStep('cart')} className="flex items-center gap-1 text-sm font-bold text-coffee-500 transition-colors duration-300 hover:text-coffee-800">
                <ArrowRight className="h-4 w-4" />
                رجوع للسلة
              </button>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="label-field"><User className="h-3.5 w-3.5 text-gold-600" /> الاسم الكامل</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اكتب اسمك الكامل" className={`input-field ${errors.name ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                  {errors.name && <p className="mt-1 text-xs text-error-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="label-field"><Phone className="h-3.5 w-3.5 text-gold-600" /> رقم الهاتف</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" dir="ltr" className={`input-field text-right ${errors.phone ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                  {errors.phone && <p className="mt-1 text-xs text-error-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="label-field"><MapPin className="h-3.5 w-3.5 text-gold-600" /> العنوان بالتفصيل</label>
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="الشارع، رقم المبنى، الدور..." className={`input-field ${errors.address ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                  {errors.address && <p className="mt-1 text-xs text-error-500">{errors.address}</p>}
                </div>
                <div>
                  <label className="label-field"><MapPin className="h-3.5 w-3.5 text-gold-600" /> المدينة / المحافظة</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="مثال: القاهرة، الجيزة..." className={`input-field ${errors.city ? 'border-error-400 ring-2 ring-error-200' : ''}`} />
                  {errors.city && <p className="mt-1 text-xs text-error-500">{errors.city}</p>}
                </div>
                <div>
                  <label className="label-field"><MessageSquare className="h-3.5 w-3.5 text-gold-600" /> ملاحظات إضافية (اختياري)</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="أي تفاصيل إضافية عن طلبك..." rows={3} className="input-field resize-none" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="h-fit rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-coffee-100/50 lg:sticky lg:top-28">
              <h3 className="text-lg font-extrabold text-coffee-900">ملخص الطلب</h3>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm text-coffee-600">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between border-t border-coffee-100/80 pt-4">
                <span className="font-extrabold text-coffee-900">الإجمالي</span>
                <span className="font-black text-coffee-900">{formatPrice(totalPrice)}</span>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-success-50 px-4 py-3 text-xs text-success-700">
                <Send className="h-4 w-4 shrink-0" />
                سيتم إرسال طلبك عبر واتساب على رقم {WHATSAPP_DISPLAY} لتأكيده
              </div>

              <button onClick={handleSubmitOrder} className="btn-gold mt-5 w-full group">
                إرسال الطلب عبر واتساب
                <Send className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}