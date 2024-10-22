const LoginForm = ({        /*  ==> Bu satır, bir fonksiyonel bileşen olan LoginForm'un tanımını yapar.  Bu bileşene birkaç prop (özellik)
                                    verilir: handleSubmit, handleUsernameChange, handlePasswordChange, username, password. */
    handleSubmit,           //  ==> Form gönderildiğinde ne yapılacağını tanımlayan bir işlev.
    handleUsernameChange,   //  ==> Kullanıcı adı alanındaki değişiklikleri ele alan bir işlev.
    handlePasswordChange,   //  ==> Şifre alanındaki değişiklikleri ele alan bir işlev.
    username,               //  ==> Formdaki kullanıcı adı giriş alanının mevcut değeri.
    password                //  ==> Formdaki şifre giriş alanının mevcut değeri.
   }) => {

   return (
     <div>
       <h2>Login</h2>

       <form onSubmit={handleSubmit}>
         <div>
           username
           <input
             value={username}
             onChange={handleUsernameChange}
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }

 export default LoginForm