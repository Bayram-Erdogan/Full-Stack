import { useState } from 'react';


const Blog = ({ blog , updateBlog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };
    await updateBlog(blog.id, updatedBlog);

    const updatedBlogs = blogs.map(b => { /*  blogs.map(b => { ... }) ==> map metodu,
                                              * bir dizinin her elemanı üzerinde döngü yaparak her elemanı belirli bir işleme tabi tutar ve bu
                                                işlemin sonucunda yeni bir dizi oluşturur.
                                              * b değişkeni, blogs dizisindeki her bir blog nesnesini temsil eder.
                                          */
      if (b.id === blog.id) {
        return updatedBlog; /*  Bu işlem, güncellenmiş blogu yeni dizinin ilgili yerine koyar ve diğer blogları olduğu gibi korur. */
      }
      return b;
    });

    updatedBlogs.sort((a, b) => b.likes - a.likes); /* sort fonksiyonu, blogs dizisini beğeni sayısına (likes) göre sıralar.
                                                      * a ve b, sıralama sırasında kıyaslanan iki blogdur.
                                                      * (b.likes - a.likes): Bu ifade sıralamanın azalan düzende (en çok
                                                        beğenilenden en az beğenilene doğru) yapılmasını sağlar. b.likes - a.
                                                        likes pozitifse, b önce gelir (daha çok beğeni), negatifse a önce gelir
                                                        (daha az beğeni).
                                                    */
    setBlogs(updatedBlogs);

    /*
      Özet
        Bu kod parçacığı, belirli bir blogu güncelleyip tüm blog listesini beğeni sayısına göre sıralamak için kullanılır. Kodun işlevselliği şu
        şekildedir:

        Belirli Bir Blogu Güncelleme: map metodu ile mevcut blog dizisindeki belirli bir blog güncellenir.
        Sıralama: sort metodu ile güncellenmiş blog listesi, beğeni sayısına göre sıralanır.
        Durum Güncelleme: setBlogs ile güncellenmiş ve sıralanmış dizi bileşenin durumuna atanarak kullanıcı arayüzünde gösterilir.

        Bu şekilde, kullanıcı bir blogu beğendiğinde hem o blog güncellenir hem de liste, beğeni sayısına göre sıralı şekilde görüntülenir.
    */
  };


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetailsVisibility}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>

      {detailsVisible && (
        <div>
          <p>{blog.url }</p>
          <p>
            likes {blog.likes } <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
