import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { stylistic },
    rules: {
      "no-undef": 0, /* ==> 0 degeri no-undef'i kontrolunun devre disi birkilmasi gerektigini belirtir. Varsayılan olarak, "no-undef"
                            kuralının değeri 2 olur  "no-undef" kuralına 0 değerini atadığınızda, bu kural devre dışı bırakılmış olur
                            ve ESLint tanımlanmamış değişkenler veya kullanılmayan değişkenler için hata mesajları göstermez.
                      */

      eqeqeq: "error",  //  ==> Eşitlik üçlü eşittir operatörü dışında herhangi bir şeyle kontrol edilirse bizi uyaran eqeqeq kuralını ekledim

      "no-trailing-spaces": "error",// ==> Bu satir bir satırın sonunda gereksiz bir boşluk varsa, bu bir hata olarak işaretlenir.
      "object-curly-spacing": ["error", "always"],  /*  ==> Bu kural, nesne kıvrımının çevresindeki boşlukları kontrol eder. "error"
                                                            değeri, bu kuralın bir hataya dönüştüğünü belirtir. "always" değeri ise,
                                                            nesne kıvrımının içinde ve dışında boşlukların her zaman olması gerektiğini
                                                            belirtir. Örneğin, { foo: 'bar' } şeklinde bir nesne kıvrımı, bu kurala
                                                            uygundur, çünkü içinde ve dışında boşluklar vardır.
                                                    */
      "arrow-spacing": ["error", { before: true, after: true }],  /*  ==> Bu kural, ok fonksiyonlarının etrafındaki boşlukları kontrol
                                                                          eder. "error" değeri, bu kuralın bir hataya dönüştüğünü
                                                                          belirtir. { before: true, after: true } ise, ok fonksiyonu
                                                                          (=>) öncesinde ve sonrasında boşlukların olması gerektiğini
                                                                          belirtir. Örneğin, () => {} şeklinde bir ok fonksiyonu, bu
                                                                          kurala uygundur, çünkü öncesinde ve sonrasında boşluklar
                                                                          vardır.
                                                                  */
    },
  },
  {
    ignores: ["dist/**/*", "node_modules/**/*", "./eslint.config.mjs"],
  },
];
