import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event' // Bu satir
import Blog from './Blog';
import { describe } from 'vitest';

describe('Blog Component', () => {
  test('renders blog content with title', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
    };

    const { container } = render(<Blog blog={blog} />);

    const element = container.querySelector('.blog-container')
    expect(element).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  });

  test('renders blog content with author', () => {
    const blog = {
      author: 'Test author 2',
    };

    const { container } = render(<Blog blog={blog} />);

    const element = container.querySelector('.blog-container')
    expect(element).toHaveTextContent(
      'Test author 2'
    )
  });

  test('renders blog content with title and author', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test author 2',
    };

    const { container } = render(<Blog blog={blog} />);

    const element = container.querySelector('.blog-container')
    expect(element).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(element).toHaveTextContent(
      'Test author 2'
    )

  });
});

describe('Blog details', () => {
  test('Details with url and likes', async () => {
    const blog = {                  /*  blog nesnesi, testin simülasyonunda kullanılacak bir blogun verilerini temsil eder. Bu veri,
                                        bileşenin doğru bir şekilde çalışıp çalışmadığını görmek için kullanılacaktır. Blogun URL'si,
                                        likes sayısı ve user (kullanıcı) bilgisi bu nesnede tanımlı.
                                    */
      url: 'https://testUrl.com',
      likes: 5,
      user: {
        name: 'testUser',
      },
    };

    const { container } = render(<Blog blog={blog} />); /*  Bu kod Blog bileşenini render eder ve test içinde kullanabileceğiniz
                                                            container objesini döndürüyor.
                                                        */

    let element = container.querySelector('.detail-blogs'); /*  Bu satırda, container.querySelector fonksiyonu kullanılarak,
                                                                detail-blogs sınıfına sahip bir div elementine erişilmeye çalışılıyor.
                                                                Ancak, ilk başta bu elementin bulunmasını beklemiyoruz çünkü bu testin
                                                                amacı, butona tıklanınca detayların açılıp açılmadığını görmek.
                                                            */
    const user = userEvent.setup();                     /*  Bu satırlarda, userEvent.setup() fonksiyonu ile bir kullanıcı simülasyonu
                                                            başlatılıyor. Bu simülasyon, test senaryolarında tıklama, yazma veya form
                                                            gönderme gibi işlemleri simüle etmemizi sağlar.
                                                        */
    const button = screen.getByText('view');            /*  Bu komut, ekranda 'view' metnine sahip olan buton'u seçer. Yani, blog
                                                            detaylarını göstermek için kullanılan butonu seçiyoruz.
                                                        */
    await user.click(button);                           /*  Burada butona tıklama işlemi gerçekleştirilir. user.click ile, butona
                                                            tıklama simülasyonu yaparak, detayların açılmasını tetikleriz.
                                                        */

    element = container.querySelector('.detail-blogs'); /*  Bu satırda, tıklama işleminden sonra tekrar container'daki .detail-blogs
                                                            div'ini seçiyoruz. Çünkü, tıklama sonrasında bu divin görünür olması bekleniyor.
                                                            Bu, blog detaylarının doğru bir şekilde render edilip edilmediğini kontrol etmek
                                                            için kullanılır.
                                                        */

    expect(element).toHaveTextContent('https://testUrl.com'); /*  Bu satırlar, blog detaylarının doğru bir şekilde render edilip edilmediğini
                                                                  kontrol eder. Tıklama sonrasında, blogun URL'sinin ve likes sayısının doğru
                                                                  bir şekilde görüntülenip görüntülenmediği test edilir.
                                                              */
    expect(element).toHaveTextContent('likes 5');
  });
});

