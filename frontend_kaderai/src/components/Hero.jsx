import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

export default function Hero() {
  return (
    <section className="pt-50 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6    ">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT CONTENT */}
          <div className="flex-1">
            <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className=" text-7xl font-bold
                bg-linear-to-r from-[#0FA6A0] to-[#000000]
                bg-clip-text text-transparent">
              KaderAI
            </h1>

            <div className="w-[50%] h-[3px] bg-linear-to-r from-[#0FA6A0] to-[#000000] mt-1 mb-6" />

            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="text-[26px] font-semibold text-[#06403E] mb-4">
              Asisten Posyandu untuk Skrining <br />
              Risiko & Edukasi Gizi dalam 1 Menit.
            </h2>

            <p  className="text-[#06403E] max-w-xl mb-8 font-medium">
              Bantu kader membuat triage risiko, rencana edukasi 7 hari,
              dan laporan kunjungan yang rapi, lebih cepat, konsisten,
              dan aman.
            </p>

            {/* ICON IMAGE */}
            <div className="items-center gap-6 rounded-xl p-5 inline-flex mb-8 bg-linear-to-r from-[#14c6c0] to-[#1F4E79]">
              <img src="img/img1.png" alt="" />
              <img src="img/img2.png" alt="" />
              <img src="img/img3.png" alt="" />
              <img src="img/img4.png" alt="" />
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button  className="px-10 py-3 rounded-xl bg-linear-to-r from-[#0FA6A0] to-[#1F4E79] text-white font-medium shadow-md hover:scale-105 transition">
                Coba Demo
              </button>

              <button style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="px-7 py-3 rounded-xl border-2 border-teal-500 text-teal-600 font-semibold hover:bg-teal-50 transition">
                Lihat Cara Kerja
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src="img/Hero-right.png"
              alt="Kegiatan Posyandu"
              className="w-full max-w-md rounded-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
