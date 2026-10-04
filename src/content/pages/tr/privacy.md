---
title: "Gizlilik ilkesi — DoneAt"
description: "DoneAt veriyi varsayılan olarak yerelde tutar, iPhone ve iPad’de isteğe bağlı özel iCloud eşitlemesi sunar ve analiz ile üçüncü taraf hizmetlerini nasıl ele alır."
heading: "Gizlilik ilkesi"
intro: "Bu sayfa DoneAt’in bilgiyi nasıl sakladığını ve işlediğini açıklar: resmî site, web zamanlayıcı ve iPhone, iPad, Android, Mac ile Windows uygulamaları."
updatedLabel: "Son güncelleme"
updated: "4 Ekim 2026"
---

## DoneAt’in sakladığı veri

Girdiğin bilgi varsayılan olarak yerelde saklanır: web zamanlayıcıda tarayıcının yerel depolamasında, iPhone, iPad, Android, Mac ve Windows’ta uygulamanın verisinde. DoneAt ürün hesabı sunmaz ve bu bilgiyi DoneAt sunucularına göndermez.

iPhone ve iPad’de iCloud eşitlemesini açmayı seçebilirsin. Programlarını, kayıtlarını, maaşını, hatırlatıcı tercihlerini, görünümü, dili, yaşam profilini ve Focus verisini Apple Hesabın altındaki özel iCloud veritabanında tutar. Bildirim izni, biyometrik koruma, Live Activity ayarları, geçerli iş sayacı ve ilk kurulum durumu her cihazda kalır. Web zamanlayıcı, Android, Mac uygulaması ve Windows uygulaması yerel kalır ve bu eşitlemenin parçası değildir.

Geri sayım, ilerleme ve kazanç tahmini bu bilgiden cihazında hesaplanır.

Bu genellikle şunları içerir:

- Başlangıç ve bitiş saatleri, iş günleri ve mola veya fazla mesai ayarları
- Maaş tutarı, ödeme dönemi ve kariyer maaş geçmişi
- İş kayıtları ve düzeltmeler, kariyer aşamaları ve girmeyi seçtiğin yaşam dönüm noktaları veya tarihler
- Focus görev başlıkları, planlar, oturumlar ve dinlenme ayarları
- Bildirim ve hatırlatıcı tercihleri
- Dil ve görünüm

## İsteğe bağlı iCloud eşitlemesi

Eşitleme varsayılan olarak kapalıdır. iPhone veya iPad’de açtığında Apple’ın CloudKit hizmeti yukarıda anlatılan veriyi Apple Hesabınla ilişkili özel veritabanında saklar. DoneAt kendi sunucularında bir kopya almaz. Aynı Apple Hesabını kullanan cihazlar bu veriyi kurtarabilir ve eşitleyebilir; bunun için kullanılabilir bir iCloud hesabı ve ağ bağlantısı gerekir.

Eşitlemeyi açmak DoneAt Plus gerektirir. Zaten açılmış eşitleme abonelik bittikten sonra da sürer. Eşitlemeyi kapatmak o cihazda eşitlemeyi durdurur ve hem güncel yerel kopyayı hem mevcut iCloud kopyasını tutar. Kapatmak iki kopyadan birini silmez.

## Android

Android uygulaması test aşamasındadır; erişim ve Plus satın almaları Google Play yayınına bağlıdır. Çalışma verileri ve ayarlar varsayılan olarak uygulamanın özel alanında kalır. DoneAt hesabı veya uygulama kullanım analizi yoktur.

Sistem yedekleri ve cihaz aktarımı; kayıtları, maaşı, kariyer geçmişini, yaşam profilini, Focus verilerini ve tamamlanmamış kurulum ayarlarını içerebilir. Bu, cihazına, hesabına ve sistem ayarlarına bağlıdır; DoneAt sunucusunda kopya oluşmaz. Çalışan sayaç, hatırlatıcı kaydı ve satın alma kanıtları hariç tutulur. Geri yükleme sonrası hatırlatıcılar yeniden planlanır ve satın almalar kontrol edilir. Otomatik Google Drive veya iPhone eşitlemesi yoktur. Elle dışa aktarılan yedek okunabilir JSON’dur, maaş içerebilir ve seçtiğin konum ya da alıcıda ayrı kopya oluşturur.

