/*
    Togglable bileşeni, bir butona tıkladığınızda içeriğin görünür veya gizli olmasını sağlayan bir yapı sunar. props.buttonLabel ile butonun
    etiketini dinamik olarak ayarlayabilir, props.children ile içerik olarak başka bileşenler veya HTML elemanları ekleyebilirsiniz. Bu bileşen
    genellikle bir form veya detaylı bilgilerin gizlenip gösterilmesi amacıyla kullanılır.
*/

import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)   /*  ==> Bu satir visible adında bir state (durum) değişkeni tanımlar ve başlangıç değerini
                                                          false olarak ayarlar. setVisible ise bu durumu güncellemek için kullanılan
                                                          fonksiyondur.
                                                  */

  const hideWhenVisible = { display: visible ? 'none' : '' }  /*  Bu satir ile eğer visible durumu true ise, bu stil nesnesi görünürlüğü none
                                                                  (gizli) olarak ayarlayacaktır. Eğer false ise, boş bir string dönecektir, bu da
                                                                  elementi görünür kılar.
                                                              */
  const showWhenVisible = { display: visible ? '' : 'none' }  /*  Bu satir ile eğer visible durumu true ise, bu stil nesnesi boş bir string
                                                                  döner ve element görünür olur. Eğer false ise, görünürlüğü none (gizli) olarak
                                                                  ayarlayacaktır.
                                                              */

  const toggleVisibility = () => {    /*  ==> Bu fonksiyon visible durumunu tersine çevirir. Yani, true ise false, false ise true yapar. Bu,
                                              görünürlük durumunu değiştirmek için kullanılır.
                                      */
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}> {/* hideWhenVisible stilini uygulayan bir <div> elementi oluşturur. Eğer visible true ise, bu <div>
                                        gizlenecektir.
                                    */}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button> {/* Buton oluşturur. Butona tıklandığında toggleVisibility
                                                                            fonksiyonunu çağırır, bu da görünürlüğü değiştirir. Butonun
                                                                            içindeki metin props.buttonLabel üzerinden alınır.
                                                                        */}
      </div>
      <div style={showWhenVisible}>
        {props.children}  {/* Togglable bileşeninin içine yerleştirilen diğer bileşen veya HTML elemanlarını temsil eder. Bu, Togglable
                              bileşeninin içeriği olarak gösterilecektir.
                          */}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable