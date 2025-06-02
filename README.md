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
  - RESTful API

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [proje-url]
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

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Açıklama'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Proje Sahibi: [İsminiz]
E-posta: [E-posta adresiniz] 