Satın almaları ve isteğe bağlı yorumları Google Play işler. DoneAt kart bilgilerini veya yorum gönderip göndermediğini almaz. Ürün ve jeton içeren kanıtlar sistem yedeği dışında cihazda saklanır. Başlatma, uygulamaya dönme, satın almayı geri yükleme veya onayı yeniden deneme sırasında kontrol yapılabilir. Sunucu doğrulaması açıksa jeton, ürün ve rastgele istek kimliği HTTPS ile Cloudflare’daki `api.doneat.app` adresine gönderilir. Google değişiklikleri Cloud Pub/Sub ile iletir. Hizmet durumu ve kesin bitiş zamanını Google’dan doğrular, imzalı kanıt döndürür; çalışma verileri veya yedekleri almaz.

Veritabanı doğrulama, geri yükleme ve değiştirilmiş satın almaların yeniden kullanımını önlemek için jeton özeti, ürün, erişim durumu ve bitişi, kontrol zamanı, test satın alma işareti, yeni jeton özeti ve revizyonu saklar. Bildirim kimlikleri 30 günlük aralıkta tekilleştirilir; eskiler sonraki bildirimler işlenirken silinir. Ham jetonlar ve Google yanıtları geçici işlenir, veritabanına veya uygulama günlüklerine yazılmaz. IP tabanlı sınırlama geçicidir; DoneAt veritabanında IP veya özetleri tutulmaz. Google ve Cloudflare trafiği kendi politikalarıyla işler. Satın alma kimlikleri reklam veya kullanım profili için kullanılmaz.

