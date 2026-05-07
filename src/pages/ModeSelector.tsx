import { ArrowRight, User, Users, Palette, TrendingUp } from 'lucide-react';

interface ModeSelectorProps {
  onSelect: (mode: 'client' | 'reseller') => void;
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full"></div>
              <img
                src="/img/mi_logo.png"
                alt="NEXUS"
                className="h-32 relative z-10"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Bienvenido a{' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
              NEXUS
            </span>
          </h1>
          <p className="text-gray-600 text-xl">
            Sublimacion y DTF - Elige tu producto base
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Client Mode Card */}
          <button
            onClick={() => onSelect('client')}
            className="group relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 border border-blue-600 text-left transition-all hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-500/20 border border-blue-400 p-4 rounded-full">
                    <User className="w-8 h-8 text-blue-200" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-200 group-hover:text-blue-100 transition-colors group-hover:translate-x-2" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Cliente</h2>
                <p className="text-blue-100 text-base">
                  Elige tu producto base, selecciona talla y color, y envianos tu
                  diseño. Cotizacion final via WhatsApp.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100 text-sm">
                    Tu diseño en el producto que elijas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100 text-sm">
                    Cotizacion directa por WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Reseller Mode Card */}
          <button
            onClick={() => onSelect('reseller')}
            className="group relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-slate-600 text-left transition-all hover:border-slate-500 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-full">
                    <Users className="w-8 h-8 text-blue-300" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-300 group-hover:text-blue-200 transition-colors group-hover:translate-x-2" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Revendedor
                </h2>
                <p className="text-slate-200 text-base">
                  Pedidos por volumen con precios mayoristas. Botones rapidos
                  para incrementar cantidades.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-300" />
                  <span className="text-slate-200 text-sm">
                    Precios mayoristas por volumen
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-300" />
                  <span className="text-slate-200 text-sm">
                    Soporte y asesoría constante
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* How it works */}
        <div className="bg-white border border-blue-200 rounded-2xl p-8 mb-12 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Como funciona NEXUS?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 border border-blue-300 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-900">1</span>
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">
                Elige tu base
              </h4>
              <p className="text-gray-600 text-sm">
                Camiseta, taza, gorra, llavero y mas
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 border border-blue-300 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-900">2</span>
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">
                Selecciona variantes
              </h4>
              <p className="text-gray-600 text-sm">
                Talla, color y cantidad que necesites
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 border border-blue-300 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-900">3</span>
              </div>
              <h4 className="text-gray-900 font-semibold mb-2">
                Envia tu diseño
              </h4>
              <p className="text-gray-600 text-sm">
                Por WhatsApp con el resumen de tu pedido
              </p>
            </div>
          </div>
        </div>

        {/* CTA Info */}
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            ¿Preguntas? Contactanos por WhatsApp:{' '}
            <span className="text-blue-900 font-semibold">
              +507 6498-7682
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
