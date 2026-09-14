import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, CheckCircle, User, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, buildWhatsAppUrl, WHATSAPP_DISPLAY } from '@/lib/whatsapp';

type CheckoutStep = 'cart' | 'details' | 'success';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => { closeCart(); setTimeout(() => setStep('cart'), 400); };

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

  return (
    <>
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-luxury ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-coffee-950/50 backdrop-blur-md" onClick={handleClose} />

        {/* Drawer */}
        <div className={`absolute top-0 left-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl transition-transform duration-500 ease-luxury ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Top accent */}
          <div className="h-px gold-divider opacity-40" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-coffee-100/80 bg-white/80 backdrop-blur-xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-coffee-700 to-coffee-900">
                <ShoppingBag className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-coffee-900">
                  {step === 'cart' && 'سلة المشتريات'}
                  {step === 'details' && 'بيانات الطلب'}
                  {step === 'success' && 'تم الطلب'}
                </h2>
                {step === 'cart' && <p className="text-xs text-coffee-500">{totalItems} منتج</p>}
              </div>
            </div>
            <button onClick={handleClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-coffee-600 transition-all duration-300 hover:bg-cream-200" aria-label="إغلاق">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* CART */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
                    <ShoppingBag className="h-10 w-10 text-coffee-300" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold text-coffee-800">سلتك فارغة</h3>
                  <p className="mt-2 text-sm text-coffee-500">أضف بعض المنتجات لتبدأ طلبك</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-5 py-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.product.id} className="group flex gap-3 rounded-2xl bg-white p-3 card-luxury-sm transition-all duration-300 hover:card-luxury">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                            <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-extrabold text-coffee-900 leading-tight">{item.product.name}</h4>
                              <button onClick={() => removeItem(item.product.id)} className="shrink-0 text-coffee-300 transition-colors duration-300 hover:text-error-500" aria-label="حذف">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="text-xs text-coffee-400 mt-0.5">{item.product.weight}</span>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center rounded-full border border-coffee-200/70">
                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-coffee-600 transition-colors duration-300 hover:bg-coffee-50"><Minus className="h-3 w-3" /></button>
                                <span className="w-8 text-center text-sm font-bold text-coffee-900">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-coffee-600 transition-colors duration-300 hover:bg-coffee-50"><Plus className="h-3 w-3" /></button>
                              </div>
                              <span className="text-sm font-black text-coffee-900">{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {items.length > 1 && (
                      <button onClick={clearCart} className="mt-4 w-full rounded-xl border border-coffee-200/70 py-2.5 text-sm font-bold text-coffee-400 transition-all duration-300 hover:bg-cream-100 hover:text-error-600">
                        تفريغ السلة
                      </button>
                    )}
                  </div>

                  <div className="border-t border-coffee-100/80 bg-white/80 backdrop-blur-xl px-5 py-4">
                    <div className="flex items-center justify-between text-sm text-coffee-500">
                      <span>المجموع الفرعي</span><span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-coffee-500">
                      <span>الشحن</span><span className="text-success-600 font-bold">يُحدد بعد التواصل</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-coffee-100/80 pt-3">
                      <span className="text-base font-extrabold text-coffee-900">الإجمالي</span>
                      <span className="text-xl font-black text-coffee-900">{formatPrice(totalPrice)}</span>
                    </div>
                    <button onClick={() => setStep('details')} className="btn-gold mt-4 w-full group">
                      إتمام الطلب
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* DETAILS */}
          {step === 'details' && (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <button onClick={() => setStep('cart')} className="mb-5 flex items-center gap-1 text-sm font-bold text-coffee-500 transition-colors duration-300 hover:text-coffee-800">
                  <ArrowRight className="h-4 w-4" />
                  رجوع للسلة
                </button>

                <div className="space-y-4">
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

                {/* Summary */}
                <div className="mt-5 rounded-2xl bg-white p-4 card-luxury-sm">
                  <h4 className="text-sm font-extrabold text-coffee-900 mb-3">ملخص الطلب</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-xs text-coffee-600">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between border-t border-coffee-100/80 pt-3">
                    <span className="font-extrabold text-coffee-900">الإجمالي</span>
                    <span className="font-black text-coffee-900">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-coffee-100/80 bg-white/80 backdrop-blur-xl px-5 py-4">
                <div className="mb-3 flex items-center gap-2 rounded-xl bg-success-50 px-3 py-2.5 text-xs text-success-700">
                  <Send className="h-4 w-4 shrink-0" />
                  سيتم إرسال طلبك عبر واتساب على رقم {WHATSAPP_DISPLAY} لتأكيده
                </div>
                <button onClick={handleSubmitOrder} className="btn-gold w-full group">
                  إرسال الطلب عبر واتساب
                  <Send className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:-translate-x-1" />
                </button>
              </div>
            </>
          )}

          {/* SUCCESS */}
          {step === 'success' && (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success-50 animate-scale-in">
                <CheckCircle className="h-14 w-14 text-success-600" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-coffee-900">تم إرسال طلبك!</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-coffee-500">
                تم إرسال تفاصيل طلبك عبر واتساب. سنتواصل معك قريباً لتأكيد الطلب وتحديد الشحن.
              </p>
              <button onClick={handleClose} className="btn-primary mt-8">متابعة التسوّق</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
