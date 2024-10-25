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
    const blog = {
      url: 'https://testUrl.com',
      likes: 5,
      user: {
        name: 'testUser',
      },
    };

    const { container } = render(
      <Blog blog={blog} toggleDetailsVisibility={() => {}} />
    );


    let element = container.querySelector('.detail-blogs');
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    element = container.querySelector('.detail-blogs');

    expect(element).toHaveTextContent('https://testUrl.com');
    expect(element).toHaveTextContent('likes 5');
  });

  test('Clicking the like button calls event handler twice', async () => {
    const blog = {  // Blog bileşenine geçilecek bir blog objesi tanımlanıyor.
      likes: 0,
      user: {
        name: 'testUser',
      },
    };

    const mockHandler = vi.fn();  /*  Bu satırda, vitest ile bir mock fonksiyon oluşturuluyor. Bu fonksiyon, bileşenin beğen butonuna
                                      tıklanma olayını işleyen updateBlog fonksiyonunun yerine kullanılacak ve bu fonksiyonun kaç kez
                                      çağrıldığını test edeceğiz.

                                  */

    render(                       /*  Blog bileşeni burada test ediliyor.
                                      blog, updateBlog, blogs, ve setBlogs gibi props bileşene veriliyor.
                                      blog={blog}: Yukarıda tanımladığınız blog objesi burada Blog bileşenine aktarılıyor.
                                      updateBlog={mockHandler}: Blog bileşenindeki updateBlog fonksiyonu yerine mock fonksiyon (mockHandler)
                                      kullanılıyor.
                                      blogs={[]}: blogs prop'u bir boş dizi olarak geçiyor, bu kısımdan test için önemli bir veri gelmiyor.
                                      setBlogs={() => {}}: setBlogs fonksiyonu boş bir fonksiyon olarak geçilmiş. Testte kullanılmadığı için
                                      işlevi yok.*/
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        blogs={[]}
        setBlogs={() => {}}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);


    expect(mockHandler).toHaveBeenCalledTimes(2); //  toHaveBeenCalledTimes(2) ifadesi, mock fonksiyonun iki kez çağrılmış olmasını bekler

    /*
        Bu testin işleyişi şu şekilde özetlenebilir:

          * Bileşen Render Edilir: Blog bileşeni render edilir ve gerekli props'lar iletilir.
          * View Butonuna Tıklanır: "view" butonuna tıklayarak blog detayları gösterilir.
          * Like Butonuna İki Kez Tıklanır: "like" butonuna iki kez tıklanarak, handleLike fonksiyonunun iki kez çağrılması sağlanır.
          * Mock Fonksiyonun Çağrılma Sayısı Kontrol Edilir: Son olarak, mockHandler fonksiyonunun iki kez çağrılıp çağrılmadığı kontrol edilir.

        Bu testin amacı, handleLike fonksiyonunun ve dolayısıyla updateBlog fonksiyonunun doğru çalışıp çalışmadığını ve doğru sayıda
        çağrıldığını doğrulamaktır.
    */
  });
});

