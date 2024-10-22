/*
  Bu bileşen, yeni bir blog oluşturmak için bir form sunar. Kullanıcıdan başlık (title), yazar (author) ve URL bilgilerini alır ve bu bilgileri
  formda işleyerek gönderir.
*/
const BlogForm = ({
    handleSubmit,         //  Form gönderildiğinde çağrılan işlevdir.
    title,
    author,
    url,                  //  title, author, url: Formdaki input alanlarına girdiğiniz değerlerdir
    handletitleChange,
    handleAuthorChange,
    handleUrlChange       /*  handletitleChange, handleAuthorChange, handleUrlChange: Formdaki her bir input alanındaki değişikliği işlemek için
                              kullanılan fonksiyonlardır.
                          */
  }) => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
            <div>
                title
                <input
                type="text"
                value={title}
                name="Title"
                onChange={handletitleChange}
                />
            </div>
            <div>
                author
                <input
                type="text"
                value={author}
                name="Author"
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url
                <input
                type="text"
                value={url}
                name="Url"
                onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
      </div>
    )
  }

  export default BlogForm