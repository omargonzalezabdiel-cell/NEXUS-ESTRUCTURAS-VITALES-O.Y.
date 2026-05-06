import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface ResellerRegistrationProps {
  onBack: () => void;
  onComplete: (data: ResellerData) => void;
}

export interface ResellerData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: 'personal' | 'brand';
  brandName?: string;
  brandLogo?: string;
  colors: string[];
  registeredAt: Date;
}

export default function ResellerRegistration({
  onBack,
  onComplete
}: ResellerRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ResellerData>>({
    businessType: 'personal',
    colors: ['#DC2626']
  });
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
        setFormData({ ...formData, brandLogo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...(formData.colors || [])];
    newColors[index] = color;
    setFormData({ ...formData, colors: newColors });
  };

  const handleSubmit = () => {
    if (
      formData.businessName &&
      formData.ownerName &&
      formData.email &&
      formData.phone
    ) {
      onComplete({
        ...formData,
        registeredAt: new Date()
      } as ResellerData);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.businessName && formData.ownerName;
    }
    if (step === 2) {
      return formData.email && formData.phone;
    }
    if (step === 3) {
      if (formData.businessType === 'brand') {
        return formData.brandName;
      }
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-gray-900 to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Volver</span>
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">
            Registra tu Negocio
          </h1>
          <p className="text-yellow-200">Paso {step} de 3</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-8">
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  value={formData.businessName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="Ej: Mi Tienda Urbana"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Tu Nombre Completo
                </label>
                <input
                  type="text"
                  value={formData.ownerName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <p className="text-gray-400 text-sm">
                Esta información será utilizada para gestionar tus pedidos y
                ganancias.
              </p>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="tuemail@ejemplo.com"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+507 XXXX-XXXX"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <p className="text-gray-400 text-sm">
                Usaremos estos datos para contactarte sobre tus pedidos y
                ganancias.
              </p>
            </div>
          )}

          {/* Step 3: Brand Setup */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-4">
                  Tipo de Negocio
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border-2 border-gray-600" style={{borderColor: formData.businessType === 'personal' ? '#FBBF24' : undefined}}>
                    <input
                      type="radio"
                      name="businessType"
                      value="personal"
                      checked={formData.businessType === 'personal'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessType: e.target.value as 'personal' | 'brand'
                        })
                      }
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-white font-semibold">
                        Vender con Vuelo Urbano
                      </p>
                      <p className="text-gray-400 text-sm">
                        Usa nuestra marca, gana $3-$5 por producto
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors border-2 border-gray-600" style={{borderColor: formData.businessType === 'brand' ? '#FBBF24' : undefined}}>
                    <input
                      type="radio"
                      name="businessType"
                      value="brand"
                      checked={formData.businessType === 'brand'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessType: e.target.value as 'personal' | 'brand'
                        })
                      }
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-white font-semibold">
                        Crear Tu Marca
                      </p>
                      <p className="text-gray-400 text-sm">
                        Logo gratis, compra barato, vende más caro
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {formData.businessType === 'brand' && (
                <div className="space-y-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Nombre de tu Marca
                    </label>
                    <input
                      type="text"
                      value={formData.brandName || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, brandName: e.target.value })
                      }
                      placeholder="Ej: Elite Wear, Urban Style"
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Logo de tu Marca (Opcional)
                    </label>
                    <div className="border-2 border-dashed border-yellow-500/50 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-700 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logoUpload"
                      />
                      <label
                        htmlFor="logoUpload"
                        className="cursor-pointer text-gray-300"
                      >
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Logo"
                            className="h-24 mx-auto rounded-lg"
                          />
                        ) : (
                          <div>
                            <p className="text-yellow-400 font-semibold">
                              Sube tu logo
                            </p>
                            <p className="text-gray-500 text-sm">
                              PNG, JPG o GIF (Max 2MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-3">
                      Colores de tu Marca
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[0, 1, 2].map((index) => (
                        <div key={index}>
                          <input
                            type="color"
                            value={
                              formData.colors?.[index] || '#DC2626'
                            }
                            onChange={(e) =>
                              handleColorChange(index, e.target.value)
                            }
                            className="w-full h-12 rounded-lg cursor-pointer border border-gray-600"
                          />
                          <p className="text-xs text-gray-400 text-center mt-1">
                            Color {index + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {step === 1 ? 'Cancelar' : 'Atrás'}
          </button>

          <button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={!isStepValid()}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-900 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {step === 3 ? (
              <>
                <Check size={20} />
                Completar Registro
              </>
            ) : (
              'Siguiente'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
