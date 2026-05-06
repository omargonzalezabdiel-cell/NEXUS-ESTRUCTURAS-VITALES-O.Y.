import { ArrowRight, User, Users, Zap, TrendingUp, Shield } from 'lucide-react';

interface ModeSelectorProps {
  onSelect: (mode: 'client' | 'reseller' | 'register') => void;
}

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Red gradient orb */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        {/* Yellow gradient orb */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        {/* Red accent orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-40"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full"></div>
              <img
                src="/img/mi_logo.png"
                alt="Vuelo Urbano"
                className="h-32 relative z-10"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Bienvenido a <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Vuelo Urbano</span>
          </h1>
          <p className="text-gray-300 text-xl">Estilo que te impulsa - Elige tu camino</p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Client Mode Card */}
          <button
            onClick={() => onSelect('client')}
            className="group relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-red-900 via-red-800 to-red-900 border border-red-500/50 text-left transition-all hover:border-red-400 hover:shadow-2xl hover:shadow-red-500/20 active:scale-95"
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-red-500/20 border border-red-400 p-4 rounded-full">
                    <User className="w-8 h-8 text-red-300" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-red-300 group-hover:text-red-100 transition-colors group-hover:translate-x-2" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Cliente</h2>
                <p className="text-red-100 text-base">
                  Descubre nuestro catálogo de ropa urbana premium. Compra con precios finales y recibe directamente en tu puerta.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-red-300" />
                  <span className="text-red-100 text-sm">Compra rápida y fácil</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-red-300" />
                  <span className="text-red-100 text-sm">Productos de calidad garantizada</span>
                </div>
              </div>
            </div>
          </button>

          {/* Reseller Mode Card */}
          <button
            onClick={() => onSelect('register')}
            className="group relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900 via-yellow-800 to-orange-900 border border-yellow-500/50 text-left transition-all hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/20 active:scale-95"
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              {/* Top Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-yellow-500/20 border border-yellow-400 p-4 rounded-full">
                    <Users className="w-8 h-8 text-yellow-300" />
                  </div>
                  <ArrowRight className="w-6 h-6 text-yellow-300 group-hover:text-yellow-100 transition-colors group-hover:translate-x-2" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Revendedor</h2>
                <p className="text-yellow-100 text-base">
                  Acceso exclusivo a precios especiales. Crea tu marca personal y gana dinero revendiendo nuestros productos.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-100 text-sm">Márgenes de ganancia altos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-100 text-sm">Soporte y asesoría constante</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            ¿Por qué elegir Vuelo Urbano?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="bg-red-500/10 border border-red-500/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Envíos Rápidos</h4>
              <p className="text-gray-400 text-sm">Entrega a todo el país en 48 horas</p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="bg-red-500/10 border border-red-500/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Calidad Premium</h4>
              <p className="text-gray-400 text-sm">Productos auténticos y de excelente acabado</p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="bg-red-500/10 border border-red-500/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Negocio Escalable</h4>
              <p className="text-gray-400 text-sm">Crece a tu ritmo con apoyo constante</p>
            </div>
          </div>
        </div>

        {/* CTA Info */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            ¿Preguntas? Contáctanos por WhatsApp: <span className="text-yellow-500 font-semibold">+507 6498-7682</span>
          </p>
        </div>
      </div>
    </div>
  );
}
