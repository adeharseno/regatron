import { Cpu, Download, SlidersHorizontal, Cable, Zap, ArrowRight } from 'lucide-react'

export function Products() {
  return (
    <section id="products" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-24 flex flex-col items-end justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Inventory Portfolio
            </span>
            <h2 className="text-[40px] font-bold uppercase leading-none tracking-tighter text-on-background">
              Our Products
            </h2>
            <p className="mt-6 max-w-lg text-on-surface-variant">
              Catalog of extracted materials with high purity levels, ready for reintegration
              into the global manufacturing supply chain.
            </p>
          </div>
          <button className="group flex items-center gap-4 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-container">
            <span>Download Full Catalog</span>
            <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="space-y-gutter md:col-span-7">
            <div className="group flex flex-col gap-10 border border-outline-variant/30 bg-white p-12 transition-colors duration-500 hover:border-primary md:flex-row">
              <div className="flex-1">
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-widest text-outline/30">
                    CAT-01
                  </span>
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-6 text-2xl font-semibold uppercase tracking-wide">Scrap PCB</h3>
                <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">
                  Printed circuit boards from various electronic devices with precious metal
                  content optimized for the refining process.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                  {['Motherboards', 'Server Boards', 'Laptop PCB', 'Desktop PCB'].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs font-bold uppercase text-outline"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
              <div className="group border border-outline-variant/30 bg-white p-10 transition-colors duration-500 hover:border-primary">
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-widest text-outline/30">
                    CAT-02
                  </span>
                  <SlidersHorizontal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide">
                  IC &amp; Chip Scrap
                </h3>
                <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
                  Semiconductor components with high gold and silver concentrations.
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  BGA • RAM • CPU • GPU
                </div>
              </div>
              <div className="group border border-outline-variant/30 bg-white p-10 transition-colors duration-500 hover:border-primary">
                <div className="mb-8 flex items-start justify-between">
                  <span className="text-[10px] font-black tracking-widest text-outline/30">
                    CAT-03
                  </span>
                  <Cable className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 text-xl font-semibold uppercase tracking-wide">PM Connectors</h3>
                <p className="mb-6 text-xs leading-relaxed text-on-surface-variant">
                  Gold-plated connectors and high-precision sockets.
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Gold-Plated • CPU Sockets
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-gutter md:col-span-5">
            <div className="group flex h-full flex-col border border-outline-variant/30 bg-white p-12 transition-colors duration-500 hover:border-primary">
              <div className="mb-8 flex items-start justify-between">
                <span className="text-[10px] font-black tracking-widest text-outline/30">
                  CAT-04
                </span>
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-6 text-2xl font-semibold uppercase tracking-wide">
                Capacitors &amp; Resistors
              </h3>
              <p className="mb-10 text-sm leading-relaxed text-on-surface-variant">
                Passive components containing palladium and silver, processed through precision
                mechanical separation.
              </p>
              <div className="mt-auto border-t border-outline-variant/20 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-outline">
                    Industrial Grade
                  </span>
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
