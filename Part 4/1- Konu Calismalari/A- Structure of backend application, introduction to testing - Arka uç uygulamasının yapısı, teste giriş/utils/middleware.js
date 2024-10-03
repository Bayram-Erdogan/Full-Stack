/*
    Bu kod parçası, Express.js uygulaması için bazı özel middleware fonksiyonlarını tanımlar ve dışa aktarır. Bu middleware'ler, isteklerin loglanması,
    bilinmeyen endpoint'lerin ele alınması ve hata yönetimi gibi görevleri yerine getirir. İşte detaylı açıklama:
*/

//Gerekli Modülün Yüklenmesi
const logger = require('./logger')  /*    ==> Uygulama boyunca loglama işlevlerini gerçekleştiren modül. Bu, konsola veya bir dosyaya log yazma gibi
                                              işlemleri yapar.*/

//requestLogger Middleware'i
const requestLogger = (request, response, next) => {    /*  ==> Gelen HTTP isteklerinin detaylarını loglar.
                                                                request: Gelen istek nesnesi.
                                                                response: Yanıt nesnesi.
                                                                next: Bir sonraki middleware fonksiyonuna geçişi sağlayan callback fonksiyonu.
                                                        */
  logger.info('Method:', request.method)    //  ==> İstek yöntemi (request.method),
  logger.info('Path:  ', request.path)      //  ==> istek yolu (request.path),
  logger.info('Body:  ', request.body)      //  ==> istek gövdesi (request.body) gibi bilgileri ekrana yazdirir.
  logger.info('---')
  next()                                    //  ==> ve next() fonksiyonunu çağırarak bir sonraki middleware'e geçiş yapar.
}

//unknownEndpoint Middleware'i
const unknownEndpoint = (request, response) => {    /*  ==> Tanımlanmamış endpoint'lere yapılan istekleri ele alır.
                                                            request: Gelen istek nesnesi.
                                                            response: Yanıt nesnesi.
                                                    */
  response.status(404).send({ error: 'unknown endpoint' })  //  ==> 404 durum kodu ile { error: 'unknown endpoint' } mesajını döner.
}

//errorHandler Middleware'i
const errorHandler = (error, request, response, next) => {    /*  ==> Uygulama boyunca meydana gelen hataları ele alır ve uygun yanıtları döner.
                                                                      error: Hata nesnesi.
                                                                      request: Gelen istek nesnesi.
                                                                      response: Yanıt nesnesi.
                                                                      next: Bir sonraki middleware fonksiyonuna geçişi sağlayan callback fonksiyonu.
                                                              */
  logger.error(error.message)   //  ==> Hata mesajını loglar

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })  //  ==> Eğer hata bir CastError ise, 400 durum kodu ve malformatted id mesajını döner.
  } else if (error.name === 'ValidationError') {      //  ==> Eğer hata bir ValidationError ise, 400 durum kodu ve hata mesajını JSON formatında döner.
    return response.status(400).json({ error: error.message })
  }

  next(error)  //  ==>  Diğer hatalar için, next(error) ile hatayı bir sonraki hata işleyiciye iletir.
}

//Middleware'lerin Dışa Aktarılması
module.exports = {    //  ==> Tanımlanan middleware fonksiyonlarını dışa aktarır, böylece uygulamanın diğer bölümlerinde kullanılabilir hale getirir.
  requestLogger,
  unknownEndpoint,
  errorHandler
}

/*
    Özet
    Bu kod parçası, Express.js uygulaması için üç önemli middleware fonksiyonunu tanımlar:

    requestLogger: Gelen HTTP isteklerini ekrana yazdirir.
    unknownEndpoint: Tanımlanmamış endpoint'lere yapılan istekleri ele alır ve 404 hatası döner.
    errorHandler: Uygulama boyunca meydana gelen hataları ele alır ve uygun hata yanıtlarını döner.

    Bu middleware'ler, uygulamanın daha yönetilebilir ve hataların daha izlenebilir olmasını sağlar.
*/