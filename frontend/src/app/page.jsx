import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[92vh] min-h-[560px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/hero/valle-de-uco-andes.jpg"
          alt="Viñedos de Tunuyán, Valle de Uco, con la Cordillera de los Andes de fondo"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/25 to-background/10" />

        <div className="relative z-10 px-8">
          <p className="font-script text-5xl sm:text-6xl text-gold mb-2">Cosecha de altura</p>
          <h1 className="font-serif text-5xl sm:text-7xl text-white leading-[1.05] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Vinos de bodegas boutique
          </h1>
          <p className="text-white/85 text-lg max-w-lg mx-auto mt-5 text-balance drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Cultivados con respeto por la tierra del Valle de Uco — pequeñas
            producciones elegidas por su carácter de terroir.
          </p>
        </div>
      </section>

      <section className="relative py-24 px-8 sm:px-16 overflow-hidden">
        <Image
          src="/hero/barricas-bodega.jpg"
          alt="Barricas de roble en la bodega"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/55" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="font-script text-4xl text-gold mb-4">Con paciencia y oficio</p>
          <p className="font-serif text-2xl sm:text-3xl text-foreground leading-snug text-balance">
            Cada botella descansa en roble el tiempo que necesita, no el que conviene.
          </p>
        </div>
      </section>
    </div>
  );
}
