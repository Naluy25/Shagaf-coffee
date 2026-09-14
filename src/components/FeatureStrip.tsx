import { Truck, ShieldCheck, Coffee, Heart } from 'lucide-react';

const features = [
  { Icon: Truck, title: 'توصيل سريع', subtitle: 'لكل المحافظات' },
  { Icon: ShieldCheck, title: 'جودة مضمونة', subtitle: 'مواصفات قياسية' },
  { Icon: Coffee, title: 'تحميص طازج', subtitle: 'يومياً بمطاحمنا' },
  { Icon: Heart, title: 'تغليف فاخر', subtitle: 'يهدي كله ذوق' },
];

export default function FeatureStrip() {
  return (
    <section className="relative border-y border-coffee-100/60 bg-white/40">
      <div className="container-xl">
        <div className="grid grid-cols-2 divide-x divide-x-reverse divide-coffee-100/60 lg:grid-cols-4">
          {features.map(({ Icon, title, subtitle }, idx) => (
            <div
              key={title}
              className="group flex items-center justify-center gap-3.5 px-4 py-6 transition-colors duration-500 hover:bg-gold-50/30 sm:px-6 sm:py-7"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards`,
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coffee-50 to-cream-100 text-coffee-700 transition-all duration-500 ease-luxury group-hover:from-gold-100 group-hover:to-gold-50 group-hover:text-gold-700 group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-right leading-tight">
                <div className="text-sm font-extrabold text-coffee-900">{title}</div>
                <div className="text-[11px] text-coffee-400">{subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