Hatırlatıcılar cihazda planlanır. Cihaz doğrulaması yalnızca sonuç verir; biyometrik veri veya PIN alınmaz. Backdrop (AndroidLiquidGlass) ve Shapes yerel çizim yapar, yazarlara içerik veya kimlik göndermez. Kaynaklar ve lisanslar [Hakkında](/tr/about#android) bölümündedir.

Yerel verileri uygulamadan, depolamasını temizleyerek veya kaldırarak silebilirsin. Dışa aktarılan dosyaları ve sistem yedeklerini sağlayıcılarında ayrıca silmelisin. Sunucudaki satın alma kaydını silmek için [hello@doneat.app](mailto:hello@doneat.app) adresine yaz. Yerel silme sunucu kaydını otomatik silmez veya aboneliği iptal etmez; abonelikleri Google Play’de yönet. Dışa aktarma ve silme, etkin Plus olmadan kullanılabilir.


## Yedek dışa aktarma

iPhone ve iPad’de yedek dışa aktarma yalnızca Dışa Aktar’ı seçtiğinde oluşturulur. Tam yedek kayıtlarını, eşitlenen ayarları, maaşı ve kariyer maaş geçmişini, yaşam profilini ve Focus görevleri ile oturumlarını içerir. Yaşam profili olmadan da dışa aktarabilirsin; bu seçenek maaşı ve kariyer geçmişini yine de içerir. Sistem paylaşım sayfası dosyayı nereye kaydedeceğini veya paylaşacağını seçmeni sağlar.

Dışa aktarma okunabilir bir JSON dosyasıdır, parola korumalı bir arşiv değildir. İçindeki bilgiye uygun bir konum ve alıcılar seç. Kaydettiğin veya paylaştığın dosyalar ayrı kopyalardır; DoneAt’te veri silmek bu dosyaları silmez.

## Plus satın almaları

iPhone ve iPad’de Apple, Plus aboneliklerini ve ömür boyu satın almaları App Store üzerinden yürütür. DoneAt satın alma durumunu doğrulamak ve erişimi geri yüklemek için StoreKit kullanır ve doğrulanmış yetkinin ve varsa bitiş tarihinin yerel kaydını tutar. DoneAt ödeme kartı bilgilerini almaz ve satın alma durumunu bir DoneAt hesap sunucusuna göndermez. Apple satın alma bilgisini kendi ilkelerine göre işler.

Aboneliğin bitmesi mevcut kayıtlarını silmez. Dışa aktarma ve silme, etkin abonelik olmadan da kullanılabilir kalır.

## Resmî site

[doneat.app](https://doneat.app) statik bir web sitesidir. Vardiyanı veya maaşını toplamaz. Site kökünü veya `/privacy` ya da `/download` gibi kısa bir yolu açmak tarayıcı dilini izler ve seni o hole ya da İngilizce veya Basitleştirilmiş Çince destek sayfasına gönderir. Dil sayfa URL’sinde kalır; bu site bir dil çerezi koymaz.

Sayfaları barındırmak için Vercel, kendi gizlilik ilkesine göre IP adresi ve tarayıcı tanımlayıcısı gibi olağan bağlantı bilgisini işleyebilir. Bu proje bu bilgiyi saklamaz veya bundan senin hakkında bir profil oluşturmaz.

Resmî site sayfa görüntülemelerini ve yükleme performansını ölçmek için Vercel’in çerezsiz analizini ve insanların hangi girişleri kullandığını görmek için küçük bir toplu sayaç kümesini kullanır. Olaylar sabit, herkese açık bir listeden gelir — örneğin `hall_view`, `download_view`, `download_from_web`, `web_timer_open` veya `app_store_open` — ve güne göre artar. İstek yalnızca olay adını taşır. Kullanıcı tanımlayıcısı, oturum, dil, program veya maaş içermez ve bir kişiyi tanımlamak veya izlemek için kullanılamaz.

Olay listesinin tamamı bu depoda [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts) dosyasındadır.

## Web zamanlayıcı analizi

[off.rainif.com](https://off.rainif.com) adresindeki web zamanlayıcı da sayfa görüntülemelerini ve yükleme performansını ölçmek için Vercel’in çerezsiz analizini kullanır. Genel özellik kullanımını anlamak için ayrı, sınırlı bir toplu sayaç kümesi kullanır.

Ürün olayları `share_open` veya `countdown_start` gibi başka bir sabit, herkese açık listeden gelir ve güne göre toplanır. Kullanıcı tanımlayıcısı, oturum bilgisi, program veya maaş verisi içermez ve bir kişiyi tanımlamak veya izlemek için kullanılamaz.

Ürün olay listesinin tamamı ürünün açık kaynak deposunda bulunur. Barındırma ve analiz sağlayıcıları standart bağlantı bilgisini kendi gizlilik ilkelerine göre işleyebilir. Bu proje bu bilgiyi ayrıca saklamaz veya kullanıcı profili oluşturmak için kullanmaz.

## Çerezler

Web zamanlayıcı, sonraki ziyaretlerin seçtiğin dilde açılması için `i18nextLng` adlı bir çerezde dil kodu saklar. İlk ziyarette o an görünen dilden konur, dili değiştirdiğinde güncellenir, bir yıl sonra sona erer ve tarayıcıdan kaldırılabilir.

Ne resmî site ne de web zamanlayıcı reklam veya siteler arası izleme çerezi kullanır. Yukarıda anlatılan analiz çerezlere dayanmaz.

## Bir geri sayım paylaşmak

Paylaşım bağlantısının URL’si yalnızca başlangıç ve bitiş saatlerini içerir. Maaş bilgisi içermez. Bağlantıyı açan kişi yalnızca vardiya saatlerini görebilir. Geri sayım paylaşım görselleri de maaşı çıkarır. Yedek dışa aktarma farklıdır: maaş ve yukarıda listelenen diğer kişisel veriyi içerebilir.

Üçüncü taraf bir sosyal hizmetle paylaşmayı seçersen o hizmetin gizlilik ilkesi geçerlidir.

## Telefonundaki ve bilgisayarındaki uygulamalar

iPhone, iPad, Mac ve Windows uygulamaları kullanım analizi toplamaz.

GitHub’dan kurulan bir masaüstü derlemesi başlarken daha yeni bir sürüm olup olmadığını denetler. İstek hesap, maaş veya kullanım verisi içermez ve yükleyici yalnızca bir güncellemeyi onayladıktan sonra iner. GitHub’a doğrudan ulaşılamazsa üçüncü taraf bir yansı üzerinden yeniden denemeyi seçebilirsin. Her iki kanaldan inen güncellemeler kurulumdan önce imza denetiminden geçer.

Microsoft Store’dan kurulan bir derleme güncelleme denetimi başlatmaz. Güncellemeleri Microsoft Store sağlar.

Hatırlatıcılar işletim sistemi tarafından yerelde zamanlanır ve gösterilir. Uygulamalar harici bir bağlantı açtığında veya üçüncü taraf bir hizmetle paylaşmayı seçtiğinde de ağa erişir.

## Bileşenler, Live Activities ve cihaz koruması

Bileşenler ve Live Activities sayacını ve ilerlemeni göstermek için gereken bilgiyi kullanır; uygun olduğunda Focus bilgisi dahil. Maaş içermezler. Yerel bildirimler de maaşı çıkarır. Bu yüzeyler Ana Ekranında veya Kilit Ekranında görünebilir; görünürlüklerini ve bildirim izinlerini uygulama ve sistem ayarlarında yönetebilirsin.

DoneAt kazancı veya kayıtları korumak için kimlik doğrulama istediğinde doğrulamayı cihaz Face ID, Touch ID veya parola ile yapar. DoneAt doğrulama sonucunu alır, biyometrik verini veya parolanı değil. Bu koruma her cihazda ayrı yapılandırılır.

## Üçüncü taraf hizmetler

DoneAt sayfaları barındırmak, resmî siteyi ve web zamanlayıcıyı ölçmek, uygulamaları dağıtmak ve seçtiğin bağlantıları açmak için şu hizmetleri kullanır:

- Vercel — resmî sitenin ve web zamanlayıcının barındırılması; ikisinde de sayfa görüntüleme ve performans ölçümü
- Upstash — resmî site ve web zamanlayıcı için günlük toplu olay sayılarının saklanması
- GitHub — kaynak kodu, sürüm bilgisi ve GitHub üzerinden dağıtılan masaüstü derlemelerin güncelleme denetimleri
- Apple — uygulama dağıtımı, App Store ve StoreKit üzerinden Plus ödemeleri ve satın alma doğrulaması, iPhone veya iPad’de açmayı seçtiğinde özel iCloud eşitlemesi
- Microsoft — açtığın Microsoft Store listesinin dağıtımı ve güncellemeleri
- Yalnızca GitHub üzerinden dağıtılan bir masaüstü derlemeden seçtiğinde kullanılan üçüncü taraf bir indirme yansısı
- Bir geri sayım paylaşırken seçtiğin üçüncü taraf sosyal hizmet

## Verini silmek

Web zamanlayıcıda tarayıcıdan bu sitenin verisini temizle; yerel depolama ve dil çerezi dahil. Mac veya Windows’ta uygulamayı kaldır ve verisini sil.

iPhone ve iPad’de kaldırma o cihazda saklanan veriyi kaldırır. iCloud eşitlemesini açtıysan özel iCloud kopyası diğer cihazların için kullanılabilir kalır. DoneAt’in Kayıtlar ve Veri ayarlarından iCloud’dan silmek iCloud kopyasını siler ve o Apple Hesabına giriş yapmış cihazlar bir sonraki eşitlemede ilişkili eşitlenen kayıtları temizler. Kayıtları yalnızca bu cihazdan kaldırmak iCloud kopyasını geri yüklemeye açık bırakır. Daha önce dışa aktardığın yedek dosyalar, kaydettiğin veya paylaştığın yerlerden ayrı silinmelidir.

DoneAt Apple Hesabına erişemez ve özel iCloud verisini senin adına silemez. DoneAt yerel verine bir sunucudan erişemez veya silemez.

## Bu ilkedeki değişiklikler

Bu ilke güncellendiğinde sayfanın üstündeki son güncelleme tarihi de değişir. Önemli değişiklikler sürüm notlarında listelenir; önceki sürümler açık kaynak deponun commit geçmişinde bulunur.

## Bize ulaş

Bu ilke veya bilginin nasıl ele alındığı hakkındaki sorular [hello@doneat.app](mailto:hello@doneat.app) adresine gider. Ürün sorunları ve öneriler [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues) üzerinden de iletilebilir.

Bu ilke ile ürünün gerçek davranışı arasında bir fark görürsen o adrese yaz veya bir issue aç.
