# Türkiye Deprem Aktivite Haritası

Gerçek zamanlı deprem verilerini ve fay hatlarını gösteren interaktif harita uygulaması.

## Özellikler

- 🔍 Gerçek zamanlı deprem verileri
- 🗺️ İnteraktif harita görünümü
- ⚡ Fay hatları gösterimi
- 📊 Deprem büyüklüğüne göre renk kodlaması
- 🔄 Filtreleme özellikleri
- 📍 Kullanıcı konumu gösterimi

## Teknolojiler

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
  - Leaflet.js (Harita kütüphanesi)
- Backend:
  - .NET Core
  - MongoDB
 

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [https://github.com/fatihburakk/Turkiye-Deprem-Aktivite-Haritasi]
```

2. Backend bağımlılıklarını yükleyin:
```bash
cd backenddosyası
dotnet restore
```

3. Frontend bağımlılıklarını yükleyin:
```bash
cd frontenddosyası
npm install
```

4. Backend'i çalıştırın:
```bash
cd backenddosyası
dotnet run
```

5. Frontend'i çalıştırın:
```bash
cd frontenddosyası
npm start
```

## Kullanım

1. Harita üzerinde deprem noktaları renk kodlarıyla gösterilir:
   - Sarı: 0.0 - 3.9 (Düşük şiddet)
   - Turuncu: 4.0 - 5.9 (Orta şiddet)
   - Kırmızı: 6.0+ (Yüksek şiddet)

2. Fay hatları koyu yeşil çizgilerle gösterilir

3. Filtreleme özellikleri:
   - Büyüklük aralığına göre filtreleme
   - Şehir bazlı filtreleme
   - Filtreleri sıfırlama

